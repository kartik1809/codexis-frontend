import React,{useState} from 'react'
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { addTaskToBoard } from '../../../redux/KanbanBoard/kanbanContentSlice';
const EditTable = (props) => {
    const [isClicked, setIsClicked] = useState(false)
    const [task, setTask] = useState('')
    const dispatch = useDispatch()
    const handleClick = () => {
        setIsClicked(!isClicked)
    }
    const cancelAddTask = () => {
        setIsClicked(false)
    }
    const addTask = () => {
        console.log(task)
        const newTask = {
            title: task,
            labels: [],
            date: new Date().toDateString(),
            status: 'Pending'
        }
        const board = props.board
        dispatch(addTaskToBoard({newTask, board}))
        setIsClicked(false)
    }
    const handleChange = (e) => {
        setTask(e.target.value)
    }
    return (
        <div>
            {
                !isClicked ?
                    <span className='bg-slate-400 w-full flex p-2 rounded-lg mt-2 justify-center hover:text-white cursor-pointer' onClick={handleClick} onBlur={()=>{setIsClicked(false)}}><AddIcon />Add Card</span>
                    :
                    <div className='flex flex-col gap-2 mt-2'>
                        <input type="text" className='h-10 rounded-lg bg-slate-200 text-blue-950 text-lg p-2' placeholder='Enter Task' onChange={(e)=>{handleChange(e)}}/>
                        <div className='flex gap-3 items-center'>
                            <button className='text-sm bg-blue-600 text-white' onClick={addTask}>Add</button>
                            <span className='hover:text-white cursor-pointer' onClick={cancelAddTask}><CloseIcon/></span>
                        </div>
                    </div>
            }
        </div>
    )
}

export default EditTable
