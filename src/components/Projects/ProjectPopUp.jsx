import React, { useState } from 'react'
import './ProjectPopUp.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CardWithForm } from '../UIComp/CreateCard';
import { NeonGradientCard } from '../magicui/neon-gradient-card';
const ProjectPopUp = (props) => {
    const user = useSelector(state => state.user);
    const uuid = user.currentUser ? user.currentUser.uuid : '000f';
    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const navigate = useNavigate();

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
        const project = {
            project_name: Name,
            project_description: Description,
            uuid: uuid
        }
        try {
            const response = await fetch('http://127.0.0.1:3001/api/projects/createproject', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
            });
            const data = await response.json();
            navigate('/webproject', { state: data })
        }
        catch (err) {
            console.log(err);
        }
    }

    const createFolder = async () => {
        const folder = {
            folder_name: Name,
            folder_description: Description,
            uuid: uuid
        }
        try {
            const response = await fetch('http://127.0.0.1:3001/api/projects/newfolder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(folder)
            });
            const data = await response.json();
            navigate('/dashboard', { state: data })
        }
        catch (err) {
            console.log(err);
        }

    }

    const handleCreate = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (props.isWeb) {
            createWebProject();
        }
        else {
            createFolder();
        }
        handleClick();
    }


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <NeonGradientCard className="max-w-fit p-0 bg-transparent">
                <CardWithForm handleNameChange={handleNameChange} handleDescriptionChange={handleDescriptionChange} handleCreate={handleCreate} handleClick={handleClick} Name={Name} Description={Description} />
            </NeonGradientCard>
        </div>
    )
}

export default ProjectPopUp
