import type { NextFunction, Request, Response } from 'express';
import type { ClsService } from 'nestjs-cls';

import { TraceabilityMiddleware } from '../traceability.middleware';

describe('TraceabilityMiddleware', () => {
  let middleware: TraceabilityMiddleware;
  let mockClsService: jest.Mocked<Partial<ClsService>>;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockClsService = {
      set: jest.fn(),
    };

    middleware = new TraceabilityMiddleware(mockClsService as ClsService);

    mockReq = {
      headers: {},
    };

    mockRes = {
      setHeader: jest.fn().mockReturnThis(),
    };

    nextFunction = jest.fn();
  });

  it('should extract existing x-correlation-id and x-request-id headers', () => {
    mockReq.headers = {
      'x-correlation-id': 'custom-corr-123',
      'x-request-id': 'custom-req-456',
    };

    middleware.use(
      mockReq as Request,
      mockRes as Response,
      nextFunction,
    );

    expect(mockClsService.set).toHaveBeenCalledWith(
      'correlationId',
      'custom-corr-123',
    );
    expect(mockClsService.set).toHaveBeenCalledWith(
      'requestId',
      'custom-req-456',
    );
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'X-Correlation-ID',
      'custom-corr-123',
    );
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'X-Request-ID',
      'custom-req-456',
    );
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should generate fallback IDs if headers are missing', () => {
    mockReq.headers = {};

    middleware.use(
      mockReq as Request,
      mockRes as Response,
      nextFunction,
    );

    expect(mockClsService.set).toHaveBeenCalledWith(
      'correlationId',
      expect.stringMatching(/^corr-/),
    );
    expect(mockClsService.set).toHaveBeenCalledWith(
      'requestId',
      expect.stringMatching(/^req-/),
    );
    expect(nextFunction).toHaveBeenCalled();
  });
});
