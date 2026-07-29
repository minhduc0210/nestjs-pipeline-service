import { Injectable, type NestMiddleware } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { NextFunction, Request, Response } from 'express';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class TraceabilityMiddleware implements NestMiddleware {
  constructor(private readonly clsService: ClsService) {}

  public use(req: Request, res: Response, next: NextFunction): void {
    const rawCorrelationId = req.headers['x-correlation-id'];
    const rawRequestId = req.headers['x-request-id'];

    const correlationId = this.extractOrGenerateId(
      Array.isArray(rawCorrelationId) ? rawCorrelationId[0] : rawCorrelationId,
      'corr',
    );

    const requestId = this.extractOrGenerateId(
      Array.isArray(rawRequestId) ? rawRequestId[0] : rawRequestId,
      'req',
    );

    this.clsService.set('correlationId', correlationId);
    this.clsService.set('requestId', requestId);

    res.setHeader('X-Correlation-ID', correlationId);
    res.setHeader('X-Request-ID', requestId);

    next();
  }

  private extractOrGenerateId(
    headerValue: string | undefined,
    prefix: string,
  ): string {
    if (
      headerValue &&
      headerValue.trim().length > 0 &&
      headerValue.length <= 100
    ) {
      return headerValue.trim();
    }
    const randomHex = randomUUID();
    return `${prefix}-${randomHex}`;
  }
}
