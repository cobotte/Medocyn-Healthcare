import React from 'react';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'About Medocyn Healthcare',
  description: 'Learn about our mission, vision, values, healthcare philosophy, and dedication to medical excellence through technology.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16 text-left">
      
      {/* 1. Company Overview */}
      <section id="company-overview" className="space-y-6 relative overflow-hidden p-8 sm:p-12 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/55 shadow-2xl glass-panel">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 filter blur-3xl pointer-events-none" />
        <span className="text-xs font-black text-primary dark:text-accent uppercase tracking-widest block">Who We Are</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">About Medocyn Healthcare</h1>
        <p className="text-sm sm:text-base text-text-secondary max-w-3xl leading-relaxed">
          Medocyn Healthcare represents the future of coordinated care delivery. By integrating advanced clinical solutions, secure digital portals, and state-of-the-art diagnostics, we empower patients and practitioners to collaborate seamlessly for improved clinical outcomes.
        </p>
      </section>

      {/* 2. Mission & Vision */}
      <section id="mission-vision" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-800/50 shadow-xl card-3d">
          <h2 className="text-xl font-extrabold text-primary dark:text-accent mb-4">Our Mission</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            To make high-quality, professional healthcare accessible, secure, and personalized through state-of-the-art digital infrastructure and empathetic patient-focused delivery.
          </p>
        </div>
        <div className="glass-card p-8 rounded-[2.5rem] border border-white/50 dark:border-slate-800/50 shadow-xl card-3d">
          <h2 className="text-xl font-extrabold text-secondary dark:text-emerald-400 mb-4">Our Vision</h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            To build a globally connected clinical ecosystem where patient recovery, clinical analytics, and health services are seamlessly synchronized.
          </p>
        </div>
      </section>

      {/* 3. Core Values */}
      <section id="core-values" className="space-y-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Core Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { name: 'Compassion', text: 'Putting patient empathy and comforting care at the center of every clinical encounter.' },
            { name: 'Innovation', text: 'Continuously refining treatment plans and platforms through artificial intelligence and telehealth integrations.' },
            { name: 'Integrity', text: 'Maintaining strict patient privacy, HIPAA standards, and transparent clinical operations.' },
          ].map((val) => (
            <div key={val.name} className="glass-card p-8 rounded-[2rem] border border-white/40 dark:border-slate-800/40 shadow-md card-3d">
              <h3 className="text-lg font-bold text-primary dark:text-accent mb-3">{val.name}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Healthcare Philosophy & Medical Excellence */}
      <section id="healthcare-philosophy" className="space-y-6 p-8 sm:p-12 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/55 shadow-2xl glass-panel">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Healthcare Philosophy</h2>
        <p className="text-xs sm:text-sm text-text-secondary max-w-3xl leading-relaxed">
          Our methodology focuses heavily on preventive care and patient education. Rather than treating acute conditions in isolation, we provide comprehensive screening packages, active physician monitoring, and structured lifestyle coaching to build long-term physiological resilience.
        </p>
      </section>

    </article>
  );
}
