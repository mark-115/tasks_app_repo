// handlers/tasks.ts
import { Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const getTasks = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, dueDate, status } = req.body;

  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, status)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [title, description || null, dueDate || null, status || "pending"]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE tasks SET status = 'completed', updated_at = NOW() WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks SET title = $1, description = $2, due_date = $3, status = $4, updated_at = NOW() WHERE id = $5 RETURNING *`,
      [title, description, dueDate, status, id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Failed to update task" });
  }
};
