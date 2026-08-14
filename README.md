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

```bash
The Prompt :

Act as a pro backend engineer. I want to build a simple CRUD API. Use js and express. For the database, just use an array in the script for the data.

I need 5 endpoints with strict validation:



GET /tasks => get all tasks. Return 200 OK.

GET /tasks/:id =>get a single task by id. Return 200 OK, or 404 if not found.

POST /tasks =>create a new task. Title is a required string (cannot be empty or whitespace), done defaults to false. Return 201 Created. If title is empty/missing, return 400 Bad Request.

PUT /tasks/:id => update title and/or done. If body is completely empty, or if title/done are the wrong data types, return 400 Bad Request. Return 200 OK if successful, or 404 if id not found.

DELETE /tasks/:id =>delete task by id. Return 204 No Content if successful, or 404 if not found.

Also, set up Swagger UI docs at /docs using swagger-ui-express and an openapi.json file. Do not provide explanations, just the code files. 


```