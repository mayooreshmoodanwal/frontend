import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wishelier',
  description: 'Privacy Policy for Wishelier — how we collect, use, and protect your personal data under the DPDP Act, 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy" subtitle="Effective Date: July 31, 2026">

      <p>
        This Privacy Policy explains how Ayush Kumar Singh (operating as &quot;Wishelier&quot;) collects, uses, and protects your digital personal data when you use the Wishelier AI Birthday Website Builder. We are committed to processing your data securely and in compliance with the Digital Personal Data Protection (DPDP) Act, 2023, and the associated DPDP Rules, 2025.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>1. Data Fiduciary Identity</h2>
      <p>
        Under the DPDP Act, a Data Fiduciary is an individual or entity that decides how and why personal data is processed. The Data Fiduciary for Wishelier is:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Legal Name:</strong> Ayush Kumar Singh (Sole Proprietor)</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Address:</strong> Hi-Tech Hostel, Suncity Road, Ghaziabad, Uttar Pradesh, India 201015</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Contact for Privacy Queries:</strong> <a href="mailto:privacy@wishelier.com" style={{ color: 'var(--accent)' }}>privacy@wishelier.com</a></li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>2. Information We Collect</h2>
      <p>
        Following the DPDP Act principle of data minimisation, we only collect data strictly necessary to generate your personalized website:
      </p>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-main)' }}>Mandatory Details:</strong> Names of the sender and recipient, and the nature of the relationship.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Optional Details:</strong> Personal preferences, shared memories, or inside jokes.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Media:</strong> Up to 10 photos uploaded by the user to be used in the website layout.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>3. Purpose of Processing</h2>
      <p>
        We only process your personal data for the specific, stated purpose of generating a personalized, AI-driven birthday website. Your data will not be used for targeted advertising, sold to third parties, or used beyond this explicit purpose.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>4. Consent Framework</h2>
      <p>
        In accordance with the DPDP Act, we require your clear, specific, informed, unconditional, and unambiguous consent before collecting your data.
      </p>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-main)' }}>Verifiable Consent:</strong> By submitting your information and accepting the consent notice, you permit us to process your data for the stated purpose.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Withdrawal:</strong> You have the right to withdraw your consent at any time by contacting <a href="mailto:privacy@wishelier.com" style={{ color: 'var(--accent)' }}>privacy@wishelier.com</a>.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>5. Data Principal Rights</h2>
      <p>As a user (Data Principal), the DPDP Act grants you several rights over your personal data:</p>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-main)' }}>Right to Access:</strong> You can request a summary of the personal data we hold and how it is being used.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Right to Correction:</strong> You can request corrections to any inaccurate data.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Right to Erasure:</strong> You can ask us to delete your personal data. We automatically erase your inputted data and photos once the website is generated and the specific purpose is served.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Right to Nominate:</strong> You may nominate someone to exercise your privacy rights in the event of death or incapacity.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>6. Data Retention & Security Safeguards</h2>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-main)' }}>Storage Limitation:</strong> We do not retain your data longer than necessary. Once the final website link is generated and delivered, your raw text inputs and image uploads are securely deleted from our processing systems.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Security:</strong> We implement reasonable security safeguards to prevent personal data breaches, as mandated by Section 8(5) of the DPDP Act.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>7. Grievance Redressal</h2>
      <p>
        If you have any concerns regarding how your data is handled, you may raise a grievance with our designated officer:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Grievance Officer:</strong> Ayush Kumar Singh</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Email:</strong> <a href="mailto:privacy@wishelier.com" style={{ color: 'var(--accent)' }}>privacy@wishelier.com</a></li>
      </ul>
      <p>
        If your grievance is not resolved satisfactorily, you have the right to appeal to the Data Protection Board of India.
      </p>

    </LegalLayout>
  );
}
