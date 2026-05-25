import {
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateWorkEntryDto {
  @IsDateString()
  completedAt: string;

  @IsUUID()
  workTypeId: string;

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
