import { create } from 'zustand';
import { ThemeType } from '../types';

interface ThemeState {
  theme: ThemeType;
  toggleTheme: () => void;
  setTheme: (theme: ThemeType) => void;
}

const lightTheme: ThemeType = {
  isDark: false,
  primary: '#3b82f6',
  secondary: '#10b981',
  background: '#ffffff',
  text: '#1f2937',
  accent: '#f59e0b',
};

const darkTheme: ThemeType = {
  isDark: true,
  primary: '#60a5fa',
  secondary: '#34d399',
  background: '#111827',
  text: '#f3f4f6',
  accent: '#fbbf24',
};

export const useThemeStore = create<ThemeState>((set) => {
  // Check if user prefers dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = prefersDarkMode ? darkTheme : lightTheme;

  return {
    theme: initialTheme,
    toggleTheme: () => set((state) => ({ theme: state.theme.isDark ? lightTheme : darkTheme })),
    setTheme: (theme) => set({ theme }),
  };
});