import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import TasksContainer from "../containers/TasksContainer";

jest.mock("axios");

const mockTasks = [
  {
    id: "1",
    title: "Test Task",
    description: "Test desc",
    status: "pending",
    due_date: "2025-07-03",
  },
];

describe("TasksContainer", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTasks });
  });

  it("renders task list from API", async () => {
    render(<TasksContainer />);
    expect(screen.getByText("Task List")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Test Task")).toBeInTheDocument();
    });
  });

  it("opens and closes the create task modal", () => {
    render(<TasksContainer />);
    fireEvent.click(screen.getByText("+ Create Task"));
    expect(screen.getByText("Create a New Task")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Create a New Task")).not.toBeInTheDocument();
  });
});
