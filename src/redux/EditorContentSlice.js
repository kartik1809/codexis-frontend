import { createSlice } from '@reduxjs/toolkit';

export const EditorContentSlice = createSlice({
  name: 'language',
  initialState: {
    codeLanguage: 'javascript',
    content: "//some comment",
  },
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setContent } = EditorContentSlice.actions;

export default EditorContentSlice.reducer;