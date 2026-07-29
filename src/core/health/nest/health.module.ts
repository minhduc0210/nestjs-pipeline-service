import { Module } from '@nestjs/common';

import { HEALTH_READINESS_CHECKS } from '../constants';
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
export class HealthModule {}
