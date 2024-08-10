import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addTaskToBoard} from '../../../redux/KanbanBoard/kanbanContentSlice';
import { v4 as uuidv4 } from 'uuid'; // Import UUID

const EditTable = (props) => {
    const [isClicked, setIsClicked] = useState(false);
    const [task, setTask] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const uuid = user.currentUser ? user.currentUser.uuid : '000f';
    const kanbanBoards = useSelector(state => state.kanbanBoard.kanbanBoards);
    const handleClick = () => setIsClicked(prev => !prev);
    const cancelAddTask = () => setIsClicked(false);

    const updateDatabase = async (idx,task) => {
        try {
            const res = await fetch('http://127.0.0.1:3001/api/kanban/addtask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uuid,idx,task})
            });
            if (!res.ok) {
                throw new Error('Failed to update database');
            }
            const data = await res.json();
        } catch (error) {
            console.log(error);
        }
    }


    const addTask = () => {
        if (!task.trim()) return;

        const newTask = {
            id: uuidv4(),
            title: task,
            labels: [],
            date: new Date().toDateString()
        };
        const idx=props.board;
        dispatch(addTaskToBoard({ board: props.board, newTask }));
        updateDatabase(idx,newTask);
        setTask(''); 
        setIsClicked(false);
    };

    const handleChange = (e) => setTask(e.target.value);

    return (
        <div>
            {!isClicked ? (
                <span
                    className='bg-slate-400 w-full flex p-2 rounded-lg mt-2 justify-center hover:text-white cursor-pointer'
                    onClick={handleClick}
                >
                    <AddIcon /> Add Card
                </span>
            ) : (
                <div className='flex flex-col gap-2 mt-2'>
                    <input
                        type="text"
                        className='h-10 rounded-lg bg-slate-200 text-blue-950 text-lg p-2'
                        placeholder='Enter Task'
                        value={task}
                        onChange={handleChange}
                        autoFocus
                    />
                    <div className='flex gap-3 items-center'>
                        <button className='text-sm bg-blue-600 text-white' onClick={addTask}>Add</button>
                        <span
                            className='hover:text-white cursor-pointer'
                            onClick={cancelAddTask}
                        >
                            <CloseIcon />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditTable;
