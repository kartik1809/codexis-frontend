import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ProfilePage.css'
import ProjectHeader from '../../components/Projects/ProjectHeader'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HeatmapComp from '../../components/Profile/Heatmap';
import Badges from '../../components/Profile/Badges';
import Preloader from '../../components/Preloader';


const ProfilePage = () => {
  const user = useSelector(state => state.user)
  const [allProjects, setAllProjects] = useState([]);
  const [nfolders, setnfolders] = useState(0);
  const [nweb, setnweb] = useState(0);
  const date = new Date(user.currentUser.createdAt);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  const [isPreLoader,setPreLoader]=useState(false);

  const fetchProjects = async () => {
    const { uuid } = user.currentUser;
    console.log(user.currentUser)
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
    setnfolders(folders.length);
    setnweb(webprojects.length);
    const projects = [...folders, ...webprojects];
    projects.sort((a, b) => new Date(b.last_mod) - new Date(a.last_mod));
    setAllProjects(projects)
    console.log(projects)
  }

  useEffect(() => {
    setPreLoader(true);
    setTimeout(()=>{
      fetchProjects();
      setPreLoader(false);
    },800)
    
  }, [])


  return (
    <>
    {isPreLoader && <Preloader show={isPreLoader}/>}
      <ProjectHeader user={user.currentUser} />
      <div className='flex flex-col p-4 pt-6 gap-2 lg:flex-row'>
        <div className='w-full p-4 rounded-lg bg-slate-600 flex flex-col gap-4'>
          <div className='flex gap-4'>
            <img className='rounded-lg' src={user.currentUser.photoURL} alt="" />
            <div className='flex flex-col'>
              <h2 className='text-lg font-semibold'>{user.currentUser.first_name + " " + user.currentUser.last_name}</h2>
              <p className='text-sm sm:text-md'>{user.currentUser.email}</p>
              <p className='pt-4 text-sm'>{user.currentUser.createdAt}</p>
            </div>
          </div>
          <button className='bg-zinc-400'>Edit Profile</button>
          <div>
            <h2 className='text-lg font-semibold'>Addtional Information</h2>
            <div className='flex flex-col text-slate-300 mt-2 gap-2'>
              <p><LocationOnIcon className='mr-2 text-slate-900' />India</p>
              <p><SchoolIcon className='mr-2 text-slate-900' />GGSIPU</p>
              <p><GitHubIcon className='mr-2 text-slate-900' />kartik1809</p>
              <p><XIcon className='mr-2 text-slate-900' />kartik1809</p>
              <p><LinkedInIcon className='mr-2 text-slate-900' />kartikpokhriyal18</p>
            </div>
          </div>
        </div>
        <div className='w-full p-4 rounded-lg bg-slate-600 flex flex-col gap-4'>
          <h2 className='text-lg font-semibold'>Projects</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {
              allProjects.map((item, index) => {
                if (index > 3) return null;
                return (
                  <div key={index} className='p-4 rounded-lg bg-gray-700 h-32 lg:h-36 min-h-fit'>
                    <h3 className='text-lg font-semibold'>{item.project_name || item.folder_name}</h3>
                    <p>{(item.project_description && item.project_description.slice(0, 60)) || item.folder_description.slice(0, 60)} ...</p>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 p-4 pt-1 gap-2 lg:grid-cols-2 '>
        <HeatmapComp />
        <div className='grid grid-cols-1 rounded-lg gap-2 sm:grid-cols-2'>
          <div className='bg-slate-500 rounded-lg p-4 h-48'>
            <h3 className='text-lg font-semibold'>Badges</h3>
            <Badges />
          </div>
          <div className='bg-slate-500 rounded-lg p-4'>
            <h3 className='text-lg font-semibold'>Insights</h3>
            <div className='pl-4 p-2 flex flex-col gap-2'>
              <p>Projects: {nfolders + nweb}</p>
              <p>Web Projects: {nweb}</p>
              <p>Folders: {nfolders}</p>
              <p>User Since: {formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
