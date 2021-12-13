import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { Task, TaskStatus } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters({ status, search }: GetTasksFilterDto): Task[] {
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  createTask({ title, description }: CreateTaskDto): Task {
    const task: Task = {
      id: randomUUID(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID: ${id} not found`);
    }
    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks.filter((task) => task.id === found.id);
  }

  updateTaskStatus({ id, status }: { id: string; status: TaskStatus }) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
