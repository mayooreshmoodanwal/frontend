'use client';
// Wishelier 3D AI Studio Header Component (Updated August 2026)
import React, { useState } from 'react';
import { Sparkles, Palette, ChevronDown, Check, User, LogIn } from 'lucide-react';
import { useTheme, THEMES, ThemeName } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { currentTheme, setTheme, themeMeta } = useTheme();
  const { user, openAuthModal, openDashboard } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl border-b border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#create"
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('reset-crafting-form'));
            }
          }}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 p-[2px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Wishelier
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
              3D AI Studio
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#themes" className="hover:text-white transition-colors">
            Theme Showcase
          </a>
          <a href="#how-it-works" className="hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a
            href="#create"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('reset-crafting-form'));
              }
            }}
            className="hover:text-white transition-colors"
          >
            Builder Wizard
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* User Auth, Theme Selector & Generator Action CTA */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* User Account / Sign In Trigger */}
          {user ? (
            <button
              onClick={openDashboard}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-300 text-xs font-bold hover:bg-purple-600/30 transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-[10px]">
                {user.full_name.charAt(0)}
              </div>
              <span className="hidden sm:inline">My Studio</span>
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('signin')}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full glass-panel-luxury text-slate-200 text-xs font-semibold hover:text-white transition-all"
            >
              <LogIn className="w-3.5 h-3.5 text-purple-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-full glass-panel-luxury text-xs font-semibold text-slate-200 hover:border-purple-500/50 transition-all shadow-sm"
              title="Change Handcrafted Aesthetic Theme"
            >
              <Palette className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">{themeMeta.name}</span>
              <span className="sm:hidden">{themeMeta.name.split(' ')[0]}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl glass-panel-luxury p-2 shadow-2xl z-50 border border-white/10"
                onClick={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 mb-1">
                  Handcrafted Themes (Pitch.com Style)
                </div>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id as ThemeName)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                      currentTheme === t.id
                        ? 'bg-purple-600/20 text-white border border-purple-500/30'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: t.accentColor }}
                      />
                      <div>
                        <div className="font-semibold">{t.name}</div>
                        <div className="text-[10px] text-slate-400 capitalize">{t.category} Theme</div>
                      </div>
                    </div>
                    {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-purple-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Builder Button */}
          <a
            href="#create"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('reset-crafting-form'));
              }
            }}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-600/25 flex items-center space-x-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Craft Website</span>
          </a>
        </div>
      </div>
    </header>
  );
}
