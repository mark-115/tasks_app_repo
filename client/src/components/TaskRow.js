// components/TaskRow.js
import React from "react";
import { Table, Button, Icon } from "semantic-ui-react";

export default function TaskRow({ task, onDelete, onComplete, onEdit }) {
  const handleEdit = () => {
    onEdit(task);
  };

  const handleDelete = () => {
    onDelete(task.id);
  };

  const handleComplete = () => {
    onComplete(task.id);
  };

  return (
    <Table.Row>
      {console.log("TTT", task)}
      <Table.Cell>{task.title}</Table.Cell>
      <Table.Cell>{new Date(task.due_date).toLocaleDateString()}</Table.Cell>
      <Table.Cell>{task.description}</Table.Cell>
      <Table.Cell>{task.status}</Table.Cell>
      <Table.Cell>
        <Button.Group size="small">
          <Button icon onClick={handleEdit}>
            <Icon name="edit" />
          </Button>
          <Button
            icon
            color="green"
            onClick={handleComplete}
            disabled={task.status === "completed"}
          >
            <Icon name="check" />
          </Button>
          <Button icon color="red" onClick={handleDelete}>
            <Icon name="trash" />
          </Button>
        </Button.Group>
      </Table.Cell>
    </Table.Row>
  );
}
