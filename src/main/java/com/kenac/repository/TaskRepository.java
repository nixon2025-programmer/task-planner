package com.kenac.repository;

import com.kenac.model.Priority;
import com.kenac.model.Task;
import com.kenac.model.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository
        extends JpaRepository<Task, Long>,
        JpaSpecificationExecutor<Task> {

    List<Task> findByDueDateBeforeAndStatusNot(
            LocalDate date,
            TaskStatus status
    );

    long countByStatus(TaskStatus status);

    long countByDueDateBeforeAndStatusNot(
            LocalDate date,
            TaskStatus status
    );
}
