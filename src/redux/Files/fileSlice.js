import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  explorerData: {
    id: 'root',
    label: 'root',
    isFolder: true,
    items: [],
  }
};

const addItem = (node, id,newItem) => {
  if (node.isFolder && node.id === id) {
    node.items= [...node.items, newItem];
  }
  if (node.isFolder) {
    for (const item of node.items) {
      const result = addItem(item, id,newItem);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

const deleteItem=(node, id) => {
  if (node.isFolder) {
    node.items = node.items.filter((item) => item.id !== id);
    for (const item of node.items) {
      deleteItem(item, id);
    }
  }
  return null;
};

const renameItem=(node, id,newName) => {
  if (node.isFolder) {
    for (const item of node.items){
      if(item.id===id){
        item.label=newName;
        return;
      }
      renameItem(item, id,newName);
    }
  }
  return null;
};


const fileSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    setExplorerData(state, action) {
      state.explorerData = action.payload;
    },
    setItems(state, action) {
      const { id, newItem } = action.payload;
      addItem(state.explorerData, id, newItem);
    },
    setDeleteItem(state, action) {
      const { id } = action.payload;
      deleteItem(state.explorerData, id);
    },
    setRenameItem(state, action) {
      const { id,newName } = action.payload;
      renameItem(state.explorerData, id,newName);
    }
  }
});

export const { setExplorerData,setItems,setDeleteItem,setRenameItem } = fileSlice.actions;
export default fileSlice.reducer;
