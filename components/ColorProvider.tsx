"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export const THEME_COLORS = {
  default: { name: 'Indigo', hex: null, secondary: null },
  blue:    { name: 'Bleu',   hex: '#3B82F6', secondary: '#2563EB' },
  green:   { name: 'Vert',   hex: '#10B981', secondary: '#059669' },
  purple:  { name: 'Violet', hex: '#8B5CF6', secondary: '#7C3AED' },
  rose:    { name: 'Rose',   hex: '#F43F5E', secondary: '#E11D48' },
  orange:  { name: 'Orange', hex: '#F97316', secondary: '#EA580C' },
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
    const cfg = THEME_COLORS[color];

    if (color === 'default' || !cfg.hex) {
      // Remove overrides — fallback to CSS vars in globals.css
      root.style.removeProperty('--primary');
      root.style.removeProperty('--secondary');
      root.style.removeProperty('--accent');
      root.style.removeProperty('--primary-foreground');
    } else {
      const hex = cfg.hex as string;
      const secondary = (cfg as any).secondary as string ?? hex;
      root.style.setProperty('--primary', hex);
      root.style.setProperty('--secondary', secondary);
      root.style.setProperty('--accent', hex);
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
