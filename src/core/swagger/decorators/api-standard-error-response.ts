import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiResponse } from '@nestjs/swagger';

class StandardErrorPayloadDto {
  @ApiProperty({ example: 'PIPELINE_SERVICE_04_0400', required: true })
  code!: string;

  @ApiProperty({
    example: 'Validation failed for request payload',
    required: true,
  })
  message!: string;

  @ApiProperty({ example: '2026-08-03T09:30:00.000Z', required: true })
  timestamp!: string;

  @ApiProperty({ example: 'corr-uuid-12345', required: false })
  correlationId?: string;

  @ApiProperty({
    example: [{ field: 'email', message: 'email must be a valid email' }],
    required: false,
  })
  details?: Array<Record<string, unknown>>;
}

/**
 * Decorator to document standard AppException error responses in Swagger UI.
 *
 * @param status - HTTP Status Code (default: BAD_REQUEST)
 * @param description - Custom description of the error scenario
 */
export function ApiStandardErrorResponse(
  status: HttpStatus = HttpStatus.BAD_REQUEST,
  description?: string,
): MethodDecorator & ClassDecorator {
  const statusStr = String(status);
  return applyDecorators(
    ApiResponse({
      status,
      description:
        description ??
        `Standard AppException payload for HTTP status ${statusStr}`,
      type: StandardErrorPayloadDto,
    }),
  );
}
