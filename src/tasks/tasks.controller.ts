import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTaskDto } from './dto/create-task.dto';
import { FitlerTaskDto } from './dto/filter-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(
    @Query(ValidationPipe) filterTaskDto: FitlerTaskDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterTaskDto);
  }

  @Get('/:id')
  getTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTaskbyId(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskdto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskdto);
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskTask: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskTask);
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
