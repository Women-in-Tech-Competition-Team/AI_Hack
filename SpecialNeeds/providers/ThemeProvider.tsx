import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
} 