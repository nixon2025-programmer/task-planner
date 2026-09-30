package com.kenac.service;

import com.kenac.dto.TaskStatistics;
import com.kenac.exception.TaskNotFoundException;
import com.kenac.model.Priority;
import com.kenac.model.Task;
import com.kenac.model.TaskStatus;
import com.kenac.repository.TaskRepository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    public Task createTask(Task task) {

        task.setId(null);

        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.TODO);
        }

        return repository.save(task);
    }

    public List<Task> getTasks(
            String search,
            TaskStatus status,
            Priority priority) {

        Specification<Task> specification =
                Specification.where(null);

        if (search != null && !search.isBlank()) {

            specification = specification.and(
                    (root, query, builder) ->
                            builder.like(
                                    builder.lower(
                                            root.get("title")),
                                    "%" +
                                            search.toLowerCase() +
                                            "%"
                            )
            );
        }

        if (status != null) {

            specification = specification.and(
                    (root, query, builder) ->
                            builder.equal(
                                    root.get("status"),
                                    status
                            )
            );
        }

        if (priority != null) {

            specification = specification.and(
                    (root, query, builder) ->
                            builder.equal(
                                    root.get("priority"),
                                    priority
                            )
            );
        }

        return repository.findAll(specification);
    }

    public Task getTask(Long id) {

        return repository.findById(id)
                .orElseThrow(
                        () -> new TaskNotFoundException(id)
                );
    }

    public Task updateTask(
            Long id,
            Task request) {

        Task task = getTask(id);

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setDueDate(request.getDueDate());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());

        return repository.save(task);
    }

    public Task updateStatus(
            Long id,
            TaskStatus status) {

        Task task = getTask(id);

        task.setStatus(status);

        return repository.save(task);
    }

    public void deleteTask(Long id) {

        Task task = getTask(id);

        repository.delete(task);
    }

    public List<Task> getOverdueTasks() {

        LocalDate today = LocalDate.now();

        return repository
                .findByDueDateBeforeAndStatusNot(
                        today,
                        TaskStatus.DONE
                );
    }

    public TaskStatistics getStatistics() {

        LocalDate today = LocalDate.now();

        long total = repository.count();

        long todo =
                repository.countByStatus(
                        TaskStatus.TODO);

        long inProgress =
                repository.countByStatus(
                        TaskStatus.IN_PROGRESS);

        long done =
                repository.countByStatus(
                        TaskStatus.DONE);

        long overdue =
                repository
                        .countByDueDateBeforeAndStatusNot(
                                today,
                                TaskStatus.DONE
                        );

        return new TaskStatistics(
                total,
                todo,
                inProgress,
                done,
                overdue
        );
    }
}