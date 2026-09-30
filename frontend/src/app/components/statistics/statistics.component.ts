import { Component, input } from '@angular/core';
import { TaskStatistics } from '../../models/task';

@Component({ selector: 'app-statistics', standalone: true, templateUrl: './statistics.component.html', styleUrl: './statistics.component.css' })
export class StatisticsComponent {
  readonly statistics = input.required<TaskStatistics>();
  readonly loading = input(false);
}
