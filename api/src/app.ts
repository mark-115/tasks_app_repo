import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import cors from "cors";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
} from "./handlers/tasks";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/tasks", getTasks);
app.post("/api/tasks", createTask);
app.delete("/api/tasks/:id", deleteTask);
app.patch("/api/tasks/:id/complete", updateTaskStatus);
app.put("/api/tasks/:id", updateTask);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API running on port ${port}`));
