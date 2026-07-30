import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';

import { THROTTLER_CONFIG } from '../constants';
import { AppThrottlerGuard } from './app-throttler.guard';

@Global()
@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: THROTTLER_CONFIG,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppThrottlerGuard,
    },
  ],
  exports: [ThrottlerModule],
})
export class RateLimiterModule {}
