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
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    axios.get("http://localhost:4000/api/tasks").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleCreate = async () => {
    try {
      const res = await axios.post("http://localhost:4000/api/tasks", newTask);
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
        `http://localhost:4000/api/tasks/${taskToEdit.id}`,
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
      await axios.delete(`http://localhost:4000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  const handleComplete = async (id) => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/tasks/${id}/complete`
      );
      setTasks(tasks.map((task) => (task.id === id ? res.data : task)));
    } catch (err) {
      console.error("Failed to mark task complete:", err);
    }
  };

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
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks?.map((task) => (
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
