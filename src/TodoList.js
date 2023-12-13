import React from 'react';
import Todo from './Todo';

function TodoList({tododlists, toggleTodo, deleteTodo}) {
  return (
    <>
      {tododlists.map((todoed) => (
        <div key={todoed._id} className={todoed.isNew ? 'bg-white rounded-md text-slate-500 p-2 mb-2' : 'mb-2'}>
          <Todo toggleTodo={toggleTodo} deleteTodo={deleteTodo} todos={todoed} />
        </div>
      ))}
    </>
  );
}

export default TodoList;
