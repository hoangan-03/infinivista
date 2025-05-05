import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface SettingsState {
    theme: 'light' | 'dark';

    minSuggestions: number;
    maxSuggestions: number;
    minTrending: number;
    maxTrending: number;
    minContacts: number;
    maxContacts: number;
}

const initialState: SettingsState = {
    theme: 'light',

    minSuggestions: 4,
    maxSuggestions: 10,
    minTrending: 4,
    maxTrending: 10,
    minContacts: 4,
    maxContacts: 10,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        setMinSuggestions: (state, action: PayloadAction<number>) => {
            state.minSuggestions = action.payload;
        },
        setMaxSuggestions: (state, action: PayloadAction<number>) => {
            state.maxSuggestions = action.payload;
        },
        setMinTrending: (state, action: PayloadAction<number>) => {
            state.minTrending = action.payload;
        },
        setMaxTrending: (state, action: PayloadAction<number>) => {
            state.maxTrending = action.payload;
        },
        setMinContacts: (state, action: PayloadAction<number>) => {
            state.minContacts = action.payload;
        },
        setMaxContacts: (state, action: PayloadAction<number>) => {
            state.maxContacts = action.payload;
        },
    },
});

export default settingsSlice;

export const {
    setTheme,
    setMinSuggestions,
    setMaxSuggestions,
    setMinTrending,
    setMaxTrending,
    setMinContacts,
    setMaxContacts,
} = settingsSlice.actions;
