'use client';

import { ThemeProvider as ThemeLayout } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeLayout attribute='class' defaultTheme='system' {...props}>
      {children}
    </ThemeLayout>
  );
}
