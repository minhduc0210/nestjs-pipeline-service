import { HttpStatus } from '@nestjs/common';

import { AppException } from '../core/app-exception';

describe('AppException', () => {
  it('should create AppException and support fluent builder methods', () => {
    const exception = new AppException(
      HttpStatus.BAD_REQUEST,
      'TEST_SYS_01_0001',
      'Bad request message',
    );

    exception
      .withRawErrorMessage('Raw debug error')
      .withErrorData('Data string')
      .withContext({ user: 'testUser' });

    expect(exception.getStatus()).toBe(HttpStatus.BAD_REQUEST);
    expect(exception.errorCode).toBe('TEST_SYS_01_0001');
    expect(exception.message).toBe('Bad request message');
    expect(exception.rawErrorMessage).toBe('Raw debug error');
    expect(exception.errorData).toBe('Data string');
    expect(exception.context).toEqual({ user: 'testUser' });
  });
});
