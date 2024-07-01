import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const Todo = ({ task, delTodo, editTodo, toggleEdit }) => {
  return (
    <div className="Todo">
      <p className={task.completed ? 'completed' : 'incompleted'} onClick={() => toggleEdit(task._id)}>
        {task.task}
      </p>
      <div>
        <FontAwesomeIcon className="edit-icon" icon={faPenSquare} onClick={() => editTodo(task._id)} />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={() => delTodo(task._id)} />
      </div>
    </div>
  );
};

export default Todo;
