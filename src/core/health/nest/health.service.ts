import { Inject, Injectable } from '@nestjs/common';

import { HEALTH_READINESS_CHECKS } from '../constants';
import type {
  IHealthCheckResult,
  ILivenessResponse,
  IReadinessCheck,
  IReadinessResponse,
  ReadinessCheckStatus,
} from '../interfaces';

@Injectable()
export class HealthService {
  constructor(
    @Inject(HEALTH_READINESS_CHECKS)
    private readonly readinessChecks: IReadinessCheck[],
  ) {}

  public async getLiveness(): Promise<ILivenessResponse> {
    await new Promise((resolve) => setImmediate(resolve));
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  public async getReadiness(): Promise<IReadinessResponse> {
    const checks: Record<string, ReadinessCheckStatus> = {};
    let allOk = true;

    for (const readinessCheck of this.readinessChecks) {
      try {
        const status: ReadinessCheckStatus = await readinessCheck.check();
        checks[readinessCheck.name] = status;
        if (status !== 'ok') {
          allOk = false;
        }
      } catch {
        checks[readinessCheck.name] = 'error';
        allOk = false;
      }
    }

    const overallStatus: ReadinessCheckStatus = allOk ? 'ok' : 'error';

    const result: IHealthCheckResult = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      checks,
    };

    return {
      result,
      statusCode: allOk ? 200 : 503,
    };
  }
}
