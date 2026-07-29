import type { IReadinessCheck } from '../interfaces';
import { HealthService } from '../nest/health.service';

describe('HealthService', () => {
  it('should return liveness response with status ok', async () => {
    const service = new HealthService([]);
    const liveness = await service.getLiveness();

    expect(liveness.status).toBe('ok');
    expect(liveness.timestamp).toBeDefined();
  });

  it('should return readiness 200 OK when all checks pass', async () => {
    const mockCheck1: IReadinessCheck = {
      name: 'database',
      check: jest.fn().mockResolvedValue('ok'),
    };
    const mockCheck2: IReadinessCheck = {
      name: 'redis',
      check: jest.fn().mockReturnValue('ok'),
    };

    const service = new HealthService([mockCheck1, mockCheck2]);
    const { result, statusCode } = await service.getReadiness();

    expect(statusCode).toBe(200);
    expect(result.status).toBe('ok');
    expect(result.checks).toEqual({
      database: 'ok',
      redis: 'ok',
    });
  });

  it('should return readiness 503 Service Unavailable when a check fails or throws', async () => {
    const mockCheck1: IReadinessCheck = {
      name: 'database',
      check: jest.fn().mockResolvedValue('ok'),
    };
    const mockCheck2: IReadinessCheck = {
      name: 'navitaireApi',
      check: jest.fn().mockRejectedValue(new Error('Connection timeout')),
    };

    const service = new HealthService([mockCheck1, mockCheck2]);
    const { result, statusCode } = await service.getReadiness();

    expect(statusCode).toBe(503);
    expect(result.status).toBe('error');
    expect(result.checks).toEqual({
      database: 'ok',
      navitaireApi: 'error',
    });
  });
});
