import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

import { AppLogger } from '../core/app-logger';
import type { IAppLogger, IAppLoggerContext } from '../core/interfaces';

@Injectable()
export class AppLoggerService implements IAppLogger {
  private readonly appLogger: AppLogger;

  constructor(private readonly clsService?: ClsService) {
    this.appLogger = new AppLogger(console);
  }

  private enrichContext(
    context?: IAppLoggerContext,
  ): IAppLoggerContext | undefined {
    if (!context) {
      return undefined;
    }

    const requestId: string | undefined =
      this.clsService?.get<string>('requestId');
    const correlationId: string | undefined =
      this.clsService?.get<string>('correlationId');

    return {
      ...context,
      requestId: context.requestId ?? requestId,
      correlationId: context.correlationId ?? correlationId,
      timestamp: new Date().toISOString(),
    };
  }

  public info(message: string, context?: IAppLoggerContext): void {
    this.appLogger.info(message, this.enrichContext(context));
  }

  public error(
    message: string,
    context?: IAppLoggerContext,
    stack?: string,
  ): void {
    this.appLogger.error(message, this.enrichContext(context), stack);
  }

  public warn(message: string, context?: IAppLoggerContext): void {
    this.appLogger.warn(message, this.enrichContext(context));
  }

  public debug(message: string, context?: IAppLoggerContext): void {
    this.appLogger.debug(message, this.enrichContext(context));
  }

  public verbose(message: string, context?: IAppLoggerContext): void {
    this.appLogger.verbose(message, this.enrichContext(context));
  }

  public fatal(message: string, context?: IAppLoggerContext): void {
    this.appLogger.fatal(message, this.enrichContext(context));
  }
}
