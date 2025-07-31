import React,{useState,useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// now , i want to protect the webpage, means i want that only logged in user can see my web page , so we use these below code 
//You're building a protected page that only logged-in users can access.
//If the user isn't logged in (authStatus false) but authentication is true, send them to /login.
//If the user is logged in but the page doesn't need login (authentication is false), send them to "/" or home.

export default function Protected({children,authentication=true}){
    const navigate=useNavigate();
    const [loader,setLoader]=useState(true)

    const authStatus=useSelector(state=>state.auth.status);

    useEffect(()=>{
        //TODO:make it more easy to understand

        // if(authStatus===true){
        //     navigate("/")
        // }
        // else if(authStatus===false){
        //     navigate("/login")
        // }


        if(authentication && authStatus!==authentication){
            navigate("/login")
        }
        else if(!authentication && authStatus!==authentication){
            navigate("/")
        }
      
        setLoader(false)
    },[authStatus,navigate,authentication])

    return(loader ? <h1>Loading...</h1> : <>{children}</>)
}