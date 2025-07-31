import React from 'react'

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice"; 

import { useDispatch } from "react-redux";


function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {      // logout ek promise ha , islie we can apply .then
            dispatch(logout())
        })
    }
  return (
    <button
        onClick={logoutHandler}
        className='relative group inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800'
    >
        {/* Background gradient that appears on hover - Red theme for logout */}
        <span className='absolute inset-0 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out transform group-hover:scale-105'></span>
        
        {/* Default background */}
        <span className='absolute inset-0 bg-gray-600 rounded-full group-hover:bg-gray-500 transition-colors duration-300'></span>
        
        {/* Border effect */}
        <span className='absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-colors duration-300'></span>
        
        {/* Shine effect */}
        <span className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500'></span>
        
        {/* Text */}
        <span className='relative z-10 group-hover:text-white transition-colors duration-300'>
            Logout
        </span>
        
        {/* Hover glow effect - Red theme for logout */}
        <span className='absolute -inset-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300'></span>
    </button>
  )
}

export default LogoutBtn


