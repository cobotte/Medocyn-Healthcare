'use client';

import React from 'react';

import Link from 'next/link';
import { CONTACT_INFO } from '@/constants';
import { EmergencyIcon, HeartIcon } from '@/components/common/Icons';

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 min-h-[600px] text-center">
      <div className="max-w-md space-y-6">
        
        {/* Medical illustration / icon layout placeholder */}
        <div className="relative flex items-center justify-center w-24 h-24 bg-primary/5 text-primary rounded-full mx-auto">
          <span className="text-5xl font-extrabold text-primary opacity-20">404</span>
          <HeartIcon size={24} className="absolute bottom-2 right-2 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Page Not Found</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            We couldn&apos;t find the medical record, clinic service, or portal page you were looking for.
          </p>
        </div>

        {/* Global Search System Placeholder (Step 3 site search architecture) */}
        <form className="flex gap-2 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="search-404" className="sr-only">Search Medocyn content</label>
          <input
            type="search"
            id="search-404"
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 text-sm rounded-md text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
            placeholder="Search doctors, departments, FAQs..."
          />
          <button
            type="submit"
            className="bg-primary hover:bg-primary-hover active:bg-primary-active px-4 py-2 text-sm font-semibold text-white rounded-md transition-all"
          >
            Search
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="accessible-control px-5 py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md transition-all flex-1"
            >
              Return Home
            </Link>
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="accessible-control px-5 py-2.5 bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-350 text-sm font-semibold rounded-md hover:bg-slate-300 transition-all flex-1"
            >
              Contact Support
            </a>
          </div>
          <p className="text-xs text-slate-400 flex items-center justify-center gap-1">
            <EmergencyIcon size={12} className="text-danger" />
            Emergency Hotline: <strong>{CONTACT_INFO.emergencyPhone}</strong>
          </p>
        </div>

      </div>
    </main>
  );
}
