import React, { useState, useEffect } from 'react';
import { Todo } from './Todo';
import { TodoForm } from './TodoForm';
import { EditTodoForm } from './EditTodoForm';

export const TodoApp = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:5000/todos');
        const todosData = await response.json();
        setTodos(todosData);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = async (todo) => {
    try {
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: todo }),
      });
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const delTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    const todoToToggle = todos.find((todo) => todo._id === id);
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...todoToToggle, completed: !todoToToggle.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
    } catch (error) {
      console.error('Error toggling complete:', error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              isEditing: true,
            }
          : todo
      )
    );
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodoFromServer = await response.json();
      setTodos(
        todos.map((todo) =>
          todo._id === id
            ? {
                ...updatedTodoFromServer,
                isEditing: false,
              }
            : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const cancelEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              isEditing: false,
            }
          : todo
      )
    );
  };

  return (
    <div className="TodoApp">
      <h1>To-do List</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm
            key={todo._id}
            editTodo={(updatedTodo) => updateTodo(todo._id, updatedTodo)}
            task={todo}
            cancelEdit={() => cancelEdit(todo._id)}
          />
        ) : (
          <Todo
            key={todo._id}
            task={todo}
            delTodo={() => delTodo(todo._id)}
            editTodo={() => editTodo(todo._id)}
            toggleEdit={(id) => editTodo(id)}
            toggleComplete={() => toggleComplete(todo._id)}
          />
        )
      )}
    </div>
  );
};

export default TodoApp;
