import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchWeatherDto {
  @IsOptional()
  @IsString()
  region?: string;
  
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsDateString()
  date?: Date;
}