import React from 'react';
import './Board.css';
import Cards from './cards/Cards';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditTable from './AddTask/EditTable';
import DropArea from './DropArea';
import EditTask from './EditTasks/EditTask';
import './Boards.css';
const Boards = (props) => {
  return (
    <div className='w-[300px] h-fit flex-shrink-0 bg-slate-800 p-3 rounded-lg overflow-y-scroll kanban-board'>
      <div className="board_top flex gap-2 pr-1 pb-4 justify-between">
        <div className='flex gap-2'>
          <h4 className='font-semibold text-lg'>{props.title}</h4>
          <span className="task_count rounded-lg pr-2 pl-2 bg-slate-500">{props.tasks?props.tasks.length:0}</span>
        </div>
        <div>
          <MoreHorizIcon />
        </div>
      </div>
      <DropArea onDrop={() => props.onDrop(props.board,0)} fullHeight={props.tasks && props.tasks.length==0} />
      <div className='h-[500px] kanban-board'>
      <div className="board_cards flex flex-col gap-2">
        {props.tasks.map((task, index) => (
          <div key={task.id}> {/* Assuming each task has a unique id */}
            <Cards 
              title={task.title} 
              labels={task.labels} 
              id={task.id}
              desc={task.description}
              date={task.date} 
              status={task.status} 
              setActiveCard={props.setActiveCard} 
              index={index} 
              board={props.board}
            />
            <DropArea onDrop={() => props.onDrop(props.board, index + 1)} />
          </div>
        ))}
      </div>
      <EditTable tasks={props.tasks} board={props.board} />
      </div>
    </div>
  );
};

export default Boards;
