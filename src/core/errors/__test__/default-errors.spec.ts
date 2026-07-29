import { HttpStatus } from '@nestjs/common';

import {
  AuthenticationErrors,
  AuthorizationErrors,
  createError,
  DatabaseErrors,
  type DefaultErrorKeys,
  DefaultErrors,
  FeatureSpecificErrors,
  GenericErrors,
  NetworkErrors,
  RequestFormatErrors,
  RuntimeErrors,
  ServerErrors,
  ValidationErrors,
} from '../core/default-errors';
import { ErrorCategory } from '../core/error-category.enum';

describe('createError & DefaultErrors', () => {
  it('should format error code as SYSTEMCODE_CATEGORY_0001', () => {
    const exception = createError(
      HttpStatus.FORBIDDEN,
      'PIPELINE_SERVICE',
      ErrorCategory.AUTHENTICATION,
      5,
      'Forbidden access',
    );

    expect(exception.errorCode).toBe('PIPELINE_SERVICE_01_0005');
    expect(exception.getStatus()).toBe(HttpStatus.FORBIDDEN);
  });

  describe('Category specific error maps', () => {
    it('should generate all AuthenticationErrors correctly', () => {
      const keys = Object.keys(AuthenticationErrors) as (keyof typeof AuthenticationErrors)[];
      keys.forEach((key) => {
        const err = AuthenticationErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all AuthorizationErrors correctly', () => {
      const keys = Object.keys(AuthorizationErrors) as (keyof typeof AuthorizationErrors)[];
      keys.forEach((key) => {
        const err = AuthorizationErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all DatabaseErrors correctly', () => {
      const keys = Object.keys(DatabaseErrors) as (keyof typeof DatabaseErrors)[];
      keys.forEach((key) => {
        const err = DatabaseErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all FeatureSpecificErrors correctly', () => {
      const keys = Object.keys(FeatureSpecificErrors) as (keyof typeof FeatureSpecificErrors)[];
      keys.forEach((key) => {
        const err = FeatureSpecificErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all GenericErrors correctly', () => {
      const keys = Object.keys(GenericErrors) as (keyof typeof GenericErrors)[];
      keys.forEach((key) => {
        const err = GenericErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all NetworkErrors correctly', () => {
      const keys = Object.keys(NetworkErrors) as (keyof typeof NetworkErrors)[];
      keys.forEach((key) => {
        const err = NetworkErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all RequestFormatErrors correctly', () => {
      const keys = Object.keys(RequestFormatErrors) as (keyof typeof RequestFormatErrors)[];
      keys.forEach((key) => {
        const err = RequestFormatErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all RuntimeErrors correctly', () => {
      const keys = Object.keys(RuntimeErrors) as (keyof typeof RuntimeErrors)[];
      keys.forEach((key) => {
        const err = RuntimeErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all ServerErrors correctly', () => {
      const keys = Object.keys(ServerErrors) as (keyof typeof ServerErrors)[];
      keys.forEach((key) => {
        const err = ServerErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });

    it('should generate all ValidationErrors correctly', () => {
      const keys = Object.keys(ValidationErrors) as (keyof typeof ValidationErrors)[];
      keys.forEach((key) => {
        const err = ValidationErrors[key]('SYS');
        expect(err.errorCode).toBeDefined();
      });
    });
  });

  describe('DefaultErrors complete map coverage', () => {
    it('should execute every error factory function in DefaultErrors map', () => {
      const keys = Object.keys(DefaultErrors) as DefaultErrorKeys[];

      keys.forEach((key: DefaultErrorKeys) => {
        const errorFactory = DefaultErrors[key];
        const exception = errorFactory('TEST_SYS');

        expect(exception).toBeDefined();
        expect(exception.errorCode).toContain('TEST_SYS_');
        expect(exception.message).toBeDefined();
        expect(typeof exception.getStatus()).toBe('number');
      });
    });
  });
});
