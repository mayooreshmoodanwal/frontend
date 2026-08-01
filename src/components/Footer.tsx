'use client';

import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const legalLinks = [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
  ];

  return (
    <footer className="w-full border-t py-14" style={{ borderColor: 'var(--border)', background: 'var(--bg-surface)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Row: Brand + Nav Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg p-[1.5px]" style={{ background: 'var(--accent-gradient)' }}>
              <div className="w-full h-full rounded-[6px] flex items-center justify-center" style={{ background: 'var(--bg-base)' }}>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <span className="text-base font-bold" style={{ background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Wishelier 3D Web Studio
            </span>
          </div>

          {/* Legal Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs font-medium transition-colors hover:underline underline-offset-4"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="w-full h-px mb-6" style={{ background: 'var(--border)' }} />

        {/* Bottom Row: Legal name + tagline + copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5 animate-pulse" />
            <span>for unforgettable birthday celebrations.</span>
          </p>

          <p style={{ color: 'var(--text-sub)' }}>
            © {new Date().getFullYear()} Wishelier — Operated by{' '}
            <strong style={{ color: 'var(--text-main)' }}>Ayush Kumar Singh</strong>{' '}
            (Sole Proprietor). All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
