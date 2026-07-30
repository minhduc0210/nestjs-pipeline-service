import { ExecutionContext, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { ThrottlerLimitDetail, ThrottlerModuleOptions, ThrottlerStorage } from '@nestjs/throttler';

import { AppException } from '../../errors/core/app-exception';
import type { AppLoggerService } from '../../logging/nest/app-logger.service';
import { AppThrottlerGuard } from '../nest/app-throttler.guard';

describe('AppThrottlerGuard', () => {
  let guard: AppThrottlerGuard;
  let mockLogger: jest.Mocked<Partial<AppLoggerService>>;
  let mockReflector: jest.Mocked<Partial<Reflector>>;

  beforeEach(() => {
    mockLogger = {
      warn: jest.fn(),
    };
    mockReflector = {};

    const mockOptions: ThrottlerModuleOptions = {
      throttlers: [{ name: 'short', ttl: 1000, limit: 10 }],
    };
    const mockStorageService: Partial<ThrottlerStorage> = {};

    guard = new AppThrottlerGuard(
      mockOptions,
      mockStorageService as ThrottlerStorage,
      mockReflector as Reflector,
      mockLogger as AppLoggerService,
    );
  });

  describe('getTracker', () => {
    it('should return session tracker when x-session-id header is provided', async () => {
      const req = {
        headers: { 'x-session-id': 'sess-12345' },
      };

      // @ts-expect-error accessing protected method for testing
      const tracker = await guard.getTracker(req);
      expect(tracker).toBe('session-sess-12345');
    });

    it('should return user tracker when x-user-id header is provided without session id', async () => {
      const req = {
        headers: { 'x-user-id': '67890' },
      };

      // @ts-expect-error accessing protected method for testing
      const tracker = await guard.getTracker(req);
      expect(tracker).toBe('user-67890');
    });

    it('should fallback to IP address tracker when no session or user headers are present', async () => {
      const req = {
        headers: {},
        ip: '192.168.1.100',
      };

      // @ts-expect-error accessing protected method for testing
      const tracker = await guard.getTracker(req);
      expect(tracker).toBe('ip-192.168.1.100');
    });
  });

  describe('throwThrottlingException', () => {
    it('should log warning and throw structured 429 AppException', () => {
      const mockContext = {} as ExecutionContext;
      const limitDetail: ThrottlerLimitDetail = {
        tracker: 'session-sess-12345',
        limit: 10,
        ttl: 1000,
        totalHits: 11,
        timeToBlock: 1000,
      };

      expect(() => {
        // @ts-expect-error accessing protected method for testing
        guard.throwThrottlingException(mockContext, limitDetail);
      }).toThrow(AppException);

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'Rate limit exceeded for client tracker',
        expect.objectContaining({
          event: 'business_rule_failed',
          operation: 'AppThrottlerGuard',
        }),
      );

      try {
        // @ts-expect-error accessing protected method for testing
        guard.throwThrottlingException(mockContext, limitDetail);
      } catch (err) {
        const appErr = err as AppException;
        expect(appErr.status).toBe(HttpStatus.TOO_MANY_REQUESTS);
        expect(appErr.errorCode).toBe('PIPELINE_SERVICE_04_0429');
      }
    });
  });
});
