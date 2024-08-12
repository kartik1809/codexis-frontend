import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  explorerData: {
    id: 'root',
    label: 'root',
    isFolder: true,
    items: [],
  },
  status: 'idle',
  error: null,
};

export const fetchExplorerData = createAsyncThunk(
  'fileExplorer/fetchExplorerData',
  async ({ folder_id, uuid }) => {
    const response = await fetch('http://127.0.0.1:3001/api/projects/getfolder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ folder_id, uuid }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return {
      id: data.folder_id,
      label: data.folder_name,
      isFolder: true,
      root: true,
      items: data.items,
    };
  }
);

const fileSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    setExplorerData(state, action) {
      state.explorerData = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplorerData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchExplorerData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.explorerData = action.payload;
      })
      .addCase(fetchExplorerData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setExplorerData, setStatus, setError } = fileSlice.actions;
export default fileSlice.reducer;
