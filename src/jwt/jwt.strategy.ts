import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ingoreExpiration: true,
      algorithms: 'HS256',
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate ({ email, isAdmin }: Pick<UserModel, 'email' | 'isAdmin'>) {
    return { email, isAdmin };
  }
}