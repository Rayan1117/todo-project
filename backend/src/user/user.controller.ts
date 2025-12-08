import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/task/db/entities/user.entity';
import { SignUpDTO } from './DTO/signup.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("sign-up") 
  async signUp(@Body() body: SignUpDTO): Promise<User> {
    try {
      return await this.userService.signUp({email: body.email, password: body.password, username: body.username})
    }
    catch (err) {
      throw err
    }
  }
}
