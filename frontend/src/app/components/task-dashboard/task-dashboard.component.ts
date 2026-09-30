import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, finalize, forkJoin } from 'rxjs';
import { Priority, Task, TaskStatistics, TaskStatus } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { StatisticsComponent } from '../statistics/statistics.component';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, StatisticsComponent, TaskFormComponent, TaskListComponent, TaskCardComponent],
  templateUrl: './task-dashboard.component.html',
  styleUrl: './task-dashboard.component.css'
})
export class TaskDashboardComponent implements OnInit {
  private readonly taskService = inject(TaskService);
  private readonly destroyRef = inject(DestroyRef);
  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly emptyStatistics: TaskStatistics = { total: 0, todo: 0, inProgress: 0, done: 0, overdue: 0 };
  tasks: Task[] = [];
  overdueTasks: Task[] = [];
  statistics = this.emptyStatistics;
  statusFilter: TaskStatus | '' = '';
  priorityFilter: Priority | '' = '';
  loading = true;
  refreshing = false;
  busyTaskId: number | null = null;
  errorMessage = '';

  ngOnInit(): void {
    this.refreshAll();
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef)).subscribe(() => this.loadTasks());
  }

  get hasFilters(): boolean { return !!(this.searchControl.value.trim() || this.statusFilter || this.priorityFilter); }
  get overdueIds(): ReadonlySet<number> { return new Set(this.overdueTasks.flatMap(task => task.id === undefined ? [] : [task.id])); }

  refreshAll(): void {
    this.errorMessage = '';
    this.refreshing = true;
    forkJoin({
      tasks: this.taskService.getTasks(this.searchControl.value, this.statusFilter || undefined, this.priorityFilter || undefined),
      overdue: this.taskService.getOverdueTasks(),
      statistics: this.taskService.getStatistics()
    }).pipe(finalize(() => { this.loading = false; this.refreshing = false; })).subscribe({
      next: ({ tasks, overdue, statistics }) => { this.tasks = tasks; this.overdueTasks = overdue; this.statistics = statistics; },
      error: () => this.errorMessage = 'Unable to connect to the Task Planner service. Check that the backend is running and try again.'
    });
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';
    this.taskService.getTasks(this.searchControl.value, this.statusFilter || undefined, this.priorityFilter || undefined)
      .pipe(finalize(() => this.loading = false)).subscribe({
        next: tasks => this.tasks = tasks,
        error: () => this.errorMessage = 'Tasks could not be loaded. Please try again.'
      });
  }

  onStatusFilter(event: Event): void { this.statusFilter = (event.target as HTMLSelectElement).value as TaskStatus | ''; this.loadTasks(); }
  onPriorityFilter(event: Event): void { this.priorityFilter = (event.target as HTMLSelectElement).value as Priority | ''; this.loadTasks(); }
  clearFilters(): void { this.statusFilter = ''; this.priorityFilter = ''; this.searchControl.setValue('', { emitEvent: false }); this.loadTasks(); }

  updateStatus(task: Task, status: TaskStatus): void {
    if (task.id === undefined || task.status === status) return;
    this.busyTaskId = task.id;
    this.errorMessage = '';
    this.taskService.updateStatus(task.id, status).pipe(finalize(() => this.busyTaskId = null)).subscribe({
      next: () => this.refreshAll(),
      error: () => this.errorMessage = 'Task status could not be updated. Please try again.'
    });
  }

  deleteTask(task: Task): void {
    if (task.id === undefined || !window.confirm(`Delete “${task.title}”? This action cannot be undone.`)) return;
    this.busyTaskId = task.id;
    this.errorMessage = '';
    this.taskService.deleteTask(task.id).pipe(finalize(() => this.busyTaskId = null)).subscribe({
      next: () => this.refreshAll(),
      error: () => this.errorMessage = 'Task could not be deleted. Please try again.'
    });
  }
}
