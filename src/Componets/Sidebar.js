import React from 'react'
import { FaTags, FaTshirt } from 'react-icons/fa'
import { Link, Outlet, useLocation } from 'react-router-dom';

import { BiSolidDashboard } from 'react-icons/bi';



function Sidebar({ openSidebarToggle, OpenSidebar }) {
    const location = useLocation();
    const handleLinkClick = () => {
        if (openSidebarToggle) {
            OpenSidebar();
        }
    };

    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>

            <div className="flex flex-col w-[220px] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] h-screen overflow-x bg-black">
                <button className="relative text-sm focus:outline-none group">
                    <div className="flex items-center justify-center w-full text-red-900 text-2xl h-16 px-4 border-gray-300 mt-2">
                        <a href="#" class="flex items-center pb-4 border-b border-b-gray-800">

                            <h2 class="font-bold text-xl "> <span class="bg-[#f84525] p-1 text-white rounded-md">TRONIX INFOSOFT</span></h2>
                        </a>
                    </div>
                </button>

                <div className="flex flex-col flex-grow overflow-auto">


                    <div className='mt-3 px-2'>
                        <div className={`flex items-center p-3 space-x-3 group  text-lg ${location.pathname === '/dashboard' ? 'flex font-semibold items-center py-2 px-4 text-gray-900 rounded-md menubg' : '  '}`}>
                            <BiSolidDashboard size={25} />
                            <Link to='/dashboard' onClick={handleLinkClick}> Dashboard  </Link>
                        </div>
                        <div className={`flex items-center p-3 space-x-3 group   text-lg ${location.pathname === '/payment' ? 'flex font-semibold items-center py-2 px-4 text-gray-900 rounded-md menubg' : '  '}`}>
                            <FaTags size={20} />
                            <Link to='/payment' onClick={handleLinkClick}>Payment</Link>
                        </div>

                    </div>
                </div>
            </div>
            <Outlet />
        </aside>

    )
}

export default Sidebar
