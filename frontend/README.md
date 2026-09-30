# Task Planner

A full-stack Task Planner application developed as part of a Software Engineering assessment.

The application helps individuals organize work, identify tasks requiring attention, track progress, and manage overdue work through an interactive Angular UI powered by a robust Spring Boot backend.

---

## Features

- **Task Creation & Management:** Create tasks with title, description, due date, and priority.
- **Auto-Generated Metadata:** Unique task IDs, creation timestamps, and last-update timestamps.
- **Priority Levels:** `LOW`, `MEDIUM`, `HIGH`.
- **Task Statuses:** `TODO`, `IN_PROGRESS`, `DONE`.
- **Search & Filtering:** Search by title, filter by status, filter by priority, or combine search and filters.
- **Workflow & Status Updates:** Smoothly transition tasks between statuses.
- **Overdue Detection:** Automated tracking of past-due pending tasks.
- **Dashboard Statistics:** Real-time summary counts grouped by status and overdue state.
- **Persistent Storage:** Data survives backend and application restarts using a file-based database.
- **Input Validation:** Comprehensive server-side and client-side validation.
- **Responsive UI:** Clean, reactive web interface built with Angular.

---

## Technology Stack

### Frontend
- **Framework:** Angular 20.3.32
- **Language:** TypeScript, HTML5, CSS3
- **HTTP Client:** Angular HttpClient

### Backend
- **Framework:** Spring Boot (Java 19)
- **Modules:** Spring Web, Spring Data JPA, Jakarta Bean Validation
- **Build Tool:** Apache Maven 3.9.9

### Database & Storage
- **Database:** H2 File-Based Database

### Development Environment
- **Java JDK:** 19.0.1
- **Node.js:** 22.15.0
- **npm:** 11.3.0
- **OS:** Windows 11

---

## Architecture

The system uses a decoupled client-server architecture.

```text
  +-------------------+
  |  Angular Frontend |
  +---------+---------+
            |
            | HTTP / REST (JSON)
            v
  +---------+---------+
  |  Spring Boot API  |
  +---------+---------+
            |
            | Spring Data JPA / Hibernate
            v
  +---------+---------+
  |  H2 File Database |
  +-------------------+
```

### Layered Backend Structure

```text
Controller  -->  Service  -->  Repository  -->  Database
```

* **Backend Responsibilities:** Business rule enforcement, validation, task persistence, search/filtering logic, status state transitions, overdue evaluation, statistical aggregations, and REST endpoint exposure.
* **Frontend Responsibilities:** Presenting the task dashboard, task creation forms, search/filter controls, displaying real-time statistics, overdue task highlights, state management, loading/error handling, and REST communication.

---

## Project Structure

```text
task-planner/
├── frontend/                  # Angular Web Application
├── src/
│   ├── main/
│   │   ├── java/com/kenac/
│   │   │   ├── controller/    # REST API Controllers
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── exception/     # Exception Handlers
│   │   │   ├── model/         # JPA Entities & Enums
│   │   │   ├── repository/    # Spring Data JPA Repositories
│   │   │   ├── service/       # Business Logic Layer
│   │   │   └── TaskPlannerApplication.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/                  # Backend Automated Tests
├── data/                      # Persistent H2 Database Storage Files
├── requests.http              # Sample HTTP API Requests
├── pom.xml                    # Maven Dependencies & Configuration
├── .gitignore
└── README.md
```

---

## Prerequisites

Ensure you have the following installed locally:

* **Java JDK 19** or higher
* **Apache Maven 3.9.x**
* **Node.js 22.x** and **npm 11.x**

---

## Getting Started

### 1. Start the Backend

From the project root:

```bash
mvn spring-boot:run
```

*Alternatively, run `TaskPlannerApplication.java` directly from IntelliJ IDEA or Eclipse.*

The REST API will be available at: `http://localhost:8080`

### 2. Install & Start the Frontend

In a new terminal window:

```bash
cd frontend
npm install
npm start
```

*(Or run `npx ng serve`)*

The web application will be accessible at: `http://localhost:4200` *(No login required)*.

---

## Running Tests

### Backend Automated Tests
From the root directory:
```bash
mvn test
```

### Frontend Unit Tests
From the `frontend/` directory:
```bash
npm test -- --watch=false
```

### Production Frontend Build Verification
To ensure the Angular application compiles cleanly for production:
```bash
cd frontend
npm run build
```

---

## REST API Specification

Base Endpoint: `http://localhost:8080/api/tasks`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/tasks` | Create a new task |
| `GET` | `/api/tasks` | Get all tasks |
| `GET` | `/api/tasks?search={query}` | Search tasks by title |
| `GET` | `/api/tasks?status={STATUS}` | Filter tasks by status |
| `GET` | `/api/tasks?priority={PRIORITY}` | Filter tasks by priority |
| `GET` | `/api/tasks?search=...&status=...&priority=...` | Combined search & filter |
| `GET` | `/api/tasks/{id}` | Retrieve a specific task |
| `PUT` | `/api/tasks/{id}` | Update an existing task |
| `PATCH`| `/api/tasks/{id}/status` | Update task status |
| `DELETE`| `/api/tasks/{id}` | Delete a task |
| `GET` | `/api/tasks/overdue` | Retrieve all overdue tasks |
| `GET` | `/api/tasks/statistics` | Retrieve dashboard task counts |

### Sample Payloads

#### Create Task (`POST /api/tasks`)
```json
{
  "title": "Review onboarding guide",
  "description": "Review the onboarding material and prepare any questions.",
  "dueDate": "2026-10-01",
  "priority": "MEDIUM",
  "status": "TODO"
}
```

#### Update Status (`PATCH /api/tasks/{id}/status`)
```json
{
  "status": "DONE"
}
```

#### Get Statistics Response (`GET /api/tasks/statistics`)
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

## Domain Logic & Rules

### Task Validation
- Titles cannot be blank.
- Valid priority values: `LOW`, `MEDIUM`, `HIGH`.
- Valid status values: `TODO`, `IN_PROGRESS`, `DONE`.
- Dates must be correctly formatted (`YYYY-MM-DD`).
- **Past Due Dates:** Intentionally permitted upon creation to allow logging existing outstanding work.

### Overdue Logic
A task is classified as **Overdue** if and only if:
$$\text{dueDate} < \text{today} \quad \text{AND} \quad \text{status} \neq \text{DONE}$$

- Tasks due *today* are **not** overdue.
- Completed (`DONE`) tasks are **never** overdue, regardless of due date.

### Timezone Standard
The application uses **`Africa/Harare`** as its reference timezone for evaluation of date boundaries and overdue calculations.

### Data Persistence
Task records are persisted to an H2 file-based database located at `./data/taskplanner`. Data remains fully preserved across application restarts.

---

## Sample Requests (`requests.http`)

The root directory includes a `requests.http` file containing pre-configured requests to:
- Seed normal and past-due tasks.
- Test search, filtering, and combined parameters.
- Verify status transitions, overdue endpoint responses, and statistics updates.

*This file can be executed natively inside IntelliJ IDEA's HTTP Client or imported into REST testing tools like Postman.*

---

## Assessment Acceptance Scenario

1. **Create Normal Task:** Create a task with `Priority: Medium`, `Due: Tomorrow`, `Status: TODO`.
2. **Create Past-Due Task:** Create a task with a past due date and `Status: TODO`. Verify the overdue metric increases by `1`.
3. **Complete Overdue Task:** Update the past-due task status to `DONE`. Confirm it vanishes from the overdue list and reduces the overdue counter.
4. **Filter by Priority:** Apply a filter (e.g., `MEDIUM`). Confirm only matching tasks are rendered.
5. **Verify Persistence:** Restart the Spring Boot application and refresh the browser. All tasks, statuses, and statistics persist intact.

---

## Design Decisions

- **Backend-Authoritative Statistics:** Dashboard metrics and overdue counts are calculated directly by the backend repository rather than relying on frontend view state. This ensures search/filter criteria applied in the UI do not distort total task statistics.
- **Strict Enumeration:** Enums are used for `Priority` and `Status` across both Spring Boot and Angular to guarantee type safety and prevent illegal state mutations.
- **File-Based H2 Engine:** Chosen to satisfy persistent storage requirements without adding setup overhead for external database servers.

---

## AI Usage Disclosure

AI assistance was utilized during the development of this project:

* **Tool Used:** ChatGPT
* **Scope of Assistance:** Restricted **exclusively to the UI side**—including Angular frontend component layout, CSS styling tweaks, template responsiveness, and UI refinement.
* **Human Ownership:** All backend Java code, database modeling, business rules, API design, and integration testing were authored and verified independently by the developer. AI-generated UI code was reviewed, tested, and validated before integration.

---

## Security & Data Privacy

- No production credentials, API keys, or private personal data are stored in this repository.
- All sample tasks and data files contain fictional demonstration records.

---

## Known Limitations

- Designed as a **single-user** task planner (authentication and multi-tenancy are omitted by design).
- Collaboration features, email notifications, and recurring schedules are out of scope for this assessment.

---

## Deployment & Submission

* **Public Application URL:** `TO BE ADDED AFTER DEPLOYMENT`
* **Repository Link:** `TO BE ADDED`
* **Commit SHA:** `TO BE ADDED`