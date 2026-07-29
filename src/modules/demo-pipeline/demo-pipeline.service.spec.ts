import { Test, type TestingModule } from '@nestjs/testing';
import { ErrorFactoryService } from 'src/core/errors/nest/error-factory.service';
import { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import type { DemoRequestDto } from './dto/demo-pipeline.dto';
import { DemoPipelineService } from './demo-pipeline.service';

describe('DemoPipelineService', () => {
  let service: DemoPipelineService;
  let mockAppLogger: jest.Mocked<Partial<AppLoggerService>>;
  let mockErrorFactory: jest.Mocked<Partial<ErrorFactoryService>>;

  beforeEach(async () => {
    mockAppLogger = {
      info: jest.fn(),
      error: jest.fn(),
    };

    mockErrorFactory = {
      createDefaultError: jest.fn(),
      createError: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DemoPipelineService,
        { provide: AppLoggerService, useValue: mockAppLogger },
        { provide: ErrorFactoryService, useValue: mockErrorFactory },
      ],
    }).compile();

    service = module.get<DemoPipelineService>(DemoPipelineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should execute pipeline chain and return finalResponse', async () => {
    const dto: DemoRequestDto = {
      title: 'annual sales',
      items: [100, 200, 300],
    };

    const result = await service.executePipeline(dto);

    expect(result.processedTitle).toBe('Processed: ANNUAL SALES');
    expect(result.sum).toBe(600);
    expect(result.average).toBe(200);
    expect(mockAppLogger.info).toHaveBeenCalledWith(
      'Initializing Demo Pipeline execution',
    );
  });
});
