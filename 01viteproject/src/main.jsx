import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
 
import App from './App.jsx'




 const domElement=React.createElement(
    'a',
    {href:'https://google.com',target:'_blank'},
    'click me to reach google.com',
    


 )



function MyApp(){   
  return (
    <div>

      <h1>my name is devvvv!</h1>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    domElement
  </StrictMode>,
)
