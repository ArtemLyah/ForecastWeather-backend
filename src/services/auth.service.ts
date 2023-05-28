import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserModel } from 'src/database/models/user.model';
import { UserRepository } from 'src/database/repositories/user.repository';
import { AuthDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor (
    private userRepository: UserRepository,
    private jwtService: JwtService,  
  ) {}

  async createUser (auth: AuthDto) {
    const salt = await genSalt(10);
    return this.userRepository.create({
      email: auth.email,
      password: await hash(auth.password, salt),
    });
  }

  async findUser (email: string) {
    return this.userRepository.find({
      email,
    });
  }

  async validateUser (email: string, password: string): Promise<Pick<UserModel, 'email' | 'isAdmin'>> {
    const user = await this.userRepository.find({
      email
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException('Wrong password');
    }
    return { email: user.email, isAdmin: user.isAdmin };
  }

  async login (email: string, isAdmin: boolean) {
    const payload = { email, isAdmin };
    return {
      access_token: await this.jwtService.signAsync(payload),
      isAdmin,
    };
  }
}
