'use client';

import React from 'react';
import { Sparkles, Heart, Music, Image as ImageIcon, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Hero() {
  const { themeMeta } = useTheme();

  return (
    <section className="relative pt-14 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Pitch-style organic orb auras */}
      <div className="pitch-bg-glow">
        <div className="pitch-orb-1" />
        <div className="pitch-orb-2" />
        <div className="pitch-orb-3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* ── Left: Headline ── */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">

            {/* Pill badge */}
            <div className="theme-tag">
              <Sparkles className="w-3 h-3" style={{ color: 'var(--accent)' }} />
              <span>Next-Gen 3D Birthday Web Studio</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* H1 — uses var(--text-main) via globals */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              Craft Bespoke 3D <br className="hidden sm:block" />
              <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Birthday Websites
              </span>{' '}
              <br />
              That Feel Handcrafted.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0" style={{ color: 'var(--text-muted)' }}>
              Ditch plain greeting cards. Create custom interactive 3D web experiences with memory timelines,
              photo galleries, virtual cake blowing, and Spotify music sync.
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#create"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-bold text-base transition-opacity hover:opacity-90 shadow-xl flex items-center justify-center space-x-2 group"
                style={{ background: 'var(--accent-gradient)' }}
              >
                <span>Launch Builder Wizard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#themes"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel-luxury font-semibold text-sm transition-all flex items-center justify-center space-x-2"
                style={{ color: 'var(--text-main)' }}
              >
                <Play className="w-4 h-4" style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                <span>Explore Live Theme Slides</span>
              </a>
            </div>

            {/* Trust row */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              {['Instant Cloudflare URL', '3D Confetti & Cake', 'Spotify Music Sync'].map((t) => (
                <span key={t} className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{t}</span>
                </span>
              ))}
            </div>

          </div>

          {/* ── Right: Live card mockup ── */}
          <div className="lg:col-span-5 relative">
            {/* Glow ring */}
            <div className="absolute -inset-2 rounded-3xl opacity-30 blur-xl animate-pulse"
              style={{ background: 'var(--accent-gradient)' }} />

            <div className="relative rounded-3xl glass-panel-luxury p-6 sm:p-8 shadow-2xl overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center justify-between border-b pb-4 mb-6" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="theme-tag">Active Theme: {themeMeta.name}</span>
              </div>

              {/* Dynamic inner mockup */}
              <div className={`p-6 rounded-2xl ${themeMeta.previewBg} border transition-all duration-500`}
                style={{ borderColor: 'var(--card-inner-border)' }}>
                <div className="text-center space-y-3">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ background: 'var(--accent-gradient)' }}>
                    🎉 Happy 25th Birthday Maya!
                  </span>
                  <h3 className="text-xl font-black tracking-tight text-white">
                    "To the best human in the universe"
                  </h3>
                  <p className="text-xs text-slate-300 italic max-w-xs mx-auto">
                    "From Tokyo street ramen to late-night coding sessions — here is to 25 years of magic!"
                  </p>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {[['Tokyo \'24', 'ImageIcon'], ['Best Friends', 'Heart'], ['Spotify', 'Music']].map(([label]) => (
                      <div key={label} className="h-14 rounded-xl flex flex-col items-center justify-center text-[10px] text-slate-300"
                        style={{ background: 'var(--card-inner)', border: '1px solid var(--card-inner-border)' }}>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  3D Particle System
                </span>
                <span style={{ color: 'var(--accent)' }} className="font-semibold">wishelier.pages.dev/maya</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
