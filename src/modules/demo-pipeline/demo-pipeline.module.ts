import { Module } from '@nestjs/common';

import { DemoPipelineController } from './demo-pipeline.controller';
import { DemoPipelineService } from './demo-pipeline.service';

@Module({
  imports: [],
  controllers: [DemoPipelineController],
  providers: [DemoPipelineService],
})
export class DemoPipelineModule {}
