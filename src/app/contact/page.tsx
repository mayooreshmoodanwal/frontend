import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Contact Us | Wishelier',
  description: 'Get in touch with Wishelier for support, privacy queries, or general inquiries.',
};

export default function ContactPage() {
  return (
    <LegalLayout title="Contact Us" subtitle="We are here to help!">

      <p>
        Whether you have a question about a generated website, need technical support, or have a privacy concern, please reach out to us.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>Business Information</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Legal Name:</strong> Ayush Kumar Singh (Sole Proprietor)</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Brand Name:</strong> Wishelier</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>Support & General Inquiries</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Email:</strong> <a href="mailto:support@wishelier.com" style={{ color: 'var(--accent)' }}>support@wishelier.com</a> (For refunds, technical issues, or general questions)</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Phone:</strong> <a href="tel:+919792037566" style={{ color: 'var(--accent)' }}>+91-9792037566</a></li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>Privacy & Data Concerns</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Email:</strong> <a href="mailto:privacy@wishelier.com" style={{ color: 'var(--accent)' }}>privacy@wishelier.com</a> (To withdraw consent, request data erasure, or file a grievance under the DPDP Act)</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>Registered Address</h2>
      <p>
        Hi-Tech Hostel, Suncity Road<br />
        Ghaziabad, Uttar Pradesh<br />
        India 201015
      </p>

    </LegalLayout>
  );
}
