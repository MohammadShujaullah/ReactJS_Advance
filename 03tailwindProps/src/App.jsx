import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Caard from './components/Caard'

function App() {
  const [count, setCount] = useState(0)
  let myapp={
    username:"mdshujaullah",
    age:21
    
  }
  return (
    <>
      <h1 className='bg-amber-500 text-blue-800 rounded-2xl'>my name is md shujaullah</h1> 
      <Caard channel="chaiorcode" MyApp={myapp}/>
      <Caard/>
    </>
  )
}

export default App
