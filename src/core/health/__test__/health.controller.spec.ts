import type { Response } from 'express';

import { HealthController } from '../nest/health.controller';
import { HealthService } from '../nest/health.service';

describe('HealthController', () => {
  let mockHealthService: jest.Mocked<Partial<HealthService>>;
  let controller: HealthController;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockHealthService = {
      getLiveness: jest.fn().mockResolvedValue({
        status: 'ok',
        timestamp: '2026-07-29T00:00:00.000Z',
      }),
      getReadiness: jest.fn().mockResolvedValue({
        result: {
          status: 'ok',
          timestamp: '2026-07-29T00:00:00.000Z',
          checks: { db: 'ok' },
        },
        statusCode: 200,
      }),
    };

    controller = new HealthController(mockHealthService as HealthService);

    mockResponse = {
      status: jest.fn().mockReturnThis(),
    };
  });

  it('should handle live endpoint', async () => {
    const res = await controller.live();
    expect(res.status).toBe('ok');
    expect(mockHealthService.getLiveness).toHaveBeenCalled();
  });

  it('should handle ready endpoint and set response status code', async () => {
    const res = await controller.ready(mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(res.status).toBe('ok');
    expect(res.checks).toEqual({ db: 'ok' });
  });
});
