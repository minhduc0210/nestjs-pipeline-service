import { Global, Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { AppLoggerService } from './app-logger.service';

@Global()
@Module({
  imports: [ClsModule],
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
