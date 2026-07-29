import { Test, type TestingModule } from '@nestjs/testing';

import type { DemoRequestDto, DemoResponseDto } from './dto/demo-pipeline.dto';
import { DemoPipelineController } from './demo-pipeline.controller';
import { DemoPipelineService } from './demo-pipeline.service';

describe('DemoPipelineController', () => {
  let controller: DemoPipelineController;
  let mockService: jest.Mocked<Partial<DemoPipelineService>>;

  beforeEach(async () => {
    mockService = {
      executePipeline: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DemoPipelineController],
      providers: [
        { provide: DemoPipelineService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<DemoPipelineController>(DemoPipelineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should delegate processPayload to service.executePipeline', async () => {
    const dto: DemoRequestDto = {
      title: 'test payload',
      items: [5, 15],
    };

    const expectedResponse: DemoResponseDto = {
      processedTitle: 'Processed: TEST PAYLOAD',
      sum: 20,
      average: 10,
      timestamp: '2026-07-28T00:00:00.000Z',
    };

    mockService.executePipeline?.mockResolvedValue(expectedResponse);

    const response = await controller.processPayload(dto);

    expect(mockService.executePipeline).toHaveBeenCalledWith(dto);
    expect(response).toEqual(expectedResponse);
  });
});
