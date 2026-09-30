# Task Planner

A full-stack Task Planner application developed for a Software
Engineering Graduate Programme assessment.

The application provides an Angular task-management dashboard backed by
a Java Spring Boot REST API. Users can create and manage tasks, search
and filter work, move tasks through workflow states, identify overdue
work, and view task statistics. Local development uses persistent H2
storage, while the deployed backend uses PostgreSQL.

## Live Deployment

-   **Frontend:** Deployed as a Render Static Site. Add the exact public
    frontend URL here before the final README commit.
-   **Backend API:** https://task-planner-api-7v53.onrender.com
-   **API health/statistics:**
    https://task-planner-api-7v53.onrender.com/api/tasks/statistics
-   **Repository:** https://github.com/nixon2025-programmer/task-planner
-   **Deployed Render commit:**
    `1e016beb1d946131a5d81e4fa3b6d12503b6ee1b`

No login or authentication is required.

------------------------------------------------------------------------

## Features

-   Create tasks with a title, description, due date, and priority.
-   Automatically generate a unique ID for every task.
-   Track task creation and last-update timestamps.
-   Priority levels: `LOW`, `MEDIUM`, `HIGH`.
-   Task statuses: `TODO`, `IN_PROGRESS`, `DONE`.
-   Search tasks by title.
-   Filter tasks by status.
-   Filter tasks by priority.
-   Combine search and filtering.
-   Move tasks between To Do, In Progress, and Done.
-   Automatically identify overdue tasks.
-   Display task counts by status and overdue state.
-   Validate task input on the backend.
-   Persist task data across application restarts.
-   Responsive Angular user interface.
-   RESTful backend API.

------------------------------------------------------------------------

## Technology Stack

### Frontend

-   Angular 20.3.32
-   TypeScript
-   HTML5
-   CSS3
-   Angular HttpClient

### Backend

-   Java
-   Spring Boot
-   Spring Web
-   Spring Data JPA
-   Jakarta Bean Validation
-   Hibernate
-   Maven 3.9.9

### Database

**Local Development** - H2 file-based database

**Production** - PostgreSQL

### Deployment

The production architecture is:

``` text
Angular Frontend (Render Static Site)
        |
        | HTTPS / REST / JSON
        v
Spring Boot API (Render Web Service / Docker)
        |
        | Spring Data JPA / Hibernate
        v
PostgreSQL (Render)
```

The Angular application is built with `npm run build` and published as a
Render Static Site. The Spring Boot backend is built and deployed as a
Dockerized Render Web Service. PostgreSQL provides production
persistence independently of the application container.

Production database credentials are supplied through environment
variables and are not stored in source control.

## Deployment Access

No authentication or login is required.

The deployed Angular frontend provides the user-facing Task Planner
interface. The deployed Spring Boot API is publicly accessible at:

``` text
https://task-planner-api-7v53.onrender.com
```

The production statistics endpoint can be opened directly in a browser
to verify that the API is running:

``` text
https://task-planner-api-7v53.onrender.com/api/tasks/statistics
```

Through the application, users can:

1.  Create tasks with title, description, due date and priority.
2.  Search tasks by title.
3.  Filter tasks by status and priority.
4.  Move tasks between To Do, In Progress and Done.
5.  View overdue tasks.
6.  View task counts and overdue statistics.

Before the final README commit, replace the frontend placeholder in the
**Live Deployment** section with the exact Render Static Site URL.

------------------------------------------------------------------------

# Security and Data Privacy

-   Database credentials are supplied using environment variables.
-   Secrets are not intentionally committed to source control.
-   Local database files are ignored by Git.
-   `.env` files are ignored.
-   Sample records contain only fictional demonstration data.
-   No real customer or confidential company data is required.

------------------------------------------------------------------------

# AI Usage Disclosure

AI tools were used as development assistants during this assessment.

### Tools Used

-   ChatGPT
-   OpenAI Codex

### Scope of Assistance

AI assistance was used for:

-   Architecture planning
-   Implementation guidance
-   Angular UI development and refinement
-   Debugging assistance
-   Test planning
-   Deployment guidance
-   Documentation support

### Verification

AI-generated or AI-suggested output was reviewed before integration.

The application was compiled and run during development, the REST API
and frontend were manually exercised, and build/test commands were used
to identify implementation and configuration issues.

The required task-management behaviours were also checked against the
assessment acceptance scenario.

The final source code, configuration, deployment, and submission
remained under developer review and control.

No real customer or confidential company data was used.

------------------------------------------------------------------------

# Known Limitations

The project is intentionally scoped to the assessment requirements.

The following features are not implemented:

-   User authentication
-   Multiple user accounts
-   Task ownership
-   Multi-tenancy
-   Team collaboration
-   Email notifications
-   Push notifications
-   Recurring tasks

The free hosting tier may also introduce a short startup delay after
periods of inactivity.

------------------------------------------------------------------------

# Repository

Repository:

``` text
https://github.com/nixon2025-programmer/task-planner
```

------------------------------------------------------------------------

# Deployment & Submission

**Public Application URL**

The Angular frontend has been deployed successfully as a Render Static
Site. Insert the exact URL shown on the Render `task-planner-web`
service before making the final README commit.

**Backend API URL**

``` text
https://task-planner-api-7v53.onrender.com
```

**Backend Verification Endpoint**

``` text
https://task-planner-api-7v53.onrender.com/api/tasks/statistics
```

**Repository**

``` text
https://github.com/nixon2025-programmer/task-planner
```

**Deployed Render Commit**

``` text
1e016beb1d946131a5d81e4fa3b6d12503b6ee1b
```

The submitted commit SHA should identify the exact source version
intended for assessment. If another commit is made after this README
update, run `git rev-parse HEAD` and update the submitted SHA
accordingly.

------------------------------------------------------------------------
