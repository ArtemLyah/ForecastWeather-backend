import { 
  Body, Param,
  Controller, 
  Delete, Get, Post,
  HttpException, HttpStatus,
  UseGuards, 
  UsePipes, ValidationPipe, Req, Query,  
} from '@nestjs/common';
import { SearchWeatherDto } from 'src/dto/weather.search.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateWeatherDto } from '../dto/weather.create.dto';
import { WeatherService } from '../services/weather.service';

@Controller({
  path: '/weather',
})
export class WeatherController {
  constructor (
    private readonly weatherService: WeatherService,
  ) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async create (@Body() weather: CreateWeatherDto) {
    return this.weatherService.create(weather);
  }

  @Get()
  @UsePipes(new ValidationPipe())
  async search (@Query() data: SearchWeatherDto) {
    return this.weatherService.search(data);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  async delete (@Param('id') id: string) {
    const weather = await this.weatherService.delete(id);
    if (!weather) {
      throw new HttpException('Weather not found', HttpStatus.NOT_FOUND);
    }
    return weather;
  }
}
