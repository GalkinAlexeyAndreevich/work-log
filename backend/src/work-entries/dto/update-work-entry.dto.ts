import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateWorkEntryDto {
  @IsDateString()
  completedAt: string;

  @IsString()
  @MinLength(1)
  workTypeName: string;

  @IsNumber()
  @IsPositive()
  volume: number;

  @IsString()
  @MinLength(1)
  unit: string;

  @IsString()
  @MinLength(1)
  executorName: string;
}
