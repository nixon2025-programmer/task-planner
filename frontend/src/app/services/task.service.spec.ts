import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [TaskService, provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(TaskService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('combines search, status and priority query parameters', () => {
    service.getTasks(' guide ', 'TODO', 'MEDIUM').subscribe(tasks => expect(tasks).toEqual([]));
    const request = http.expectOne(req => req.url === 'http://localhost:8080/api/tasks');
    expect(request.request.params.get('search')).toBe('guide');
    expect(request.request.params.get('status')).toBe('TODO');
    expect(request.request.params.get('priority')).toBe('MEDIUM');
    request.flush([]);
  });
});
