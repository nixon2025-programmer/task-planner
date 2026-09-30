import { Routes } from '@angular/router';
import { TaskDashboardComponent } from './components/task-dashboard/task-dashboard.component';

export const routes: Routes = [{ path: '', component: TaskDashboardComponent }, { path: '**', redirectTo: '' }];
