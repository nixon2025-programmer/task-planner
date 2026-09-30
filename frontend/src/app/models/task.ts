export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Task {
  id?: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskStatistics { total: number; todo: number; inProgress: number; done: number; overdue: number; }
export type CreateTaskRequest = Pick<Task, 'title' | 'description' | 'dueDate' | 'priority' | 'status'>;
