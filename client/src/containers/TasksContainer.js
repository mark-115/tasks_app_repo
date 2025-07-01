import React, { useState, useEffect } from "react";
import { Container, Header, Table, Button } from "semantic-ui-react";
import TaskRow from "../components/TaskRow";
import CreateTaskModal from "../components/CreateTaskModal";
import axios from "axios";

export default function TasksContainer() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
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
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tasks?.map((task) => (
            <TaskRow key={task.id} task={task} />
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
    </Container>
  );
}
