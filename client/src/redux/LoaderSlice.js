import { createSlice } from "@reduxjs/toolkit";

export const LoaderSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = LoaderSlice.actions;

export default LoaderSlice.reducer;
