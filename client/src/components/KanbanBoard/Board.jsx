import React, { useState,useEffect } from 'react';
import Boards from './Boards';
import './Board.css';
import { updateBoard ,addBoard} from '../../redux/KanbanBoard/kanbanContentSlice';
import { useDispatch, useSelector } from 'react-redux';
import EditTask from './EditTasks/EditTask';

const Board = () => {
  const dispatch = useDispatch();
  const user=useSelector(state=>state.user);
  const uuid=user.currentUser?user.currentUser.uuid:'000f';
  const KanbanBoards = useSelector(state => state.kanbanBoard.kanbanBoards);
  const [activeCard, setActiveCard] = useState({ index: null, board: null });
  console.log(KanbanBoards)

  const fetchKanban = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3001/api/kanban/kanban',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({uuid:uuid})
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await res.json();
      dispatch(addBoard(data.kanbanBoards));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchKanban();
  }, []);
  



  const onDrop = (targetBoardIndex, position) => {
    if (activeCard === null || activeCard.index === null || activeCard.board === null) return;
    const { board: sourceBoardIndex, index: sourceTaskIndex } = activeCard;
    const sourceBoard = KanbanBoards[sourceBoardIndex];
    const card = sourceBoard.tasks[sourceTaskIndex];
    const updatedKanbanBoards = KanbanBoards.map((board, boardIndex) => {
      if (boardIndex === sourceBoardIndex) {
        const updatedTasks = [
          ...sourceBoard.tasks.slice(0, sourceTaskIndex),
          ...sourceBoard.tasks.slice(sourceTaskIndex + 1),
        ];
        return { ...board, tasks: updatedTasks };
      }

      if (boardIndex === targetBoardIndex) {
        const updatedTasks = [
          ...board.tasks.slice(0, position),
          card,
          ...board.tasks.slice(position),
        ];
        return { ...board, tasks: updatedTasks };
      }

      return board;
    });
    dispatch(updateBoard({ board: updatedKanbanBoards,uuid:uuid }));
    setActiveCard({ index: null, board: null });
  };

  return (
    <div className='p-10 board-section'>
      <h2 className='text-4xl mb-4 task-head'>Your Tasks</h2>
      <div className='app_board h-auto min-h-[500px] flex gap-5 overflow-x-scroll pb-[100px] boards-container'>
        {KanbanBoards.map((board, index) => (
          <Boards key={index} board={index} title={board.title} tasks={board.tasks} setActiveCard={setActiveCard} onDrop={onDrop} />
        ))}
      </div>
      <EditTask/>
    </div>
  );
};

export default Board;
