import React, { useState } from 'react';

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      addTodo(value); // Call addTodo with the new task value
      setValue(''); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is today's schedule?"
      />
      <button type="submit" className="todoBtn">Add task</button>
    </form>
  );
};

export default TodoForm;
