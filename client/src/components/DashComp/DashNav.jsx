import React, { useState } from 'react'
import Tabs from './Tabs'
import './DashNav.css'
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NotificationCard } from './Tabs/Notification';
import { DropdownMenuDemo } from '../Projects/ProfileDropDown';
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
    <div className='navBar bg-gray-950'>
        <button onClick={handleFullScreen} className='full-screen-btn bg-cyan-400 hover:bg-cyan-500 shadow-cyan-500/50 text-gray-700'>{isFullScreen?'Exit':'Full Screen'}</button>
        <span className='p-2 h-12 w-14'><img src="../public/logo.png" alt="" className=' w-12 h-10'/></span>
        <Tabs/>
        <button className='invite bg-cyan-400 hover:bg-cyan-500 shadow-cyan-500/50 text-gray-700'>Invite</button>
        <NotificationCard/>
        <span className='flex items-center h-full'>
        <DropdownMenuDemo/>
        </span>
    </div>
  )
}

export default DashNav
