import React, {useState} from 'react'
import {useDispatch} from 'react-redux' // useDispatch comes from react-redux
import {addTodo} from '../Features/Todo/TodoSlice.js' 

function AddTodo() {

    const [input, setInput] = useState('')   // jiasehi main form submit krunga, to todo add hoga ,mtlb webpage pr change dikhega , so we use useState for it
    const dispatch = useDispatch()         // dispatch reducer ka use krte hue, store main changes krta ha 

    const addTodoHandler = (e) => {
        e.preventDefault()
        if (!input.trim()) {
          alert('Todo cannot be empty!');
          return;
        }
        dispatch(addTodo(input))
        setInput('')                     /// baad main setInput ko  khaali kr dia 
    }

  return (
    <form onSubmit={addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        disabled={!input.trim()}
        style={{
          color: 'white',
          background: !input.trim() ? '#a5b4fc' : '#2563eb', // lighter blue if disabled
          border: 'none',
          padding: '0.5rem 1.5rem',
          borderRadius: '0.5rem',
          fontSize: '1.125rem',
          cursor: !input.trim() ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          transition: 'background 0.2s, transform 0.1s',
          outline: 'none',
          opacity: !input.trim() ? 0.7 : 1,
        }}
        onMouseEnter={e => {
          if (input.trim()) e.currentTarget.style.background = '#1d4ed8';
        }}
        onMouseLeave={e => {
          if (input.trim()) e.currentTarget.style.background = '#2563eb';
        }}
        onMouseDown={e => {
          if (input.trim()) e.currentTarget.style.transform = 'scale(0.97)';
        }}
        onMouseUp={e => {
          if (input.trim()) e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Add Todo
      </button>
    </form>
  )
}

export default AddTodo