import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
    username: string;
    name: string;
    email: string;
    phone: string;
    profilePic: string;
}

const initialState: UserState = {
    username: '',
    name: '',
    email: '',
    phone: '',
    profilePic: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.username = action.payload.username;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.profilePic = action.payload.profilePic;
        },
    },
});

export default userSlice;

export const {setUser} = userSlice.actions;
