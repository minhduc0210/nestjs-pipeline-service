import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiOperation,
  ApiProduces,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ApiStandardErrorResponse } from '../../core/swagger';
import { DemoPipelineService } from './demo-pipeline.service';
import { DemoRequestDto, DemoResponseDto } from './dto/demo-pipeline.dto';

@ApiTags('Demo Pipeline')
@ApiHeader({
  name: 'x-client-type',
  description:
    'Optional client channel identifier (e.g. WEB, MOBILE_IOS, MOBILE_ANDROID)',
  required: false,
  example: 'WEB',
})
@Controller('demo-pipeline')
export class DemoPipelineController {
  constructor(private readonly demoPipelineService: DemoPipelineService) {}

  @Post('process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Execute Data Processing Pipeline',
    description:
      'Executes a multi-step design pattern pipeline: validates input array, calculates sum & average, formats upper-case title, and returns result statistics.',
  })
  @ApiConsumes('application/json')
  @ApiProduces('application/json')
  @ApiBody({
    type: DemoRequestDto,
    description: 'Request payload containing pipeline title and numbers array',
    examples: {
      salesPipeline: {
        summary: 'Quarterly Sales Pipeline Example',
        value: {
          title: 'Quarterly Revenue Totals',
          items: [150, 300, 450],
        },
      },
      basicSum: {
        summary: 'Basic Integers Sum Example',
        value: {
          title: 'Basic Numbers',
          items: [10, 20, 30],
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Pipeline processing executed successfully',
    type: DemoResponseDto,
    examples: {
      successOutput: {
        summary: 'Pipeline Processing Statistics Result',
        value: {
          processedTitle: 'QUARTERLY REVENUE TOTALS',
          sum: 900,
          average: 300,
          timestamp: '2026-08-03T15:00:00.000Z',
        },
      },
    },
  })
  @ApiStandardErrorResponse(
    HttpStatus.BAD_REQUEST,
    'Invalid request payload, empty items array, or malformed data',
  )
  @ApiStandardErrorResponse(
    HttpStatus.TOO_MANY_REQUESTS,
    'Rate limit threshold exceeded for client IP or Session ID',
  )
  public async processPayload(
    @Body() dto: DemoRequestDto,
  ): Promise<DemoResponseDto> {
    return this.demoPipelineService.executePipeline(dto);
  }
}
