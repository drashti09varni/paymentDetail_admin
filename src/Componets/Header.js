import React from 'react';

import { BsJustify } from 'react-icons/bs'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaUnlockAlt } from "react-icons/fa";


function Header({ OpenSidebar }) {
    const navigate = useNavigate();
    
    const handelLogout = () => {
        localStorage.removeItem("token");
        navigate('/');
        window.location.reload()
    }

    return (
        <header className='header bg-[#f8f4f3]'>
            <div className='menu-icon'>
                <BsJustify size={20} fill='black' onClick={OpenSidebar} className='cursor-pointer' />
            </div>
            <div className='header-left'>
                {/* <Link to='/dashboard' className='text-white text-[20px]'>Dashboard</Link> */}
            </div>


            {/* <div className='header-right flex space-x-8'>
                <div>
                    <button onClick={handelLogout} className='bg-green-300 flex items-center py-1 px-2 rounded-full'>
                        <FaUnlockAlt className='text-2xl mr-2' /> 
                        LOGOUT
                    </button>
                </div>
            </div> */}

            <div className='header-right flex space-x-8'>


                <button type="button" className="text-white bgsearch
                focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                text-sm px-5 py-2 text-center inline-flex items-center 
                " onClick={handelLogout} >
                    LOGOUT
                    <span className='ml-2 mb-1 '>
                        <FaUnlockAlt className='text-xl text-white font-bold' />
                    </span>

                </button>
            </div>


        </header>
    )
}

export default Header
