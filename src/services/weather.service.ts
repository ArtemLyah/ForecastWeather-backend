import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { FilterQuery } from 'mongoose';
import { CreateWeatherDto } from '../dto/weather.create.dto';
import { WeatherRepository } from '../database/repositories/weather.repository';
import { WeatherModel } from '../database/models/weather.model.ts';
import { SearchWeatherDto } from 'src/dto/weather.search.dto';

@Injectable()
export class WeatherService {
  constructor (
    private weatherRepository: WeatherRepository,
  ) {}

  async create (data: CreateWeatherDto): Promise<DocumentType<WeatherModel>> {
    return this.weatherRepository.create(data);
  }

  async delete (id: string): Promise<DocumentType<WeatherModel> | null> {
    return this.weatherRepository.delete(id);
  }

  async search ({region, city, date}: SearchWeatherDto): Promise<DocumentType<WeatherModel>[]> {
    const where: FilterQuery<WeatherModel> = {
      region: {
        $regex: region ?? '',
      },
      city: {
        $regex: city ?? '',
      },
    };
    if (date) {
      where.date = date;
    }
    return this.weatherRepository.findMany(where);
  }
}
