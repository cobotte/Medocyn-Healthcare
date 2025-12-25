import React from 'react';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Medical Services',
  description: 'Explore our complete suite of medical services including General Medicine, Cardiology, Pediatrics, Neurology, and Emergency Care.',
  path: '/services',
});

const SERVICE_CATEGORIES = [
  { id: 'gen-med', name: 'General Medicine', desc: 'Primary care, checkups, and wellness management.' },
  { id: 'cardio', name: 'Cardiology', desc: 'Comprehensive heart diagnostics, coronary care, and therapeutics.' },
  { id: 'peds', name: 'Pediatrics', desc: 'Specialized healthcare for infants, toddlers, and adolescents.' },
  { id: 'ortho', name: 'Orthopedics', desc: 'Treating bone, joint, ligament, and spine conditions.' },
  { id: 'neuro', name: 'Neurology', desc: 'Neurological evaluation, headache treatments, and nerve disorders.' },
  { id: 'derm', name: 'Dermatology', desc: 'Skin health diagnostics, allergy checks, and corrective actions.' },
  { id: 'womens', name: 'Women\'s Health', desc: 'Complete gynecological care, maternity tracking, and diagnostics.' },
  { id: 'lab', name: 'Laboratory Services', desc: 'Rapid hematology, chemistry, pathology, and molecular testing.' },
  { id: 'er', name: 'Emergency Care', desc: 'Immediate trauma response, active triage, and ICU dispatch.' },
  { id: 'telehealth', name: 'Telemedicine', desc: 'Safe, remote consultations with board-certified physicians.' },
];

export default function ServicesPage() {
  return (
    <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      <header className="space-y-4">
        <h1 className="text-h1 text-primary">Our Medical Services</h1>
        <p className="text-paragraph text-text-secondary max-w-3xl">
          Medocyn Healthcare provides advanced clinical treatments, preventive health checkups, and virtual consulting platforms across ten medical disciplines.
        </p>
      </header>

      {/* Grid listing services and dynamic mock cards */}
      <section id="services-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICE_CATEGORIES.map((serv) => (
          <div
            key={serv.id}
            className="bg-white dark:bg-slate-900 p-6 rounded-lg border border-slate-100 dark:border-slate-800 shadow-medical-soft space-y-4"
          >
            <h2 className="text-h3 text-primary">{serv.name}</h2>
            
            {/* Overview Container */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Service Overview</h3>
              <p className="text-small text-text-secondary">{serv.desc}</p>
            </div>

            {/* Benefits Container */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Benefits</h3>
              <ul className="text-xs text-text-secondary list-disc pl-4 space-y-0.5">
                <li>Professional certified specialists</li>
                <li>State-of-the-art diagnostic equipment</li>
                <li>Empathetic patient support networks</li>
              </ul>
            </div>

            {/* Treatments Container */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Common Treatments</h3>
              <p className="text-xs text-text-secondary">Comprehensive screenings, therapy management, and surgery consulting.</p>
            </div>

            {/* Consultation Container */}
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Consultation Format</h3>
              <p className="text-xs text-text-secondary">Available via in-person clinic visits or remote secure telemedicine video link.</p>
            </div>

            {/* CTA Container */}
            <div className="pt-2">
              <Link
                href={`/appointment?service=${serv.id}`}
                className="accessible-control inline-flex items-center justify-center px-4 py-2 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold rounded-md transition-all"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        ))}
      </section>

    </article>
  );
}
