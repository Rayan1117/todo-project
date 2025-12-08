import { Controller, Get, Param } from '@nestjs/common';
import { TaskService } from './task.service';

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

    @Get("/get-task/:userid")
    async getTask(@Param('userid') userId: string): Promise<Task[]> {
      try {
        return await this.taskService.getTasks(userId)
      }
      catch (err) {
        return err.message
      }
    }
}
