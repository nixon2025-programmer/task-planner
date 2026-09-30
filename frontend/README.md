# Task Planner

A full-stack Task Planner application developed as part of a Software Engineering Graduate Programme assessment.

The application enables users to create and manage tasks, track progress, search and filter work, identify overdue tasks, and view task statistics through an Angular frontend backed by a Java Spring Boot REST API.

---

## Features

- Create tasks with a title, description, due date, and priority.
- Automatically generate a unique ID for every task.
- Track task creation and last-update timestamps.
- Priority levels: `LOW`, `MEDIUM`, `HIGH`.
- Task statuses: `TODO`, `IN_PROGRESS`, `DONE`.
- Search tasks by title.
- Filter tasks by status.
- Filter tasks by priority.
- Combine search and filtering.
- Move tasks between To Do, In Progress, and Done.
- Automatically identify overdue tasks.
- Display task counts by status and overdue state.
- Validate task input on the backend.
- Persist task data across application restarts.
- Responsive Angular user interface.
- RESTful backend API.

---

## Technology Stack

### Frontend

- Angular 20.3.32
- TypeScript
- HTML5
- CSS3
- Angular HttpClient

### Backend

- Java
- Spring Boot
- Spring Web
- Spring Data JPA
- Jakarta Bean Validation
- Hibernate
- Maven 3.9.9

### Database

**Local Development**
- H2 file-based database

**Production**
- PostgreSQL

### Deployment

- Render
- Docker
- PostgreSQL
- Environment-based production configuration

### Development Environment

- Java JDK 19.0.1
- Apache Maven 3.9.9
- Node.js 22.15.0
- npm 11.3.0
- Angular 20.3.32
- Windows 11

---

## Architecture

The project uses a decoupled client-server architecture.

```text
+----------------------+
|   Angular Frontend   |
+----------+-----------+
           |
           | HTTP / REST / JSON
           v
+----------+-----------+
| Spring Boot REST API |
+----------+-----------+
           |
           | Spring Data JPA / Hibernate
           v
+----------+-----------+
|       Database       |
| H2 Local/PostgreSQL  |
+----------------------+
```

The backend follows a layered architecture:

```text
Controller
    |
    v
Service
    |
    v
Repository
    |
    v
Database
```

### Backend Responsibilities

The Spring Boot backend is responsible for:

- REST endpoint exposure
- Input validation
- Task creation and modification
- Task status transitions
- Search and filtering
- Overdue-task evaluation
- Statistics calculation
- Database persistence
- Error handling

### Frontend Responsibilities

The Angular frontend is responsible for:

- Displaying the task dashboard
- Task creation forms
- Search controls
- Status and priority filters
- Task status management
- Displaying statistics
- Highlighting overdue tasks
- Loading and error states
- Communication with the REST API

---

## Project Structure

```text
task-planner/
│
├── frontend/                         # Angular application
│
├── src/
│   ├── main/
│   │   ├── java/com/kenac/
│   │   │   ├── controller/           # REST controllers
│   │   │   ├── dto/                  # Data Transfer Objects
│   │   │   ├── exception/            # Exception handling
│   │   │   ├── model/                # Entities and enums
│   │   │   ├── repository/           # Spring Data repositories
│   │   │   ├── service/              # Business logic
│   │   │   └── TaskPlannerApplication.java
│   │   │
│   │   └── resources/
│   │       ├── application.properties
│   │       └── application-prod.properties
│   │
│   └── test/                          # Backend tests
│
├── data/                              # Local H2 data (ignored by Git)
├── requests.http                      # Reproducible API requests
├── Dockerfile                         # Production backend container
├── pom.xml                            # Maven configuration
├── .gitignore
└── README.md
```

---

# Getting Started

## Prerequisites

For local development, install:

- Java JDK 19 or compatible version
- Apache Maven 3.9.x
- Node.js 22.x
- npm 11.x

Verify your installation:

```bash
java -version
mvn -version
node --version
npm --version
```

---

# Running Locally

## 1. Clone the Repository

```bash
git clone https://github.com/nixon2025-programmer/task-planner.git
cd task-planner
```

---

## 2. Start the Backend

From the project root:

```bash
mvn spring-boot:run
```

Alternatively, run:

```text
TaskPlannerApplication.java
```

from IntelliJ IDEA or another Java IDE.

The backend runs at:

```text
http://localhost:8080
```

Task API:

```text
http://localhost:8080/api/tasks
```

Statistics endpoint:

```text
http://localhost:8080/api/tasks/statistics
```

---

## 3. Start the Angular Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend runs at:

```text
http://localhost:4200
```

No login is required.

---

# Database Persistence

## Local Development

Local development uses an H2 file-based database.

The database is stored under:

```text
./data/taskplanner
```

Unlike an in-memory H2 database, the file-based database allows task records to survive application restarts.

Database files are excluded from Git because they are runtime-generated data.

---

## Production

The deployed application uses PostgreSQL.

The Spring Boot production profile reads database configuration from environment variables:

```text
DB_URL
DB_USERNAME
DB_PASSWORD
SPRING_PROFILES_ACTIVE
```

Production uses:

```text
SPRING_PROFILES_ACTIVE=prod
```

Secrets and database credentials are not committed to the repository.

---

# REST API

Local base endpoint:

```text
http://localhost:8080/api/tasks
```

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/tasks` | Create a task |
| `GET` | `/api/tasks` | Retrieve all tasks |
| `GET` | `/api/tasks?search={query}` | Search by title |
| `GET` | `/api/tasks?status={STATUS}` | Filter by status |
| `GET` | `/api/tasks?priority={PRIORITY}` | Filter by priority |
| `GET` | `/api/tasks?search=...&status=...&priority=...` | Combined filtering |
| `GET` | `/api/tasks/{id}` | Retrieve a task |
| `PUT` | `/api/tasks/{id}` | Update a task |
| `PATCH` | `/api/tasks/{id}/status` | Change task status |
| `DELETE` | `/api/tasks/{id}` | Delete a task |
| `GET` | `/api/tasks/overdue` | Retrieve overdue tasks |
| `GET` | `/api/tasks/statistics` | Retrieve task statistics |

---

# Example API Requests

## Create a Task

```http
POST /api/tasks
Content-Type: application/json
```

```json
{
  "title": "Review onboarding guide",
  "description": "Review the onboarding material and prepare any questions.",
  "dueDate": "2026-10-01",
  "priority": "MEDIUM",
  "status": "TODO"
}
```

A successful request generates the task ID and timestamps automatically.

---

## Update Task Status

```http
PATCH /api/tasks/1/status
Content-Type: application/json
```

```json
{
  "status": "DONE"
}
```

---

## Search by Title

```http
GET /api/tasks?search=onboarding
```

---

## Filter by Priority

```http
GET /api/tasks?priority=MEDIUM
```

---

## Filter by Status

```http
GET /api/tasks?status=TODO
```

---

## Combined Search and Filtering

```http
GET /api/tasks?search=review&status=TODO&priority=MEDIUM
```

---

## Get Overdue Tasks

```http
GET /api/tasks/overdue
```

---

## Get Statistics

```http
GET /api/tasks/statistics
```

Example response:

```json
{
  "total": 2,
  "todo": 1,
  "inProgress": 0,
  "done": 1,
  "overdue": 0
}
```

---

# Domain Rules

## Task Properties

Each task contains:

- Unique ID
- Title
- Description
- Due date
- Priority
- Status
- Creation timestamp
- Last-update timestamp

---

## Priority Values

The accepted priorities are:

```text
LOW
MEDIUM
HIGH
```

Any unsupported priority value is rejected.

---

## Status Values

The accepted task statuses are:

```text
TODO
IN_PROGRESS
DONE
```

Any unsupported status value is rejected.

---

## Validation

The backend validates incoming task data.

The application rejects:

- Empty task titles
- Invalid dates/date formats
- Invalid priority values
- Invalid status values

Past due dates are intentionally permitted.

This allows users to record existing outstanding work and allows the assessment's overdue scenario to be reproduced.

---

# Overdue Logic

A task is considered overdue when:

```text
dueDate < today
AND
status != DONE
```

Therefore:

- A task due today is not overdue.
- A future task is not overdue.
- A past-due `TODO` task is overdue.
- A past-due `IN_PROGRESS` task is overdue.
- A past-due `DONE` task is not overdue.

When an overdue task is changed to `DONE`, it is automatically excluded from the overdue result and overdue count.

---

# Timezone

The application uses:

```text
Africa/Harare
```

as its documented reference timezone for application date handling.

---

# Statistics

The backend provides dashboard statistics including:

```text
Total Tasks
To Do
In Progress
Done
Overdue
```

Statistics are calculated by the backend rather than derived solely from the currently filtered frontend view.

This ensures filtering the displayed task list does not incorrectly alter the overall task statistics.

---

# Testing

## Backend

Run from the project root:

```bash
mvn test
```

For a production package/build:

```bash
mvn clean package
```

or:

```bash
mvn clean package -DskipTests
```

---

## Frontend

From the frontend directory:

```bash
cd frontend
npm test -- --watch=false
```

Production build verification:

```bash
npm run build
```

---

# Manual API Testing

The repository includes:

```text
requests.http
```

This provides reproducible HTTP requests for testing the API.

The file can be used with IntelliJ IDEA's HTTP client or adapted for tools such as Postman.

It contains requests for:

- Creating tasks
- Creating past-due tasks
- Listing tasks
- Searching tasks
- Filtering by status
- Filtering by priority
- Updating task status
- Checking overdue tasks
- Checking statistics

---

# Acceptance Scenario

The required workflow can be reproduced as follows.

### 1. Create a Normal Task

Create:

```text
Title: Review onboarding guide
Priority: MEDIUM
Due Date: Tomorrow
Status: TODO
```

### 2. Create a Past-Due Task

Create another task whose due date is before today.

The overdue count should increase.

### 3. Complete the Past-Due Task

Change the task status to:

```text
DONE
```

The task should disappear from the overdue list and the overdue count should decrease.

### 4. Filter by Priority

Select a priority such as:

```text
MEDIUM
```

Only matching tasks should be displayed.

### 5. Verify Persistence

Restart the locally running backend.

The previously stored tasks remain available because local development uses a file-based H2 database.

The production deployment uses PostgreSQL rather than application memory for persistent storage.

---

# Design Decisions

## Layered Backend Architecture

The backend uses:

```text
Controller -> Service -> Repository -> Database
```

This separates HTTP handling, business logic, and persistence responsibilities.

---

## Backend-Authoritative Statistics

Statistics and overdue counts are calculated by the backend.

This prevents frontend search/filter state from incorrectly changing the overall statistics.

---

## Enum-Based Status and Priority

Java enums are used for task status and priority.

This restricts values to the supported domain states and helps prevent invalid data.

The Angular frontend uses corresponding restricted values.

---

## H2 for Local Development

A file-based H2 database was selected for local development because it:

- Requires minimal setup.
- Persists across application restarts.
- Makes the project easy for an assessor to run locally.

---

## PostgreSQL for Production

PostgreSQL is used in production so application data is independent of the deployed web-service filesystem.

This is especially important when deploying containerized applications.

---

## Docker Deployment

The Spring Boot backend is containerized using Docker.

The Docker image performs the Maven build and then runs the packaged Spring Boot application in a Java runtime container.

This provides a reproducible production environment.

---

# Deployment

The production architecture is:

```text
Angular Frontend
       |
       | HTTPS / REST
       v
Spring Boot API
       |
       | Spring Data JPA
       v
PostgreSQL
```

The backend is deployed as a Dockerized Render Web Service.

PostgreSQL provides production persistence.

Environment variables are used for production database configuration so credentials are not stored in source control.

---

## Deployment Access

No authentication or login is required.

Open the deployed application URL in a modern browser.

Users can then:

1. Create tasks.
2. Search tasks.
3. Filter by status or priority.
4. Change task status.
5. View overdue tasks.
6. View dashboard statistics.

---

# Security and Data Privacy

- Database credentials are supplied using environment variables.
- Secrets are not intentionally committed to source control.
- Local database files are ignored by Git.
- `.env` files are ignored.
- Sample records contain only fictional demonstration data.
- No real customer or confidential company data is required.

---

# AI Usage Disclosure

AI tools were used as development assistants during this assessment.

### Tools Used

- ChatGPT
- OpenAI Codex

### Scope of Assistance

AI assistance was used for:

- Architecture planning
- Implementation guidance
- Angular UI development and refinement
- Debugging assistance
- Test planning
- Deployment guidance
- Documentation support

### Verification

AI-generated or AI-suggested output was reviewed before integration.

The application was compiled and run during development, the REST API and frontend were manually exercised, and build/test commands were used to identify implementation and configuration issues.

The required task-management behaviours were also checked against the assessment acceptance scenario.

The final source code, configuration, deployment, and submission remained under developer review and control.

No real customer or confidential company data was used.

---

# Known Limitations

The project is intentionally scoped to the requirements of the assessment.

The following features are not implemented:

- User authentication
- Multiple user accounts
- Task ownership
- Multi-tenancy
- Team collaboration
- Email notifications
- Push notifications
- Recurring tasks

The free hosting tier may also introduce a short startup delay after periods of inactivity.

---

# Repository

Repository:

```text
https://github.com/nixon2025-programmer/task-planner
```

---

# Deployment & Submission

**Public Application URL**

```text
TO BE ADDED AFTER FRONTEND DEPLOYMENT
```

**Backend API URL**

```text
TO BE ADDED AFTER BACKEND DEPLOYMENT
```

**Repository**

```text
https://github.com/nixon2025-programmer/task-planner
```

**Final Commit SHA**

```text
TO BE ADDED AFTER FINAL COMMIT
```

The final submitted SHA should identify the exact source version corresponding to the deployed application.

---