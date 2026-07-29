import { type DynamicModule, Module } from '@nestjs/common';

import { HEALTH_READINESS_CHECKS } from '../constants';
import type { HealthModuleOptions } from '../interfaces';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

@Module({
  controllers: [HealthController],
  providers: [
    {
      provide: HEALTH_READINESS_CHECKS,
      useValue: [],
    },
    HealthService,
  ],
  exports: [HealthService],
})
export class HealthModule {
  public static forRoot(options: HealthModuleOptions = {}): DynamicModule {
    const checks = options.checks ?? [];

    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [
        {
          provide: HEALTH_READINESS_CHECKS,
          useValue: checks,
        },
        HealthService,
      ],
      exports: [HealthService],
    };
  }
}
