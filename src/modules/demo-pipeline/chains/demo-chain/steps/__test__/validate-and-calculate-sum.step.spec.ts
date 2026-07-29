import type { ErrorFactoryService } from 'src/core/errors/nest/error-factory.service';
import type { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import type { IDemoContext } from '../../context';
import { validateAndCalculateSumStep } from '../validate-and-calculate-sum.step';

describe('validateAndCalculateSumStep', () => {
  let mockLogger: jest.Mocked<Partial<AppLoggerService>>;
  let mockErrorFactory: jest.Mocked<Partial<ErrorFactoryService>>;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    mockErrorFactory = {
      createDefaultError: jest.fn().mockImplementation((key: string) => {
        const error = new Error(`Error: ${key}`) as any;
        error.withRawErrorMessage = jest.fn().mockReturnValue(error);
        return error;
      }),
    };
  });

  it('should throw MISSING_REQUIRED_FIELD error if title is missing or invalid', async () => {
    const context = {
      appLogger: mockLogger as AppLoggerService,
      errorFactory: mockErrorFactory as ErrorFactoryService,
      requestParams: { title: '', items: [10, 20] },
    } as IDemoContext;

    await expect(
      validateAndCalculateSumStep.handle(context),
    ).rejects.toThrow();
    expect(mockErrorFactory.createDefaultError).toHaveBeenCalledWith(
      'MISSING_REQUIRED_FIELD',
    );
  });

  it('should throw BAD_REQUEST error if items array contains non-numbers', async () => {
    const context = {
      appLogger: mockLogger as AppLoggerService,
      errorFactory: mockErrorFactory as ErrorFactoryService,
      requestParams: { title: 'Valid Title', items: [10, 'invalid' as any] },
    } as IDemoContext;

    await expect(
      validateAndCalculateSumStep.handle(context),
    ).rejects.toThrow();
    expect(mockErrorFactory.createDefaultError).toHaveBeenCalledWith(
      'BAD_REQUEST',
    );
  });

  it('should calculate sum and average correctly for valid inputs', async () => {
    const context = {
      appLogger: mockLogger as AppLoggerService,
      errorFactory: mockErrorFactory as ErrorFactoryService,
      requestParams: { title: 'Valid Title', items: [10, 20, 30, 40] },
    } as IDemoContext;

    const result = await validateAndCalculateSumStep.handle(context);

    expect(result.computedSum).toBe(100);
    expect(result.computedAverage).toBe(25);
    expect(mockLogger.info).toHaveBeenCalled();
  });
});
