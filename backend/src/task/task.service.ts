import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './db/entities/task.entity';
import { Repository } from 'typeorm';
import { User } from './db/entities/user.entity';
import { UserNotFoundException } from './exceptions/usernotfound.exception';

@Injectable()
export class TaskService {
    constructor (@InjectRepository(Task) private readonly taskRepoService: Repository<Task>, @InjectRepository(User) private readonly userRepoService: Repository<User>){}
    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepoService.find()
    }

    async getTasks(userId: string): Promise<Task[]> {
        const user = await this.userRepoService.findOne({where: {userId: userId}})
        if (!user) {
            throw new UserNotFoundException()
        }
        return await this.taskRepoService.findBy({userId: user})
    }
}
