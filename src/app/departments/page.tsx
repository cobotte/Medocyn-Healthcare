import React from 'react';
import Link from 'next/link';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Clinical Departments',
  description: 'Explore the specialized departments and wards at Medocyn Healthcare, including ICU, Surgery, Radiology, and Mental Health.',
  path: '/departments',
});

const CLINICAL_DEPARTMENTS = [
  { id: 'dept-er', name: 'Emergency Room (ER)', description: 'Critical life-support, active trauma triage, and rapid stabilization available 24/7.' },
  { id: 'dept-icu', name: 'Intensive Care Unit (ICU)', description: 'Continuous hemodynamic monitoring and advanced ventilation care for critical patients.' },
  { id: 'dept-surgery', name: 'Surgical Theatre', description: 'Minimally invasive keyhole procedures, orthopedics reconstruction, and major organ surgeries.' },
  { id: 'dept-radiology', name: 'Radiology & Imaging', description: 'Ultra-low radiation X-rays, high-resolution 3T MRI scans, CT scans, and ultrasound imaging.' },
  { id: 'dept-lab', name: 'Laboratory Medicine', description: 'Diagnostic assay evaluations, biopsy reviews, chemistry charts, and genetic analyses.' },
  { id: 'dept-pharmacy', name: 'Pharmacy Services', description: 'Precision clinical dispensing, drug-interaction reviews, and prescription fulfillment.' },
  { id: 'dept-physio', name: 'Physiotherapy & Rehab', description: 'Post-operative mobility therapy, sports injury rehabilitation, and neuromuscular recovery.' },
  { id: 'dept-womens', name: 'Women\'s Health', description: 'Obstetrics diagnostics, fetal monitoring, prenatal care plans, and reproductive therapy.' },
  { id: 'dept-children', name: 'Child Care (Pediatrics)', description: 'Neonatal incubator care, immunizations, and specialized pediatric consultation desks.' },
  { id: 'dept-mental', name: 'Mental Health & Psychology', description: 'Clinical counseling, psychiatric medication evaluations, and neurological support.' },
];

export default function DepartmentsPage() {
  return (
    <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      
      <header className="space-y-4">
        <h1 className="text-h1 text-primary">Clinical Departments</h1>
        <p className="text-paragraph text-text-secondary max-w-3xl">
          Medocyn Healthcare houses ten advanced clinical facilities, integrating modern technology and specialized nursing teams to deliver professional inpatient and outpatient care.
        </p>
      </header>

      {/* Grid listing department cards */}
      <section id="departments-list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CLINICAL_DEPARTMENTS.map((dept) => (
          <div
            key={dept.id}
            id={dept.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between hover:border-primary/20 transition-all"
          >
            <div className="space-y-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Facility Desk</span>
              <h2 className="text-base font-bold text-slate-900">{dept.name}</h2>
              <p className="text-xs text-text-secondary leading-relaxed">{dept.description}</p>
            </div>
            
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/appointment?dept=${dept.id}`}
                className="text-xs font-bold text-primary hover:text-primary-hover active:text-primary-active transition-all"
              >
                Book Department Visit &rarr;
              </Link>
            </div>
          </div>
        ))}
      </section>

    </article>
  );
}
