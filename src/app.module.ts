import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppExceptionFilter } from './core/errors/nest/app-exception.filter';
import { ErrorFactoryModule } from './core/errors/nest/error-factory.module';
import { AppLoggerModule } from './core/logging/nest/app-logger.module';
import { TraceabilityMiddleware } from './core/traceability/traceability.middleware';
import { TraceabilityModule } from './core/traceability/traceability.module';
import { DemoPipelineModule } from './modules/demo-pipeline/demo-pipeline.module';

@Module({
  imports: [
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AppLoggerModule,
    TraceabilityModule,
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
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(TraceabilityMiddleware).forRoutes('*');
  }
}
