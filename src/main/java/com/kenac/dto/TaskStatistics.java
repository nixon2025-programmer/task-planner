package com.kenac.dto;

public class TaskStatistics {

    private final long total;
    private final long todo;
    private final long inProgress;
    private final long done;
    private final long overdue;

    public TaskStatistics(
            long total,
            long todo,
            long inProgress,
            long done,
            long overdue) {

        this.total = total;
        this.todo = todo;
        this.inProgress = inProgress;
        this.done = done;
        this.overdue = overdue;
    }

    public long getTotal() {
        return total;
    }

    public long getTodo() {
        return todo;
    }

    public long getInProgress() {
        return inProgress;
    }

    public long getDone() {
        return done;
    }

    public long getOverdue() {
        return overdue;
    }
}