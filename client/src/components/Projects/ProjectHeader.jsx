import React, { useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const ProjectHeader = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate=useNavigate();
  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='w-screen bg-gray-600  h-15 flex items-center px-4 justify-between'>

      <div className='flex relative z-4 items-center'>
        <img className='w-16 h-16' src="/logo.png" alt="" />
        <h1 className='text-2xl font-bold font-bangers text-gray-200'>CodeAbyss</h1>
      </div>
      <div>
        <img src={user ? user.photoURL : "\\demo_pfp.png"} alt="ifhiew" className='w-10 h-10 mr-2 cursor-pointer rounded-full' onClick={toggle} />
        {
          isOpen && (
            <div className='absolute top-16 right-4 bg-gray-600 p-4 rounded-lg'>
              <div className='flex gap-2 items-center cursor-pointer' onClick={()=>{navigate('/profile')}}>
                <img src={user ? user.photoURL : "\\demo_pfp.png"} alt="ifhiew" className='w-10 h-10 mr-2 cursor-pointer rounded-full' />
                <h1 className='text-lg font-bold  text-gray-200'>{user ? user.first_name + " " + user.last_name : "User"}</h1>
              </div>
              <div className='flex gap-2 items-center mt-4'>
                <SettingsIcon/>
                <h1 className='text-lg text-gray-200 cursor-pointer'>Settings</h1>
              </div>
              <div className='flex gap-2 text-red-400 items-center mt-4'>
                <LogoutIcon/>
                <h1 className='text-lg cursor-pointer'>Logout</h1>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ProjectHeader
