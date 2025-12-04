Demo – Advanced Kanban Board


How to Run the Project

1. Install Dependencies
npm install

2. Start JSON Server (Backend)
npm run json-server
Backend URL: http://localhost:3000

3. Start Angular App (Frontend)
npm start
Frontend URL: http://localhost:4200

Login Credentials

Admin:
username: admin
password: admin123

User:
username: user
password: user123

Features to Demonstrate
Authentication

Login works

AuthGuard protects pages

 Dashboard

Shows total tasks

Shows completed tasks (stageId = 4)

Shows pending tasks

Kanban Board

Add Task

Edit Task

Delete Task

Drag & Drop tasks

Auto-save to backend

Columns: To Do, In Progress, Review, Done

Tasks Table

Shows all tasks

Pagination

Delete task

Settings

Light / Dark theme toggle

How to Test (Reviewer Steps)

Login using admin

Add a task → appears in To Do

Drag a task to another column

Edit a task

Delete a task

Check Dashboard stats update

Open Tasks Table → shows all tasks

Toggle theme

Logout

API Endpoints (via JSON Server)

GET /tasks
POST /tasks
PATCH /tasks/:id
DELETE /tasks/:id
GET /users
GET /stages

Notes

Restart backend: npm run json-server

Restart frontend: npm start

If data breaks, reset db.json