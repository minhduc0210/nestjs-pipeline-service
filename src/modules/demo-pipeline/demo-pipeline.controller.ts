import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

import { DemoPipelineService } from './demo-pipeline.service';
import { DemoRequestDto, DemoResponseDto } from './dto/demo-pipeline.dto';

@Controller('demo-pipeline')
export class DemoPipelineController {
  constructor(private readonly demoPipelineService: DemoPipelineService) {}

  @Post('process')
  @ApiBody({
    type: DemoRequestDto,
    examples: {
      example: {
        value: {
          title: 'string',
          items: [1, 2, 3],
        },
      },
    },
  })
  @ApiResponse({
    type: DemoResponseDto,
    examples: {
      example: {
        summary: 'Demo response',
        value: {
          processedTitle: 'string',
          sum: 6,
          average: 2,
          timestamp: '2026-08-03T05:28:35.187Z',
        },
      },
    },
  })
  @HttpCode(HttpStatus.OK)
  public async processPayload(
    @Body() dto: DemoRequestDto,
  ): Promise<DemoResponseDto> {
    return this.demoPipelineService.executePipeline(dto);
  }
}
