import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './DTO/task.dto';

@Controller('task')

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

    @Get("/get-tasks")
    async getAllTasks(): Promise<Task[]> {
      try{
      return await this.taskService.getAllTasks()
      }
      catch(err) {
        return err.message
      }
    }

    @Get("/get-tasks/:userid")
    async getTask(@Param('userid') userId: string): Promise<Task[]> {
      try {
        return await this.taskService.getTasks(userId)
      }
      catch (err) {
        return err.message
      }
    }

    @Post("/create-task")
    async createTask(@Headers("authorization") userId: string, @Body() body: TaskDTO): Promise<string> {
      try{
        return this.taskService.createTask(userId, {title: body.title, description: body.description}).then(_=>"task created successfully")
      }
      catch(err) {
        throw err
      }
    }
}
