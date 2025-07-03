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

- [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Compose), have it open when running the 'docker compose up --build'.

---

## Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/tasks-app.git
cd tasks-app

# 2. Start everything
docker compose up --build
```

## Running Tests

### Client Tests

To run the tests in the `client/` directory:

npm install --save-dev \
 jest@27.5.1 \
 jest-environment-jsdom@27.5.1 \
 babel-jest@27.5.1

Followed by npm test

If you are getting errors around ‘TypeError: Cannot read properties of undefined (reading 'testEnvironmentOptions’)’. The above command will have to match the versions of outputted ‘npm ls --depth=1 | grep jest’

### API Tests

To run the tests in the `api/` directory:

npm install --save-dev @types/express
npm test

Due to time constraints. I was unable to package all this correctly, so apologies for the manual steps here.

---

## Outstanding Items

- **How I would deploy the app**:  
  Due to issues encountered with Docker after cloning the repo (I was testing if another user can start this okay), I was unable to finalise notes on how I would deploy to production. These will be provided on Monday, or I can share them earlier if needed.

- **Error Handling**:  
  While errors are currently logged to the console, proper UI-based error handling and feedback (e.g. toasts or alerts) should be added for a more user-friendly experience.

---

## Potential Enhancements

- **UI Improvements**:  
  With more time, the UI could be more polished — for example:

  - Move the “Create Task” button to the top right
  - Improve column sorting controls
  - Add more visual contrast for accessibility and clarity

- **Integration Tests**:  
  Current tests mock the database; integration tests that run end-to-end with the actual database would be valuable for robustness.

- **Search Tasks**:  
  Implement a search/filter feature to allow users to quickly find tasks by title or status.

- **Bulk Delete**:  
  Enable users to select and delete multiple tasks at once to streamline task management.

- **For the reviewers/other developers**:  
  Should of added more comments within the code, to make it clear what each part is doing, and why certain decisions were made.

---
