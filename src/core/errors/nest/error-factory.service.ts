import { type HttpStatus, Inject, Injectable } from '@nestjs/common';

import type { AppException } from '../core/app-exception';
import {
  createError,
  type DefaultErrorKeys,
  DefaultErrors,
} from '../core/default-errors';
import type { ErrorCategory } from '../core/error-category.enum';

export const SYSTEM_CODE_TOKEN = 'SYSTEM_CODE_TOKEN';

@Injectable()
export class ErrorFactoryService {
  constructor(@Inject(SYSTEM_CODE_TOKEN) private readonly systemCode: string) {}

  public createDefaultError(defaultErrorKey: DefaultErrorKeys): AppException {
    const builder = DefaultErrors[defaultErrorKey];
    return builder(this.systemCode);
  }

  public createError(
    status: HttpStatus,
    category: ErrorCategory,
    errorId: number,
    message: string,
  ): AppException {
    return createError(status, this.systemCode, category, errorId, message);
  }
}
