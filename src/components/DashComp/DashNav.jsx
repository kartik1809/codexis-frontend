import React from 'react'

const DashNav = (props) => {
  return (
    <div>
        <button onClick={props.handle.enter}>Full Screen Mode</button>
      I am a Navbar
    </div>
  )
}

export default DashNav
