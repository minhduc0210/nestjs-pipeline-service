import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';

import { AppException } from '../core/app-exception';

@Catch()
export class AppExceptionFilter implements ExceptionFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let message = 'An unexpected error occurred';
    let rawErrorMessage: string | undefined;
    let errorData: string | undefined;
    let context: Record<string, unknown> | undefined;

    if (exception instanceof AppException) {
      status = exception.getStatus();
      errorCode = exception.errorCode;
      message = exception.message;
      rawErrorMessage = exception.rawErrorMessage;
      errorData = exception.errorData;
      context = exception.context;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      rawErrorMessage = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      errorCode,
      message,
      ...(rawErrorMessage ? { rawErrorMessage } : {}),
      ...(errorData ? { errorData } : {}),
      ...(context ? { context } : {}),
      timestamp: new Date().toISOString(),
    });
  }
}
