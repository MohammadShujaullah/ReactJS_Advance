import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(0)   // "useState()"gives an array , in which at idx0, a counter is present and at idx1 a 
  // function related to counter is present 
  // it help   to synch. the UI 's things


  function addValue() {
    console.log("value added", counter)
    if (counter < 20) { counter = counter + 1; }
    setCounter(counter)
  }
  function removeValue() {
    if (counter > 0) {
      setCounter(counter - 1)
      setCounter(counter - 1)
      setCounter(counter - 1)    
      setCounter(counter - 1)
        // adding these lines , doesnt change the output, because,
      //     here the whole work is goes at same time 
      // and if you want to do decreament directly 4 time , then do
      //"setCounter(prevcounter=>prevcounter-1)"

    }
  }

  return (
    <>
      <h1>Chai or React</h1>
      <h2>counter value:{counter}</h2>
      <button onClick={addValue}>Add value:{counter}</button> <br />

      <button onClick={removeValue}>remove value:{counter}</button>
    </>
  )
}

export default App
