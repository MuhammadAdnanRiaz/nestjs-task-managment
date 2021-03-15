import { TaskStatus } from '../task.modal';

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
