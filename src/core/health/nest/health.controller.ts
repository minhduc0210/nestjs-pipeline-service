import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import type { Response } from 'express';

import type { IHealthCheckResult, ILivenessResponse } from '../interfaces';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @HttpCode(HttpStatus.OK)
  public async live(): Promise<ILivenessResponse> {
    return this.healthService.getLiveness();
  }

  @Get('ready')
  @HttpCode(HttpStatus.OK)
  public async ready(
    @Res({ passthrough: true }) res: Response,
  ): Promise<IHealthCheckResult> {
    const { result, statusCode } = await this.healthService.getReadiness();
    res.status(statusCode);
    return result;
  }
}
