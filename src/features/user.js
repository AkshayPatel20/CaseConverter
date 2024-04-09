import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: {
            user_name: '',
            email: '',
            mobile_no: '',
            user_id: '',
            photoURL: ''
        },
    },
    reducers: {
        login : (state, action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = action.payload;
        },
    }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;