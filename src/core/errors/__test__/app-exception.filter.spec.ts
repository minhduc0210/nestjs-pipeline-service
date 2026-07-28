import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';

import { AppException } from '../core/app-exception';
import { AppExceptionFilter } from '../nest/app-exception.filter';

describe('AppExceptionFilter', () => {
  let filter: AppExceptionFilter;
  let mockResponse: Partial<Response>;
  let mockArgumentsHost: ArgumentsHost;

  beforeEach(() => {
    filter = new AppExceptionFilter();

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    mockArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getResponse: () => mockResponse,
        getRequest: () => ({}),
      }),
    } as unknown as ArgumentsHost;
  });

  it('should catch AppException and format HTTP JSON response', () => {
    const exception = new AppException(
      HttpStatus.UNPROCESSABLE_ENTITY,
      'SYS_04_0006',
      'Business violation',
    )
      .withRawErrorMessage('Detailed raw error')
      .withErrorData('Error data payload');

    filter.catch(exception, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errorCode: 'SYS_04_0006',
        message: 'Business violation',
        rawErrorMessage: 'Detailed raw error',
        errorData: 'Error data payload',
        timestamp: expect.any(String),
      }),
    );
  });

  it('should handle raw Error instance', () => {
    const rawError = new Error('Database connection failed');

    filter.catch(rawError, mockArgumentsHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errorCode: 'INTERNAL_SERVER_ERROR',
        rawErrorMessage: 'Database connection failed',
      }),
    );
  });
});
