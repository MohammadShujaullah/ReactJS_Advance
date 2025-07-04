import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { removeTodo } from "../Features/Todo/TodoSlice.js";


function Todo(){
 const todos=useSelector((state)=>state.todo.todos)     // it is used for access all todos
 const dispatch=useDispatch()

   return(<> 
      <div>Todos</div>
   <ul className="list-none">
       {todos.map((todo) => (
         <li
           key={todo.id}
           style={{
             display: 'flex',
             justifyContent: 'space-between',
             alignItems: 'center',
             background: '#27272a',
             padding: '0.5rem 1rem',
             borderRadius: '0.5rem',
             marginTop: '1rem',
           }}
         >
           <div style={{ color: 'white' }}>{todo.text}</div>
           <button
            onClick={() => dispatch(removeTodo(todo.id))}
            style={{
              color: 'white',
              background: '#ef4444',
              border: 'none',
              padding: '0.4rem 1.2rem',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              marginLeft: '1rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
              transition: 'background 0.2s, transform 0.1s',
              outline: 'none',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#b91c1c'}
            onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}             // these are CSS
               stroke="currentColor"
               className="w-6 h-6"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
               />
             </svg>
           </button>
         </li>
       ))}
     </ul></>)
}

export default Todo