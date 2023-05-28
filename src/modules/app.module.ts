import { Module } from '@nestjs/common';
import { WeatherModule } from './weather.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from '../configs/mongo.config';
import { DatabaseModule } from './database.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig
    }), 
    {
      module: DatabaseModule,
      global: true,
    },
    WeatherModule, AuthModule
  ],
})
export class AppModule {}
