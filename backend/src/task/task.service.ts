import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './db/entities/task.entity';
import { Repository } from 'typeorm';
import { User } from './db/entities/user.entity';
import { UserNotFoundException } from './exceptions/usernotfound.exception';
import { v4 as uuid } from "uuid"
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private readonly taskRepoService: Repository<Task>, @Inject(UserService) private readonly userService: UserService) { }

    async getTasks(userId: string): Promise<Task[]> {
        const user = await this.userService.getUser(userId)
        if (!user) {
            throw new UserNotFoundException()
        }
        console.log(user);
        
        return await this.taskRepoService.findBy({ user: user })
    }

    async createTask(userId: string, taskData: TaskData): Promise<void> {
        try {
            const taskId: string = uuid()
            const user: User | null = await this.userService.getUser(userId)
            const task: Task = this.taskRepoService.create({ user: user!, taskId, taskName: taskData.title, taskDescription: taskData.description })
            await this.taskRepoService.save(task)
        }
        catch(err) {
            throw err
        }
    }
}

interface TaskData {
    title: string
    description: string
}