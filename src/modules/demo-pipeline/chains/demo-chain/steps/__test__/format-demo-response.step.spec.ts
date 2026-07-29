import type { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import type { IDemoContext } from '../../context';
import { formatDemoResponseStep } from '../format-demo-response.step';

describe('formatDemoResponseStep', () => {
  let mockLogger: jest.Mocked<Partial<AppLoggerService>>;

  beforeEach(() => {
    mockLogger = {
      info: jest.fn(),
    };
  });

  it('should format finalResponse object correctly', async () => {
    const context = {
      appLogger: mockLogger as AppLoggerService,
      requestParams: { title: 'monthly report', items: [10, 20] },
      computedSum: 30,
      computedAverage: 15,
    } as IDemoContext;

    const result = await formatDemoResponseStep.handle(context);

    expect(result.finalResponse).toBeDefined();
    expect(result.finalResponse?.processedTitle).toBe(
      'Processed: MONTHLY REPORT',
    );
    expect(result.finalResponse?.sum).toBe(30);
    expect(result.finalResponse?.average).toBe(15);
    expect(result.finalResponse?.timestamp).toBeDefined();
  });

  it('should handle zero default fallbacks if sum or average are undefined', async () => {
    const context = {
      appLogger: mockLogger as AppLoggerService,
      requestParams: { title: 'test', items: [] },
    } as IDemoContext;

    const result = await formatDemoResponseStep.handle(context);

    expect(result.finalResponse?.sum).toBe(0);
    expect(result.finalResponse?.average).toBe(0);
  });
});
