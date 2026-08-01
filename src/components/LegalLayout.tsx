'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function LegalLayout({ title, subtitle, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen relative" style={{ background: 'var(--bg-base)' }}>
      {/* Subtle orb glow */}
      <div className="pitch-bg-glow" style={{ opacity: 0.5 }}>
        <div className="pitch-orb-1" />
        <div className="pitch-orb-2" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back link */}
        <a
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-semibold mb-8 transition-colors hover:opacity-80"
          style={{ color: 'var(--accent)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Wishelier</span>
        </a>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2" style={{ color: 'var(--text-main)' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm mb-10" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        )}

        {/* Content Card */}
        <div className="glass-panel-luxury rounded-3xl p-8 sm:p-10 border border-theme">
          <div className="prose-legal space-y-6 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {children}
          </div>
        </div>

        {/* Footer attribution */}
        <div className="mt-10 text-center text-xs" style={{ color: 'var(--text-sub)' }}>
          © {new Date().getFullYear()} Wishelier — Operated by <strong style={{ color: 'var(--text-main)' }}>Ayush Kumar Singh</strong> (Sole Proprietor)
        </div>
      </div>
    </div>
  );
}
