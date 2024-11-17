import React from 'react'

const WebHeader = () => {
  return (
    <div className='w-screen h-16 flex items-center justify-between bg-gray-950' >
        <img src="/logo.png" alt="" className='w-20 h-16'/>
        <img src="/demo_pfp.png" alt="" className='w-16 h-16 rounded-full mr-5' />
    </div>
  )
}

export default WebHeader
