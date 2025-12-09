import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './db/entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), UserModule],
  controllers: [TaskController],
  providers: [TaskService, JwtStrategy],
})
export class TaskModule {}