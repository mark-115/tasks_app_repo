import React from "react";
import { Button, Modal, Form } from "semantic-ui-react";

export default function CreateTaskModal({
  open,
  onClose,
  onCreate,
  task,
  setTask,
}) {
  const handleChange = (e, { name, value }) => {
    setTask({ ...task, [name]: value });
  };

  return (
    <Modal onClose={onClose} open={open}>
      <Modal.Header>Create a New Task</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
          <Form.Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={task.dueDate}
            onChange={handleChange}
          />
          <Form.TextArea
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button positive onClick={onCreate}>
          Create
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
