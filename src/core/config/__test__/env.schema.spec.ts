import { AppException } from '../../errors/core/app-exception';
import { validateEnv } from '../env.schema';

describe('env.schema & validateEnv', () => {
  it('should validate and parse valid environment configuration', () => {
    const rawConfig = {
      NODE_ENV: 'production',
      PORT: '5438',
      SYSTEM_CODE: 'INITIAL_BOOKING',
    };

    const validated = validateEnv(rawConfig);

    expect(validated.NODE_ENV).toBe('production');
    expect(validated.PORT).toBe(5438);
    expect(validated.SYSTEM_CODE).toBe('INITIAL_BOOKING');
  });

  it('should apply default values if optional keys are omitted', () => {
    const rawConfig = {};

    const validated = validateEnv(rawConfig);

    expect(validated.NODE_ENV).toBe('development');
    expect(validated.PORT).toBe(3000);
    expect(validated.SYSTEM_CODE).toBe('PIPELINE_SERVICE');
  });

  it('should throw AppException if PORT is not a valid number', () => {
    const rawConfig = {
      PORT: 'HEHE',
    };

    expect(() => validateEnv(rawConfig)).toThrow(AppException);
  });

  it('should throw AppException if SYSTEM_CODE contains invalid characters or array literal', () => {
    const rawConfig = {
      SYSTEM_CODE: "['leuleu', 'hihi']",
    };

    expect(() => validateEnv(rawConfig)).toThrow(AppException);
  });

  it('should throw AppException if NODE_ENV is not an allowed enum value', () => {
    const rawConfig = {
      NODE_ENV: 'staging',
    };

    expect(() => validateEnv(rawConfig)).toThrow(AppException);
  });
});
