import { Module } from '@nestjs/common';
import { AppLoggerModule } from 'src/core/logging';

import { DemoPipelineController } from './demo-pipeline.controller';
import { DemoPipelineService } from './demo-pipeline.service';

@Module({
  imports: [AppLoggerModule],
  controllers: [DemoPipelineController],
  providers: [DemoPipelineService],
  exports: [DemoPipelineModule],
})
export class DemoPipelineModule {}
