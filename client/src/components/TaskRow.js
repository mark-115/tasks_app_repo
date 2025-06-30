// components/TaskRow.js
import React from "react";
import { Table, Button } from "semantic-ui-react";

export default function TaskRow({ task }) {
  const handleEdit = () => {
    alert(`Edit task: ${task.id}`);
  };

  const handleDelete = () => {
    alert(`Delete task: ${task.id}`);
  };

  return (
    <Table.Row>
      <Table.Cell>{task.title}</Table.Cell>
      <Table.Cell>{task.dueDate}</Table.Cell>
      <Table.Cell>{task.description}</Table.Cell>
      <Table.Cell>
        <Button color="blue" size="small" onClick={handleEdit}>
          Edit
        </Button>
        <Button color="red" size="small" onClick={handleDelete}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
