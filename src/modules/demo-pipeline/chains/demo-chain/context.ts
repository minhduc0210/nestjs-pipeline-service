import type { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import type {
  DemoRequestDto,
  DemoResponseDto,
} from '../../dto/demo-pipeline.dto';

export interface IDemoContext {
  appLogger: AppLoggerService;
  requestParams: DemoRequestDto;
  computedSum?: number;
  computedAverage?: number;
  finalResponse?: DemoResponseDto;
}
