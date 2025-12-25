'use client';

import React from 'react';
import Link from 'next/link';
import {
  HeartIcon,
  DoctorIcon,
  MicroscopeIcon,
  HealthcareCloudIcon,
  AccessibilityIcon,
  HospitalIcon,
  CalendarIcon,
  ClockIcon,
  NurseIcon,
  PrescriptionIcon,
  MedicalReportIcon,
  BoneIcon,
  InsuranceIcon,
  DnaIcon,
} from '@/components/common/Icons';

interface PackageDetail {
  id: string;
  name: string;
  price: string;
  overview: string;
  included: string[];
  benefits: string[];
  recommended: string;
  highlights: string[];
}

const HEALTH_PACKAGES_DATA: PackageDetail[] = [
  {
    id: 'annual-health-checkup',
    name: 'Annual Health Check-up',
    price: '$199',
    overview: 'Our primary preventive screening designed to map baseline metabolic and bodily functions, helping detect early clinical indicators.',
    included: ['Complete Blood Count (CBC)', 'Lipid Profile (LDL, HDL, Triglycerides)', 'Liver Function Tests (LFT)', 'Kidney Function Tests (KFT)', 'Urine Routine Analysis'],
    benefits: ['Establish clinical health baseline', 'Early detection of vital organ issues', 'Personalized primary care consultation'],
    recommended: 'All adults (18–60 years) seeking an annual wellness review.',
    highlights: ['Comprehensive Lab Profiling', 'General Practitioner Consultation', 'Digital Report Sync'],
  },
  {
    id: 'diabetes-care-package',
    name: 'Diabetes Care Package',
    price: '$249',
    overview: 'Specialized screening program focused on blood sugar regulation, glycemic control, kidney markers, and diabetic neuropathy assessments.',
    included: ['HbA1c (Glycated Hemoglobin)', 'Fasting & Post-Prandial Blood Sugar', 'Serum Creatinine & GFR (Kidney)', 'Microalbuminuria Urine test', 'Diabetic Foot Sensitivity check'],
    benefits: ['Monitor insulin efficacy', 'Prevent diabetic renal/nerve damage', 'Diabetic health counselor consult'],
    recommended: 'Pre-diabetic, diabetic, or high-risk patients with family history.',
    highlights: ['HbA1c Glycemic Tracking', 'Renal Function Screen', 'Diabetic Counseling Session'],
  },
  {
    id: 'heart-screening-package',
    name: 'Heart Screening Package',
    price: '$399',
    overview: 'Advanced cardiovascular diagnostics assessing heart rhythm stability, blood pressure patterns, and coronary artery disease risk profiles.',
    included: ['Electrocardiogram (ECG)', 'Lipid Profile & Apolipoproteins', 'Treadmill Cardiac Stress Test (TMT)', 'Echocardiogram (Echo)', 'Cardiologist Consultation'],
    benefits: ['Assess cardiac muscle strength', 'Map coronary block risks early', 'Direct consult with senior cardiologist'],
    recommended: 'Individuals over 40, smokers, or those with cardiac history.',
    highlights: ['ECG & Echocardiography', 'Stress Treadmill Assessment', 'Cardiologist Review'],
  },
  {
    id: 'womens-wellness-package',
    name: 'Women\'s Wellness Package',
    price: '$299',
    overview: 'Hormonal, bone-density, and preventive oncology screenings customized to support health milestones across all stages of life.',
    included: ['Pap Smear Screening', 'Bilateral Digital Mammography', 'Thyroid Profile (T3, T4, TSH)', 'Vitamin D3 & Calcium levels', 'OBGYN Consultation'],
    benefits: ['Early breast & cervical screening', 'Bone mineral density checks', 'Hormonal diagnostic consultation'],
    recommended: 'Women of all ages (recommended annually for 30+).',
    highlights: ['Mammography & Pap Smear', 'Bone Health & Vitamin D3', 'Gynecological Consultation'],
  },
  {
    id: 'childrens-health-package',
    name: 'Children\'s Health Package',
    price: '$149',
    overview: 'Pediatric screening mapping developmental milestones, nutritional balance, sensory health, and vaccination updates.',
    included: ['Pediatric Growth & BMI Audit', 'Complete Hemogram (Anemia Check)', 'Basic Vision & Hearing Screen', 'Urinalysis', 'Pediatrician Consultation'],
    benefits: ['Audit growth milestones', 'Check childhood nutritional balance', 'Consultation in a child-friendly clinic'],
    recommended: 'Infants and children up to 12 years of age.',
    highlights: ['Growth & Development Check', 'Vision & Hearing Triage', 'Pediatrician Consultation'],
  },
  {
    id: 'senior-citizen-health-package',
    name: 'Senior Citizen Health Package',
    price: '$349',
    overview: 'Senior care screening focusing on joint health, bone density, cognitive status, and age-related metabolic parameters.',
    included: ['DEXA Bone Density Scan', 'Rheumatoid Factor (Arthritis Check)', 'Uric Acid & Kidney Profile', 'PSA (Prostate Screening for Men)', 'Geriatric Consultation'],
    benefits: ['Identify osteoporosis early', 'Manage arthritis & skeletal mobility', 'Senior-focused medical consultation'],
    recommended: 'Senior adults aged 60 and above.',
    highlights: ['DEXA Bone Density Scan', 'Prostate / Geriatric Screen', 'Elder Care Consultation'],
  },
  {
    id: 'executive-health-check',
    name: 'Executive Health Check',
    price: '$599',
    overview: 'Our most comprehensive screening program designed for busy professionals, delivering exhaustive diagnostic checks across all organ systems.',
    included: ['Full-Body CT Scan (Selected views)', 'ECG, TMT, & Echocardiogram', 'Comprehensive Liver & Kidney panels', 'Thyroid, Lipid, & Vitamin screens', 'Dietary Audit & Senior Consultant review'],
    benefits: ['Exhaustive head-to-toe diagnostic review', 'Same-day clinical coordinator support', 'Personalized fitness & nutritional coaching plans'],
    recommended: 'Professionals, executives, and individuals seeking elite check-ups.',
    highlights: ['Full Body CT & Cardio Scan', 'Comprehensive Lab Panels', 'Senior Physician Review'],
  },
];

export default function HealthPackagesPage() {
  return (
    <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-24 min-h-screen text-left">
      
      {/* 1. Header Introduction */}
      <header className="max-w-4xl mx-auto text-center space-y-4">
        <span className="text-xs font-bold text-primary uppercase tracking-widest block">Preventive Wellness</span>
        <h1 className="text-hero-heading text-slate-900 dark:text-white leading-tight">
          Health Check-up Packages
        </h1>
        <p className="text-paragraph text-text-secondary max-w-2xl mx-auto">
          Comprehensive preventive healthcare programs designed to help you monitor your health, detect diseases early, and maintain long-term wellness.
        </p>
        <p className="text-xs text-text-secondary max-w-xl mx-auto pt-2 border-t border-slate-200/50 dark:border-slate-850">
          MEDOCYN HEALTHCARE emphasizes early disease prevention, supported by qualified clinical specialists, advanced diagnostic equipment, and automated report portal synchronization.
        </p>
      </header>

      {/* 2. Health Packages Grid (7 cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {HEALTH_PACKAGES_DATA.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-medical-soft flex flex-col justify-between hover:shadow-medical-hover hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
          >
            <div className="space-y-4">
              {/* Card Badge Icon */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
                  {pkg.id.includes('heart') ? <HeartIcon size={20} /> :
                   pkg.id.includes('diabetes') ? <DnaIcon size={20} /> :
                   pkg.id.includes('senior') ? <BoneIcon size={20} /> :
                   pkg.id.includes('child') ? <NurseIcon size={20} /> :
                   <HospitalIcon size={20} />}
                </div>
                <span className="text-xl font-black text-primary">{pkg.price}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">{pkg.name}</h3>
                <p className="text-xxs text-text-secondary leading-relaxed">{pkg.overview}</p>
              </div>

              {/* Highlights */}
              <div className="flex flex-wrap gap-1">
                {pkg.highlights.map((h, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-bold uppercase">
                    {h}
                  </span>
                ))}
              </div>

              {/* Included Tests */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Included Assays</span>
                <ul className="text-[10px] text-text-secondary space-y-0.5">
                  {pkg.included.map((inc, i) => (
                    <li key={i}>• {inc}</li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Key Benefits</span>
                <ul className="text-[10px] text-text-secondary space-y-0.5">
                  {pkg.benefits.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>
              </div>

              {/* Recommended For */}
              <div className="pt-2">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Recommended For</span>
                <p className="text-[10px] font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded leading-snug">
                  {pkg.recommended}
                </p>
              </div>

            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex gap-2">
              <Link href={`/health-packages#${pkg.id}-details`} className="accessible-control flex-1 text-center py-2 border border-slate-200 dark:border-slate-850 text-xxs font-bold text-text-secondary rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Learn More
              </Link>
              <Link href={`/appointment?package=${pkg.id}`} className="accessible-control flex-1 text-center py-2 bg-primary text-white text-xxs font-bold rounded hover:bg-primary-hover transition-colors">
                Book Package
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Package Comparison Table */}
      <div className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-medical-soft space-y-6">
        <div className="space-y-1 text-left">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Screening Matrix</span>
          <h3 className="text-h2 text-slate-900 dark:text-white">Compare Packages Side-by-Side</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xxs text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-150 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Package Name</th>
                <th className="py-3 px-3">Ideal For</th>
                <th className="py-3 px-3">Key Focus</th>
                <th className="py-3 px-3">Consultation Included</th>
                <th className="py-3 px-3">Diagnostic Tests</th>
                <th className="py-3 px-3">Health Report</th>
                <th className="py-3 px-3">Booking Available</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-text-secondary font-medium">
              {[
                { name: 'Annual Health Check-up', ideal: 'All Adults (18+)', focus: 'Metabolic & Vitality check', consult: '1 GP consult', tests: 'CBC, Lipid, LFT, KFT, Urinalysis', report: 'Online PDF Sync', status: 'Available' },
                { name: 'Diabetes Care Package', ideal: 'Diabetic Patients', focus: 'Glucose & Renal monitoring', consult: '1 Diabetes Counselor', tests: 'HbA1c, sugar, Creatinine, microalbumin', report: 'Detailed PDF Log', status: 'Available' },
                { name: 'Heart Screening Package', ideal: 'Adults 40+, High-Risk', focus: 'Cardiovascular diagnostics', consult: '1 Cardiologist Consult', tests: 'ECG, Lipid panel, TMT stress, Echo', report: 'Detailed PDF Log', status: 'Available' },
                { name: 'Women\'s Wellness Package', ideal: 'Women of all ages', focus: 'Pap smear & Mammography screen', consult: '1 OBGYN Consult', tests: 'Pap Smear, Mammography, Thyroid, Vit D3', report: 'Detailed PDF Log', status: 'Available' },
                { name: 'Children\'s Health Package', ideal: 'Kids up to 12 Years', focus: 'Milestones & Pediatric screen', consult: '1 Pediatrician Consult', tests: 'Growth audit, Hemogram, basic vision/hearing', report: 'Pediatric Growth Chart', status: 'Available' },
                { name: 'Senior Citizen Health Package', ideal: 'Seniors aged 60+', focus: 'Joint density & Elder check', consult: '1 Geriatric Consult', tests: 'DEXA Scan, Rheumatoid, Uric Acid, PSA check', report: 'Detailed PDF Log', status: 'Available' },
                { name: 'Executive Health Check', ideal: 'Executives seeking checks', focus: 'Full body CT scan reviews', consult: '3 Specialist Consults', tests: 'CT Scan, Cardiac TMT/Echo, full lab profile', report: 'Full Comprehensive Folio', status: 'Available' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">{row.name}</td>
                  <td className="py-3.5 px-3">{row.ideal}</td>
                  <td className="py-3.5 px-3">{row.focus}</td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{row.consult}</td>
                  <td className="py-3.5 px-3">{row.tests}</td>
                  <td className="py-3.5 px-3 font-semibold">{row.report}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-block px-2 py-0.5 rounded bg-success/15 text-success text-[9px] font-bold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Package Booking Process workflow timeline */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Patient Guide</span>
          <h3 className="text-h2 text-slate-900 dark:text-white">Our Package Booking Process</h3>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block relative py-8">
          <div className="absolute top-16 left-10 right-10 h-0.5 bg-slate-200 dark:bg-slate-800 -z-10" />
          
          <div className="grid grid-cols-9 gap-2 text-center">
            {[
              { title: 'Choose Package', icon: <HospitalIcon size={14} /> },
              { title: 'Review Details', icon: <MedicalReportIcon size={14} /> },
              { title: 'Book Appointment', icon: <CalendarIcon size={14} /> },
              { title: 'Select Date', icon: <ClockIcon size={14} /> },
              { title: 'Health Screening', icon: <NurseIcon size={14} /> },
              { title: 'Laboratory Testing', icon: <MicroscopeIcon size={14} /> },
              { title: 'Doctor Consult', icon: <DoctorIcon size={14} /> },
              { title: 'Personal Report', icon: <PrescriptionIcon size={14} /> },
              { title: 'Follow-Up recommendations', icon: <HeartIcon size={14} /> },
            ].map((step, idx) => (
              <div key={idx} className="space-y-4 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center shadow-md">
                  {step.icon}
                </div>
                <div className="space-y-1">
                  <span className="block text-[9px] font-bold text-slate-400">Step {idx + 1}</span>
                  <h4 className="text-[10px] font-extrabold text-slate-850 dark:text-white leading-tight max-w-[100px] mx-auto">{step.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Vertical Timeline */}
        <div className="block lg:hidden space-y-6 max-w-sm mx-auto text-left relative pl-8">
          <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />

          {[
            { title: 'Choose Health Package', desc: 'Select from our 7 specialized diagnostic wellness profiles.' },
            { title: 'Review Package Details', desc: 'Inspect included laboratory tests and physician consultations.' },
            { title: 'Book Appointment', desc: 'Secure booking using the online wizard portal.' },
            { title: 'Select Preferred Date', desc: 'Find open calendar slots matching clinic hours.' },
            { title: 'Health Screening', desc: 'Arrive at Tower B for basic vitals check and diagnostics.' },
            { title: 'Laboratory Testing', desc: 'Provide blood chemistry and urine samples at clinical labs.' },
            { title: 'Doctor Consultation', desc: 'Discuss your results directly with general or cardiac specialists.' },
            { title: 'Personalized Health Report', desc: 'EHR PDF report synchronizes instantly to your patient portal.' },
            { title: 'Follow-Up Recommendations', desc: 'Coordinated lifestyle guidance and prescription refills.' },
          ].map((step, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow">
                {idx + 1}
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</h4>
              <p className="text-[11px] text-text-secondary leading-tight">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* 5. Why Choose Our Health Packages (Feature Grid of 10 advantages) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 bg-slate-50/50 dark:bg-slate-900/10 py-12 rounded-2xl border border-slate-100 dark:border-slate-850">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Wellness Assurance</span>
          <h3 className="text-h2 text-slate-900 dark:text-white">Why Choose Our Health Packages?</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { title: 'Comprehensive Screening', desc: 'Full profile blood chemistry assays.', icon: <MedicalReportIcon size={18} /> },
            { title: 'Experienced Clinicians', desc: 'Consult directly with department heads.', icon: <DoctorIcon size={18} /> },
            { title: 'Modern Equipment', desc: 'Digital mammography, 3T MRI, low-dose scans.', icon: <MicroscopeIcon size={18} /> },
            { title: 'Personalized Reports', desc: 'Reports sync directly to patient portal.', icon: <HeartIcon size={18} /> },
            { title: 'Preventive Healthcare', desc: 'Early risk tracking markers check.', icon: <DnaIcon size={18} /> },
            { title: 'Affordable Packages', desc: 'Flat-rate transparent clinical fees.', icon: <InsuranceIcon size={18} /> },
            { title: 'Secure Digital Booking', desc: 'Direct slot booking in seconds.', icon: <CalendarIcon size={18} /> },
            { title: 'Evidence-Based Care', desc: 'Screenings follow standard guidelines.', icon: <HospitalIcon size={18} /> },
            { title: 'Patient-Centered Experience', desc: 'Personalized medical escort care.', icon: <AccessibilityIcon size={18} /> },
            { title: 'Responsive Platform', desc: 'Access charts on mobile/tablet portals.', icon: <HealthcareCloudIcon size={18} /> },
          ].map((adv, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-start text-left gap-3 hover:shadow hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="w-8 h-8 rounded bg-primary/5 text-primary flex items-center justify-center">
                {adv.icon}
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{adv.title}</h4>
                <p className="text-[10px] text-text-secondary leading-tight">{adv.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Package Booking CTA (Take Charge of Your Health Today) */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary to-primary-hover dark:from-slate-900 dark:to-slate-850 p-8 rounded-3xl text-white text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden group border border-slate-200/10">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />
          
          <div className="space-y-4 relative z-10 max-w-xl">
            <h3 className="text-2xl font-black tracking-tight">Take Charge of Your Health Today</h3>
            <p className="text-xs text-white/80 leading-relaxed">
              Schedule your preventive health check-up with MEDOCYN HEALTHCARE and receive personalized healthcare guidance from experienced professionals.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/appointment/?type=package"
              className="accessible-control px-5 py-3 bg-white hover:bg-slate-50 text-primary text-center font-bold text-xxs rounded-xl transition-all shadow-md focus:ring-4 focus:ring-white/30"
            >
              Book Health Package
            </Link>
            <Link
              href="/contact/"
              className="accessible-control px-5 py-3 border border-white/20 hover:bg-white/10 text-white text-center font-bold text-xxs rounded-xl transition-all focus:ring-4 focus:ring-white/30"
            >
              Contact Healthcare Team
            </Link>
          </div>
        </div>
      </div>

    </article>
  );
}
