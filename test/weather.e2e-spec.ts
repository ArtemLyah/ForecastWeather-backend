import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { disconnect, Types } from 'mongoose';
import { AppModule } from '../src/modules/app.module';
import { CreateWeatherDto } from '../src/dto/weather.create.dto';
import { SearchWeatherDto } from 'src/dto/weather.search.dto';

const currentDate = new Date(new Date().setHours(3, 0, 0, 0));

const createTestWithRegion: CreateWeatherDto = {
  region: 'TestRegion',
  city: 'TestCity',
  temperature: -100,
  weather: 'sunny',
  wind: 10,
  humidity: 10,
  precipitation: 10,
  visibility: 10,
  date: currentDate,
};
let createdWithRegionId: string;

const createTestWithoutRegion: CreateWeatherDto = {
  city: 'TestCityWithoutRegion',
  temperature: -100,
  weather: 'sunny',
  wind: 10,
  humidity: 10,
  precipitation: 10,
  visibility: 10,
  date: currentDate,
};
let createdWithoutRegionId: string;

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/weather (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/weather')
      .send(createTestWithRegion)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdWithRegionId = body._id;
        expect(createdWithRegionId).toBeDefined();
      });
  });

  it('/weather (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/weather')
      .send(createTestWithoutRegion)
      .expect(201)
      .then(({ body }: request.Response) => {
        createdWithoutRegionId = body._id;
        expect(createdWithoutRegionId).toBeDefined();
      });
  });

  const searchTest: SearchWeatherDto = {
    city: 'Test',
    date: currentDate,
  };
  it('/weather (GET) - success', async () => {
    return request(app.getHttpServer())
      .get('/weather')
      .send(searchTest)
      .expect(200)
      .then(({ body }: request.Response) => {
        expect(body.length).toBe(2);
      });
  });

  it('/weather (GET) - fail', async () => {
    return request(app.getHttpServer())
      .get('/weather')
      .send({ searchTest, city: 123 })
      .expect(400);
  });

  it('/weather/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/weather/'+createdWithRegionId)
      .expect(200);
  });

  it('/weather/:id (DELETE) - success', async () => {
    return request(app.getHttpServer())
      .delete('/weather/'+createdWithoutRegionId)
      .expect(200);
  });

  it('/weather/:id (DELETE) - failed', async () => {
    return request(app.getHttpServer())
      .delete('/weather/'+ new Types.ObjectId().toHexString())
      .expect(404, {
        statusCode: 404,
        message: 'Weather not found',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
