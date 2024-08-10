import React from 'react'

const ProjectHeader = ({user}) => {
  return (
    <div className='w-screen bg-color-CustomNavbar  h-15 flex items-center px-4 justify-between'>
        <h1 className='text-lg font-bold text-gray-200'>CodeCore</h1>
        <img src={user?user.photoURL:"\\demo_pfp.png"} alt="ifhiew" className='w-10 h-10 mr-2 rounded-full'/>
    </div>
  )
}

export default ProjectHeader
