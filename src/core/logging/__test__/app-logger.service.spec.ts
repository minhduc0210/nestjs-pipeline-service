import type { ClsService } from 'nestjs-cls';

import { LogContextEvent } from '../core/interfaces';
import { AppLoggerService } from '../nest/app-logger.service';

describe('AppLoggerService (NestJS Injectable)', () => {
  let mockCls: jest.Mocked<Partial<ClsService>>;
  let loggerService: AppLoggerService;

  beforeEach(() => {
    mockCls = {
      get: jest.fn().mockReturnValue('req-uuid-9999'),
    };
    loggerService = new AppLoggerService(mockCls as ClsService);
  });

  it('should enrich log context with requestId and ISO timestamp', () => {
    const infoSpy = jest.spyOn(console, 'info').mockImplementation();

    loggerService.info('Nest Service Info', {
      event: LogContextEvent.THIRD_PARTY_CALL_STARTED,
      operation: 'nestOp',
    });

    expect(infoSpy).toHaveBeenCalled();
    const payload = infoSpy.mock.calls[0][0] as {
      msg: string;
      context: { requestId?: string; timestamp?: string };
    };

    expect(payload.msg).toBe('Nest Service Info');
    expect(payload.context.requestId).toBe('req-uuid-9999');
    expect(payload.context.timestamp).toBeDefined();

    infoSpy.mockRestore();
  });

  it('should delegate all log levels correctly on AppLoggerService', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation();

    loggerService.warn('Warn');
    expect(warnSpy).toHaveBeenCalled();

    loggerService.error('Error');
    expect(errorSpy).toHaveBeenCalled();

    loggerService.debug('Debug');
    expect(debugSpy).toHaveBeenCalled();

    loggerService.verbose('Verbose');
    expect(debugSpy).toHaveBeenCalled();

    loggerService.fatal('Fatal');
    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
    warnSpy.mockRestore();
    debugSpy.mockRestore();
  });
});
