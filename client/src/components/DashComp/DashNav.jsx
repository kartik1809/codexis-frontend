import React, { useState } from 'react'
import Tabs from './Tabs'
import './DashNav.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const DashNav = (props) => {
  const [isFullScreen, setisFullScreen] = useState(false)
  const handleFullScreen = () => {
    if (isFullScreen) {
      props.handle.exit();
      setisFullScreen(false);
    } else {
      props.handle.enter();
      setisFullScreen(true);
    }
  }
  
  return (
    <div className='navBar'>
        <button onClick={handleFullScreen} className='full-screen-btn'>{isFullScreen?'Exit':'Full Screen'}</button>
        <span className='logo-con'><img src="../public/logo.png" alt="" className='logo'/></span>
        <Tabs/>
        <button className='invite'>Invite</button>
        <span className='notifications'><NotificationsIcon/><KeyboardArrowDownIcon/></span>
        <img src="../public/demo_pfp.png" alt="pfp"/>
    </div>
  )
}

export default DashNav
