import { Component, input, output } from '@angular/core';
import { Task, TaskStatus } from '../../models/task';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({ selector: 'app-task-list', standalone: true, imports: [TaskCardComponent], templateUrl: './task-list.component.html', styleUrl: './task-list.component.css' })
export class TaskListComponent {
  readonly tasks = input.required<Task[]>();
  readonly loading = input(false);
  readonly filtered = input(false);
  readonly busyTaskId = input<number | null>(null);
  readonly overdueIds = input<ReadonlySet<number>>(new Set());
  readonly statusChange = output<{ task: Task; status: TaskStatus }>();
  readonly remove = output<Task>();
}
