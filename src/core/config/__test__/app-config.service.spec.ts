import type { ConfigService } from '@nestjs/config';

import { AppConfigService } from '../app-config.service';
import type { EnvironmentConfig } from '../env.schema';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let mockConfigService: jest.Mocked<Partial<ConfigService<EnvironmentConfig, true>>>;

  beforeEach(() => {
    mockConfigService = {
      get: jest.fn().mockImplementation((key: keyof EnvironmentConfig) => {
        const mockValues: EnvironmentConfig = {
          NODE_ENV: 'test',
          PORT: 5438,
          SYSTEM_CODE: 'TEST_SERVICE',
        };
        return mockValues[key];
      }),
    };

    service = new AppConfigService(
      mockConfigService as ConfigService<EnvironmentConfig, true>,
    );
  });

  it('should return nodeEnv from ConfigService', () => {
    expect(service.nodeEnv).toBe('test');
    expect(mockConfigService.get).toHaveBeenCalledWith('NODE_ENV', { infer: true });
  });

  it('should return port from ConfigService', () => {
    expect(service.port).toBe(5438);
    expect(mockConfigService.get).toHaveBeenCalledWith('PORT', { infer: true });
  });

  it('should return systemCode from ConfigService', () => {
    expect(service.systemCode).toBe('TEST_SERVICE');
    expect(mockConfigService.get).toHaveBeenCalledWith('SYSTEM_CODE', { infer: true });
  });
});
