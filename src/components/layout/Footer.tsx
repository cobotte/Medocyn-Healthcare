'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../common/Logo';
import { CONTACT_INFO } from '@/constants';
import { EmergencyIcon } from '../common/Icons';

export const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#0b1329] text-slate-400 border-t border-slate-900"
      aria-labelledby="footer-heading"
      style={{ colorScheme: 'dark' }}
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: Logo, Bio & Socials (Col span 3) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <Logo variant="horizontal" themeVariant="dark" className="h-10 w-auto" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Advancing healthcare through innovation, compassion, and excellence. Your health is our priority.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              {[
                { name: 'Facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'Twitter', path: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z' },
                { name: 'Instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-all"
                  aria-label={social.name}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {social.name === 'Instagram' ? (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d={social.path.split(' ')[0]} />
                        <path d={social.path.split(' ')[1]} />
                      </>
                    ) : (
                      <path d={social.path} />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links (Col span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services/" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/departments/" className="hover:text-white transition-colors">Departments</Link></li>
              <li><Link href="/doctors/" className="hover:text-white transition-colors">Find a Doctor</Link></li>
            </ul>
          </div>

          {/* Column 3: Our Services (Col span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/services/#preventive" className="hover:text-white transition-colors">Preventive Care</Link></li>
              <li><Link href="/services/#diagnostics" className="hover:text-white transition-colors">Diagnostics</Link></li>
              <li><Link href="/services/#specialized" className="hover:text-white transition-colors">Specialized Treatment</Link></li>
              <li><Link href="/services/#emergency" className="hover:text-white transition-colors">Emergency Care</Link></li>
              <li><Link href="/health-packages/" className="hover:text-white transition-colors">Health Packages</Link></li>
            </ul>
          </div>

          {/* Column 4: Support (Col span 2) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Support</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link href="/appointment/" className="hover:text-white transition-colors">Appointment</Link></li>
              <li><Link href="/patient-portal/" className="hover:text-white transition-colors">Patient Portal</Link></li>
              <li><Link href="/faqs/" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/contact/" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy-policy/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact Us & Map Widget (Col span 3) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Contact Us</h3>
              <div className="space-y-2 text-xs text-slate-400">
                <p className="flex items-start gap-2">
                  <span className="mt-0.5 text-primary">📍</span>
                  <span>123 Healthcare Blvd,<br />Medical City, MC 12345</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">📞</span>
                  <span>{CONTACT_INFO.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-primary">✉️</span>
                  <span>{CONTACT_INFO.email}</span>
                </p>
                <p className="flex items-center gap-2 text-red-400">
                  <EmergencyIcon size={12} className="animate-pulse" />
                  <span>24/7 Emergency: {CONTACT_INFO.emergencyPhone}</span>
                </p>
              </div>
            </div>

            {/* Map Widget Component */}
            <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center shadow-inner group">
              {/* Stylized Grid Map Background */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:16px_16px] opacity-35" />
              <div className="absolute w-4 h-4 rounded-full bg-primary/20 animate-ping" />
              <div className="relative z-10 flex flex-col items-center space-y-1">
                <span className="text-lg">📍</span>
                <span className="text-[9px] font-black text-white uppercase tracking-widest bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">Hospital Location</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom copyright segment */}
      <div className="border-t border-slate-800 bg-black/20 py-6 text-xs text-slate-500 text-left">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">© 2026 Medocyn Healthcare. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy/" className="text-slate-500 hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms/" className="text-slate-500 hover:text-slate-300 transition-colors">Terms of Service</Link>
            <Link href="/about/" className="text-slate-500 hover:text-slate-300 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
