import {configureStore, createSlice, PayloadAction} from '@reduxjs/toolkit';
import settingsSlice from '@/slices/settingsSlice';
import userSlice from '@/slices/userSlice';

export const store = configureStore({
    reducer: {
        settings: settingsSlice.reducer,
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
