import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task, TaskStatus } from '../../models/task';

@Component({ selector: 'app-task-card', standalone: true, imports: [DatePipe], templateUrl: './task-card.component.html', styleUrl: './task-card.component.css' })
export class TaskCardComponent {
  readonly task = input.required<Task>();
  readonly compact = input(false);
  readonly busy = input(false);
  readonly overdue = input(false);
  readonly statusChange = output<TaskStatus>();
  readonly remove = output<void>();
  readonly statuses: ReadonlyArray<{ value: TaskStatus; label: string }> = [
    { value: 'TODO', label: 'To do' }, { value: 'IN_PROGRESS', label: 'In progress' }, { value: 'DONE', label: 'Done' }
  ];

  statusLabel(status: TaskStatus): string { return this.statuses.find(item => item.value === status)?.label ?? status; }
  onStatusChange(event: Event): void { this.statusChange.emit((event.target as HTMLSelectElement).value as TaskStatus); }
}
