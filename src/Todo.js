import React from 'react'

function Todo({todos,toggleTodo,deleteTodo}) {

    function handleTodoClick(){
        toggleTodo(todos._id)
    }
    const handleDeleteClick = () => {
      console.log(todos._id)
      deleteTodo(todos._id)
    };
  return (
    <div className='flex items-center justify-between '>
      <label className='flex items-center'>
        <input
          type='checkbox'
          checked={todos.complete}
          onChange={handleTodoClick}
          className='mr-2'
        />
        <span>{todos.title}</span>
      </label>
      <button onClick={handleDeleteClick} className=' ml-2 '>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
          <path fill="#b39ddb" d="M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"></path>
          <path fill="#9575cd" d="M28 6L20 6 14 12 34 12z"></path>
          <path fill="#7e57c2" d="M10,8h28c1.1,0,2,0.9,2,2v2H8v-2C8,8.9,8.9,8,10,8z"></path>
        </svg>
      </button>
    </div>
  )
}

export default Todo