"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

// Available theme colors
export const THEME_COLORS = {
  default: { name: 'Noir / Blanc', hex: null },
  blue: { name: 'Bleu', hex: '#3B82F6' },
  green: { name: 'Vert', hex: '#10B981' },
  purple: { name: 'Violet', hex: '#8B5CF6' },
  rose: { name: 'Rose', hex: '#F43F5E' },
  orange: { name: 'Orange', hex: '#F97316' },
} as const;

export type ThemeColor = keyof typeof THEME_COLORS;

interface ColorContextType {
  color: ThemeColor;
  setColor: (color: ThemeColor) => void;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColorState] = useState<ThemeColor>('default');
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme-color') as ThemeColor;
    if (saved && THEME_COLORS[saved]) {
      setColorState(saved);
    }
  }, []);

  const setColor = (c: ThemeColor) => {
    setColorState(c);
    localStorage.setItem('theme-color', c);
  };

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    if (color === 'default') {
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-foreground');
    } else {
      root.style.setProperty('--primary', THEME_COLORS[color].hex);
      root.style.setProperty('--primary-foreground', '#FFFFFF');
    }
  }, [color, resolvedTheme, mounted]);

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColor must be used within ColorProvider');
  return ctx;
}
