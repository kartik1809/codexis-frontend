import React from 'react'
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import ToolBar from '../components/DashComp/ToolBar';
import CodeSpace from '../components/DashComp/CodeSpace/CodeSpace';
import { useLocation } from 'react-router-dom';
import DashNav from '../components/DashComp/DashNav';
const DashBoard = () => {
    const handle = useFullScreenHandle();
    const location=useLocation();
    const {state}=location;
    const project=state || {

    };
  return (
    <div className='dash-board'>      
      <FullScreen handle={handle}>
        <DashNav handle={handle}/>
        <ToolBar/>
        <CodeSpace project={project}/>
      </FullScreen>
    </div>
  )
}

export default DashBoard
