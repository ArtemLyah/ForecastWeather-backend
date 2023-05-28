import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateWeatherDto {
  @IsString()
  region: string;

  @IsString()
  city: string;

  @IsNumber()
  temperature: number;

  @IsString()
  weather: string;

  @IsNumber()
  wind: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  precipitation: number;
  
  @IsNumber()
  visibility: number;
  
  @IsDateString()
  date: Date;
}