import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppLoggerModule } from 'src/core/logging/nest/app-logger.module';
import { DemoPipelineModule } from 'src/modules/demo-pipeline/demo-pipeline.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppExceptionFilter } from './core/errors/nest/app-exception.filter';
import { ErrorFactoryModule } from './core/errors/nest/error-factory.module';

@Module({
  imports: [
    AppLoggerModule,
    DemoPipelineModule,
    ErrorFactoryModule.forRoot('PIPELINE_SERVICE'),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionFilter,
    },
  ],
})
export class AppModule {}
