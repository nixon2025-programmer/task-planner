import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateTaskRequest, Priority, Task, TaskStatistics, TaskStatus } from '../models/task';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/tasks';

  getTasks(search?: string, status?: TaskStatus, priority?: Priority): Observable<Task[]> {
    let params = new HttpParams();
    if (search?.trim()) params = params.set('search', search.trim());
    if (status) params = params.set('status', status);
    if (priority) params = params.set('priority', priority);
    return this.http.get<Task[]>(this.apiUrl, { params });
  }
  getTask(id: number): Observable<Task> { return this.http.get<Task>(`${this.apiUrl}/${id}`); }
  createTask(task: CreateTaskRequest): Observable<Task> { return this.http.post<Task>(this.apiUrl, task); }
  updateTask(id: number, task: CreateTaskRequest): Observable<Task> { return this.http.put<Task>(`${this.apiUrl}/${id}`, task); }
  updateStatus(id: number, status: TaskStatus): Observable<Task> { return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, { status }); }
  deleteTask(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  getOverdueTasks(): Observable<Task[]> { return this.http.get<Task[]>(`${this.apiUrl}/overdue`); }
  getStatistics(): Observable<TaskStatistics> { return this.http.get<TaskStatistics>(`${this.apiUrl}/statistics`); }
}
