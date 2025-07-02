# Task Management App

This is a full-stack task management application with:

- **Frontend**: React (JavaScript, Semantic UI)
- **Backend**: Node.js with Express (TypeScript)
- **Database**: PostgreSQL
- **Containerized** with Docker & Docker Compose

---

## Features

- Create, edit, complete, and delete tasks
- Sort tasks by due date and status
- Persistent PostgreSQL database
- RESTful API
- Dockerized for easy setup

---

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Compose)
- Or, if using Docker CLI only: [Install Docker Compose manually](https://docs.docker.com/compose/install/)

---

## Local Setup (with Docker Compose)

```bash
# 1. Clone the repo
git clone https://github.com/your-username/tasks-app.git
cd tasks-app

# 2. Start everything
docker-compose up --build
```
