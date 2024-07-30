import React from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ToolBar from '../components/DashComp/ToolBar';
import CodeSpace from '../components/DashComp/CodeSpace/CodeSpace';

import DashNav from '../components/DashComp/DashNav';
const DashBoard = () => {
    const handle = useFullScreenHandle();
  return (
    <div>      
      <FullScreen handle={handle}>
        <DashNav handle={handle}/>
        <ToolBar/>
        <CodeSpace/>
      </FullScreen>
    </div>
  )
}

export default DashBoard
