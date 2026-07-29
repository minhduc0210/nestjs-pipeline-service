import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { TraceabilityMiddleware } from './traceability.middleware';

@Module({
  imports: [ClsModule],
  providers: [TraceabilityMiddleware],
  exports: [TraceabilityMiddleware],
})
export class TraceabilityModule {}
