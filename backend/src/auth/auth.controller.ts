import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from 'src/user/DTO/signup.dto';
import { User } from 'src/task/db/entities/user.entity';
import { SignInDTO } from 'src/user/DTO/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
    @Post("sign-up")
  async signUp(@Body() body: SignUpDTO): Promise<User> {
    try {
      return await this.authService.signUp({email: body.email, password: body.password, username: body.username})
    }
    catch (err) {
      throw err
    }
  }

  @Post("sign-in")
  async signIn(@Body() body: SignInDTO): Promise<object> {
    try {
      return await this.authService.signIn({email: body.email, password: body.password})
    }
    catch (err) {
      throw err
    }
  }
}
