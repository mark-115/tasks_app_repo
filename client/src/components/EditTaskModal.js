// components/EditTaskModal.js
import React from "react";
import { Modal, Form, Button } from "semantic-ui-react";

export default function EditTaskModal({
  open,
  onClose,
  task,
  onSave,
  setTask,
}) {
  const handleChange = (e, { name, value }) => {
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Content>
        {task && (
          <Form>
            <Form.Input
              label="Title"
              name="title"
              value={task.title}
              onChange={handleChange}
            />
            <Form.TextArea
              label="Description"
              name="description"
              value={task.description}
              onChange={handleChange}
            />
            <Form.Input
              label="Due Date"
              type="date"
              name="dueDate"
              value={
                task.due_date
                  ? new Date(task.due_date).toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                setTask((prev) => ({ ...prev, dueDate: e.target.value }))
              }
              fluid
            />

            <Form.Select
              label="Status"
              name="status"
              options={[
                { key: "p", text: "Pending", value: "pending" },
                { key: "c", text: "Completed", value: "completed" },
              ]}
              value={task.status}
              onChange={handleChange}
            />
          </Form>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Cancel</Button>
        <Button primary onClick={onSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
