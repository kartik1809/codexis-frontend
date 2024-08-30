import React, { useState } from 'react'
import './ProjectPopUp.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const ProjectPopUp = (props) => {
    const user=useSelector(state=>state.user);
    const uuid=user.currentUser?user.currentUser.uuid:'000f';
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const navigate=useNavigate();
    
    const handleClick = () => {
        props.setProjectPopUp(false)
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const createWebProject = async () => {
        const project={
            project_name:Name,
            project_description:Description,
            uuid:uuid
        }
        try{
            const response=await fetch('http://127.0.0.1:3001/api/projects/createproject',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(project)
            });
            const data=await response.json();
            navigate('/webproject',{state:data})
        }
        catch(err){
            console.log(err);
        }
    }

    const createFolder = async () => {
        const folder={
            folder_name:Name,
            folder_description:Description,
            uuid:uuid
        }
        try{
            const response=await fetch('http://127.0.0.1:3001/api/projects/newfolder',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(folder)
            });
            const data=await response.json();
            navigate('/dashboard',{state:data})
        }
        catch(err){
            console.log(err);
        }

    }

    const handleCreate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(props.isWeb){
            createWebProject();
        }
        else{
            createFolder();
        }
        handleClick();
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-3 pr-1 rounded-lg relative min-w-sm w-[50vw] h-[50vh] new-project-pop-up">
                <button
                    onClick={handleClick}
                    className="absolute text-4xl p-1 top-1 right-2 bg-transparent text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>
                <div className="mt-4 flex flex-col gap-4">
                    <p className="text-green-400 text-lg">New {props.name}</p>
                    <div className='pr-10 pl-10'>
                        <label htmlFor="">{props.name} Name</label>
                        <input type="text" onChange={handleNameChange} className="w-full h-10 border-2 border-gray-400 bg-gray-300 p-2 rounded-lg focus:outline-none text-black" placeholder={'Enter '+props.name+' Name'}/>
                    </div>
                    <div className='pr-10 pl-10'>
                        <label htmlFor="">{props.name} Description</label>
                        <textarea name="" id="" onChange={handleDescriptionChange}  className="w-full h-[100px] resize-none  border-2 border-gray-400 bg-gray-300 p-2 rounded-lg focus:outline-none text-black" placeholder='Enter Description'></textarea>
                    </div>
                    <div className='flex justify-end pr-10 gap-2'>
                        <button className='bg-green-500' onClick={(e)=>{handleCreate(e)}}>Create</button>
                        <button className='bg-red-500' onClick={handleClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPopUp
