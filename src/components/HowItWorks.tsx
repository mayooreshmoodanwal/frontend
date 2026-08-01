'use client';

import React from 'react';
import { Sparkles, Palette, Image as ImageIcon, Zap, Rocket } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function HowItWorks() {
  const sectionRef = useReveal<HTMLElement>();

  const steps = [
    {
      num: '01',
      title: 'Choose Bespoke Theme & Tone',
      desc: 'Select from 4 handcrafted color palettes (Midnight Velvet, Emerald Luxe, Pitch Silk, Pearl Champagne) and set the emotional mood.',
      icon: Palette,
    },
    {
      num: '02',
      title: 'Craft Personal Story & Memories',
      desc: 'Add secret birthday wishes, inside jokes, milestone dates, and sync their favorite Spotify music track.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: 'Upload Photos with Captions',
      desc: 'Curate 2 to 10 high-resolution photos with custom memory captions to build a 3D masonry photo vault.',
      icon: ImageIcon,
    },
    {
      num: '04',
      title: 'Instant Cloudflare 3D Deployment',
      desc: 'Our engine compiles a live 3D web experience with virtual cake blowing & confetti, hosted instantly on Cloudflare Pages.',
      icon: Rocket,
    },
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="reveal relative py-20 border-t border-theme overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="theme-tag mb-4">
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>The Wishelier Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
            From First Draft to{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Live 3D Celebration
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Create an unforgettable web gift in under 2 minutes. No coding or design skills required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl glass-panel-luxury p-6 border border-theme hover:border-theme transition-all group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--accent)' }}>
                    {s.num}
                  </span>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 tracking-tight" style={{ color: 'var(--text-main)' }}>
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
