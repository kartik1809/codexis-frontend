import { createSlice } from '@reduxjs/toolkit';

const intialstate = {
    kanbanBoards: [
        {
            title: "To Do",
            tasks: [
                {
                    id: 1,
                    title: "Task 1",
                    labels: ["Develop"],
                    status: "To Do",
                    date: "18 Sept"
                },
                {
                    id: 2,
                    title: "Task 2",
                    labels: ["Develop"],
                    status: "To Do",
                    date: "18 Sept"
                }
            ]
        },
        {
            title: "In Progress",
            tasks: [
                {
                    id: 3,
                    title: "Task 3",
                    labels: ["Develop"],
                    status: "In Progress",
                    date: "18 Sept"
                },
                {
                    id: 4,
                    title: "Task 4",
                    labels: ["Develop"],
                    status: "In Progress",
                    date: "18 Sept"
                }
            ]
        },
        {
            title: "Completed",
            tasks: []
        }
    ]
}

const kanbanSlice =createSlice({
    name: 'kanbanBoard',
    initialState: intialstate,
    reducers: {
        addTaskToBoard: (state, action) => {
            state.kanbanBoards[action.payload.board].tasks.push(action.payload.newTask)
        },
        deleteTask: (state, action) => {
            state.kanbanBoards[0].tasks = state.kanbanBoards[0].tasks.filter(task => task.id !== action.payload)
        }
    }
})

export const { addTaskToBoard, deleteTask } = kanbanSlice.actions

export default kanbanSlice.reducer