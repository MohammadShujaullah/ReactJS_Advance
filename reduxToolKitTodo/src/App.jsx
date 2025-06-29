import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddTodo from './Components/AddTodo'
import Todo from './Components/Todo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <><h1>learning reduxtoolkit</h1>
       <AddTodo/>
       <Todo/>   
    </>
  )
}

export default App
