import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        logOut: (state) => {
            state.user = null;
        }
    }

    
})

export const {setUser, logOut} = UserSlice.actions;
export default UserSlice.reducer;