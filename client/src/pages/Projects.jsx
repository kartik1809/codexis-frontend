import React, { useEffect, useState } from 'react'
import ProjectHeader from '../components/Projects/ProjectHeader'
import './Projects.css'
import Board from '../components/KanbanBoard/Board';
import LaunchIcon from '@mui/icons-material/Launch';
import { useSelector } from 'react-redux';
import ProjectPopUp from '../components/Projects/ProjectPopUp';
import { useNavigate } from 'react-router-dom';
const Projects = () => {
  const user = useSelector(state => state.user.currentUser)
  const [projectPopUp, setProjectPopUp] = useState(false)
  const [webProjectPopUp, setWebProjectPopUp] = useState(false)
  const [allProjects, setAllProjects] = useState([]);
  const navigate = useNavigate();
  const StartNewFolder = () => {
    setProjectPopUp(true)
  }
  const StartNewWebProject = () => {
    setWebProjectPopUp(true)
  }

  const fetchProjects = async () => {
    const { uuid } = user;
    const res = await fetch('http://127.0.0.1:3001/api/projects/allprojects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uuid: uuid })
    })
    const data = await res.json();
    const folders = Array.isArray(data.folders) ? data.folders : [];
    const webprojects = Array.isArray(data.webProjects) ? data.webProjects : [];
    const projects = [...folders, ...webprojects];
    projects.sort((a, b) => new Date(b.last_mod) - new Date(a.last_mod));
    setAllProjects(projects)
    console.log(projects)
  }

  useEffect(() => {
    fetchProjects();
  }, [])

  function formatDateToDDMMYYYY(isoDateString) {
    const date = new Date(isoDateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const openProject = (item) => {
    if (item.project_name) navigate('/webproject', { state: item })
    else navigate('/dashboard', { state: item })
  }



  return (
    <div className='bg-gray-900 overflow-x-hidden'>
      <ProjectHeader user={user} />
      {projectPopUp && <ProjectPopUp setProjectPopUp={setProjectPopUp} name={'Folder'} isWeb={false} />}
      {webProjectPopUp && <ProjectPopUp setProjectPopUp={setWebProjectPopUp} name={'Project'} isWeb={true} />}
      <div className='flex items-center justify-between greet-section'>
        <h2 className='text-3xl p-10 font-semibold font-fredoka'>Hi,{user ? user.first_name + " " + user.last_name : "user"}</h2>
        <span className='flex gap-2 mr-12 new-btn'>
          <button className='w-36 h-12 bg-teal-500' onClick={StartNewFolder}>New Folder</button>
          <button className='w-36 h-12 bg-teal-500' onClick={StartNewWebProject}>Web Project</button>
        </span>
      </div>
      <div className='p-10'>
        <h3 className='text-4xl'>Recent Projects</h3>
        {
          allProjects.length == 0 && <h3 className='text-5xl opacity-50 text-center mt-16'>It’s empty here! Start your first project now!</h3>
        }
        <div className='flex lg:grid grid-cols-3 gap-5 w-full mt-4 recent-p-con'>

          {
            allProjects.length == 0 ? null :
              allProjects.map((item, index) => {
                if (index >= 3) return null;
                return <aside onClick={() => { openProject(item) }} key={index} className="bg-custom-gradient h-full text-white p-6 border-2 border-color-6 rounded-lg flex flex-col justify-between w-full font-mono">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2 text-red-500">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="text-sm mod-date">Last Modified: {formatDateToDDMMYYYY(item.last_mod)}</p>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <p className="text-green-400 text-lg">{item.project_name || item.folder_name}</p>
                    <p className="text-white">Description:</p>
                    <p className="text-white">{(item.project_description && item.project_description.slice(0, 60)) || item.folder_description.slice(0, 60)} ...</p>

                  </div>
                  <div className="text-green-400 flex justify-end w-full cursor-pointer">OPEN<LaunchIcon></LaunchIcon></div>
                </aside>
              })
          }
        </div>
      </div>

      {/* Making All Projects Section.... */}

      {/* kanban Board */}
      <Board />
    </div>
  )
}

export default Projects
