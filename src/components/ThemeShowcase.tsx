'use client';

import React, { useState } from 'react';
import { Sparkles, Palette, Check, Heart, Music, Eye, Smartphone, Laptop } from 'lucide-react';
import { useTheme, THEMES, ThemeName } from '@/context/ThemeContext';
import { useReveal } from '@/hooks/useReveal';

export default function ThemeShowcase() {
  const { currentTheme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<ThemeName>(currentTheme);
  const sectionRef = useReveal<HTMLElement>();

  const handleSelectTheme = (id: ThemeName) => {
    setActiveTab(id);
    setTheme(id);
  };

  const selectedMeta = THEMES.find((t) => t.id === activeTab) || THEMES[0];

  return (
    <section id="themes" ref={sectionRef} className="reveal relative py-20 overflow-hidden border-t border-theme">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="theme-tag mb-4">
            <Palette className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Handcrafted Theme Collection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
            4 Bespoke Aesthetics.{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Zero AI Clutter.
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Inspired by Pitch.com's organic liquid gradients, every theme features tailor-made color theory, ambient aura lighting, glassmorphic cards, and custom micro-animations.
          </p>
        </div>

        {/* Pitch-style Interactive Slide Controls Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 rounded-2xl glass-panel-luxury gap-2">
            {THEMES.map((t) => {
              const isActive = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t.id as ThemeName)}
                  className={`flex items-center space-x-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-white shadow-lg scale-[1.02]'
                      : 'hover:bg-white/5'
                  }`}
                  style={{
                    background: isActive ? 'var(--accent-gradient)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-white/40 shadow-sm"
                    style={{ backgroundColor: t.accentColor }}
                  />
                  <span>{t.name}</span>
                  {isActive && <Check className="w-4 h-4 ml-1 text-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Slide Viewer Box */}
        <div className="relative rounded-3xl glass-panel-luxury p-6 sm:p-10 border border-theme overflow-hidden shadow-2xl transition-all duration-500">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slide Metadata Details */}
            <div className="lg:col-span-5 space-y-6">
              <div className="theme-tag">
                <span>{selectedMeta.badge}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: 'var(--text-main)' }}>
                {selectedMeta.name}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {selectedMeta.tagline}
              </p>

              {/* Theme Capabilities List */}
              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-lg mt-0.5" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: 'var(--text-main)' }}>Curvy Ambient Aura:</span>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>Soft fluid backdrop glow tuned for high dynamic range displays.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-lg mt-0.5" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: 'var(--text-main)' }}>Glassmorphic Cards:</span>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>24px backdrop blur panels with frosted border highlights.</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1 rounded-lg mt-0.5" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                    <Music className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold" style={{ color: 'var(--text-main)' }}>Spotify & Audio Player:</span>{' '}
                    <span style={{ color: 'var(--text-muted)' }}>Customized audio control widget matching the theme palette.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4">
                <a
                  href="#create"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl text-white font-bold text-sm transition-all shadow-md hover:opacity-90"
                  style={{ background: 'var(--accent-gradient)' }}
                >
                  <Eye className="w-4 h-4" />
                  <span>Build With {selectedMeta.name}</span>
                </a>
              </div>
            </div>

            {/* Live Interactive Slide Mockup Screen */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-theme shadow-2xl">
                
                {/* Browser Frame Bar */}
                <div className="px-4 py-3 border-b border-theme flex items-center justify-between" style={{ background: 'var(--card-inner)' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-[11px] font-mono px-3 py-0.5 rounded-md truncate max-w-[240px]" style={{ color: 'var(--text-muted)', background: 'var(--input-bg)', border: '1px solid var(--border)' }}>
                    https://wishelier.pages.dev/preview?theme={selectedMeta.id}
                  </div>
                  <div className="flex items-center space-x-2" style={{ color: 'var(--text-sub)' }}>
                    <Laptop className="w-3.5 h-3.5" />
                    <Smartphone className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Inner Mockup Viewport */}
                <div className={`p-8 sm:p-12 min-h-[380px] flex flex-col justify-between ${selectedMeta.previewBg} transition-all duration-500`}>
                  
                  {/* Hero badge */}
                  <div className="flex justify-between items-start">
                    <div className="px-3.5 py-1.5 rounded-full text-white text-xs font-bold shadow-sm" style={{ background: 'var(--accent-gradient)' }}>
                      ✨ Happy Birthday Chloe!
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: 'var(--accent)' }}>
                      <Heart className="w-4 h-4 fill-white" />
                    </div>
                  </div>

                  {/* Center Wish Typography */}
                  <div className="my-6 text-center space-y-2">
                    <h4 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                      Celebrating 21 Years of Joy & Adventure 🚀
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-md mx-auto">
                      "May your year be as extraordinary as your laughter."
                    </p>
                  </div>

                  {/* Bottom Interactive Widgets Row */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/30 flex items-center justify-center text-emerald-300">
                        <Music className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] font-bold">Taylor Swift - 22</div>
                        <div className="text-[9px] text-slate-300">Spotify Audio Sync</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/30 flex items-center justify-center text-purple-300">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-[11px] font-bold">3D Confetti Burst</div>
                        <div className="text-[9px] text-slate-300">Interactive Cake</div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
