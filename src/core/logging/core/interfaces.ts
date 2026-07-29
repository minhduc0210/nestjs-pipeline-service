export enum LogContextEvent {
  API_RESPONSE_SENT = 'api_response_sent',
  VALIDATION_FAILED = 'validation_failed',
  BUSINESS_RULE_FAILED = 'business_rule_failed',
  THIRD_PARTY_CALL_STARTED = 'third_party_call_started',
  THIRD_PARTY_CALL_COMPLETED = 'third_party_call_completed',
  THIRD_PARTY_CALL_FAILED = 'third_party_call_failed',
  THIRD_PARTY_RETRY_STARTED = 'third_party_retry_started',
  THIRD_PARTY_RETRY_EXHAUSTED = 'third_party_retry_exhausted',
  DOWNSTREAM_CALL_STARTED = 'downstream_call_started',
  DOWNSTREAM_CALL_COMPLETED = 'downstream_call_completed',
  DOWNSTREAM_CALL_FAILED = 'downstream_call_failed',
  DATABASE_QUERY_FAILED = 'database_query_failed',
  CACHE_OPERATION_FAILED = 'cache_operation_failed',
  MAPPING_FAILED = 'mapping_failed',
  UNHANDLED_EXCEPTION = 'unhandled_exception',
  CONNECTION_READY = 'connection_ready',
  CONNECTION_ERROR = 'connection_error',
  CACHE_CALL_COMPLETED = 'cache_call_completed',
  CACHE_CALL_FAILED = 'cache_call_failed',
  CACHE_HIT = 'cache_hit',
  CACHE_MISS = 'cache_miss',
}
export interface IAppLoggerContext extends Record<string, unknown> {
  event: LogContextEvent;
  operation: string;
  requestId?: string;
  correlationId?: string;
  service?: string;
  component?: string;
  provider?: string;
  protocol?: 'rest' | 'graphql';
  endpoint?: string;
  method?: string;
  statusCode?: number;
  durationMs?: number;
  timestamp?: string;
  retryAttempt?: number;
  maxRetryAttempts?: number;
  liftErrorCode?: string;
  errorCategory?: string;
  diagnostics?: IDiagnostics;
}
export interface IDiagnostics {
  thirdParty?: {
    system: string;
    protocol?: 'rest' | 'graphql';
    endpoint?: string;
    httpStatus?: number;
    errorCode?: string;
    message?: string;
    request?: unknown;
    response?: unknown;
  };
  downstreamService?: {
    service: string;
    endpoint?: string;
    httpStatus?: number;
    errorCode?: string;
    message?: string;
    correlationId?: string;
    request?: unknown;
    response?: unknown;
  };
  request?: {
    summary?: Record<string, unknown>;
  };
  response?: {
    summary?: Record<string, unknown>;
  };
  retry?: {
    attempt: number;
    maxAttempts: number;
    reason?: string;
  };
  mapping?: {
    sourceErrorCode?: string;
    liftErrorCode: string;
    mappedCategory?: string;
    mappedReason?: string;
  };
  graphql?: {
    operationName?: string;
    variableKeys?: string[];
    errors?: unknown[];
  };
  database?: {
    operation?: string;
    table?: string;
    errorCode?: string;
    message?: string;
  };
  cache?: {
    system?: 'redis' | 'apigee-cache';
    operation?: string;
    keyPattern?: string;
    errorCode?: string;
    message?: string;
    args?: string[];
  };
  debug?: Record<string, unknown>;
}

export interface IAppLogger {
  info(message: string, context?: IAppLoggerContext): void;
  error(message: string, context?: IAppLoggerContext, stack?: string): void;
  warn(message: string, context?: IAppLoggerContext): void;
  debug(message: string, context?: IAppLoggerContext): void;
  verbose(message: string, context?: IAppLoggerContext): void;
  fatal(message: string, context?: IAppLoggerContext): void;
}
