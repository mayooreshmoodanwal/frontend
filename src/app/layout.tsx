import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#0a0715',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://wishelier.in'),
  title: 'Wishelier | Handcrafted 3D Birthday Website Studio',
  description: 'Create bespoke, personalized 3D birthday websites with 4 handcrafted themes, photo vaults, virtual cake blowing physics, and Spotify music sync.',
  keywords: [
    '3D birthday website builder',
    'personalized digital birthday gift',
    'custom birthday link',
    'interactive 3D web studio',
    'Wishelier',
    'Ayush Kumar Singh',
    'Pitch style birthday web app',
    'virtual birthday card generator',
  ],
  authors: [{ name: 'Ayush Kumar Singh', url: 'https://wishelier.in/about' }],
  creator: 'Ayush Kumar Singh',
  publisher: 'Wishelier',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://wishelier.in/',
  },
  openGraph: {
    title: 'Wishelier | Handcrafted 3D Birthday Website Studio',
    description: 'Transform your favorite memories into an unforgettable, interactive 3D birthday web experience with 4 classy themes.',
    url: 'https://wishelier.in/',
    siteName: 'Wishelier',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://wishelier.in/icon.svg',
        width: 1200,
        height: 630,
        alt: 'Wishelier 3D Web Studio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wishelier | Handcrafted 3D Birthday Website Studio',
    description: 'Create bespoke 3D birthday websites with 4 handcrafted themes, photo galleries, and virtual cake blowing.',
    creator: '@wishelier',
    images: ['https://wishelier.in/icon.svg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
};

import { AuthProvider } from '@/context/AuthContext';
import AuthModal from '@/components/AuthModal';
import DashboardModal from '@/components/DashboardModal';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebsite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wishelier',
    alternateName: 'Wishelier 3D Birthday Web Studio',
    url: 'https://wishelier.in',
    description: 'Luxury AI-powered 3D website studio for custom birthday celebrations.',
    publisher: {
      '@type': 'Person',
      name: 'Ayush Kumar Singh',
    },
  };

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Wishelier and how does the 3D Birthday Website Builder work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wishelier is a luxury AI-powered 3D website studio that turns personal photos, memory notes, and music into custom interactive birthday websites. In 5 simple steps, you pick a handcrafted theme, upload photos with captions, and generate a live web link.',
        },
      },
      {
        '@type': 'Question',
        name: 'Will the birthday website stay online permanently?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Every generated birthday website receives a permanent custom web URL (e.g. wishelier.pages.dev/recipient) served globally across 300+ edge locations with fast load times.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the 4 Handcrafted Themes available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Choose from 4 handcrafted themes: Midnight Velvet (dark luxury), Emerald Luxe (emerald green), Pitch Silk (soft lavender cloud), and Pearl Champagne (warm rose blush).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I add music and interactive features like virtual cake blowing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Every site supports background music playback, interactive photo galleries, personalized note cards, and interactive virtual candle blowing physics.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Wishelier search engine optimized (SEO friendly)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, all generated websites follow high performance standards, responsive layout structures, and rich OpenGraph metadata.',
        },
      },
    ],
  };

  return (
    <html lang="en" data-theme="midnight">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="content-language" content="en" />
        <meta name="format-detection" content="telephone=no" />
        <title>Wishelier | Handcrafted 3D Birthday Website Studio</title>
        <meta name="description" content="Create bespoke, personalized 3D birthday websites with 4 handcrafted themes, photo vaults, virtual cake blowing physics, and Spotify music sync." />
        <meta name="keywords" content="3D birthday website builder, personalized digital birthday gift, custom birthday link, interactive 3D web studio, Wishelier, Ayush Kumar Singh" />
        <meta name="author" content="Ayush Kumar Singh" />
        <link rel="canonical" href="https://wishelier.in/" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* OpenGraph */}
        <meta property="og:title" content="Wishelier | Handcrafted 3D Birthday Website Studio" />
        <meta property="og:description" content="Transform your favorite memories into an unforgettable, interactive 3D birthday web experience with 4 classy themes." />
        <meta property="og:url" content="https://wishelier.in/" />
        <meta property="og:site_name" content="Wishelier" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image" content="https://wishelier.in/icon.svg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wishelier | Handcrafted 3D Birthday Website Studio" />
        <meta name="twitter:description" content="Create bespoke 3D birthday websites with 4 handcrafted themes, photo galleries, and virtual cake blowing." />
        <meta name="twitter:image" content="https://wishelier.in/icon.svg" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <AuthModal />
            <DashboardModal />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
