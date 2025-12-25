import React from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Terms of Service',
  description: 'Read the terms of usage, booking policies, clinical disclaimers, and legal disclosures for Medocyn Healthcare.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      
      <header className="space-y-2">
        <h1 className="text-h1 text-primary">Terms of Service</h1>
        <p className="text-xs text-slate-400">Effective Date: July 10, 2026</p>
      </header>

      <section id="usage" className="space-y-3">
        <h2 className="text-h3">1. Website Usage</h2>
        <p className="text-small text-text-secondary">
          By navigating our website, you agree to comply with our security parameters. Accessing clinical systems, patient portal databases, or API routes via scraping or automation is strictly prohibited.
        </p>
      </section>

      <section id="appointments" className="space-y-3">
        <h2 className="text-h3">2. Appointment Bookings</h2>
        <p className="text-small text-text-secondary">
          Confirming an appointment registers a provisional slot. Actual appointments are pending approval based on clinic triage rules and physician schedules. Cancelations require a 24-hour notification.
        </p>
      </section>

      <section id="disclaimer" className="space-y-3">
        <h2 className="text-h3">3. Medical Disclaimer</h2>
        <p className="text-small text-text-secondary">
          <strong>The contents of this website (text, graphics, blogs) do not constitute immediate medical diagnosis or emergency treatment.</strong> In case of urgent physiological trauma, please dial local emergency services immediately.
        </p>
      </section>

      <section id="responsibilities" className="space-y-3">
        <h2 className="text-h3">4. Patient Responsibilities</h2>
        <p className="text-small text-text-secondary">
          Patients are responsible for providing authentic demographic, insurance, and medical background data when using forms. Sharing portal passwords or session tokens is prohibited.
        </p>
      </section>

      <section id="legal" className="space-y-3">
        <h2 className="text-h3">5. Legal Disclosures</h2>
        <p className="text-small text-text-secondary">
          These terms are governed by federal clinical guidelines and regional laws. Medocyn Healthcare reserves the right to suspend accounts violating system integrity.
        </p>
      </section>

    </article>
  );
}
