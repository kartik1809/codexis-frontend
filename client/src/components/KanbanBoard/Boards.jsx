import React from 'react'
import './Board.css'
import Cards from './cards/Cards'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditTable from './AddTask/EditTable';
import { useSelector } from 'react-redux'
const Boards = (props) => {
  return (
    <div className='w-[300px] h-100 flex-shrink-0 bg-slate-800 p-3 rounded-lg'>
      <div className="board_top flex gap-2  pr-1 pb-4 justify-between">
        <div className='flex gap-2'>
            <h4 className='font-semibold text-lg'>{props.title}</h4>
            <span className="task_count rounded-lg pr-2 pl-2 bg-slate-500">{props.tasks.length}</span>
        </div>
        <div>
            <MoreHorizIcon/>
        </div>
      </div>
      <div className="board_cards flex flex-col gap-2">
        {props.tasks.map((task, index) => {
          return <Cards key={index}  title={task.title} labels={task.labels} date={task.date} status={task.status} />
        })}
      </div>
      <EditTable tasks={props.tasks} board={props.board}/>
    </div>
  )
}

export default Boards
