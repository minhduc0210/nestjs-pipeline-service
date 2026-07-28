import { type DynamicModule, Global, Module } from '@nestjs/common';

import {
  ErrorFactoryService,
  SYSTEM_CODE_TOKEN,
} from './error-factory.service';

@Global()
@Module({})
export class ErrorFactoryModule {
  public static forRoot(systemCode: string): DynamicModule {
    return {
      module: ErrorFactoryModule,
      providers: [
        {
          provide: SYSTEM_CODE_TOKEN,
          useValue: systemCode,
        },
        ErrorFactoryService,
      ],
      exports: [ErrorFactoryService],
    };
  }
}
