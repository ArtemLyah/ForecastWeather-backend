import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions()
  };
};

function getMongoString(configService: ConfigService) {
  const user = configService.get('DB_USER');
  const password = configService.get('DB_PASSWORD');
  const host = configService.get('DB_HOST');
  return `mongodb+srv://${user}:${password}@${host}/?retryWrites=true&w=majority`;
}

function getMongoOptions() {
  return {
    useNewUrlParser: true,
  };
}

