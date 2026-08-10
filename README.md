# Flyrank-Assignment-DhimasFauzan

# Task Management API

A RESTful CRUD API built with Node.js and Express to manage tasks in memory, fully documented with Swagger UI.

## Features

- Complete CRUD operations (`GET`, `POST`, `PUT`, `DELETE`)
- Strict input validation and RESTful HTTP status codes (`200`, `201`, `204`, `400`, `404`, `500`)
- Interactive API documentation served via Swagger UI at `/docs`

## Quick Start

Run these commands in your terminal to install dependencies and start the server:

```bash
git clone <your-github-repo-url>
cd crud-api
npm install
node index.js
```

The server will start running at http://localhost:3000.

## API Endpoints

| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| GET | `/` | API info and version metadata | 200 |
| GET | `/health` | Server health check | 200 |
| GET | `/docs` | Interactive Swagger UI documentation | 200 |
| GET | `/tasks` | Retrieve all tasks | 200 |
| GET | `/tasks/:id` | Retrieve a single task by ID | 200, 404 |
| POST | `/tasks` | Create a new task | 201, 400 |
| PUT | `/tasks/:id` | Update task title and/or done status | 200, 400, 404 |
| DELETE | `/tasks/:id` | Remove a task by ID | 204, 404 |

## Sample Request & Response (curl -i)

```bash
curl -i -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn CRUD"}'
```

## Interactive Documentation (Swagger UI)
Visit http://localhost:3000/docs in your browser to view and test all endpoints directly using the interactive Swagger interface.