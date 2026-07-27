import type { IAppLogger, IAppLoggerContext } from './interfaces';

export type LogMethod = (
  message: unknown,
  ...optionalParams: unknown[]
) => void;

export interface ILoggerEngine {
  log?: LogMethod;
  info?: LogMethod;
  debug?: LogMethod;
  error?: LogMethod;
  warn?: LogMethod;
  fatal?: LogMethod;
}

export class AppLogger implements IAppLogger {
  constructor(private readonly logger: ILoggerEngine = console) {}

  private sanitize(context?: IAppLoggerContext): IAppLoggerContext | undefined {
    if (!context) {
      return undefined;
    }
    // Deep redaction / censorship logic can be applied here
    return context;
  }

  public info(message: string, context?: IAppLoggerContext): void {
    const payload = { msg: message, context: this.sanitize(context) };
    if (typeof this.logger.info === 'function') {
      this.logger.info(payload);
    } else if (typeof this.logger.log === 'function') {
      this.logger.log(payload);
    }
  }

  public error(
    message: string,
    context?: IAppLoggerContext,
    stack?: string,
  ): void {
    const payload = { msg: message, stack, context: this.sanitize(context) };
    if (typeof this.logger.error === 'function') {
      this.logger.error(payload);
    }
  }

  public warn(message: string, context?: IAppLoggerContext): void {
    const payload = { msg: message, context: this.sanitize(context) };
    if (typeof this.logger.warn === 'function') {
      this.logger.warn(payload);
    }
  }

  public debug(message: string, context?: IAppLoggerContext): void {
    const payload = { msg: message, context: this.sanitize(context) };
    if (typeof this.logger.debug === 'function') {
      this.logger.debug(payload);
    }
  }

  public verbose(message: string, context?: IAppLoggerContext): void {
    this.debug(message, context);
  }

  public fatal(message: string, context?: IAppLoggerContext): void {
    const payload = {
      msg: `[FATAL] ${message}`,
      context: this.sanitize(context),
    };
    if (typeof this.logger.fatal === 'function') {
      this.logger.fatal(payload);
    } else if (typeof this.logger.error === 'function') {
      this.logger.error(payload);
    }
  }
}
