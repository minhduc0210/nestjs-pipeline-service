import { HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { ApiStandardErrorResponse } from '../decorators/api-standard-error-response';

jest.mock('@nestjs/swagger', () => {
  const original = jest.requireActual('@nestjs/swagger');
  return {
    ...original,
    ApiResponse: jest.fn().mockReturnValue(jest.fn()),
  };
});

describe('ApiStandardErrorResponse', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should apply ApiResponse with default BAD_REQUEST status and default description', () => {
    ApiStandardErrorResponse();

    expect(ApiResponse).toHaveBeenCalledWith({
      status: HttpStatus.BAD_REQUEST,
      description: 'Standard AppException payload for HTTP status 400',
      type: expect.any(Function),
    });
  });

  it('should apply ApiResponse with custom status and custom description', () => {
    ApiStandardErrorResponse(HttpStatus.UNAUTHORIZED, 'Unauthorized Access Error');

    expect(ApiResponse).toHaveBeenCalledWith({
      status: HttpStatus.UNAUTHORIZED,
      description: 'Unauthorized Access Error',
      type: expect.any(Function),
    });
  });
});
