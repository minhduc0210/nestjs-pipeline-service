import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { DemoPipelineService } from './demo-pipeline.service';
import type { DemoRequestDto, DemoResponseDto } from './dto/demo-pipeline.dto';

@Controller('demo-pipeline')
export class DemoPipelineController {
  constructor(private readonly demoPipelineService: DemoPipelineService) {}

  @Post('process')
  @HttpCode(HttpStatus.OK)
  public async processPayload(
    @Body() dto: DemoRequestDto,
  ): Promise<DemoResponseDto> {
    return this.demoPipelineService.executePipeline(dto);
  }
}
