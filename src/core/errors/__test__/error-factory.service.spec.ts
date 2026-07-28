import { HttpStatus } from '@nestjs/common';

import { ErrorCategory } from '../core/error-category.enum';
import { ErrorFactoryService } from '../nest/error-factory.service';

describe('ErrorFactoryService', () => {
  let service: ErrorFactoryService;

  beforeEach(() => {
    service = new ErrorFactoryService('TEST_SYS');
  });

  it('should create default error using service', () => {
    const err = service.createDefaultError('INTERNAL_ERROR');
    expect(err.errorCode).toBe('TEST_SYS_09_0001');
    expect(err.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it('should create custom error using service', () => {
    const err = service.createError(
      HttpStatus.NOT_FOUND,
      ErrorCategory.AUTHORIZATION,
      9,
      'Not found',
    );
    expect(err.errorCode).toBe('TEST_SYS_02_0009');
    expect(err.getStatus()).toBe(HttpStatus.NOT_FOUND);
  });
});
