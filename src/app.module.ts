import { Module } from '@nestjs/common';
import { AppLoggerModule } from 'src/core/logging/nest/app-logger.module';
import { DemoPipelineModule } from 'src/modules/demo-pipeline/demo-pipeline.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AppLoggerModule, DemoPipelineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
