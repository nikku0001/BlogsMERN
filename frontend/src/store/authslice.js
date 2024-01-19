import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState: {
        isLoggedIn : false,
    },
    reducers: {
        login: (state) =>{
            state.isLoggedIn = true;
        },
        logout: (state) =>{
            state.isLoggedIn = false;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;