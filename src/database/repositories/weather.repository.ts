import { Injectable } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { FilterQuery } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateWeatherDto } from '../../dto/weather.create.dto';
import { WeatherModel } from '../models/weather.model.ts';

@Injectable()
export class WeatherRepository {
  constructor (@InjectModel(WeatherModel) private readonly weatherModel: ModelType<WeatherModel>) {}

  async create (data: CreateWeatherDto): Promise<DocumentType<WeatherModel>> {
    return this.weatherModel.create(data);
  }

  async delete (id: string): Promise<DocumentType<WeatherModel> | null> {
    return this.weatherModel.findByIdAndDelete(id).exec();
  }

  async findMany (where: FilterQuery<WeatherModel>): Promise<DocumentType<WeatherModel>[]> {
    return this.weatherModel.find(where).exec();
  }
}