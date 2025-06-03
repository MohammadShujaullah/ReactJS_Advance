import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // app is a component , and it is always start with capital letter 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 
