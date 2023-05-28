import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface WeatherModel extends Base {}
export class WeatherModel {
  @prop()
  region: string;
  
  @prop()
  city: string;
  
  @prop()
  temperature: number;
  
  @prop()
  weather: string;
  
  @prop()
  wind: number;
  
  @prop()
  humidity: number;
  
  @prop()
  precipitation: number;
  
  @prop()
  visibility: number;

  @prop()
  date: Date;
}
