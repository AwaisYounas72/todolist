import React, { useRef, useState, useEffect } from 'react';
import FooterBar from './FooterBar';

import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';


const LOCAL_STORAGE_key = 'todoApp.todos';
function App() {

  const [todos, setTodos] = useState([]);
  const [stateManage, setStateManage] = useState(false)
  const todNameref = useRef();

  //  useEffect(() => {
  // localStorage.setItem(LOCAL_STORAGE_key,JSON.stringify(todos))   
  //  }, [todos])


// Backend
const fetchTodos = async () => {
  try {
    const response = await fetch("https://todolist-backend-puce.vercel.app/api/todo/get-todos");
    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const data = await response.json();
    setTodos(data.result); // Assuming your todos are in the "result" property of the response
    // console.log(todos);
  } catch (error) {
    console.error("Error fetching todos:", error.message);
  }
};

useEffect(() => {
  fetchTodos();
}, [stateManage]);


  async function deleteTodo(id) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    const res = await fetch(`https://todolist-backend-puce.vercel.app/api/todo/deleteTodo/${id}`,{
      method : "delete"
    })
    const data  = await res.json()
    console.log(data)
    setTodos(updatedTodos);
    setStateManage(prev=>!prev)
  }
  
  function toggleTodo(id) {
    const newtodos = [...todos];
    const todo = newtodos.find(todo => todo._id === id)
    todo.complete = !todo.complete
    localStorage.setItem(LOCAL_STORAGE_key, JSON.stringify(newtodos))
    setTodos(newtodos)
  }

  async function addTodobutton() {
    const addtodoname = todNameref.current.value;
    console.log(addtodoname)
    if (addtodoname === '') return;

    const res = await fetch(`https://todolist-backend-puce.vercel.app/api/todo/addTodo`,{
      method : "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        title:addtodoname
      }),
    })
    const data  = await res.json()
    console.log(data)
    setStateManage(prev=>!prev)
    todNameref.current.value = null;
  }



  function clearTodos() {
    const newtodo = todos.filter(todo => !todo.complete)
    localStorage.setItem(LOCAL_STORAGE_key, JSON.stringify(newtodo))
    setTodos(newtodo)
  }
  return (
    <>

      {/* <!--Main Navigation--> */}
<div className='container-fluid'> 
      <header className='absolute top-0 w-full'>

        {/* <!-- Navbar --> */}
        <nav
          class="flex-no-wrap  relative  flex w-full items-center justify-between bg-white py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4"
          data-te-navbar-ref>

          {/* <!-- Here add a container --> */}
          <div class="lg:container mx-auto flex w-full flex-wrap items-center justify-between px-3">
            {/* <!-- Hamburger button for mobile view --> */}
            <button
              class="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button" data-te-collapse-init data-te-target="#navbarSupportedContent1"
              aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
              {/* <!-- Hamburger icon --> */}
              <span class="[&>svg]:w-7">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-7 w-7">
                  <path fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd" />
                </svg>
              </span>
            </button>

            {/* <!-- Collapsible navigation container --> */}
            <div class="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto"
              id="navbarSupportedContent1" data-te-collapse-item>
              {/* <!-- Logo --> */}
              <span class="mb-4 mr-2 mt-3 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:mb-0 lg:mt-0"
                href="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                  <path fill-rule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clip-rule="evenodd" />
                </svg>


              </span>
              {/* <!-- Left navigation links --> */}
              <ul class="list-style-none mr-auto flex flex-col pl-0 lg:flex-row" data-te-navbar-nav-ref>
                <li class="mb-4 lg:mb-0 lg:pr-2" data-te-nav-item-ref>
                  {/* <!-- Dashboard link --> */}
                  <span class="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400 text-2xl font-semibold"
                    href="#" data-te-nav-link-ref>Todo App</span>
                </li>

              </ul>
            </div>

            {/* <!-- Right elements --> */}
            <div class="relative flex items-center">
              {/* <!-- Cog Icon --> */}
              <span class="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="#">
                <span class="[&>svg]:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                      clip-rule="evenodd" />
                  </svg>

                </span>
              </span>

              {/* <!-- Envelope Icon --> */}
              <span class="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="#">
                <span class="[&>svg]:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>


                </span>
              </span>

              {/* <!-- User Icon --> */}
              <span class="mr-4 text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                href="#">
                <span class="[&>svg]:w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clip-rule="evenodd" />
                  </svg>


                </span>
              </span>

              
            </div>
          </div>
        </nav>
        {/* <!-- Navbar --> */}

      </header>
      {/* <!--Main Navigation--> */}





      <div className="flex items-center justify-center my-24 flex-col p-2">
        <h1 className="text-3xl font-semibold mb-4 text-slate-500">Todo App</h1>
        <div className="bg-gray-300 shadow-lg rounded-lg p-6 w-full sm:w-96">
          <div className='flex flex-row-reverse justify-between items-center'>


            <div className='   flex justify-center items-center mt-4'>
              <button onClick={clearTodos} className="  bg-slate-500 text-white p-3 rounded-md">
                Clear Todo
              </button>

            </div>
            <div className="mt-4 text-white p-3 bg-blue-500 rounded-md">{todos.filter((todo) => !todo.complete).length} left Todo</div>
          </div>


          <div className="flex    flex-col mt-4 mb-2 gap-2">
            <input
              ref={todNameref}
              type="text"
              className="flex-1  p-3  rounded-md "
              placeholder="Add a todo..."
            />
            <button onClick={addTodobutton} className="bg-blue-500 text-white p-3 rounded-md">
              Add Todo
            </button>
          </div>
          <TodoList tododlists={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
        </div>
      </div>




      <FooterBar />  

      </div>

       
    </>
  );
}

export default App;
