import { Injectable } from '@nestjs/common';
import { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import { demoPipelineChain } from './chains/demo-chain/chain';
import type { IDemoContext } from './chains/demo-chain/context';
import type { DemoRequestDto, DemoResponseDto } from './dto/demo-pipeline.dto';

@Injectable()
export class DemoPipelineService {
  constructor(private readonly appLogger: AppLoggerService) {}

  public async executePipeline(dto: DemoRequestDto): Promise<DemoResponseDto> {
    this.appLogger.info('Initializing Demo Pipeline execution');

    const context: IDemoContext = {
      appLogger: this.appLogger,
      requestParams: dto,
    };

    const result: IDemoContext = await demoPipelineChain.handle(context);

    if (!result.finalResponse) {
      throw new Error('Pipeline execution failed to produce a final response');
    }

    return result.finalResponse;
  }
}
