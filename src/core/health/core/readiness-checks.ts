import { REQUIRED_ENV_KEYS } from '../constants';
import type { IReadinessCheck, ReadinessCheckStatus } from '../interfaces';

export function createConfigReadinessCheck(
  requiredEnvKeys: readonly string[],
): IReadinessCheck {
  return {
    name: 'config',
    check(): ReadinessCheckStatus {
      const missingKeys = requiredEnvKeys.filter((key: string) => {
        const val = process.env[key];
        return typeof val !== 'string' || val.trim().length === 0;
      });

      return missingKeys.length === 0 ? 'ok' : 'error';
    },
  };
}

export function createReadinessChecks(): IReadinessCheck[] {
  return [createConfigReadinessCheck(REQUIRED_ENV_KEYS)];
}
