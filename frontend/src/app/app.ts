import { Component } from '@angular/core';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskDashboardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
