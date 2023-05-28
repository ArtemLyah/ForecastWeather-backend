import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../database/models/user.model';
import { WeatherModel } from '../database/models/weather.model.ts';
import { UserRepository } from '../database/repositories/user.repository';
import { WeatherRepository } from '../database/repositories/weather.repository';

@Module({
  imports: [TypegooseModule.forFeature(
    [
      {
        typegooseClass: WeatherModel,
        schemaOptions: {
          collection: 'weather',
        },
      },
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'user',
        },
      },
    ],
  )],
  providers: [
    UserRepository, 
    WeatherRepository,
  ],
  exports: [
    UserRepository, 
    WeatherRepository,
  ],
})
export class DatabaseModule {}
