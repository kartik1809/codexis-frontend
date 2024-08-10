import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  kanbanBoards: []
};


export const updateBoard = createAsyncThunk(
  'kanbanBoard/updateBoard',
  async (updatedKanbanBoards, { rejectWithValue }) => {
    try {
      const res = await fetch('http://127.0.0.1:3001/api/kanban/updatekanban', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedKanbanBoards)
      });
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const kanbanSlice = createSlice({
  name: 'kanbanBoard',
  initialState,
  reducers: {
    addTaskToBoard: (state, action) => {
      state.kanbanBoards[action.payload.board].tasks.push(action.payload.newTask);
    },
    deleteTaskFromBoard: (state, action) => {
      state.kanbanBoards[action.payload.boardIdx].tasks.splice(action.payload.taskIdx, 1);
    },
    addBoard: (state, action) => {
      state.kanbanBoards=action.payload;
    },
    updateTaskInState: (state, action) => {
      const { boardIdx, taskIdx, updatedTask } = action.payload;
      state.kanbanBoards[boardIdx].tasks[taskIdx] = updatedTask;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateBoard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.kanbanBoards = action.payload.kanbanBoards;
      })
      .addCase(updateBoard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { addTaskToBoard, deleteTaskFromBoard,addBoard,updateTaskInState} = kanbanSlice.actions;
export default kanbanSlice.reducer;
