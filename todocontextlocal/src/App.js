import React from 'react';
import './App.css';
import { useEffect,useState } from 'react';
import { TodoProvider ,useTodo,TodoContext} from './Contexts/TodoContext';
import TodoForm from './Components/TodoForm';
import TodoItem from'./Components/TodoItem'
 


function App() {
  const [todos, setTodos] = React.useState([]) ///  the todos is an array 

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]) /// previous saare value delete na ho, sirf utna hi update ho jitna ham chaahte h
  } /// ...todo means is =spreading todo ,or in ...prev spreading prev

  const updatetodo = (id, updatedTodo) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );// agr kisi callback main return nahi krna chaahte ,to small bracket lgaate ha, otherwise curly bracket for return 
  }
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)) // jiski id match nahi krti usko ,filter out krdo
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id
     === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo) // completed=!completed krdo
    )
  }
  useEffect(()=>{
      const todos=JSON.parse(localStorage.getItem("todos"))  // local storage is in string , so convert it into json 

      if(todos && todos.length>0){
        setTodos(todos)
      }
  },[])
  useEffect(()=>{
     localStorage.setItem("todos",JSON.stringify(todos))  //converting it now into string ,when it show onbrowser
  }, [todos])

  return (
    <TodoProvider value={{ todos, addTodo, updatetodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            { <TodoForm/>}
          </div>
          <div className="flex flex-wrap gap-y-3">
             {todos.map((todo)=>(
              <div key={todo.id} 
              className='w-full'>
               
               <TodoItem todo={todo}/>

             </div>
              
              ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
