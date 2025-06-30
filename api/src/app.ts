// src/app.ts
import express from "express";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Express API!");
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});

app.get("/api/ping", (_req, res) => {
  res.json({ message: "Pong from API!" });
});
