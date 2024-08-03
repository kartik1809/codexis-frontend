import { configureStore } from '@reduxjs/toolkit';
import fileReducer from './Files/fileSlice';
import languageReducer from './languageSlice';
import  EditorContentReducer from './EditorContentSlice';
import tabsDataReducer from './tabsDataSlice';
const store = configureStore({
  reducer: {
    files: fileReducer,
    language: languageReducer,
    editorContent: EditorContentReducer,
    tabsData:tabsDataReducer,
  },
});

export default store;
