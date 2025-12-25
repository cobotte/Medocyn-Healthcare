import React from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Privacy Policy',
  description: 'Learn how Medocyn Healthcare protects and manages patient information, clinical charts, and cookies in accordance with HIPAA standards.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      <header className="space-y-2">
        <h1 className="text-h1 text-primary">Privacy Policy & HIPAA Statement</h1>
        <p className="text-xs text-slate-400">Effective Date: July 10, 2026</p>
      </header>

      <section id="data-collection" className="space-y-3">
        <h2 className="text-h3">1. Data Collection</h2>
        <p className="text-small text-text-secondary">
          We collect personal identification details (name, email, phone) and medical logs during appointment booking and patient portal check-ins. All data transmissions are protected via Transport Layer Security (TLS) protocol.
        </p>
      </section>

      <section id="cookies" className="space-y-3">
        <h2 className="text-h3">2. Cookies Policy</h2>
        <p className="text-small text-text-secondary">
          Our website utilizes essential security cookies to sustain portal sessions, prevent cross-site request forgery (CSRF), and maintain theme choices. No third-party tracking scripts are injected on medical pages.
        </p>
      </section>

      <section id="medical-privacy" className="space-y-3">
        <h2 className="text-h3">3. HIPAA & Medical Privacy</h2>
        <p className="text-small text-text-secondary">
          Your Protected Health Information (PHI) is protected under federal HIPAA guidelines. Clinical charts, lab test reports, and doctor consultation notes are restricted to authorized clinical staff and our secure EHR database system.
        </p>
      </section>

      <section id="patient-rights" className="space-y-3">
        <h2 className="text-h3">4. Patient Rights</h2>
        <p className="text-small text-text-secondary">
          Patients retain the right to inspect, copy, and request corrections to their EHR records, obtain billing summaries, and revoke data access privileges at any time.
        </p>
      </section>

      <section id="third-party" className="space-y-3">
        <h2 className="text-h3">5. Third-Party Services</h2>
        <p className="text-small text-text-secondary">
          We do not sell, trade, or share patient health metrics with insurance companies without express consent, nor do we disclose details to external vendors except for secure billing processing.
        </p>
      </section>

      <section id="contact-info" className="space-y-3">
        <h2 className="text-h3">6. Privacy Contacts</h2>
        <p className="text-small text-text-secondary">
          For inquiries regarding HIPAA compliance, data records, or audit reviews, please contact our Data Protection Officer at <strong>privacy@medocyn.com</strong>.
        </p>
      </section>

    </article>
  );
}
