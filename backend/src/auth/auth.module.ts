import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/task/db/entities/user.entity';
import { JwtStrategy } from './guards/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]) ,PassportModule, JwtModule.register({
    secret: "secret123",
    signOptions: {
      expiresIn: "1h",
      algorithm: "HS256",
    }
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
