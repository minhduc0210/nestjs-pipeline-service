import { createConfigReadinessCheck } from '../core/readiness-checks';

describe('createConfigReadinessCheck', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('should return ok when all required env variables are defined and non-empty', () => {
    process.env.TEST_REQUIRED_KEY_1 = 'valid-value-1';
    process.env.TEST_REQUIRED_KEY_2 = 'valid-value-2';

    const check = createConfigReadinessCheck([
      'TEST_REQUIRED_KEY_1',
      'TEST_REQUIRED_KEY_2',
    ]);

    expect(check.name).toBe('config');
    expect(check.check()).toBe('ok');
  });

  it('should return error if any required env variable is missing or empty string', () => {
    process.env.TEST_REQUIRED_KEY_1 = 'valid-value-1';
    delete process.env.TEST_REQUIRED_KEY_2;

    const check = createConfigReadinessCheck([
      'TEST_REQUIRED_KEY_1',
      'TEST_REQUIRED_KEY_2',
    ]);

    expect(check.check()).toBe('error');

    process.env.TEST_REQUIRED_KEY_2 = '   ';
    expect(check.check()).toBe('error');
  });
});
