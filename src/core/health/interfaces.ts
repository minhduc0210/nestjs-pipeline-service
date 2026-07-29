export type ReadinessCheckStatus = 'ok' | 'error';

export interface IHealthCheckResult {
  status: ReadinessCheckStatus;
  timestamp?: string;
  checks?: Record<string, ReadinessCheckStatus>;
  message?: string;
}

export interface IReadinessCheck {
  name: string;
  check(): Promise<ReadinessCheckStatus> | ReadinessCheckStatus;
}

export interface ILivenessResponse {
  status: 'ok';
  timestamp: string;
}

export interface IReadinessResponse {
  result: IHealthCheckResult;
  statusCode: number;
}

export interface HealthModuleOptions {
  path?: string;
  checks?: IReadinessCheck[];
}
