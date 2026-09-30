import { Component, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { CreateTaskRequest, Priority } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({ selector: 'app-task-form', standalone: true, imports: [ReactiveFormsModule], templateUrl: './task-form.component.html', styleUrl: './task-form.component.css' })
export class TaskFormComponent {
  readonly created = output<void>();
  readonly priorities: ReadonlyArray<{ value: Priority; label: string }> = [
    { value: 'LOW', label: 'Low' }, { value: 'MEDIUM', label: 'Medium' }, { value: 'HIGH', label: 'High' }
  ];
  submitting = false;
  serverError = '';
  readonly form;

  constructor(private readonly fb: FormBuilder, private readonly taskService: TaskService) {
    this.form = this.fb.nonNullable.group({
      title: ['', [Validators.required, Validators.pattern(/\S/)]],
      description: [''],
      dueDate: ['', Validators.required],
      priority: ['MEDIUM' as Priority, [Validators.required, Validators.pattern(/^(LOW|MEDIUM|HIGH)$/)]]
    });
  }

  isInvalid(name: 'title' | 'dueDate' | 'priority'): boolean {
    const control = this.form.controls[name];
    return control.invalid && (control.touched || control.dirty);
  }

  submit(): void {
    this.serverError = '';
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const value = this.form.getRawValue();
    const request: CreateTaskRequest = { ...value, title: value.title.trim(), description: value.description.trim(), status: 'TODO' };
    if (!request.title) { this.form.controls.title.setErrors({ required: true }); return; }
    this.submitting = true;
    this.taskService.createTask(request).pipe(finalize(() => this.submitting = false)).subscribe({
      next: () => { this.form.reset({ title: '', description: '', dueDate: '', priority: 'MEDIUM' }); this.created.emit(); },
      error: () => this.serverError = 'Task could not be created. Check the details and try again.'
    });
  }
}
