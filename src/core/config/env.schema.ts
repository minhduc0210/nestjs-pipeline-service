import { HttpStatus } from '@nestjs/common';
import { z } from 'zod';

import { ErrorCategory } from '../errors/core/error-category.enum';
import { ErrorFactoryService } from '../errors/nest/error-factory.service';
import { AppLogger, LogContextEvent } from '../logging';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce
    .number({ error: 'Port must be a valid numeric port number' })
    .min(1)
    .max(65535)
    .default(3000),
  SYSTEM_CODE: z
    .string({ error: 'System code must be a string' })
    .min(1)
    .regex(/^[A-Z0-9_]+$/, {
      message:
        'SYSTEM_CODE must contain only uppercase letters, numbers, and underscores (e.g. PIPELINE_SERVICE)',
    })
    .default('PIPELINE_SERVICE'),
});

export type EnvironmentConfig = z.infer<typeof envSchema>;

export function validateEnv(
  config: Record<string, unknown>,
): EnvironmentConfig {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    const systemCode =
      typeof config['SYSTEM_CODE'] === 'string' &&
      config['SYSTEM_CODE'].trim().length > 0
        ? config['SYSTEM_CODE']
        : 'PIPELINE_SERVICE';
    const appLogger = new AppLogger(console);
    const errorFactory = new ErrorFactoryService(systemCode);
    const formattedIssues = result.error.issues
      .map((issue) => `${issue.path.join('.') || 'config'}: ${issue.message}`)
      .join('; ');

    appLogger.error(
      `Environment configuration validation failed: ${formattedIssues}`,
      {
        event: LogContextEvent.UNHANDLED_EXCEPTION,
        operation: 'validateEnv',
      },
    );
    throw errorFactory
      .createError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ErrorCategory.SERVER,
        5,
        'Environment configuration validation failed',
      )
      .withRawErrorMessage(formattedIssues);
  }
  return result.data;
}
