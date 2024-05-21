export type ThemeVariants = 'light' | 'dark';

export interface ThemeOptionConfig {
  name: string;
  icon: React.ElementType,
}

export type ThemeOption = ThemeVariants | 'system';
