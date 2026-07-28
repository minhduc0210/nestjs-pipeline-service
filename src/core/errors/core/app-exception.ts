import { HttpException, type HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  public context?: Record<string, unknown>;
  public errorCode: string;
  public rawErrorMessage: string;
  public errorData: string;

  constructor(status: HttpStatus, errorCode: string, message: string) {
    super({ errorCode, message, timestamp: new Date().toISOString() }, status);
    this.errorCode = errorCode;
    this.message = message;
  }

  public withRawErrorMessage(rawErrorMessage: string): this {
    this.rawErrorMessage = rawErrorMessage;
    return this;
  }

  public withContext(context: Record<string, unknown>): this {
    this.context = context;
    return this;
  }
  public withErrorData(data: string): this {
    this.errorData = data;
    return this;
  }
}
