import type { ErrorFactoryService } from 'src/core/errors/nest/error-factory.service';
import type { AppLoggerService } from 'src/core/logging/nest/app-logger.service';

import type {
  DemoRequestDto,
  DemoResponseDto,
} from '../../dto/demo-pipeline.dto';

export interface IDemoContext {
  appLogger: AppLoggerService;
  errorFactory: ErrorFactoryService;
  requestParams: DemoRequestDto;
  computedSum?: number;
  computedAverage?: number;
  finalResponse?: DemoResponseDto;
}
