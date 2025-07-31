
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx'

import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true)        // fetching chl rhi hogi , uss time pr ,loading hogi 
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser().then((userData) => {      // useEffect for login , agr userData hoga to dispatch krdo(login)
      if (userData) {
        dispatch(login({userData}));
      }
      else {                                                 // if userData nahi milta ha , to logout ko dubara call kr denge
        dispatch(logout())
      }
    }).finally(()=>setLoading(false))                             // lekin dono main se, kuch bhi nahi hua to , finally to pakka hi chlta ha,jismain setloading main false pass kra do



  }, [dispatch])

  return !loading ? (<div className="min-h-screen flex flex-wrap 
  
             content-between bg-gray-400">
    <div className="w-full block ">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />



    </div>
  </div>) : null;
}

export default App;
