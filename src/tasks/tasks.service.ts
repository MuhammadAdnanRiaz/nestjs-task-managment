import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FitlerTaskDto } from './dto/filter-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private readonly taskRepository: TaskRepository,
  ) {}

  async getTasks(filterTaskDto: FitlerTaskDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterTaskDto);
  }

  async getTaskbyId(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;
    const task = await this.getTaskbyId(id);
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    await task.save();
    return task;
  }

  async deleteTask(id: number): Promise<void> {
    const results = await this.taskRepository.delete(id);
    const { affected } = results;

    if (affected === 0) {
      throw new NotFoundException();
    }
  }
}
