export class DemoRequestDto {
  title!: string;
  items!: number[];
}

export class DemoResponseDto {
  processedTitle!: string;
  sum!: number;
  average!: number;
  timestamp!: string;
}
