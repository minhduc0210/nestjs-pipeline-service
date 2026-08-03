import { ApiProperty } from '@nestjs/swagger';

export class DemoRequestDto {
  @ApiProperty({
    description: 'Header title to process in the data pipeline',
    example: 'Monthly Financial Calculations',
    minLength: 3,
    maxLength: 100,
    required: true,
  })
  title!: string;

  @ApiProperty({
    description: 'Array of numbers to validate and sum in the pipeline',
    example: [10, 25, 45, 100],
    type: [Number],
    minItems: 1,
    required: true,
  })
  items!: number[];
}

export class DemoResponseDto {
  @ApiProperty({
    description: 'Uppercase formatted pipeline title',
    example: 'MONTHLY FINANCIAL CALCULATIONS',
  })
  processedTitle!: string;

  @ApiProperty({
    description: 'Calculated sum of all input array items',
    example: 180,
  })
  sum!: number;

  @ApiProperty({
    description: 'Calculated average value of input items',
    example: 45,
  })
  average!: number;

  @ApiProperty({
    description: 'Timestamp when pipeline processing completed in ISO format',
    example: '2026-08-03T15:00:00.000Z',
  })
  timestamp!: string;
}
