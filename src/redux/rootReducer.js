
import { combineReducers } from '@reduxjs/toolkit';
import fileReducer from './Files/fileSlice';
import languageReducer from './languageSlice';
import EditorContentReducer from './EditorContentSlice';
import tabsDataReducer from './tabsDataSlice';
import userReducer from './userData/userSlice';
import webPenReducer from './WebPenContent/WebPenSlice';
import kanbanContentReducer from './KanbanBoard/kanbanContentSlice';
import loaderReducer from './LoaderSlice';

const appReducer = combineReducers({
  files: fileReducer,
  language: languageReducer,
  editorContent: EditorContentReducer,
  tabsData: tabsDataReducer,
  user: userReducer,
  webPen: webPenReducer,
  kanbanBoard: kanbanContentReducer,
  loader: loaderReducer,
});


const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
