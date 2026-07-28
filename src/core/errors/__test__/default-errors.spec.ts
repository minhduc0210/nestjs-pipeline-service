import { HttpStatus } from '@nestjs/common';

import { createError, DefaultErrors } from '../core/default-errors';
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

  it('should generate default errors via DefaultErrors map', () => {
    const missingFieldErr = DefaultErrors.MISSING_REQUIRED_FIELD('SYS_CODE');
    expect(missingFieldErr.errorCode).toBe('SYS_CODE_03_0001');
    expect(missingFieldErr.getStatus()).toBe(HttpStatus.BAD_REQUEST);
  });
});
