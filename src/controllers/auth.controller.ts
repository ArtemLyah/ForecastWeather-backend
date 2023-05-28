import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/dto/auth.dto';
import { AuthService } from 'src/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('signup')
  async register (@Body() body: AuthDto) {
    const user = await this.authService.findUser(body.email);
    if (user) {
      throw new BadRequestException('User is already registered');
    }
    const newUser = await this.authService.createUser(body);
    return this.authService.login(newUser.email, newUser.isAdmin);
  }
  
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login (@Body() {email, password}: AuthDto) {
    const user = await this.authService.validateUser(email, password);
    return this.authService.login(user.email, user.isAdmin);
  }
}
