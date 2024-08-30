import React, { useEffect } from 'react'
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


const ProfilePage = () => {
  const user = useSelector(state => state.user)
  useEffect(() => {
    console.log(user.currentUser)
  }, [user.currentUser])

  return (
    <>
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
            <div className='p-4 rounded-lg bg-gray-700'>
              <h3 className='text-lg font-semibold'>Project 1</h3>
              <p>Project Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, minus.</p>
            </div>
            <div className='p-4 rounded-lg bg-gray-700'>
              <h3 className='text-lg font-semibold'>Project 1</h3>
              <p>Project Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, minus.</p>
            </div>
            <div className='p-4 rounded-lg bg-gray-700'>
              <h3 className='text-lg font-semibold'>Project 1</h3>
              <p>Project Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, minus.</p>
            </div>
            <div className='p-4 rounded-lg bg-gray-700'>
              <h3 className='text-lg font-semibold'>Project 1</h3>
              <p>Project Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, minus.</p>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 p-4 pt-1 gap-2 lg:grid-cols-2 '>
        <HeatmapComp/>
        <div className='grid grid-cols-1 rounded-lg gap-2 sm:grid-cols-2'>
            <div className='bg-slate-500 rounded-lg p-4 h-48'>
                <h3 className='text-lg font-semibold'>Badges</h3>
                <Badges />
            </div>
            <div className='bg-slate-500 rounded-lg p-4'>
                <h3 className='text-lg font-semibold'>Insights</h3>
                <div className='pl-4 p-2 flex flex-col gap-2'>
                    <p>Projects: 3</p>
                    <p>Web Projects: 2</p>
                    <p>Folders: 1</p>
                    <p>User Since: 17 August 2024</p>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
