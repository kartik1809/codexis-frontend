import React from 'react'
import './ProjectPopUp.css'
const ProjectPopUp = (props) => {
    const handleClick = () => {
        props.setProjectPopUp(false)
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
                        <input type="text" className="w-full h-10 border-2 border-gray-400 bg-gray-300 p-2 rounded-lg focus:outline-none text-black" placeholder={'Enter '+props.name+' Name'}/>
                    </div>
                    <div className='pr-10 pl-10'>
                        <label htmlFor="">{props.name} Description</label>
                        <textarea name="" id=""  className="w-full h-[100px] resize-none  border-2 border-gray-400 bg-gray-300 p-2 rounded-lg focus:outline-none text-black" placeholder='Enter Description'></textarea>
                    </div>
                    <div className='flex justify-end pr-10 gap-2'>
                        <button className='bg-green-500'>Create</button>
                        <button className='bg-red-500' onClick={handleClick}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPopUp
