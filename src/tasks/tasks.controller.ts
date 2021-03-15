import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { FitlerTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.modal';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@Query() filterTaskDto: FitlerTaskDto): Task[] {
    if (Object.entries(filterTaskDto).length) {
      return this.taskService.getFilterTask(filterTaskDto);
    }
    return this.taskService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskdto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskdto);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() updateTaskTask: UpdateTaskDto) {
    return this.taskService.updateTask(id, updateTaskTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    this.taskService.deleteTask(id);
  }
}
