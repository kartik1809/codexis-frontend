import React, { useEffect, useState } from 'react'
import ProjectHeader from '../components/Projects/ProjectHeader'
import './Projects.css'
import Board from '../components/KanbanBoard/Board';
import LaunchIcon from '@mui/icons-material/Launch';
import { useSelector } from 'react-redux';
import ProjectPopUp from '../components/Projects/ProjectPopUp';
import { useNavigate } from 'react-router-dom';
import DotPattern from '../components/magicui/dot-pattern';
import ShinyButton from "../components/magicui/shiny-button";
import ShineBorder from "../components/magicui/shine-border";
import { cn } from "../lib/utils";
import { CardWithForm } from '../components/UIComp/CreateCard';
import TypingAnimation from '../components/magicui/typing-animation';
import { useDispatch } from 'react-redux';
import { setLoading } from '../redux/LoaderSlice';

const Projects = () => {
  const user = useSelector(state => state.user.currentUser)
  const [projectPopUp, setProjectPopUp] = useState(false)
  const [webProjectPopUp, setWebProjectPopUp] = useState(false)
  const [allProjects, setAllProjects] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 800)
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

  const typingText = `Welcome to your dashboard ${user ? user.first_name : "User"}!`;


  return (
    <div className='bg-gray-950 overflow-x-hidden'>
      <ProjectHeader user={user} />
      {projectPopUp && <ProjectPopUp setProjectPopUp={setProjectPopUp} name={'Folder'} isWeb={false} />}
      {webProjectPopUp && <ProjectPopUp setProjectPopUp={setWebProjectPopUp} name={'Project'} isWeb={true} />}
      <div className='flex items-center justify-between greet-section'>

        <TypingAnimation
          className="text-3xl p-10 font-semibold font-fredoka"
          text={typingText}
        />

        <span className='flex gap-2 mr-12 new-btn'>
          <span onClick={StartNewFolder}><ShinyButton text='New Folder' className='bg-white'></ShinyButton></span>
          <span onClick={StartNewWebProject}><ShinyButton text='New Project' className='bg-white'></ShinyButton></span>
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
                return <div key={index} onClick={() => { openProject(item) }}>
                  <ShineBorder key={index}
                    className="h-full  text-white p-2 px-4 cursor-pointer rounded-lg flex flex-col w-full font-mono relative border bg-background md:shadow-xl"
                    color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                  >
                    <div className="flex w-full justify-between items-center">
                      <div className="flex space-x-2 w-full text-blue-500">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="w-3 h-3 rounded-full bg-blue-300"></div>
                        <div className="w-3 h-3 rounded-full bg-blue-700"></div>
                      </div>

                      <p className="text-sm mod-date">Last Modified: {formatDateToDDMMYYYY(item.last_mod)}</p>
                    </div>
                    <div className="mt-4 w-full flex flex-col gap-2">
                      <p className="text-blue-500 text-lg">{item.project_name || item.folder_name}</p>
                      <p className="text-white">Description:</p>
                      <p className="text-white">{(item.project_description && item.project_description.slice(0, 60)) || item.folder_description.slice(0, 60)} ...</p>
                    </div>
                    <div className="text-blue-500 flex justify-end w-full cursor-pointer">OPEN<LaunchIcon></LaunchIcon></div>
                  </ShineBorder></div>
              })
          }
        </div>
      </div>

      {/* Making All Projects Section.... */}

      {/* kanban Board */}
      <Board />


      <div className="absolute -top-[30rem] left-1/2 transform -translate-x-1/2 z-10 -translate-y-1/2 bg-white filter blur-[290px] opacity-50 w-[65vw] h-[40vw]">

      </div>



      <DotPattern
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] ",
        )}
      />
    </div>
  )
}

export default Projects
