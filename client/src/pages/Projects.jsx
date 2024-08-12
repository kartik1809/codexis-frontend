import React, { useState } from 'react'
import ProjectHeader from '../components/Projects/ProjectHeader'
import './Projects.css'
import Board from '../components/KanbanBoard/Board';
import LaunchIcon from '@mui/icons-material/Launch';
import {useSelector} from 'react-redux';
import ProjectPopUp from '../components/Projects/ProjectPopUp';
const Projects = () => {
  const user=useSelector(state=>state.user.currentUser)
  const [projectPopUp, setProjectPopUp] = useState(false)
  const [webProjectPopUp, setWebProjectPopUp] = useState(false)
  const StartNewFolder=()=>{
    setProjectPopUp(true)
  }
  const StartNewWebProject=()=>{
    setWebProjectPopUp(true)
  }



  return (
    <div className='bg-color-CustomBg overflow-x-hidden'>
      <ProjectHeader user={user}  />
      {projectPopUp && <ProjectPopUp setProjectPopUp={setProjectPopUp} name={'Folder'} isWeb={false} />}
      {webProjectPopUp && <ProjectPopUp setProjectPopUp={setWebProjectPopUp} name={'Project'} isWeb={true} />}
      <div className='flex items-center justify-between greet-section'>
        <h2 className='text-3xl p-10 font-semibold'>Hi,{user?user.first_name+" "+user.last_name:"user"}</h2>
        <span className='flex gap-2 mr-12 new-btn'>
          <button className='w-36 h-12 bg-yellow-500' onClick={StartNewFolder}>New Folder</button>
          <button className='w-36 h-12 bg-yellow-500' onClick={StartNewWebProject}>Web Project</button>
        </span>
      </div>
      <div className='p-10'>
        <h3 className='text-4xl'>Recent Projects</h3>
        <div className='flex gap-5 w-full mt-4 recent-p-con'>
  
          <aside className="bg-black text-white p-6 border-2 border-color-6 rounded-lg max-h-fit w-full font-mono">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm mod-date">Last Modified: DD/MM/YYYY</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-green-400 text-lg">Project Alpha</p>
              <p className="text-white">Description:</p>
              <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
              <div className="text-green-400 flex justify-end w-full">OPEN<LaunchIcon></LaunchIcon></div>
            </div>
          </aside>
          <aside className="bg-black text-white p-6 border-2 border-color-6  rounded-lg max-h-fit w-full font-mono">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm mod-date">Last Modified: DD/MM/YYYY</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-green-400 text-lg">Project Alpha</p>
              <p className="text-white">Description:</p>
              <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
              <div className="text-green-400 flex justify-end w-full">OPEN<LaunchIcon/></div>
            </div>
          </aside>
          <aside className="bg-black text-white p-6 border-2 border-color-6 rounded-lg max-h-fit w-full  font-mono">
            <div className="flex justify-between items-center">
              <div className="flex space-x-2 text-red-500">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <p className="text-sm mod-date">Last Modified: DD/MM/YYYY</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <p className="text-green-400 text-lg">Project Alpha</p>
              <p className="text-white">Description:</p>
              <p className="text-white">added 1 package, and audited 2 packages in 3s</p>
              <div className="text-green-400 flex justify-end w-full">OPEN<LaunchIcon/></div>
            </div>
          </aside>
        </div>
      </div>

      {/* Making All Projects Section.... */}

      {/* kanban Board */}
      <Board/>
    </div>
  )
}

export default Projects
