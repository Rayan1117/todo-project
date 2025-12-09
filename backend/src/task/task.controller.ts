import { Body, Controller, Get, Headers, Inject, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDTO } from './DTO/task.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Controller('task')

export class TaskController {
  constructor(private readonly taskService: TaskService) {}

    @Inject(UserService) userService: UserService;
    
    @UseGuards(AuthGuard('jwt'))
    @Get("/get-user-tasks")
    async getTask(@Req() req): Promise<Task[]> {
      try {
        const userId = await this.userService.getUID(req.user.email)
        return await this.taskService.getTasks(userId)
      }
      catch (err) {
        return err.message
      }
    }

    @UseGuards(AuthGuard('jwt'))
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
