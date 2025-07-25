import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import {SignIn, useUser } from '@clerk/clerk-react'

const Layout = () => {
  const navigate = useNavigate()
  const {user}= useUser();
  const [sidebar, setSidebar] = useState(false)
  return user ? (
    <div className='flex flex-col items-center justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <img className='cursor-pointer w-32 sm:w-44' src={assets.logo} alt="" onClick={() => navigate('/')} />
        {
          sidebar ? <X className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setSidebar(false)} /> :
          <Menu className='w-6 h-6 text-gray-600 sm:hidden' onClick={() => setSidebar(true)} />
        }

      </nav>

      <div className='flex flex-1 w-full h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
        <div className='flex-1 bg-[#F4F7FB]'>
            <Outlet />
        </div>
      </div>

      
    </div>
  ) :(
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <SignIn />
    </div>
  )
}

export default Layout