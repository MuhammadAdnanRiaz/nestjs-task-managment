import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { FitlerTaskDto } from './dto/filter-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterTaskDto: FitlerTaskDto): Promise<Task[]> {
    const { text, status } = filterTaskDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (text) {
      query.andWhere('task.title LIKE :text OR task.description LIKE :text', {
        text: `%${text}%`,
      });
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }
}
