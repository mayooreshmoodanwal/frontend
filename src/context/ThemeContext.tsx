'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'midnight' | 'emerald' | 'silk' | 'pearl';

export interface ThemeMeta {
  id: ThemeName;
  name: string;
  category: 'dark' | 'light';
  tagline: string;
  bgGradient: string;
  accentColor: string;
  cardBg: string;
  previewBg: string;
  badge: string;
}

export const THEMES: ThemeMeta[] = [
  {
    id: 'midnight',
    name: 'Midnight Velvet',
    category: 'dark',
    tagline: 'Obsidian, royal violet & glowing amethyst aura',
    bgGradient: 'from-[#0a0715] via-[#140c2b] to-[#080511]',
    accentColor: '#a855f7',
    cardBg: 'rgba(20, 15, 38, 0.65)',
    previewBg: 'bg-gradient-to-br from-purple-950 via-slate-950 to-indigo-950',
    badge: '👑 Most Popular (Dark)',
  },
  {
    id: 'emerald',
    name: 'Emerald Luxe',
    category: 'dark',
    tagline: 'Deep forest obsidian, glowing jade & champagne gold',
    bgGradient: 'from-[#051210] via-[#0b2520] to-[#040e0c]',
    accentColor: '#10b981',
    cardBg: 'rgba(11, 37, 32, 0.65)',
    previewBg: 'bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950',
    badge: '✨ Luxury Velvet',
  },
  {
    id: 'silk',
    name: 'Pitch Silk',
    category: 'light',
    tagline: 'Soft lavender gradient cloud melting into white porcelain (Pitch.com style)',
    bgGradient: 'from-[#fbf9ff] via-[#f2ebfd] to-[#e8ddfa]',
    accentColor: '#7c3aed',
    cardBg: 'rgba(255, 255, 255, 0.85)',
    previewBg: 'bg-gradient-to-br from-purple-100 via-indigo-50 to-white',
    badge: '🔮 Pitch.com Aesthetic (Light)',
  },
  {
    id: 'pearl',
    name: 'Pearl Champagne',
    category: 'light',
    tagline: 'Warm cream, rose gold & gentle peach sunset aura',
    bgGradient: 'from-[#fffdfa] via-[#fdf3eb] to-[#f7e6d8]',
    accentColor: '#f43f5e',
    cardBg: 'rgba(255, 255, 255, 0.88)',
    previewBg: 'bg-gradient-to-br from-rose-100 via-amber-50 to-orange-50',
    badge: '🌸 Warm Sunset',
  },
];

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themeMeta: ThemeMeta;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('midnight');

  useEffect(() => {
    const saved = localStorage.getItem('wishelier_theme') as ThemeName;
    if (saved && THEMES.some((t) => t.id === saved)) {
      setCurrentTheme(saved);
    }
  }, []);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
    localStorage.setItem('wishelier_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const themeMeta = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeMeta }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
