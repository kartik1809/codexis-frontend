import { createSlice } from '@reduxjs/toolkit';

export const languageSlice = createSlice({
  name: 'language',
  initialState: {
    codeLanguage: 'javascript',
  },
  reducers: {
    setCodeLanguage: (state, action) => {
      state.codeLanguage = action.payload;
    },
  },
});

export const { setCodeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
