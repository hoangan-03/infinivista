'use client';

import React, {createContext, useContext, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {setTheme} from '@/slices/settingsSlice';
import {AppDispatch, RootState} from '@/store';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useSelector((state: RootState) => state.settings.theme);
    const initialized = useRef(false);

    // Load theme from localStorage on initial mount only
    useEffect(() => {
        if (!initialized.current) {
            const savedTheme = localStorage.getItem('theme') as Theme | null;
            if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
                dispatch(setTheme(savedTheme));
            }
            initialized.current = true;
        }
    }, [dispatch]);

    // Apply theme to document root and save to localStorage when theme changes
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Only save to localStorage if initialized (prevents saving default value on first render)
        if (initialized.current) {
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    const changeTheme = (newTheme: Theme) => {
        dispatch(setTheme(newTheme));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, setTheme: changeTheme}}>{children}</ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
