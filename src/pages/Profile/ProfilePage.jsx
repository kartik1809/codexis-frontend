import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './ProfilePage.css';
import ProjectHeader from '../../components/Projects/ProjectHeader';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SchoolIcon from '@mui/icons-material/School';
import GitHubIcon from '@mui/icons-material/GitHub';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HeatmapComp from '../../components/Profile/Heatmap';
import Badges from '../../components/Profile/Badges';
import Preloader from '../../components/Preloader';
import { setLoading } from '../../redux/LoaderSlice';
import { EditProfile } from '../../components/Profile/EditProfile';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const [allProjects, setAllProjects] = useState([]);
  const [nfolders, setnfolders] = useState(0);
  const [nweb, setnweb] = useState(0);
  const date = new Date(user.currentUser.createdAt);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-GB', options);
  const [isPreLoader, setPreLoader] = useState(false);
  const dispatch = useDispatch();

  const fetchProjects = async () => {
    const { uuid } = user.currentUser;
    const res = await fetch('http://127.0.0.1:3001/api/projects/allprojects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    });
    const data = await res.json();
    const folders = Array.isArray(data.folders) ? data.folders : [];
    const webprojects = Array.isArray(data.webProjects) ? data.webProjects : [];
    setnfolders(folders.length);
    setnweb(webprojects.length);
    const projects = [...folders, ...webprojects];
    projects.sort((a, b) => new Date(b.last_mod) - new Date(a.last_mod));
    setAllProjects(projects);
  };

  useEffect(() => {
    dispatch(setLoading(true));
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 800);
  }, [dispatch]);

  return (
    <>
      {isPreLoader && <Preloader show={isPreLoader} />}
      <ProjectHeader user={user.currentUser} />
      <div className='bg-gray-950 flex flex-col p-4 pt-6 gap-2 lg:flex-row'>
        <div className='w-full p-4 rounded-lg glassmorphism flex flex-col gap-4'>
          <div className='flex gap-4'>
            <img className='rounded-lg' src={user.currentUser.photoURL} alt="" />
            <div className='flex flex-col'>
              <h2 className='text-lg font-semibold text-white'>{user.currentUser.first_name + " " + user.currentUser.last_name}</h2>
              <p className='text-sm sm:text-md text-gray-300'>{user.currentUser.email}</p>
              <p className='pt-4 text-sm text-gray-400'>{formattedDate}</p>
            </div>
          </div>
          <EditProfile/>
          <div>
            <h2 className='text-lg font-semibold text-white'>Additional Information</h2>
            <div className='flex flex-col text-gray-300 mt-2 gap-2'>
              <p><LocationOnIcon className='mr-2 text-white' />India</p>
              <p><SchoolIcon className='mr-2 text-white' />GGSIPU</p>
              <p><GitHubIcon className='mr-2 text-white' />kartik1809</p>
              <p><XIcon className='mr-2 text-white' />kartik1809</p>
              <p><LinkedInIcon className='mr-2 text-white' />kartikpokhriyal18</p>
            </div>
          </div>
        </div>
        <div className='w-full p-4 rounded-lg glassmorphism flex flex-col gap-4'>
          <h2 className='text-lg font-semibold text-white'>Projects</h2>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {allProjects.map((item, index) => {
              if (index > 3) return null;
              return (
                <div key={index} className='p-4 rounded-lg glassmorphism h-32 lg:h-36 min-h-fit text-white shadow-md'>
                  <h3 className='text-lg font-semibold'>{item.project_name || item.folder_name}</h3>
                  <p>{(item.project_description && item.project_description.slice(0, 60)) || item.folder_description.slice(0, 60)} ...</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className='bg-gray-950 grid grid-cols-1 p-4 pt-1 gap-2 lg:grid-cols-2 '>
        <HeatmapComp />
        <div className='grid grid-cols-1 rounded-lg gap-2 sm:grid-cols-2'>
          <div className='glassmorphism rounded-lg p-4 h-48 text-white shadow-lg'>
            <h3 className='text-lg font-semibold'>Badges</h3>
            <Badges />
          </div>
          <div className='glassmorphism rounded-lg p-4 text-white shadow-lg'>
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
  );
};

export default ProfilePage;
