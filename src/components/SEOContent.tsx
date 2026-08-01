'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

export default function SEOContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const sectionRef = useReveal<HTMLElement>();

  const faqs = [
    {
      q: 'What is Wishelier and how does the 3D Birthday Website Builder work?',
      a: 'Wishelier is a luxury AI-powered 3D website studio that turns personal photos, memory notes, and music into custom interactive birthday websites. In 5 simple steps, you pick a handcrafted theme, upload photos with captions, and generate a live web link hosted on Cloudflare Pages.',
    },
    {
      q: 'Will the website stay online permanently?',
      a: 'Yes! Every generated site is deployed directly to Cloudflare Pages edge network, giving your recipient a fast, permanent custom URL (e.g., wishelier.pages.dev/recipient-name) that works on iPhone, Android, and Desktop.',
    },
    {
      q: 'What are the 4 Handcrafted Themes available?',
      a: 'Wishelier features 4 distinct handcrafted themes inspired by modern organic gradient design: 1. Midnight Velvet (Obsidian & Amethyst), 2. Emerald Luxe (Deep Forest & Gold), 3. Pitch Silk (Soft Lavender Cloud - Pitch.com style), and 4. Pearl Champagne (Warm Cream & Rose Gold).',
    },
    {
      q: 'Can I add music and interactive features like virtual cake blowing?',
      a: 'Absolutely! You can sync Spotify track links, enable 3D candle blowing with interactive flame physics, add 3D confetti particle bursts, and hide secret messages inside scratch-off cards.',
    },
    {
      q: 'Is Wishelier search engine optimized (SEO friendly)?',
      a: 'Yes. All generated birthday websites are structured with semantic HTML5 tags, fast server-side rendered markup, OpenGraph social preview cards, and JSON-LD schema metadata for maximum SEO visibility.',
    },
  ];

  return (
    <section id="faq" ref={sectionRef} className="reveal relative py-20 border-t border-theme overflow-hidden">
      
      {/* JSON-LD Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Wishelier - AI Birthday Website Builder',
            url: 'https://wishelier.com',
            description: 'Create bespoke 3D birthday websites with handcrafted themes, photo galleries, virtual cake blowing, and Spotify music sync.',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0.00',
              priceCurrency: 'USD',
            },
          }),
        }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="theme-tag mb-4">
            <HelpCircle className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Frequently Asked Questions & SEO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4" style={{ color: 'var(--text-main)' }}>
            Everything You Need to Know
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Learn more about our 3D web studio engine and custom Cloudflare hosting.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel-luxury border border-theme overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm sm:text-base transition-colors"
                  style={{ color: 'var(--text-main)' }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 ml-4 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    style={{ color: 'var(--accent)' }}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-xs sm:text-sm leading-relaxed border-t border-theme pt-4" style={{ color: 'var(--text-muted)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SEO Text Block */}
        <div className="rounded-3xl glass-panel-luxury p-8 border border-theme text-xs space-y-4">
          <h3 className="text-sm font-bold" style={{ color: 'var(--text-main)' }}>
            Why Create a Bespoke 3D Birthday Website with Wishelier?
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Traditional paper greeting cards get thrown away, and basic digital e-cards feel impersonal. Wishelier reimagines birthday greetings by building an interactive 3D web experience tailored specifically to your relationship. With 4 handcrafted themes inspired by modern web design leaders like Pitch.com, your gift stands out with soft organic gradient glows, glassmorphic photo vaults, synchronized music, and interactive candle blowing physics.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 border-t border-theme" style={{ color: 'var(--text-main)' }}>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>3D WebGL Graphics</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Cloudflare Pages Edge CDN</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Responsive iOS & Android Support</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
