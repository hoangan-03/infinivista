import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserState {
    displayName: string;
    email: string;
    phone: string;
    profilePic: string;
}

const initialState: UserState = {
    displayName: '',
    email: '',
    phone: '',
    profilePic: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.profilePic = action.payload.profilePic;
        },
    },
});

export default userSlice;

export const {setUser} = userSlice.actions;
