'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CalendarIcon,
  HeartIcon,
  HospitalIcon,
  MedicalReportIcon,
  HealthcareCloudIcon,
  EmergencyIcon,
  InsuranceIcon,
  DoctorIcon,
  ClockIcon,
  NurseIcon,
  AccessibilityIcon,
} from '@/components/common/Icons';

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  department: string;
  message: string;
  contactMethod: string;
  contactTime: string;
  privacyConsent: boolean;
  processingConsent: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  department: '',
  message: '',
  contactMethod: '',
  contactTime: '',
  privacyConsent: false,
  processingConsent: false,
};

// ─── Field component ──────────────────────────────────────────────────────────
const FieldWrap: React.FC<{ label: string; id: string; required?: boolean; children: React.ReactNode; hint?: string }> = ({
  label, id, required, children, hint
}) => (
  <div className="space-y-1">
    <label htmlFor={id} className="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
      {label}{required && <span className="text-danger ml-0.5">*</span>}
    </label>
    {children}
    {hint && <p className="text-[9px] text-slate-400">{hint}</p>}
  </div>
);

const inputClass = "w-full bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 px-3 py-2.5 text-xs rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-slate-350 dark:placeholder:text-slate-600";

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [charCount, setCharCount] = useState(0);
  // Generated once on successful submit — stored in state to avoid impure render call
  const [refId, setRefId] = useState<string>('');

  const update = (key: keyof FormState, val: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => { const e = { ...prev }; delete e[key]; return e; });
    if (key === 'message' && typeof val === 'string') setCharCount(val.length);
  };

  const validate = (): boolean => {
    const e: typeof errors = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = 'Full name must be at least 2 characters.';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Please enter a valid email address.';
    if (form.phone && !form.phone.match(/^[\d\s\+\-\(\)]{7,20}$/)) e.phone = 'Please enter a valid phone number.';
    if (!form.subject) e.subject = 'Please select an inquiry subject.';
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'Message must be at least 10 characters.';
    if (!form.privacyConsent) e.privacyConsent = 'You must agree to the Privacy Policy.';
    if (!form.processingConsent) e.processingConsent = 'You must consent to information processing.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          department: form.department,
          message: form.message,
          contactMethod: form.contactMethod,
          contactTime: form.contactTime,
        }),
      });
      if (res.ok) {
        setRefId(Date.now().toString().slice(-8));
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setStatus('idle');
    setErrors({});
    setCharCount(0);
  };

  // JSON-LD LocalBusiness + MedicalOrganization schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['MedicalOrganization', 'LocalBusiness'],
    name: 'MEDOCYN HEALTHCARE',
    url: 'https://medocynhealthcare.com',
    logo: 'https://medocynhealthcare.com/images/logo.png',
    description: 'Premium digital healthcare platform offering comprehensive medical services, telemedicine, specialist consultations, and preventive health packages.',
    telephone: '+18009112025',
    email: 'info@medocynhealthcare.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Healthcare Avenue, Medical District',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10001',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '08:00', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '09:00', closes: '17:00' },
    ],
  };

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center space-y-8">
            {/* Animated success icon */}
            <div className="w-20 h-20 rounded-full bg-success/10 border-2 border-success/30 mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <div className="space-y-3">
              <h1 className="text-h1 text-slate-900 dark:text-white">Message Successfully Sent</h1>
              <p className="text-paragraph text-text-secondary">
                Thank you for contacting <strong>MEDOCYN HEALTHCARE</strong>. Our support team has received your inquiry and will respond as soon as possible.
              </p>
              <p className="text-[10px] text-slate-400">Reference: <span className="font-mono font-bold">MDC-{refId}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/" className="accessible-control px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-colors shadow">
                Return Home
              </Link>
              <button onClick={handleReset} className="accessible-control px-5 py-2.5 border border-slate-200 dark:border-slate-800 text-xs font-bold text-text-secondary rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                Send Another Message
              </button>
              <Link href="/appointment/" className="accessible-control px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold rounded-xl hover:opacity-80 transition-opacity">
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Main Contact Page ───────────────────────────────────────────────────────
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-20 min-h-screen text-left">

        {/* 1. Hero Header */}
        <header className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Get In Touch</span>
          <h1 className="text-hero-heading text-slate-900 dark:text-white leading-tight">
            Contact MEDOCYN HEALTHCARE
          </h1>
          <p className="text-paragraph text-text-secondary max-w-2xl mx-auto">
            We&apos;re here to answer your questions, assist with appointments, and provide the support you need.
          </p>
          <p className="text-[10px] text-text-secondary max-w-lg mx-auto">
            Contact our healthcare team through any channel below — our care coordinators are available Monday through Saturday and emergency services operate 24/7.
          </p>
          {/* Emergency sticky badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-danger/5 border border-danger/20 text-danger text-[9px] font-bold uppercase">
            <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-danger inline-block" />
            Emergency Hotline: +1 (800) 911-2025 — Available 24/7
          </div>
        </header>

        {/* 2. Two-column: Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left: Contact Form */}
          <section id="contact-form-section" aria-labelledby="form-heading" className="lg:col-span-7 bg-white dark:bg-slate-905 p-6 sm:p-8 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-medical-soft space-y-6">
            <div className="space-y-1">
              <h2 id="form-heading" className="text-h2 text-slate-900 dark:text-white">Send a Message</h2>
              <p className="text-[10px] text-text-secondary">All fields marked with * are required.</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Personal Information */}
              <div className="space-y-4">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Personal Information</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWrap label="Full Name" id="name" required>
                    <input
                      id="name" type="text" value={form.name} required autoComplete="name"
                      onChange={(e) => update('name', e.target.value)}
                      placeholder="Jane Smith"
                      className={`${inputClass} ${errors.name ? 'border-danger ring-1 ring-danger/30' : ''}`}
                    />
                    {errors.name && <p className="text-[9px] text-danger mt-1">{errors.name}</p>}
                  </FieldWrap>

                  <FieldWrap label="Email Address" id="email" required>
                    <input
                      id="email" type="email" value={form.email} required autoComplete="email"
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="jane@example.com"
                      className={`${inputClass} ${errors.email ? 'border-danger ring-1 ring-danger/30' : ''}`}
                    />
                    {errors.email && <p className="text-[9px] text-danger mt-1">{errors.email}</p>}
                  </FieldWrap>
                </div>

                <FieldWrap label="Phone Number" id="phone" hint="Optional — include country code">
                  <input
                    id="phone" type="tel" value={form.phone} autoComplete="tel"
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`${inputClass} ${errors.phone ? 'border-danger ring-1 ring-danger/30' : ''}`}
                  />
                  {errors.phone && <p className="text-[9px] text-danger mt-1">{errors.phone}</p>}
                </FieldWrap>
              </div>

              {/* Inquiry Information */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Inquiry Information</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWrap label="Subject" id="subject" required>
                    <select
                      id="subject" value={form.subject} required
                      onChange={(e) => update('subject', e.target.value)}
                      className={`${inputClass} ${errors.subject ? 'border-danger ring-1 ring-danger/30' : ''}`}
                    >
                      <option value="">Select subject…</option>
                      <option value="appointment">Appointment Inquiry</option>
                      <option value="telemedicine">Telemedicine Request</option>
                      <option value="reports">Medical Reports</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="insurance">Insurance Coverage</option>
                      <option value="health-package">Health Package Query</option>
                      <option value="career">Career Opportunities</option>
                      <option value="feedback">Feedback & Complaints</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.subject && <p className="text-[9px] text-danger mt-1">{errors.subject}</p>}
                  </FieldWrap>

                  <FieldWrap label="Department" id="department">
                    <select
                      id="department" value={form.department}
                      onChange={(e) => update('department', e.target.value)}
                      className={inputClass}
                    >
                      <option value="">Select department…</option>
                      <option value="cardiology">Cardiology</option>
                      <option value="neurology">Neurology</option>
                      <option value="orthopedics">Orthopedics</option>
                      <option value="pediatrics">Pediatrics</option>
                      <option value="women-health">Women&apos;s Health</option>
                      <option value="general">General Medicine</option>
                      <option value="emergency">Emergency Services</option>
                      <option value="laboratory">Laboratory</option>
                      <option value="radiology">Radiology & Imaging</option>
                    </select>
                  </FieldWrap>
                </div>

                <FieldWrap label="Message" id="message" required hint={`${charCount}/1000 characters`}>
                  <textarea
                    id="message" value={form.message} required rows={5} maxLength={1000}
                    onChange={(e) => update('message', e.target.value)}
                    placeholder="Please describe your inquiry in detail…"
                    className={`${inputClass} resize-y min-h-[120px] ${errors.message ? 'border-danger ring-1 ring-danger/30' : ''}`}
                  />
                  {errors.message && <p className="text-[9px] text-danger mt-1">{errors.message}</p>}
                </FieldWrap>
              </div>

              {/* Optional Preferences */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Preferences (Optional)</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldWrap label="Preferred Contact Method" id="contactMethod">
                    <select id="contactMethod" value={form.contactMethod} onChange={(e) => update('contactMethod', e.target.value)} className={inputClass}>
                      <option value="">No preference</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone Call</option>
                      <option value="sms">SMS</option>
                      <option value="video">Video Call</option>
                    </select>
                  </FieldWrap>

                  <FieldWrap label="Preferred Contact Time" id="contactTime">
                    <select id="contactTime" value={form.contactTime} onChange={(e) => update('contactTime', e.target.value)} className={inputClass}>
                      <option value="">Anytime</option>
                      <option value="morning">Morning (8AM – 12PM)</option>
                      <option value="afternoon">Afternoon (12PM – 4PM)</option>
                      <option value="evening">Evening (4PM – 8PM)</option>
                    </select>
                  </FieldWrap>
                </div>
              </div>

              {/* Consent */}
              <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-850">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block">Consent & Privacy</span>

                {[
                  { key: 'privacyConsent' as const, label: 'I agree to the Privacy Policy and Terms of Service.', error: errors.privacyConsent },
                  { key: 'processingConsent' as const, label: 'I consent to MEDOCYN HEALTHCARE processing my information for communication purposes.', error: errors.processingConsent },
                ].map(({ key, label, error }) => (
                  <label key={key} className="flex items-start gap-3 cursor-pointer">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox" checked={form[key] as boolean}
                        onChange={(e) => update(key, e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${form[key] ? 'bg-primary border-primary' : error ? 'border-danger' : 'border-slate-300 dark:border-slate-700'}`}>
                        {form[key] && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-[10px] text-text-secondary leading-snug">{label}</span>
                  </label>
                ))}
                {(errors.privacyConsent || errors.processingConsent) && (
                  <p className="text-[9px] text-danger">{errors.privacyConsent || errors.processingConsent}</p>
                )}
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 text-[9px] text-slate-400">
                <svg className="w-3 h-3 text-success" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zm0-13v4m0 4h.01" />
                </svg>
                <span>Protected by HTTPS · CSRF secured · XSS filtered · AES-256 encrypted</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="accessible-control flex-1 py-3 bg-primary hover:bg-primary-hover disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : 'Send Message'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="accessible-control px-5 py-3 border border-slate-200 dark:border-slate-800 text-xs font-bold text-text-secondary rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </section>

          {/* Right: Info Cards */}
          <aside className="lg:col-span-5 space-y-4">
            {[
              {
                icon: <HospitalIcon size={18} />,
                title: 'Hospital Address',
                desc: '123 Healthcare Avenue, Medical District\nNew York, NY 10001, United States',
                action: 'Get Directions', href: 'https://maps.google.com/?q=123+Healthcare+Avenue+New+York+NY+10001',
              },
              {
                icon: <EmergencyIcon size={18} />,
                title: 'Emergency Hotline',
                desc: '+1 (800) 911-2025\nAvailable 24/7, 365 days a year',
                action: 'Call Emergency', href: 'tel:+18009112025',
                urgent: true,
              },
              {
                icon: <CalendarIcon size={18} />,
                title: 'Appointment Desk',
                desc: 'Book medical consultations\n+1 (555) 800-2400',
                action: 'Book Now', href: '/appointment',
              },
              {
                icon: <HealthcareCloudIcon size={18} />,
                title: 'Email Support',
                desc: 'support@medocynhealthcare.com\nResponse within 2 business hours',
                action: 'Email Us', href: 'mailto:support@medocynhealthcare.com',
              },
              {
                icon: <ClockIcon size={18} />,
                title: 'Business Hours',
                desc: 'Mon–Fri: 08:00 AM – 08:00 PM\nSat: 09:00 AM – 05:00 PM\nSun: Emergency only',
                action: null, href: null,
              },
            ].map((card, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl border flex items-start gap-4 shadow-xs transition-all hover:-translate-y-0.5 hover:shadow ${
                  card.urgent
                    ? 'bg-danger/5 border-danger/20'
                    : 'bg-white dark:bg-slate-905 border-slate-150 dark:border-slate-800'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${card.urgent ? 'bg-danger/10 text-danger' : 'bg-primary/5 text-primary'}`}>
                  {card.icon}
                </div>
                <div className="flex-1 space-y-1.5 min-w-0">
                  <h3 className={`text-xs font-bold ${card.urgent ? 'text-danger' : 'text-slate-900 dark:text-white'}`}>{card.title}</h3>
                  <p className="text-[10px] text-text-secondary leading-snug whitespace-pre-line">{card.desc}</p>
                  {card.action && card.href && (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`inline-block text-[9px] font-bold py-1 px-2.5 rounded mt-1 transition-colors ${card.urgent ? 'bg-danger/10 text-danger hover:bg-danger hover:text-white' : 'bg-primary/5 text-primary hover:bg-primary hover:text-white'}`}
                    >
                      {card.action} →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* 3. Google Map Embed */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Campus Location</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Find Our Medical Campus</h2>
          </div>
          <div className="w-full rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800 shadow-medical-soft">
            <div className="bg-slate-100 dark:bg-slate-900 p-2 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-danger/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-warning/70 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-success/70 inline-block" />
              <span className="flex-1 text-center text-[9px] text-slate-400 font-mono">maps.google.com — MEDOCYN HEALTHCARE · 123 Healthcare Avenue, New York NY 10001</span>
            </div>
            <iframe
              title="MEDOCYN HEALTHCARE Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.6175532764534!2d-74.00594482344483!3d40.71277617139458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a197c06b7cb%3A0x40a06c78f79e5de6!2sNew%20York%2C%20NY%2010001!5e0!3m2!1sen!2sus!4v1720600000000!5m2!1sen!2sus"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
          <p className="text-[9px] text-slate-400 text-center">
            ⚠ Demo address only — 123 Healthcare Avenue, Medical District, New York, NY 10001 is fictional and used for portfolio demonstration purposes.
          </p>
        </div>

        {/* 4. Hospital Locations */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Our Network</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Hospital Locations</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                badge: 'Headquarters',
                name: 'MEDOCYN HEALTHCARE',
                addr: '123 Healthcare Avenue\nMedical District, New York\nNY 10001, United States',
                primary: true,
              },
              {
                badge: 'Branch',
                name: 'North Medical Center',
                addr: '456 Wellness Boulevard\nNorth Manhattan, New York\nNY 10025, United States',
                primary: false,
              },
              {
                badge: 'Branch',
                name: 'South Healthcare Center',
                addr: '789 Innovation Street\nBrooklyn, New York\nNY 11201, United States',
                primary: false,
              },
            ].map((loc, i) => (
              <div key={i} className={`p-5 rounded-xl border shadow-xs space-y-3 ${loc.primary ? 'bg-primary/5 border-primary/20' : 'bg-white dark:bg-slate-905 border-slate-150 dark:border-slate-800'}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[8px] font-extrabold uppercase px-2 py-0.5 rounded ${loc.primary ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>{loc.badge}</span>
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${loc.primary ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    <HospitalIcon size={14} />
                  </div>
                </div>
                <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{loc.name}</h3>
                <p className="text-[10px] text-text-secondary leading-relaxed whitespace-pre-line">{loc.addr}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(loc.addr.replace(/\n/g, ' '))}`}
                  target="_blank" rel="noopener noreferrer"
                  className="text-[9px] font-bold text-primary hover:underline"
                >
                  Get Directions →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Business Hours + Emergency Contact side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Business Hours */}
          <div className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                <ClockIcon size={18} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Schedule</span>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Business Hours</h2>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { day: 'Monday – Friday', hours: '08:00 AM – 08:00 PM', open: true },
                { day: 'Saturday', hours: '09:00 AM – 05:00 PM', open: true },
                { day: 'Sunday', hours: 'Emergency Services Only', open: false },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-850 last:border-0">
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{row.day}</span>
                  <span className={`text-[10px] font-bold ${row.open ? 'text-success' : 'text-slate-400'}`}>{row.hours}</span>
                </div>
              ))}
              <div className="pt-2 p-3 bg-primary/5 rounded-lg">
                <p className="text-[10px] font-bold text-primary">Emergency Department</p>
                <p className="text-[10px] text-text-secondary">Open 24 Hours · 7 Days a Week · 365 Days a Year</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-danger/5 border border-danger/15 p-6 rounded-2xl shadow-xs space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-danger/10 text-danger flex items-center justify-center">
                <EmergencyIcon size={18} />
              </div>
              <div>
                <span className="text-[9px] font-bold text-danger/60 uppercase tracking-wider block">Critical Care</span>
                <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">Emergency Contacts</h2>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: 'Emergency Hotline', value: '+1 (800) 911-2025', href: 'tel:+18009112025' },
                { label: 'Ambulance Services', value: '+1 (800) 911-3030', href: 'tel:+18009113030' },
                { label: 'Emergency Email', value: 'emergency@medocynhealthcare.com', href: 'mailto:emergency@medocynhealthcare.com' },
              ].map((contact, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-danger/10 last:border-0 gap-4">
                  <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">{contact.label}</span>
                  <a href={contact.href} className="text-[10px] font-extrabold text-danger hover:underline text-right">{contact.value}</a>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['24/7 Emergency Support', 'Ambulance Dispatch', 'Critical Care Response', 'Trauma Services'].map((tag, i) => (
                <span key={i} className="px-2 py-0.5 rounded bg-danger/10 text-danger text-[8px] font-bold uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 6. Department Emails */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Email Channels</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Department Email Support</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { dept: 'General Inquiries', email: 'info@medocynhealthcare.com', icon: <HospitalIcon size={16} /> },
              { dept: 'Appointments', email: 'appointments@medocynhealthcare.com', icon: <CalendarIcon size={16} /> },
              { dept: 'Customer Support', email: 'support@medocynhealthcare.com', icon: <NurseIcon size={16} /> },
              { dept: 'Billing', email: 'billing@medocynhealthcare.com', icon: <InsuranceIcon size={16} /> },
              { dept: 'Careers', email: 'careers@medocynhealthcare.com', icon: <DoctorIcon size={16} /> },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 p-4 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs space-y-3 hover:shadow hover:-translate-y-0.5 transition-all">
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">{item.icon}</div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-bold text-slate-900 dark:text-white">{item.dept}</p>
                  <a href={`mailto:${item.email}`} className="text-[9px] text-primary hover:underline break-all block leading-snug">{item.email}</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Social Media */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Connect With Us</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Social Media Channels</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Facebook', handle: '@MedocynHealth', tags: ['Healthcare Tips', 'Patient Education'], color: 'bg-blue-600' },
              { name: 'Instagram', handle: '@medocyn_health', tags: ['Wellness Programs', 'Hospital Updates'], color: 'bg-gradient-to-br from-pink-500 to-orange-400' },
              { name: 'LinkedIn', handle: 'MEDOCYN HEALTHCARE', tags: ['Medical News', 'Careers'], color: 'bg-sky-700' },
              { name: 'X (Twitter)', handle: '@MedocynHealth', tags: ['Health Alerts', 'Community Events'], color: 'bg-slate-900 dark:bg-slate-700' },
              { name: 'YouTube', handle: 'Medocyn Healthcare', tags: ['Wellness Programs', 'Patient Guides'], color: 'bg-red-600' },
            ].map((social, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs overflow-hidden hover:shadow hover:-translate-y-0.5 transition-all">
                <div className={`${social.color} p-3 flex items-center justify-center`}>
                  <span className="text-white font-black text-xs">{social.name[0]}</span>
                </div>
                <div className="p-3 space-y-2">
                  <p className="text-[10px] font-bold text-slate-900 dark:text-white">{social.name}</p>
                  <p className="text-[9px] text-slate-400">{social.handle}</p>
                  <div className="flex flex-wrap gap-1">
                    {social.tags.map((t, ti) => (
                      <span key={ti} className="px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-850 text-[7px] font-bold text-slate-450 uppercase">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Contact Workflow Timeline */}
        <div className="space-y-10">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Our Process</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">How We Handle Your Inquiry</h2>
          </div>

          {/* Desktop Horizontal */}
          <div className="hidden lg:block relative py-8">
            <div className="absolute top-[52px] left-12 right-12 h-0.5 bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-8 gap-2 text-center">
              {[
                { step: 'Visit Contact Page', icon: <HospitalIcon size={14} /> },
                { step: 'Choose Contact Method', icon: <AccessibilityIcon size={14} /> },
                { step: 'Complete Contact Form', icon: <MedicalReportIcon size={14} /> },
                { step: 'Submit Inquiry', icon: <HealthcareCloudIcon size={14} /> },
                { step: 'Validation', icon: <InsuranceIcon size={14} /> },
                { step: 'Message Sent', icon: <HeartIcon size={14} /> },
                { step: 'Team Review', icon: <DoctorIcon size={14} /> },
                { step: 'Patient Response', icon: <NurseIcon size={14} /> },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-md">
                    {s.icon}
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400">Step {i + 1}</span>
                    <h3 className="text-[9px] font-extrabold text-slate-800 dark:text-white leading-tight max-w-[80px] mx-auto">{s.step}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical */}
          <div className="block lg:hidden space-y-6 max-w-sm mx-auto text-left relative pl-8">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
            {['Visit Contact Page', 'Choose Contact Method', 'Complete Contact Form', 'Submit Inquiry', 'Validation', 'Message Successfully Sent', 'Support Team Review', 'Patient Response'].map((s, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center shadow">{i + 1}</div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>

      </article>
    </>
  );
}
