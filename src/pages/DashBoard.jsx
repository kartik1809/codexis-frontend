import React from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import DashNav from '../components/DashComp/DashNav';
const DashBoard = () => {
    const handle = useFullScreenHandle();
  return (
    <div>      
      <FullScreen handle={handle}>
        <DashNav handle={handle}/>
      </FullScreen>
    </div>
  )
}

export default DashBoard
