import React, { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { deleteTaskFromBoard,updateBoard} from '../../../redux/KanbanBoard/kanbanContentSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditTask from '../EditTasks/EditTask';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

const Cards = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const user = useSelector(state => state.user);
  const uuid = user.currentUser ? user.currentUser.uuid : '000f';
  const dispatch = useDispatch();
  const KanbanBoards = useSelector(state => state.kanbanBoard.kanbanBoards);

  const updateDeletion = async (idx, taskIdx) => {
    try {
      const res = await fetch('http://127.0.0.1:3001/api/kanban/deletetask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid, idx, taskIdx })
      });
      if (!res.ok) {
        throw new Error('Failed to update database');
      }
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const deleteTask = (e) => {
    e.stopPropagation();
    const boardIdx = props.board;
    const taskIdx = props.index;
    dispatch(deleteTaskFromBoard({ boardIdx, taskIdx }));
    updateDeletion(boardIdx, taskIdx);
  };

  const handleCardClick = () => {
    setIsVisible(true);
  };

  const date = new Date(props.date);
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);



  const handleDone = (e) => {
    e.stopPropagation();
    const boardIdx = props.board;
    const taskIdx = props.index;
    const sourceBoard = KanbanBoards[boardIdx];
    const task = {
      id: props.id,
      title: props.title,
      description: props.desc,
      labels: props.labels,
      date: props.date,
    }

    const updatedKanbanBoards = KanbanBoards.map((board, boardIndex) => {
      if (boardIndex === boardIdx) {
        const updatedTasks = [
          ...sourceBoard.tasks.slice(0, taskIdx),
          ...sourceBoard.tasks.slice(taskIdx + 1),
        ];
        return { ...board, tasks: updatedTasks };
      }

      if (boardIndex === 2) {
        const updatedTasks = [
          ...board.tasks.slice(0, 0),
          task,
          ...board.tasks.slice(0),
        ];
        return { ...board, tasks: updatedTasks };
      }
      return board;
    });
    dispatch(updateBoard({ board: updatedKanbanBoards,uuid:uuid }));

  }


  return (
    <>
      <div
        className="card flex flex-col gap-2 bg-slate-600 rounded-lg p-2 active:opacity-70 cursor-grab"
        onClick={handleCardClick}
        draggable
        onDragStart={() => {
          props.setActiveCard({ index: props.index, board: props.board });
        }}
        onDragEnd={() => {
          props.setActiveCard(null);
        }}
      >
        <div className="card_title flex justify-between">
          <h4 className="text-lg font-semibold">{props.title}</h4>
          <p className='cursor-pointer hover:text-red-700' onClick={deleteTask}>
            <DeleteForeverIcon />
          </p>
        </div>
        <div className="card_labels flex gap-2">
          {props.labels.map((label, index) => (
            <span key={index} className="label cursor-default bg-slate-500 rounded-lg p-1">{label}</span>
          ))}
        </div>
        <div className="card_date flex justify-between">
          <p>{formattedDate}</p>
          <p className="status cursor-pointer" onClick={(e) => { handleDone(e) }}>{props.board != 2 ? <TaskAltIcon /> : ''}</p>
        </div>

      </div>
      <EditTask vis={isVisible} cardData={props} setIsVisible={setIsVisible} />
    </>
  );
};

export default Cards;
