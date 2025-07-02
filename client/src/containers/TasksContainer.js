import React, { useState, useEffect } from "react";
import { Container, Header, Table, Button } from "semantic-ui-react";
import TaskRow from "../components/TaskRow";
import CreateTaskModal from "../components/CreateTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import axios from "axios";

export default function TasksContainer() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    axios.get("/api/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://api:4000/api/tasks", newTask);
      setTasks([...tasks, res.data]);
      setNewTask({
        title: "",
        description: "",
        dueDate: "",
        status: "pending",
      });
      setModalOpen(false);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(
        `http://api:4000/api/tasks/${taskToEdit.id}`,
        taskToEdit
      );
      setTasks((prev) =>
        prev.map((t) => (t.id === res.data.id ? res.data : t))
      );
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to edit task:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://api:4000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(`http://api:4000/api/tasks/${id}/complete`);
      setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
    } catch (err) {
      console.error("Failed to mark task complete:", err);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction:
            prev.direction === "ascending" ? "descending" : "ascending",
        };
      } else {
        return { key, direction: "ascending" };
      }
    });
  };

  const sortedTasks = React.useMemo(() => {
    if (!sortConfig.key) return tasks;

    return [...tasks].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (!aVal) return 1;
      if (!bVal) return -1;

      if (sortConfig.direction === "ascending") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [tasks, sortConfig]);

  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h2">Task List</Header>

      <Button primary onClick={() => setModalOpen(true)}>
        + Create Task
      </Button>

      <Table celled style={{ marginTop: "1em" }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>
              <Button basic onClick={() => handleSort("due_date")}>
                Due Date{" "}
                {sortConfig.key === "due_date" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>
              <Button basic onClick={() => handleSort("status")}>
                Status{" "}
                {sortConfig.key === "status" &&
                  (sortConfig.direction === "ascending" ? "↑" : "↓")}
              </Button>
            </Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sortedTasks.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
              onEdit={handleEditClick}
            />
          ))}
        </Table.Body>
      </Table>

      <CreateTaskModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreate}
        task={newTask}
        setTask={setNewTask}
      />
      <EditTaskModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={handleSaveEdit}
        task={taskToEdit}
        setTask={setTaskToEdit}
      />
    </Container>
  );
}
