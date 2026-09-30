package com.kenac.controller;

import com.kenac.dto.StatusUpdateRequest;
import com.kenac.dto.TaskStatistics;
import com.kenac.model.Priority;
import com.kenac.model.Task;
import com.kenac.model.TaskStatus;
import com.kenac.service.TaskService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(
            @Valid @RequestBody Task task) {

        return service.createTask(task);
    }

    @GetMapping
    public List<Task> getTasks(
            @RequestParam(required = false)
            String search,

            @RequestParam(required = false)
            TaskStatus status,

            @RequestParam(required = false)
            Priority priority) {

        return service.getTasks(
                search,
                status,
                priority
        );
    }

    @GetMapping("/overdue")
    public List<Task> getOverdueTasks() {
        return service.getOverdueTasks();
    }

    @GetMapping("/statistics")
    public TaskStatistics getStatistics() {
        return service.getStatistics();
    }

    @GetMapping("/{id}")
    public Task getTask(
            @PathVariable Long id) {

        return service.getTask(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(
            @PathVariable Long id,
            @Valid @RequestBody Task task) {

        return service.updateTask(id, task);
    }

    @PatchMapping("/{id}/status")
    public Task updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody
            StatusUpdateRequest request) {

        return service.updateStatus(
                id,
                request.getStatus()
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(
            @PathVariable Long id) {

        service.deleteTask(id);
    }
}