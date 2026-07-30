import { type ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {
  ThrottlerGuard,
  type ThrottlerLimitDetail,
  type ThrottlerModuleOptions,
  type ThrottlerStorage,
} from '@nestjs/throttler';

import { AppException } from '../../errors/core/app-exception';
import { LogContextEvent } from '../../logging/core/interfaces';
import { AppLoggerService } from '../../logging/nest/app-logger.service';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  constructor(
    options: ThrottlerModuleOptions,
    storageService: ThrottlerStorage,
    reflector: Reflector,
    private readonly appLogger: AppLoggerService,
  ) {
    super(options, storageService, reflector);
  }

  protected override getTracker(req: Record<string, unknown>): Promise<string> {
    const headers = (req.headers || {}) as Record<string, unknown>;
    const sessionId = headers['x-session-id'];
    const userId = headers['x-user-id'];

    if (
      sessionId &&
      typeof sessionId === 'string' &&
      sessionId.trim().length > 0
    ) {
      return Promise.resolve(`session-${sessionId.trim()}`);
    }

    if (userId && typeof userId === 'string' && userId.trim().length > 0) {
      return Promise.resolve(`user-${userId.trim()}`);
    }

    const rawIp =
      typeof req.ip === 'string' ? req.ip : headers['x-forwarded-for'];
    const ip = Array.isArray(rawIp)
      ? String(rawIp[0] ?? '127.0.0.1')
      : typeof rawIp === 'string'
        ? rawIp
        : '127.0.0.1';

    return Promise.resolve(`ip-${ip}`);
  }

  protected override throwThrottlingException(
    _context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    this.appLogger.warn('Rate limit exceeded for client tracker', {
      event: LogContextEvent.BUSINESS_RULE_FAILED,
      operation: 'AppThrottlerGuard',
      diagnostics: {
        debug: {
          tracker: throttlerLimitDetail.tracker,
          limit: throttlerLimitDetail.limit,
          ttl: throttlerLimitDetail.ttl,
        },
      },
    });

    const limitStr = String(throttlerLimitDetail.limit);
    const ttlStr = String(throttlerLimitDetail.ttl);

    throw new AppException(
      HttpStatus.TOO_MANY_REQUESTS,
      'PIPELINE_SERVICE_04_0429',
      'Rate limit exceeded. Please try again later.',
    ).withRawErrorMessage(
      `Exceeded limit of ${limitStr} requests per ${ttlStr}ms for tracker ${throttlerLimitDetail.tracker}`,
    );
  }
}
