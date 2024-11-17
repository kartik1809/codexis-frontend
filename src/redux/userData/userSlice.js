import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading : false,
    error: false,
}

export const userSlice =createSlice({
    name:'user',
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.loading = true
        },
        loginSuccess:(state,action)=>{
            state.loading = false
            state.currentUser = action.payload
            state.error = false
        },
        loginFailure:(state)=>{
            state.loading = false
            state.error = true
        },
        setUser:(state,action)=>{
            state.currentUser = action.payload
        }
    }

})

export const {loginStart,loginSuccess,loginFailure,setUser} = userSlice.actions
export default userSlice.reducer