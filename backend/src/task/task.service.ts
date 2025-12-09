import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './db/entities/task.entity';
import { Repository } from 'typeorm';
import { User } from './db/entities/user.entity';
import { UserNotFoundException } from './exceptions/usernotfound.exception';
import { v4 as uuid } from "uuid"

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private readonly taskRepoService: Repository<Task>, @InjectRepository(User) private readonly userRepoService: Repository<User>) { }
    async getAllTasks(): Promise<Task[]> {
        return await this.taskRepoService.find()
    }

    async getTasks(userId: string): Promise<Task[]> {
        const user = await this.userRepoService.findOne({ where: { userId } })
        if (!user) {
            throw new UserNotFoundException()
        }
        return await this.taskRepoService.findBy({ userId: user })
    }

    async createTask(userId: string, taskData: TaskData): Promise<void> {
        try {
            const taskId: string = uuid()
            const user: User | null = await this.userRepoService.findOne({ where: { userId } })
            const task: Task = this.taskRepoService.create({ userId: user!, taskId, taskName: taskData.title, taskDescription: taskData.description })
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