import { combineReducers, configureStore } from '@reduxjs/toolkit';
import fileReducer from './Files/fileSlice';
import languageReducer from './languageSlice';
import EditorContentReducer from './EditorContentSlice';
import tabsDataReducer from './tabsDataSlice';
import userReducer from './userData/userSlice';
import webPenReducer from './WebPenContent/WebPenSlice';
import kanbanContentReducer from './KanbanBoard/kanbanContentSlice';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {thunk} from 'redux-thunk';

const rootReducer = combineReducers({
  files: fileReducer,
  language: languageReducer,
  editorContent: EditorContentReducer,
  tabsData: tabsDataReducer,
  user: userReducer,
  webPen: webPenReducer,
  kanbanBoard: kanbanContentReducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
