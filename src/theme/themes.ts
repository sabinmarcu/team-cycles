'use client';

import { createTheme } from '@mui/material';
import {
  DarkMode,
  LightMode,
  AutoMode,
} from '@mui/icons-material';
import type {
  ThemeVariants,
  ThemeOptionConfig,
} from './types';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const themeVariants = {
  light: lightTheme,
  dark: darkTheme,
} as const satisfies Record<ThemeVariants, ReturnType<typeof createTheme>>;

export const themeOptions = {
  light: { name: 'Light Theme', icon: LightMode },
  dark: { name: 'Dark Theme', icon: DarkMode },
  system: { name: 'Sync with OS', icon: AutoMode },
} satisfies Record<ThemeVariants | 'system', ThemeOptionConfig>;
