import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  // Define initial state with branches and items
];

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    toggleBranch(state, action) {
      const branch = state.find(file => file.value === action.payload);
      if (branch) {
        branch.expanded = !branch.expanded;
      }
    },
  },
});

export const { toggleBranch } = fileSlice.actions;
export default fileSlice.reducer;
