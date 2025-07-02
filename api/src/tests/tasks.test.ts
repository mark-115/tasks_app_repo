// src/tests/tasks.test.ts
import request from "supertest";
import express from "express";
import * as taskHandlers from "../handlers/tasks";

jest.mock("pg", () => {
  const mockQuery = jest.fn();
  const mockConnect = jest.fn();
  return {
    Pool: jest.fn(() => ({
      query: mockQuery,
      connect: mockConnect,
    })),
    __mockQuery: mockQuery,
    __mockConnect: mockConnect,
  };
});

const { __mockQuery: mockQuery } = jest.requireMock("pg");

const app = express();
app.use(express.json());
app.get("/api/tasks", taskHandlers.getTasks);
app.post("/api/tasks", taskHandlers.createTask);
app.delete("/api/tasks/:id", taskHandlers.deleteTask);
app.patch("/api/tasks/:id/complete", taskHandlers.updateTaskStatus);
app.put("/api/tasks/:id", taskHandlers.updateTask);

describe("Task Handlers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch tasks", async () => {
    const fakeTasks = [{ id: "1", title: "Test Task" }];
    mockQuery.mockResolvedValueOnce({ rows: fakeTasks });

    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeTasks);
  });

  it("should return 400 if title is missing on task creation", async () => {
    const res = await request(app).post("/api/tasks").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Title is required" });
  });

  it("should create a task", async () => {
    const newTask = {
      title: "New Task",
      description: "",
      dueDate: null,
      status: "pending",
    };
    const insertedTask = { id: "1", ...newTask };
    mockQuery.mockResolvedValueOnce({ rows: [insertedTask] });

    const res = await request(app).post("/api/tasks").send(newTask);
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual(insertedTask);
  });

  it("should delete a task", async () => {
    mockQuery.mockResolvedValueOnce({});
    const res = await request(app).delete("/api/tasks/1");
    expect(res.statusCode).toBe(204);
  });

  it("should mark a task as completed", async () => {
    const completedTask = { id: "1", status: "completed" };
    mockQuery.mockResolvedValueOnce({ rows: [completedTask] });

    const res = await request(app).patch("/api/tasks/1/complete");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(completedTask);
  });

  it("should update a task", async () => {
    const updatedTask = {
      id: "1",
      title: "Updated Task",
      description: "Updated",
      dueDate: null,
      status: "pending",
    };
    mockQuery.mockResolvedValueOnce({ rows: [updatedTask] });

    const res = await request(app).put("/api/tasks/1").send(updatedTask);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(updatedTask);
  });
});
