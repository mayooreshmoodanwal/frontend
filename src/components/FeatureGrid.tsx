'use client';

import React from 'react';
import { Cake, Music, Gift, Sparkles, Globe, Heart, Cpu } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function FeatureGrid() {
  const sectionRef = useReveal<HTMLElement>();

  const features = [
    {
      title: 'Virtual 3D Cake & Candle Blowing',
      desc: 'Interactive 3D birthday cake with realistic flame physics. Recipients can make a wish and blow out candles directly in their browser.',
      icon: Cake,
      accent: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Synchronized Spotify Music Player',
      desc: 'Attach their favorite song or playlist. Plays ambient background music matching the emotional mood of the site.',
      icon: Music,
      accent: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Secret Scratch-Card Surprises',
      desc: 'Hide secret messages, gift vouchers, or surprise reveal notes under interactive scratch-off gold foil cards.',
      icon: Gift,
      accent: 'from-pink-500 to-rose-500',
    },
    {
      title: '3D Physics Particle Confetti',
      desc: 'Custom physics-based confetti bursts tuned to match the handcrafted theme (Rainbow, Gold Stars, or Cyber Neon).',
      icon: Sparkles,
      accent: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Instant Cloudflare Global Edge Hosting',
      desc: 'Generates a permanent custom web link (wishelier.pages.dev/recipient) served across 300+ edge locations globally in sub-100ms.',
      icon: Globe,
      accent: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Memory Gallery Masonry & Captions',
      desc: 'High-definition image carousel and masonry vault with custom captions and milestone tags for unforgettable photo memories.',
      icon: Heart,
      accent: 'from-red-500 to-pink-500',
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="reveal relative py-20 border-t border-theme overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="theme-tag mb-4">
            <Cpu className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Interactive Web Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
            Engineered for{' '}
            <span style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Pure Delight & Wonder
            </span>
          </h2>
          <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Every Wishelier website includes interactive 3D physics, custom audio, and memory vaults designed to wow your recipient.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl glass-panel-luxury p-8 border border-theme transition-all flex flex-col justify-between group hover:border-theme"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.accent} p-0.5 shadow-lg mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <div className="w-full h-full rounded-[14px] flex items-center justify-center text-white" style={{ background: 'var(--bg-base)' }}>
                      <Icon className="w-6 h-6" style={{ color: 'var(--accent)' }} />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-3 tracking-tight" style={{ color: 'var(--text-main)' }}>
                    {f.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
