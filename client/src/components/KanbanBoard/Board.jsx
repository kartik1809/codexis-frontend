import React from 'react'
import Boards from './Boards'
import './Board.css'
import { useSelector } from 'react-redux'
const Board = () => {
  const KanbanBoards = useSelector(state => state.kanbanBoard.kanbanBoards)
  return (
    <div className='p-10'>
      <h2 className='text-4xl mb-4'>Your Tasks</h2>
      <div className='app_board h-auto min-h-[500px] flex gap-5 overflow-x-scroll pb-[100px]'>
        {KanbanBoards.map((board, index) => {
          return <Boards key={index} board={index} title={board.title} tasks={board.tasks} />
        }
        )}
      </div>
    </div>
  )
}

export default Board
