// containers/TasksContainer.js
import React from "react";
import { Container, Header, Table } from "semantic-ui-react";
import TaskRow from "../components/TaskRow";

const mockTasks = [
  {
    id: 1,
    title: "Finish API",
    description: "Complete Express routes and test",
    dueDate: "2025-07-01",
    status: "pending",
  },
  {
    id: 2,
    title: "Finish Client",
    description: "Info on client code",
    dueDate: "2025-07-02",
    status: "in_progress",
  },
];

export default function TasksContainer() {
  return (
    <Container style={{ marginTop: "2em" }}>
      <Header as="h2">Task List</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {mockTasks.map((task) => (
            <TaskRow key={task.id} task={task} />
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}
