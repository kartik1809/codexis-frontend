import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    html:"",
    css:"",
    js:"",
}

const WebPenSlice = createSlice({
    name: 'webPen',
    initialState,
    reducers: {
        setHtml: (state, action) => {
            state.html = action.payload;
        },
        setCss: (state, action) => {
            state.css = action.payload;
        },
        setJs: (state, action) => {
            state.js = action.payload;
        },
    },
});

export const { setHtml, setCss, setJs } = WebPenSlice.actions;

export default WebPenSlice.reducer;
