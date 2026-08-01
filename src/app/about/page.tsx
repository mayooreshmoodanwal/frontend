import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'About Us | Wishelier',
  description: 'Learn about Wishelier, an AI-powered birthday website builder founded by Ayush Kumar Singh.',
};

export default function AboutPage() {
  return (
    <LegalLayout title="About Us" subtitle="Learn about the team behind Wishelier">

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: 800 }}>Welcome to Wishelier!</h2>

      <p>
        Wishelier is an innovative platform built to rethink how we celebrate our loved ones in the digital age. Founded by <strong style={{ color: 'var(--text-main)' }}>Ayush Kumar Singh</strong>, a student pursuing a B.Tech in Computer Science (AI/ML) at Dr. A.P.J. Abdul Kalam Technical University (AKTU), Wishelier bridges the gap between technology and heartfelt emotion.
      </p>

      <p>
        We believe that standard, template-based greeting cards are a thing of the past. Utilizing an advanced, multi-agent AI pipeline, Wishelier acts as your personal digital creative agency. By taking your unique memories, inside jokes, and photos, our system dynamically designs, writes, and codes a completely unique, premium single-page website for every single birthday. No two Wishelier websites are ever the same.
      </p>

      <p>
        Rooted in a passion for modern web development, scalable infrastructure, and professional UI/UX design, Wishelier is built to deliver a sophisticated, personalized experience that makes every celebration unforgettable.
      </p>

    </LegalLayout>
  );
}
