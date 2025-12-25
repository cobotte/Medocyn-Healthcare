'use client';

import React, { useState, useMemo } from 'react';
import {
  CalendarIcon,
  HeartIcon,
  HospitalIcon,
  MedicalReportIcon,
  HealthcareCloudIcon,
  EmergencyIcon,
  InsuranceIcon,
  PrescriptionIcon,
  DoctorIcon,
  ClockIcon,
  NurseIcon,
  AccessibilityIcon,
} from '@/components/common/Icons';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

// ─── FAQ Database ─────────────────────────────────────────────────────────────
const ALL_FAQS: FaqItem[] = [
  // Appointment Booking
  {
    id: 'appt-1',
    category: 'Appointment Booking',
    question: 'How do I book an appointment?',
    answer:
      'Appointments can be scheduled online through our Appointment Booking page by selecting your preferred department, doctor, date, and time. Once submitted, you will receive a confirmation email with your appointment reference number.',
  },
  {
    id: 'appt-2',
    category: 'Appointment Booking',
    question: 'Can I reschedule my appointment?',
    answer:
      'Yes. Patients can request appointment changes through the booking system or by contacting our support team. Rescheduling is allowed up to 4 hours before the scheduled time without any charges.',
  },
  {
    id: 'appt-3',
    category: 'Appointment Booking',
    question: 'Can I cancel an appointment?',
    answer:
      'Yes. Appointments can be cancelled before the scheduled consultation according to our cancellation policy. Cancellations made more than 24 hours in advance are fully refunded. Late cancellations may incur a nominal administrative fee.',
  },
  {
    id: 'appt-4',
    category: 'Appointment Booking',
    question: 'Do I need to register before booking?',
    answer:
      'No. Basic patient information is required during booking, but creating an account is optional for this demo platform. However, creating a patient portal account allows you to track appointments, access reports, and manage your health history.',
  },
  {
    id: 'appt-5',
    category: 'Appointment Booking',
    question: 'Can I book appointments for a family member?',
    answer:
      'Yes. You can book appointments on behalf of dependents, children, or elderly family members. Simply provide the patient\'s personal details during the booking flow. Parental or guardian consent is required for minors under 18.',
  },

  // Insurance
  {
    id: 'ins-1',
    category: 'Insurance',
    question: 'Does MEDOCYN HEALTHCARE accept health insurance?',
    answer:
      'Yes. We partner with major national and international insurance providers. You can check your insurance coverage during the appointment booking process by entering your policy details or calling our billing team.',
  },
  {
    id: 'ins-2',
    category: 'Insurance',
    question: 'How do I submit an insurance claim?',
    answer:
      'After your consultation, our billing team will issue a detailed invoice. You can upload the invoice along with supporting medical records through your patient portal or email it directly to our insurance coordination team.',
  },
  {
    id: 'ins-3',
    category: 'Insurance',
    question: 'Which insurance providers are accepted?',
    answer:
      'We work with a wide network of insurance providers including major national health schemes and select international health coverage plans. Please contact our billing team or check the Insurance Partners section of our website for the full list.',
  },
  {
    id: 'ins-4',
    category: 'Insurance',
    question: 'What if my insurance does not cover the service?',
    answer:
      'If a service is not covered by your insurance, you will be informed in advance. We offer flexible self-pay options, structured payment plans, and health financing alternatives. Our patient financial counselors are available to help.',
  },

  // Emergency Services
  {
    id: 'emg-1',
    category: 'Emergency Services',
    question: 'Is the emergency department available 24/7?',
    answer:
      'Yes. Our Emergency & Trauma Center operates 24 hours a day, 7 days a week, including public holidays. Our team of emergency physicians, nurses, and paramedics is always ready to provide immediate care.',
  },
  {
    id: 'emg-2',
    category: 'Emergency Services',
    question: 'What conditions are treated in the emergency department?',
    answer:
      'Our emergency department handles critical conditions including chest pain, stroke symptoms, severe trauma, respiratory distress, broken bones, allergic reactions, and all life-threatening medical emergencies. We are equipped with advanced resuscitation and trauma care facilities.',
  },
  {
    id: 'emg-3',
    category: 'Emergency Services',
    question: 'Do I need an appointment for emergency care?',
    answer:
      'No. Emergency patients are treated immediately based on the severity of their condition using a triage system. Please call our emergency hotline or visit the Emergency Department directly without delay.',
  },
  {
    id: 'emg-4',
    category: 'Emergency Services',
    question: 'What is the emergency contact number?',
    answer:
      'Our emergency hotline is available 24/7 at +1 (555) 911-0000. For life-threatening situations, please contact national emergency services (911) and then notify our Emergency Department. Our paramedic team can also dispatch upon request.',
  },

  // Medical Reports
  {
    id: 'rep-1',
    category: 'Medical Reports',
    question: 'How do I access my lab reports?',
    answer:
      'Once authorized by your clinician, lab and diagnostic reports are uploaded to your Patient Portal. Log in and navigate to the Medical Records section. You can view, download, or share your reports securely from any device.',
  },
  {
    id: 'rep-2',
    category: 'Medical Reports',
    question: 'How long does it take to receive lab results?',
    answer:
      'Standard laboratory results are typically available within 24–48 hours. Specialist panels such as genetic profiles or pathology biopsy reports may take 3–7 business days. Urgent reports are fast-tracked and available within 4 hours.',
  },
  {
    id: 'rep-3',
    category: 'Medical Reports',
    question: 'Can I share my medical reports with another doctor?',
    answer:
      'Yes. From your Patient Portal, you can generate a secure shareable link or download a PDF of your reports to share with external specialists. We support HL7 FHIR compliant electronic health record formats.',
  },
  {
    id: 'rep-4',
    category: 'Medical Reports',
    question: 'Are my medical records kept private?',
    answer:
      'Absolutely. Your medical records are protected under HIPAA guidelines and local data protection regulations. Access is restricted to your authorized healthcare team and yourself. All data is encrypted using AES-256 and transmitted over TLS 1.3.',
  },

  // Telemedicine
  {
    id: 'tele-1',
    category: 'Telemedicine',
    question: 'How do I schedule a telemedicine consultation?',
    answer:
      'You can book a telemedicine appointment directly through our Appointment Booking page. Select "Video Consultation" as your preferred visit type, choose your department and doctor, and a secure video link will be emailed to you before your appointment.',
  },
  {
    id: 'tele-2',
    category: 'Telemedicine',
    question: 'What technology do I need for a video consultation?',
    answer:
      'You need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and a modern web browser. No additional software downloads are required. Our video platform works directly in your browser.',
  },
  {
    id: 'tele-3',
    category: 'Telemedicine',
    question: 'Can prescriptions be issued after a telemedicine consultation?',
    answer:
      'Yes. Our licensed physicians can issue electronic prescriptions (e-prescriptions) following a telemedicine consultation, where clinically appropriate. The prescription is sent securely to your Patient Portal and can be forwarded to your preferred pharmacy.',
  },
  {
    id: 'tele-4',
    category: 'Telemedicine',
    question: 'Is telemedicine available internationally?',
    answer:
      'Yes. Our telemedicine platform supports international consultations subject to applicable licensing laws in your jurisdiction. Please check with our team regarding cross-border consultation availability for your specific location.',
  },

  // Billing & Payments
  {
    id: 'bill-1',
    category: 'Billing & Payments',
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major credit and debit cards, bank transfers, digital wallets (Apple Pay, Google Pay), and select healthcare financing plans. Insurance co-payments can also be processed at the point of service.',
  },
  {
    id: 'bill-2',
    category: 'Billing & Payments',
    question: 'Will I receive an itemized bill after my visit?',
    answer:
      'Yes. A detailed itemized invoice is generated after every consultation and uploaded to your Patient Portal. You can also request a printed copy from our billing desk. Invoices include all consultation fees, diagnostic charges, and medication costs.',
  },
  {
    id: 'bill-3',
    category: 'Billing & Payments',
    question: 'Is it safe to pay online?',
    answer:
      'Absolutely. Our payment gateway is fully PCI-DSS compliant and uses 256-bit SSL encryption. All card details are tokenized and never stored on our servers. You will receive a secure payment receipt instantly after each transaction.',
  },
  {
    id: 'bill-4',
    category: 'Billing & Payments',
    question: 'Can I request a payment plan?',
    answer:
      'Yes. We offer structured payment plans for large medical expenses. Our patient financial advisors can help set up interest-free installment arrangements. Please contact our Billing Department to discuss your options.',
  },

  // Patient Portal
  {
    id: 'portal-1',
    category: 'Patient Portal',
    question: 'How do I create a patient portal account?',
    answer:
      'You can create an account during appointment booking or by visiting the Patient Portal section of our website. Enter your name, email address, date of birth, and a secure password to register. Verification is completed via a confirmation email.',
  },
  {
    id: 'portal-2',
    category: 'Patient Portal',
    question: 'What information can I access on the patient portal?',
    answer:
      'The patient portal provides access to your appointment history, upcoming bookings, lab reports, prescriptions, medical records, billing invoices, consultation notes, and direct messaging with your care team.',
  },
  {
    id: 'portal-3',
    category: 'Patient Portal',
    question: 'Is the patient portal mobile-friendly?',
    answer:
      'Yes. The MEDOCYN HEALTHCARE Patient Portal is fully responsive and optimized for smartphones, tablets, and desktop computers. It works across all modern browsers without requiring app installation.',
  },
  {
    id: 'portal-4',
    category: 'Patient Portal',
    question: 'What should I do if I forget my portal password?',
    answer:
      'Click the "Forgot Password" link on the Patient Portal login page. Enter your registered email address and you will receive a secure password reset link within 2 minutes. If you do not receive it, please check your spam folder.',
  },

  // General Healthcare
  {
    id: 'gen-1',
    category: 'General Healthcare',
    question: 'What are the hospital visiting hours?',
    answer:
      'General visiting hours are 10:00 AM to 8:00 PM daily. ICU and special care units have restricted visiting hours of 11:00 AM to 1:00 PM and 5:00 PM to 7:00 PM. One visitor is permitted per patient in critical care areas.',
  },
  {
    id: 'gen-2',
    category: 'General Healthcare',
    question: 'Does MEDOCYN HEALTHCARE have a pharmacy on-site?',
    answer:
      'Yes. Our in-house pharmacy operates during regular clinic hours (8:00 AM to 10:00 PM) and stocks a wide range of prescription medications, over-the-counter products, and medical consumables. After-hours medication dispensing is available through our duty pharmacist.',
  },
  {
    id: 'gen-3',
    category: 'General Healthcare',
    question: 'Do you offer preventive healthcare programs?',
    answer:
      'Yes. Our Health Packages section offers comprehensive preventive screening programs for all age groups, including annual health check-ups, cardiac screening, diabetes management, women\'s wellness, pediatric care, and executive health packages.',
  },
  {
    id: 'gen-4',
    category: 'General Healthcare',
    question: 'Are interpreter services available?',
    answer:
      'Yes. MEDOCYN HEALTHCARE provides professional medical interpreter services for patients who require assistance in languages other than English. Please inform our reception team at least 24 hours before your appointment so we can arrange appropriate language support.',
  },
];

// ─── Category Config ──────────────────────────────────────────────────────────
const CATEGORIES = [
  { name: 'All', icon: <HospitalIcon size={14} /> },
  { name: 'Appointment Booking', icon: <CalendarIcon size={14} /> },
  { name: 'Insurance', icon: <InsuranceIcon size={14} /> },
  { name: 'Emergency Services', icon: <EmergencyIcon size={14} /> },
  { name: 'Medical Reports', icon: <MedicalReportIcon size={14} /> },
  { name: 'Telemedicine', icon: <HealthcareCloudIcon size={14} /> },
  { name: 'Billing & Payments', icon: <PrescriptionIcon size={14} /> },
  { name: 'Patient Portal', icon: <DoctorIcon size={14} /> },
  { name: 'General Healthcare', icon: <HeartIcon size={14} /> },
];

// ─── Support Cards ────────────────────────────────────────────────────────────
const SUPPORT_OPTIONS = [
  {
    title: 'Contact Form',
    desc: 'Submit a detailed inquiry and receive a response within 2 business hours.',
    action: 'Send Message',
    href: '/contact',
    icon: <AccessibilityIcon size={20} />,
  },
  {
    title: 'Email Support',
    desc: 'Write to our support team at support@medocyn.health for detailed queries.',
    action: 'Email Us',
    href: 'mailto:support@medocyn.health',
    icon: <HealthcareCloudIcon size={20} />,
  },
  {
    title: 'Telephone Support',
    desc: 'Call our patient care helpline at +1 (555) 800-2400, Mon–Sat, 8AM–8PM.',
    action: 'Call Now',
    href: 'tel:+15558002400',
    icon: <NurseIcon size={20} />,
  },
  {
    title: 'Live Chat (Demo)',
    desc: 'Chat with a virtual healthcare assistant instantly for quick FAQ answers.',
    action: 'Start Chat',
    href: '#',
    icon: <ClockIcon size={20} />,
  },
  {
    title: 'Emergency Hotline',
    desc: 'For medical emergencies call +1 (555) 911-0000 available 24/7.',
    action: 'Emergency Call',
    href: 'tel:+15559110000',
    icon: <EmergencyIcon size={20} />,
  },
];

// ─── Highlight Helper ─────────────────────────────────────────────────────────
// Security: Renders highlighted text as React elements — NEVER uses dangerouslySetInnerHTML
// with user-controlled content. The search term is only used to split on; each text
// part is rendered as a plain React text node, which React automatically HTML-encodes.
function HighlightText({ text, searchTerm }: { text: string; searchTerm: string }) {
  if (!searchTerm.trim()) {
    return <>{text}</>;
  }

  // Escape the user's search term so it cannot break the regex
  const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedTerm})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          // React renders this as a text node — no HTML injection possible
          <mark
            key={i}
            className="bg-yellow-200 rounded px-0.5"
          >
            {part}
          </mark>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

// ─── Accordion Item ───────────────────────────────────────────────────────────
const AccordionItem: React.FC<{
  faq: FaqItem;
  isOpen: boolean;
  toggle: () => void;
  searchTerm: string;
}> = ({ faq, isOpen, toggle, searchTerm }) => {
  return (
    <div className="bg-white dark:bg-slate-905 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs overflow-hidden">
      <button
        onClick={toggle}
        className="accessible-control w-full flex justify-between items-start gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
          <HighlightText text={faq.question} searchTerm={searchTerm} />
        </span>
        <span
          className={`flex-shrink-0 mt-0.5 text-primary transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        role="region"
      >
        <div className="px-5 pb-5 border-t border-slate-100 dark:border-slate-850 pt-3">
          <p className="text-[11px] text-text-secondary leading-relaxed">
            <HighlightText text={faq.answer} searchTerm={searchTerm} />
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function FaqsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState<string | null>(null);

  // Filtered FAQ list
  const filtered = useMemo(() => {
    let list = ALL_FAQS;
    if (activeCategory !== 'All') {
      list = list.filter((f) => f.category === activeCategory);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchTerm, activeCategory]);

  // Count per category
  const countFor = (cat: string) =>
    cat === 'All' ? ALL_FAQS.length : ALL_FAQS.filter((f) => f.category === cat).length;

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ALL_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-16 min-h-screen text-left">

        {/* 1. Section Header */}
        <header className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Help Center</span>
          <h1 className="text-hero-heading text-slate-900 dark:text-white leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-paragraph text-text-secondary max-w-2xl mx-auto">
            Find quick answers to common healthcare questions about appointments, consultations, reports, telemedicine, insurance, billing, and patient services.
          </p>
          <p className="text-[10px] text-text-secondary max-w-lg mx-auto">
            This knowledge base helps patients quickly access important healthcare information. Content is for demonstration purposes only.
          </p>
        </header>

        {/* 2. FAQ Statistics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { val: '30+', label: 'Healthcare Questions' },
            { val: '8', label: 'Categories' },
            { val: '24/7', label: 'Support Available' },
            { val: '⚡ Fast', label: 'Search Experience' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-905 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center shadow-xs">
              <span className="block text-xl font-black text-primary">{stat.val}</span>
              <span className="block text-[9px] text-slate-450 uppercase font-bold mt-0.5 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* 3. Main FAQ Layout: Search + Sidebar + Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sidebar: Category Filters */}
          <aside className="lg:col-span-3 space-y-2 lg:sticky lg:top-24">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block px-1 mb-3">Browse Categories</span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => { setActiveCategory(cat.name); setOpenId(null); }}
                className={`accessible-control w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-left text-[11px] font-semibold transition-all duration-150 ${
                  activeCategory === cat.name
                    ? 'bg-primary text-white shadow'
                    : 'bg-white dark:bg-slate-905 border border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-primary/30 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <span className="flex items-center gap-2">
                  {cat.icon}
                  {cat.name}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${activeCategory === cat.name ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-450'}`}>
                  {countFor(cat.name)}
                </span>
              </button>
            ))}
          </aside>

          {/* Right Area: Search + Accordions */}
          <div className="lg:col-span-9 space-y-6">

            {/* Search Bar */}
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setOpenId(null); }}
                placeholder="Search healthcare questions..."
                className="w-full bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 pl-11 pr-12 py-3.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-sm"
                aria-label="Search FAQ questions"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="accessible-control absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Results Info */}
            {(searchTerm || activeCategory !== 'All') && (
              <div className="flex items-center justify-between text-[10px] text-slate-450">
                <span>
                  Showing <strong className="text-slate-800 dark:text-slate-200">{filtered.length}</strong> result{filtered.length !== 1 ? 's' : ''}
                  {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
                  {searchTerm ? ` for "${searchTerm}"` : ''}
                </span>
                <button onClick={() => { setSearchTerm(''); setActiveCategory('All'); }} className="text-primary hover:underline font-semibold">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Accordion List */}
            {filtered.length > 0 ? (
              <div className="space-y-3">
                {/* Group by category when showing all */}
                {activeCategory === 'All' && !searchTerm
                  ? CATEGORIES.filter((c) => c.name !== 'All').map((cat) => {
                      const items = filtered.filter((f) => f.category === cat.name);
                      if (items.length === 0) return null;
                      return (
                        <div key={cat.name} className="space-y-3">
                          <div className="flex items-center gap-2 pt-4 pb-1 first:pt-0">
                            <span className="text-primary">{cat.icon}</span>
                            <h2 className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{cat.name}</h2>
                          </div>
                          {items.map((faq) => (
                            <AccordionItem
                              key={faq.id}
                              faq={faq}
                              isOpen={openId === faq.id}
                              toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                              searchTerm={searchTerm}
                            />
                          ))}
                        </div>
                      );
                    })
                  : filtered.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        faq={faq}
                        isOpen={openId === faq.id}
                        toggle={() => setOpenId(openId === faq.id ? null : faq.id)}
                        searchTerm={searchTerm}
                      />
                    ))}
              </div>
            ) : (
              /* No Results State */
              <div className="text-center py-20 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-850 mx-auto flex items-center justify-center text-slate-400">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35M11 8v3m0 4h.01" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">No results found</h3>
                <p className="text-[11px] text-text-secondary max-w-xs mx-auto">
                  We couldn&apos;t find any FAQ matching &quot;{searchTerm}&quot;. Try a different keyword or browse by category.
                </p>
                <button
                  onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
                  className="accessible-control px-4 py-2 bg-primary text-white text-xxs font-bold rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Clear & Browse All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Patient Support Section */}
        <div className="bg-slate-50/50 dark:bg-slate-900/10 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-100 dark:border-slate-850 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Contact Support</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Still Need Help?</h2>
            <p className="text-[11px] text-text-secondary max-w-lg mx-auto">
              If you couldn&apos;t find the answer you&apos;re looking for, our healthcare support team is available to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SUPPORT_OPTIONS.map((opt, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-905 p-5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-start gap-4 text-left hover:shadow hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  {opt.icon}
                </div>
                <div className="space-y-1 flex-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{opt.title}</h3>
                  <p className="text-[10px] text-text-secondary leading-tight">{opt.desc}</p>
                </div>
                <a
                  href={opt.href}
                  className="accessible-control w-full text-center py-2 bg-primary/5 hover:bg-primary text-primary hover:text-white text-[10px] font-bold rounded-lg transition-all"
                >
                  {opt.action}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Quick Links Navigation */}
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Quick Navigation</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Explore MEDOCYN HEALTHCARE</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { label: 'Book Appointment', href: '/appointment', icon: <CalendarIcon size={18} /> },
              { label: 'Patient Portal', href: '/patient-portal', icon: <DoctorIcon size={18} /> },
              { label: 'Medical Services', href: '/services', icon: <HospitalIcon size={18} /> },
              { label: 'Departments', href: '/departments', icon: <MedicalReportIcon size={18} /> },
              { label: 'Contact Healthcare Team', href: '/contact', icon: <AccessibilityIcon size={18} /> },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="accessible-control flex flex-col items-center gap-3 p-5 bg-white dark:bg-slate-905 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs text-center hover:shadow hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-200"
              >
                <span className="w-10 h-10 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  {link.icon}
                </span>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

      </article>
    </>
  );
}
