import UserContext from "./UserContext";
import React from "react";

const UserContextProvider=({children})=>{        // method or function ha
    
    const[user,setUser]=React.useState(null)       // we can pass [] also as empty in usestate                                 
   return(<UserContext.Provider value={{user,setUser}}>
     {children}
   </UserContext.Provider>)
}
export default UserContextProvider