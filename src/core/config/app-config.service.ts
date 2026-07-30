import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { EnvironmentConfig } from './env.schema';

@Injectable()
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentConfig, true>,
  ) {}

  public get nodeEnv(): 'development' | 'production' | 'test' {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  public get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  public get systemCode(): string {
    return this.configService.get('SYSTEM_CODE', { infer: true });
  }
}
