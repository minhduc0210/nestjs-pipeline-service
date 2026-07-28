import { AppLogger, type ILoggerEngine } from '../core/app-logger';
import { LogContextEvent } from '../core/interfaces';

describe('AppLogger (Core)', () => {
  let mockEngine: jest.Mocked<ILoggerEngine>;
  let logger: AppLogger;

  beforeEach(() => {
    mockEngine = {
      info: jest.fn(),
      error: jest.fn(),
      warn: jest.fn(),
      debug: jest.fn(),
      fatal: jest.fn(),
      log: jest.fn(),
    };
    logger = new AppLogger(mockEngine);
  });

  it('should format info log payload correctly', () => {
    logger.info('Test info message', {
      event: LogContextEvent.API_RESPONSE_SENT,
      operation: 'testOperation',
    });

    expect(mockEngine.info).toHaveBeenCalledWith({
      msg: 'Test info message',
      context: {
        event: LogContextEvent.API_RESPONSE_SENT,
        operation: 'testOperation',
      },
    });
  });

  it('should format error log payload with stack trace', () => {
    logger.error(
      'Test error message',
      {
        event: LogContextEvent.UNHANDLED_EXCEPTION,
        operation: 'testOperation',
      },
      'Error: Stack trace details',
    );

    expect(mockEngine.error).toHaveBeenCalledWith({
      msg: 'Test error message',
      stack: 'Error: Stack trace details',
      context: {
        event: LogContextEvent.UNHANDLED_EXCEPTION,
        operation: 'testOperation',
      },
    });
  });

  it('should format warn, debug, verbose, and fatal logs', () => {
    logger.warn('Warn msg');
    expect(mockEngine.warn).toHaveBeenCalledWith({
      msg: 'Warn msg',
      context: undefined,
    });

    logger.debug('Debug msg');
    expect(mockEngine.debug).toHaveBeenCalledWith({
      msg: 'Debug msg',
      context: undefined,
    });

    logger.verbose('Verbose msg');
    expect(mockEngine.debug).toHaveBeenCalledWith({
      msg: 'Verbose msg',
      context: undefined,
    });

    logger.fatal('Fatal msg');
    expect(mockEngine.fatal).toHaveBeenCalledWith({
      msg: '[FATAL] Fatal msg',
      context: undefined,
    });
  });

  it('should fallback to log() if info() or fatal() is missing on engine', () => {
    const fallbackEngine: ILoggerEngine = {
      log: jest.fn(),
      error: jest.fn(),
    };
    const fallbackLogger = new AppLogger(fallbackEngine);

    fallbackLogger.info('Fallback info');
    expect(fallbackEngine.log).toHaveBeenCalledWith({
      msg: 'Fallback info',
      context: undefined,
    });

    fallbackLogger.fatal('Fallback fatal');
    expect(fallbackEngine.error).toHaveBeenCalledWith({
      msg: '[FATAL] Fallback fatal',
      context: undefined,
    });
  });
});
