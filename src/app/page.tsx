import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ThemeShowcase from '@/components/ThemeShowcase';
import HowItWorks from '@/components/HowItWorks';
import HomeClientWrapper from '@/components/HomeClientWrapper';
import FeatureGrid from '@/components/FeatureGrid';
import SEOContent from '@/components/SEOContent';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-purple-500 selection:text-white">
      <Header />

      <main className="flex-grow">
        {/* Static Prerendered Hero Section with H1 */}
        <Hero />

        {/* Pitch.com-Style Theme Showcase */}
        <ThemeShowcase />

        {/* How It Works Steps */}
        <HowItWorks />

        {/* Interactive 5-Step Creator Wizard */}
        <HomeClientWrapper />

        {/* Interactive Feature Highlights Grid */}
        <FeatureGrid />

        {/* FAQ & Comprehensive SEO Content */}
        <SEOContent />
      </main>

      <Footer />
    </div>
  );
}
