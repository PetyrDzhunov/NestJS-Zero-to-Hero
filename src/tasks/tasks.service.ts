import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((t) => t.id === id);
  }

  deleteTaskById(id: string): string {
    const taskToBeDeleted = this.tasks.find((t) => t.id);
    const index = this.tasks.findIndex((t) => t.id === id);
    if (taskToBeDeleted) {
      this.tasks.splice(index, 1);
      return `Sucessfully deleted ${taskToBeDeleted.title} task with id ${taskToBeDeleted.id}`;
    }
    return 'Something went wrong';
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
}
