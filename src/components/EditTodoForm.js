import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task, cancelEdit }) => {
  const [newTask, setNewTask] = useState(task.task);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editTodo({ ...task, task: newTask });
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="todo-input"
        placeholder="Update Task"
      />
      <button type="submit" className="todoBtn">
        Update Task
      </button>
      <button type="button" className="todoBtn" onClick={cancelEdit}>
        Cancel
      </button>
    </form>
  );
};

export default EditTodoForm;
