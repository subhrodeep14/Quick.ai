import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react';
import {useClerk,UserButton,useUser} from '@clerk/clerk-react';


const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const {openSignIn} = useClerk();

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 sm:px-20 xl:px-32'>
        <img src={assets.logo} alt="Logo" className='w-32 sm:w-44' onClick={() => navigate('/')} />

        {user ? <UserButton/>:(<button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5 hover:bg-primary/90 transition-all duration-300 ease-in-out' onClick={openSignIn}>
            Get Started <ArrowRight className='h-4 w-4' />
        </button>)}

      
    </div>
  )
}

export default Navbar