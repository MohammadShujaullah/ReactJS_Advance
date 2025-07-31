import React from "react";

import Logo from "../Logo";
import Container from '../container/Container';
import LogOutBtn from './LogOutBtn';

import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate();                  // these are all concept of router 


    const navItems = [

        {
            name: 'home',
            slug: '/',                        //slug===URL both are same thing , slug is just name
            active: 'true'
        },                                        // active jo ha wo status dikhata ha , jab user logout rhegaa to , sirf home page hi dikhna chahie,islie baakiyon main active ko ! lia ha
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },

    ]
    return (<header className='py-4 shadow-xl bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 backdrop-blur-sm border-b border-gray-600'>
        <Container>
            <nav className='flex items-center'>
                <div className='mr-8 transform transition-transform duration-300 hover:scale-105'>
                    <Link to='/' className='block'>
                        <Logo width='80px' className='drop-shadow-lg' />
                    </Link>
                </div>
                <ul className='flex ml-auto space-x-2'>
                    {navItems.map((item) =>
                        item.active ? (
                            <li key={item.name}>
                                <button
                                    onClick={() => navigate(item.slug)}
                                    className='relative group inline-flex items-center px-6 py-3 text-sm font-semibold text-white transition-all duration-300 ease-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800'
                                >
                                    {/* Background gradient that appears on hover */}
                                    <span className='absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out transform group-hover:scale-105'></span>
                                    
                                    {/* Default background */}
                                    <span className='absolute inset-0 bg-gray-600 rounded-full group-hover:bg-gray-500 transition-colors duration-300'></span>
                                    
                                    {/* Border effect */}
                                    <span className='absolute inset-0 rounded-full border-2 border-transparent group-hover:border-white/20 transition-colors duration-300'></span>
                                    
                                    {/* Shine effect */}
                                    <span className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500'></span>
                                    
                                    {/* Text */}
                                    <span className='relative z-10 group-hover:text-white transition-colors duration-300'>
                                        {item.name}
                                    </span>
                                    
                                    {/* Hover glow effect */}
                                    <span className='absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300'></span>
                                </button>
                            </li>
                        ) : null
                    )}
                    {authStatus && (
                        <li>
                            <LogOutBtn />
                        </li>
                    )}
                </ul>
            </nav>
        </Container>
    </header>
    )
}

export default Header

