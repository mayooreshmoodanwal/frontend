import type { Metadata } from 'next';
import LegalLayout from '@/components/LegalLayout';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Wishelier',
  description: 'Refund and Cancellation Policy for Wishelier digital services, in accordance with the Consumer Protection Act, 2019.',
};

export default function RefundPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" subtitle="Effective Date: July 31, 2026">

      <p>
        This policy outlines your rights regarding refunds and cancellations for the digital services provided by Wishelier (operated by <strong style={{ color: 'var(--text-main)' }}>Ayush Kumar Singh</strong>), in accordance with the Consumer Protection Act, 2019.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>1. General Non-Refundable Nature of Digital Goods</h2>
      <p>
        Because Wishelier provides custom, AI-generated digital products that require immediate, non-recoverable computational resources, all successful payments are generally final and non-refundable, except under the specific circumstances listed below.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>2. Cancellation Policy (Pre-Purchase)</h2>
      <p>Our platform operates on a &quot;preview-before-purchase&quot; model.</p>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li>You will see a secure preview of your custom-generated website before any payment is requested.</li>
        <li>You may abandon the process or cancel the order at any time before finalizing the payment. No cancellation charges apply at this stage.</li>
        <li>Once payment is confirmed and the live link is delivered, the order cannot be canceled.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>3. Conditions for a Refund</h2>
      <p>You are entitled to a full refund of ₹29 under the following conditions:</p>
      <ul className="space-y-2" style={{ paddingLeft: '1.25rem' }}>
        <li><strong style={{ color: 'var(--text-main)' }}>Technical Failure:</strong> If a system error prevents the live website link from being generated or delivered after payment is successfully deducted.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Deficient Service:</strong> If the final delivered live link is permanently broken, fails to load entirely, or contains critical technical errors that render it unusable, differing materially from the approved preview.</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Duplicate Billing:</strong> If you are accidentally charged more than once for a single website generation.</li>
      </ul>
      <p>
        <strong style={{ color: 'var(--text-main)' }}>Note:</strong> Dissatisfaction with the subjective creative choices made by the AI (e.g., phrasing of jokes, color placement) provided they align with the chosen mood, or errors caused by typos in your original input, do not qualify for a refund.
      </p>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>4. How to Request a Refund</h2>
      <p>To request a refund for a technical failure or duplicate charge, please email our support team within 3 days of the transaction:</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }} className="space-y-2">
        <li><strong style={{ color: 'var(--text-main)' }}>Email:</strong> <a href="mailto:support@wishelier.com" style={{ color: 'var(--accent)' }}>support@wishelier.com</a></li>
        <li><strong style={{ color: 'var(--text-main)' }}>Subject Line:</strong> Refund Request - [Your Transaction ID]</li>
        <li><strong style={{ color: 'var(--text-main)' }}>Requirements:</strong> Please include the Transaction ID, the phone number/email used during generation, and screenshots demonstrating the technical failure.</li>
      </ul>

      <h2 style={{ color: 'var(--text-main)', fontSize: '1.125rem', fontWeight: 800 }}>5. Refund Processing Timeline</h2>
      <p>
        Approved refunds will be processed by our team and credited back to your original payment method within 5 to 7 business days.
      </p>

    </LegalLayout>
  );
}
