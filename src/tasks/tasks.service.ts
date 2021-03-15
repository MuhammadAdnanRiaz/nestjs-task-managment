import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.modal';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FitlerTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getFilterTask(filterTaskDto: FitlerTaskDto): Task[] {
    return this.tasks.filter(
      (task) =>
        task.status === filterTaskDto.status ||
        task.title.includes(filterTaskDto.text) ||
        task.description.includes(filterTaskDto.text),
    );
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const found = this.getTaskById(id);
    const index = this.tasks.findIndex((task) => task.id === found.id);
    this.tasks[index] = {
      ...this.tasks[index],
      ...updateTaskDto,
    };
    return this.tasks[index];
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
}
