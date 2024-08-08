import React from 'react'

const WebHeader = () => {
  return (
    <div className='w-screen h-16 flex items-center justify-between' style={{backgroundColor:'#1a1a1a'}}>
        <img src="/logo.png" alt="" className='w-20 h-16'/>
        <img src="/demo_pfp.png" alt="" className='w-16 h-16 rounded-full mr-5' />
    </div>
  )
}

export default WebHeader
