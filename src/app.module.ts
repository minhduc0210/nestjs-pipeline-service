import {
  type MiddlewareConsumer,
  Module,
  type NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { ClsModule } from 'nestjs-cls';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './core/config/app-config.module';
import { AppExceptionFilter } from './core/errors/nest/app-exception.filter';
import { ErrorFactoryModule } from './core/errors/nest/error-factory.module';
import { createReadinessChecks } from './core/health/core/readiness-checks';
import { HealthModule } from './core/health/nest/health.module';
import { AppLoggerModule } from './core/logging/nest/app-logger.module';
import { TraceabilityMiddleware } from './core/traceability/traceability.middleware';
import { TraceabilityModule } from './core/traceability/traceability.module';
import { DemoPipelineModule } from './modules/demo-pipeline/demo-pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AppLoggerModule,
    TraceabilityModule,
    DemoPipelineModule,
    HealthModule.forRoot({
      checks: createReadinessChecks(),
    }),
    ErrorFactoryModule.forRoot('PIPELINE_SERVICE'),
    AppConfigModule,
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
