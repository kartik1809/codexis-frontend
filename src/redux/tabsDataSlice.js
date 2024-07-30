import { createSlice } from '@reduxjs/toolkit';
import { OpenTabs } from '../components/DashComp/Tabs/tabsdata';
export const tabsDataSlice = createSlice({
  name: 'tabsData',
  initialState: {
    OpenTabs: OpenTabs,
  },
  reducers: {
    setOpenTabs: (state, action) => {
      state.OpenTabs = action.payload;
    },
  },
});

export const { setOpenTabs } = tabsDataSlice.actions;

export default tabsDataSlice.reducer;
