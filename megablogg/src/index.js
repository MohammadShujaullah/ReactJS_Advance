import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import Store from './store/Store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { AuthLayout } from './components/indexx.js';
import Login from './components/Login.jsx';

import SignUp from './pages/SignUp.jsx';
// import SignUp from './components/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx';
import AddPost from './pages/AddPost.jsx';
import EditPost from './pages/EditPost.jsx';
import Post from './pages/Post.jsx';



const router = createBrowserRouter([
  {
  path: '/',
  element: <App />,
  children: [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: (
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      ),
    },
    {
      path: '/signup',
      element: (
        <AuthLayout authentication={false}>
          <SignUp />

        </AuthLayout>
      ),
    },
    {
      path:'/all-posts',
      element:(                             // sirf authentication likha ho means (authentication===true)
        <AuthLayout authentication>  
          {""}
          <AllPosts/>
        </AuthLayout>
      ),
    },
    {
      path:'/add-post',
      element:(
        <AuthLayout authentication>
          {""}
          <AddPost/>
        </AuthLayout>
      ),
    },
    {
      path:'/edit-post/:slug',
      element:(
        <AuthLayout authentication>
           {""}
           <EditPost/>
        </AuthLayout>
      ),
    },
    {
      path:'/post/:slug',
      element: <Post/>,

    }


  ],


},

])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
       <RouterProvider router={router}/>
    </Provider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
