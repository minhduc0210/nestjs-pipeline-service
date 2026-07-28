import { HttpStatus } from '@nestjs/common';

import { AppException } from './app-exception';
import { ErrorCategory } from './error-category.enum';

export function createError(
  status: HttpStatus,
  systemCode: string,
  category: ErrorCategory,
  errorId: number,
  message: string,
): AppException {
  const formattedId: string = errorId.toString().padStart(4, '0');
  const errorCode = `${systemCode}_${category}_${formattedId}`;
  return new AppException(status, errorCode, message);
}

// 1. Authentication Errors
export type AuthenticationErrorsKeys =
  | 'INVALID_CREDENTIALS'
  | 'UNKNOWN_USER'
  | 'EXPIRED_TOKEN'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'NETWORK_ISSUE'
  | 'SERVER_ERROR'
  | 'INVALID_TOKEN';

export const AuthenticationErrors: Record<
  AuthenticationErrorsKeys,
  (systemCode: string) => AppException
> = {
  INVALID_CREDENTIALS: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHENTICATION,
      1,
      'Invalid credentials',
    ),
  UNKNOWN_USER: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHENTICATION,
      2,
      'Unknown user',
    ),
  EXPIRED_TOKEN: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHENTICATION,
      3,
      'Expired token',
    ),
  INSUFFICIENT_PERMISSIONS: (sys) =>
    createError(
      HttpStatus.FORBIDDEN,
      sys,
      ErrorCategory.AUTHENTICATION,
      4,
      'Insufficient permissions',
    ),
  NETWORK_ISSUE: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.AUTHENTICATION,
      5,
      'Network issue during authentication',
    ),
  SERVER_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.AUTHENTICATION,
      6,
      'Authentication server error',
    ),
  INVALID_TOKEN: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHENTICATION,
      7,
      'Invalid token',
    ),
};

// 2. Authorization Errors
export type AuthorizationErrorsKeys =
  | 'RESOURCE_NOT_FOUND'
  | 'CLIENT_NOT_AUTHORIZED'
  | 'UNAUTHORIZED_ACCESS'
  | 'REFRESH_TOKEN_NO_NEW_TOKEN_GENERATED';

export const AuthorizationErrors: Record<
  AuthorizationErrorsKeys,
  (systemCode: string) => AppException
> = {
  RESOURCE_NOT_FOUND: (sys) =>
    createError(
      HttpStatus.NOT_FOUND,
      sys,
      ErrorCategory.AUTHORIZATION,
      1,
      'Resource not found',
    ),
  CLIENT_NOT_AUTHORIZED: (sys) =>
    createError(
      HttpStatus.FORBIDDEN,
      sys,
      ErrorCategory.AUTHORIZATION,
      2,
      'Client not authorized',
    ),
  UNAUTHORIZED_ACCESS: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHORIZATION,
      3,
      'Unauthorized access',
    ),
  REFRESH_TOKEN_NO_NEW_TOKEN_GENERATED: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.AUTHORIZATION,
      4,
      'Failed to generate refresh token',
    ),
};

// 3. Database Errors
export type DatabaseErrorsKeys =
  | 'CONNECTION_TIMEOUT'
  | 'AUTHENTICATION_FAILED'
  | 'EXECUTION_ERROR'
  | 'INVALID_PARAMETERS'
  | 'TRANSACTION_ERROR'
  | 'DATA_TYPE_MISMATCH'
  | 'PERMISSION_DENIED'
  | 'MISSING_TABLE';

export const DatabaseErrors: Record<
  DatabaseErrorsKeys,
  (systemCode: string) => AppException
> = {
  CONNECTION_TIMEOUT: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.DATABASE,
      1,
      'Database connection timeout',
    ),
  AUTHENTICATION_FAILED: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.DATABASE,
      2,
      'Database authentication failed',
    ),
  EXECUTION_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.DATABASE,
      3,
      'Database execution error',
    ),
  INVALID_PARAMETERS: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.DATABASE,
      4,
      'Invalid database parameters',
    ),
  TRANSACTION_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.DATABASE,
      5,
      'Database transaction error',
    ),
  DATA_TYPE_MISMATCH: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.DATABASE,
      6,
      'Database data type mismatch',
    ),
  PERMISSION_DENIED: (sys) =>
    createError(
      HttpStatus.FORBIDDEN,
      sys,
      ErrorCategory.DATABASE,
      7,
      'Database permission denied',
    ),
  MISSING_TABLE: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.DATABASE,
      8,
      'Missing database table',
    ),
};

// 4. Feature Specific Errors (Generic Providers & Integrations)
export type FeatureSpecificErrorsKeys =
  | 'THIRD_PARTY_ERROR'
  | 'PAYMENT_PROVIDER_ERROR'
  | 'INVALID_RESPONSE_FORMAT'
  | 'SESSION_EXPIRED'
  | 'API_TIMEOUT';

export const FeatureSpecificErrors: Record<
  FeatureSpecificErrorsKeys,
  (systemCode: string) => AppException
> = {
  THIRD_PARTY_ERROR: (sys) =>
    createError(
      HttpStatus.BAD_GATEWAY,
      sys,
      ErrorCategory.FEATURE_SPECIFIC,
      1,
      'Third party service error',
    ),
  PAYMENT_PROVIDER_ERROR: (sys) =>
    createError(
      HttpStatus.BAD_GATEWAY,
      sys,
      ErrorCategory.FEATURE_SPECIFIC,
      2,
      'Payment provider error',
    ),
  INVALID_RESPONSE_FORMAT: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.FEATURE_SPECIFIC,
      3,
      'Invalid response format from external provider',
    ),
  SESSION_EXPIRED: (sys) =>
    createError(
      HttpStatus.UNAUTHORIZED,
      sys,
      ErrorCategory.FEATURE_SPECIFIC,
      4,
      'Session expired',
    ),
  API_TIMEOUT: (sys) =>
    createError(
      HttpStatus.GATEWAY_TIMEOUT,
      sys,
      ErrorCategory.FEATURE_SPECIFIC,
      5,
      'API request timeout',
    ),
};

// 5. Generic Errors
export type GenericErrorsKeys =
  | 'INTERNAL_ERROR'
  | 'BAD_REQUEST'
  | 'SERVICE_UNAVAILABLE'
  | 'PARSING_ERROR'
  | 'EXTERNAL_SERVICE_ERROR'
  | 'DATABASE_ERROR'
  | 'UNKNOWN_ERROR';

export const GenericErrors: Record<
  GenericErrorsKeys,
  (systemCode: string) => AppException
> = {
  INTERNAL_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.GENERIC,
      1,
      'Internal Server error. Server side uncaught exception/error',
    ),
  SERVICE_UNAVAILABLE: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.GENERIC,
      2,
      'Service unavailable. Server is down or unreachable',
    ),
  PARSING_ERROR: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.GENERIC,
      3,
      'Parsing error. Payload formatting error',
    ),
  EXTERNAL_SERVICE_ERROR: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.GENERIC,
      4,
      'External service error. A required API/Service is down',
    ),
  DATABASE_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.GENERIC,
      5,
      'Database unhandled error. Unspecified DB error',
    ),
  UNKNOWN_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.GENERIC,
      6,
      'Unknown error. Unspecified error occurred',
    ),
  BAD_REQUEST: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.GENERIC,
      7,
      'Bad request. Request is invalid',
    ),
};

// 6. Network Errors
export type NetworkErrorsKeys =
  | 'CONNECTION_REFUSED'
  | 'CONNECTION_TIMEOUT'
  | 'CONNECTION_RESET'
  | 'HOST_UNREACHABLE'
  | 'DNS_RESOLUTION_FAILED'
  | 'CERTIFICATE_EXPIRED'
  | 'BAD_GATEWAY'
  | 'REQUEST_TIMEOUT';

export const NetworkErrors: Record<
  NetworkErrorsKeys,
  (systemCode: string) => AppException
> = {
  CONNECTION_REFUSED: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.NETWORK,
      1,
      'Network connection refused',
    ),
  CONNECTION_TIMEOUT: (sys) =>
    createError(
      HttpStatus.GATEWAY_TIMEOUT,
      sys,
      ErrorCategory.NETWORK,
      2,
      'Network connection timeout',
    ),
  CONNECTION_RESET: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.NETWORK,
      3,
      'Network connection reset',
    ),
  HOST_UNREACHABLE: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.NETWORK,
      4,
      'Host unreachable',
    ),
  DNS_RESOLUTION_FAILED: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.NETWORK,
      5,
      'DNS resolution failed',
    ),
  CERTIFICATE_EXPIRED: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.NETWORK,
      6,
      'SSL Certificate expired',
    ),
  BAD_GATEWAY: (sys) =>
    createError(
      HttpStatus.BAD_GATEWAY,
      sys,
      ErrorCategory.NETWORK,
      7,
      'Bad Gateway',
    ),
  REQUEST_TIMEOUT: (sys) =>
    createError(
      HttpStatus.GATEWAY_TIMEOUT,
      sys,
      ErrorCategory.NETWORK,
      8,
      'Request timeout',
    ),
};

// 7. Request Format Errors
export type RequestFormatErrorsKeys =
  | 'MISSING_REQUEST_BODY'
  | 'EMPTY_REQUEST_BODY'
  | 'INVALID_CONTENT_TYPE'
  | 'UNSUPPORTED_MEDIA_TYPE'
  | 'PARSING_FAILURE'
  | 'UNEXPECTED_STRUCTURE'
  | 'SCHEMA_ERROR';

export const RequestFormatErrors: Record<
  RequestFormatErrorsKeys,
  (systemCode: string) => AppException
> = {
  MISSING_REQUEST_BODY: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      1,
      'Missing request body',
    ),
  EMPTY_REQUEST_BODY: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      2,
      'Empty request body',
    ),
  INVALID_CONTENT_TYPE: (sys) =>
    createError(
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      3,
      'Invalid content type',
    ),
  UNSUPPORTED_MEDIA_TYPE: (sys) =>
    createError(
      HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      4,
      'Unsupported media type',
    ),
  PARSING_FAILURE: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      5,
      'Payload parsing failure',
    ),
  UNEXPECTED_STRUCTURE: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      6,
      'Unexpected JSON structure',
    ),
  SCHEMA_ERROR: (sys) =>
    createError(
      HttpStatus.UNPROCESSABLE_ENTITY,
      sys,
      ErrorCategory.REQUEST_FORMAT,
      7,
      'JSON schema validation error',
    ),
};

// 8. Runtime Errors
export type RuntimeErrorsKeys =
  | 'NULL_REFERENCE'
  | 'GLOBAL_EXCEPTION'
  | 'FILE_NOT_FOUND'
  | 'UNSUPPORTED_ENCODING'
  | 'SERIALIZATION_ERROR'
  | 'INVALID_PARSING'
  | 'INSUFFICIENT_PERMISSIONS'
  | 'INVALID_TYPE_CONVERSION';

export const RuntimeErrors: Record<
  RuntimeErrorsKeys,
  (systemCode: string) => AppException
> = {
  NULL_REFERENCE: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      1,
      'Null reference encountered',
    ),
  GLOBAL_EXCEPTION: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      2,
      'Global runtime exception',
    ),
  FILE_NOT_FOUND: (sys) =>
    createError(
      HttpStatus.NOT_FOUND,
      sys,
      ErrorCategory.RUNTIME,
      3,
      'File not found',
    ),
  UNSUPPORTED_ENCODING: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      4,
      'Unsupported encoding',
    ),
  SERIALIZATION_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      5,
      'Serialization error',
    ),
  INVALID_PARSING: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      6,
      'Invalid parsing operation',
    ),
  INSUFFICIENT_PERMISSIONS: (sys) =>
    createError(
      HttpStatus.FORBIDDEN,
      sys,
      ErrorCategory.RUNTIME,
      7,
      'Insufficient runtime permissions',
    ),
  INVALID_TYPE_CONVERSION: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.RUNTIME,
      8,
      'Invalid type conversion',
    ),
};

// 9. Server Errors
export type ServerErrorsKeys =
  | 'INTERNAL_SERVER_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'TIMEOUT'
  | 'CONNECTION_FAILURE'
  | 'CONFIGURATION_ERROR'
  | 'INSUFFICIENT_STORAGE'
  | 'HTTP_VERSION_ERROR'
  | 'METHOD_NOT_SUPPORTED';

export const ServerErrors: Record<
  ServerErrorsKeys,
  (systemCode: string) => AppException
> = {
  INTERNAL_SERVER_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.SERVER,
      1,
      'Internal server error',
    ),
  SERVICE_UNAVAILABLE: (sys) =>
    createError(
      HttpStatus.SERVICE_UNAVAILABLE,
      sys,
      ErrorCategory.SERVER,
      2,
      'Service unavailable',
    ),
  TIMEOUT: (sys) =>
    createError(
      HttpStatus.GATEWAY_TIMEOUT,
      sys,
      ErrorCategory.SERVER,
      3,
      'Server gateway timeout',
    ),
  CONNECTION_FAILURE: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.SERVER,
      4,
      'Server connection failure',
    ),
  CONFIGURATION_ERROR: (sys) =>
    createError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      sys,
      ErrorCategory.SERVER,
      5,
      'Server configuration error',
    ),
  INSUFFICIENT_STORAGE: (sys) =>
    createError(
      HttpStatus.INSUFFICIENT_STORAGE,
      sys,
      ErrorCategory.SERVER,
      6,
      'Insufficient storage',
    ),
  HTTP_VERSION_ERROR: (sys) =>
    createError(
      HttpStatus.HTTP_VERSION_NOT_SUPPORTED,
      sys,
      ErrorCategory.SERVER,
      7,
      'HTTP version not supported',
    ),
  METHOD_NOT_SUPPORTED: (sys) =>
    createError(
      HttpStatus.METHOD_NOT_ALLOWED,
      sys,
      ErrorCategory.SERVER,
      8,
      'HTTP method not supported',
    ),
};

// 10. Generic Validation Errors
export type ValidationErrorsKeys =
  | 'MISSING_REQUIRED_FIELD'
  | 'EMPTY_VALUE_NOT_ALLOWED'
  | 'INVALID_FIELD_TYPE'
  | 'FIELD_LENGTH_EXCEEDS_LIMIT'
  | 'INVALID_FORMAT'
  | 'BUSINESS_RULE_VIOLATION';

export const ValidationErrors: Record<
  ValidationErrorsKeys,
  (systemCode: string) => AppException
> = {
  MISSING_REQUIRED_FIELD: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.VALIDATION,
      1,
      'Missing required field',
    ),
  EMPTY_VALUE_NOT_ALLOWED: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.VALIDATION,
      2,
      'Empty value not allowed',
    ),
  INVALID_FIELD_TYPE: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.VALIDATION,
      3,
      'Invalid field type',
    ),
  FIELD_LENGTH_EXCEEDS_LIMIT: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.VALIDATION,
      4,
      'Field length exceeds limit',
    ),
  INVALID_FORMAT: (sys) =>
    createError(
      HttpStatus.BAD_REQUEST,
      sys,
      ErrorCategory.VALIDATION,
      5,
      'Invalid format',
    ),
  BUSINESS_RULE_VIOLATION: (sys) =>
    createError(
      HttpStatus.UNPROCESSABLE_ENTITY,
      sys,
      ErrorCategory.VALIDATION,
      6,
      'Business rule violation',
    ),
};

// Combined Framework Default Error Keys & Map
export type DefaultErrorKeys =
  | AuthenticationErrorsKeys
  | AuthorizationErrorsKeys
  | DatabaseErrorsKeys
  | FeatureSpecificErrorsKeys
  | GenericErrorsKeys
  | NetworkErrorsKeys
  | RequestFormatErrorsKeys
  | RuntimeErrorsKeys
  | ServerErrorsKeys
  | ValidationErrorsKeys;

export const DefaultErrors: Record<
  DefaultErrorKeys,
  (systemCode: string) => AppException
> = {
  ...AuthenticationErrors,
  ...AuthorizationErrors,
  ...DatabaseErrors,
  ...FeatureSpecificErrors,
  ...GenericErrors,
  ...NetworkErrors,
  ...RequestFormatErrors,
  ...RuntimeErrors,
  ...ServerErrors,
  ...ValidationErrors,
};
