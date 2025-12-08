import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './task/db/config/db.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TaskModule, TypeOrmModule.forRoot(
    dbConfig
  ), TaskModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
