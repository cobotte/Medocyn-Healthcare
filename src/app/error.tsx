'use client';

import React, { useEffect } from 'react';
import { CONTACT_INFO } from '@/constants';
import { EmergencyIcon } from '@/components/common/Icons';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app-router process exception:', error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center p-6 bg-slate-100 dark:bg-slate-900 min-h-[500px]">
      <div className="max-w-md text-center space-y-6 bg-white dark:bg-slate-950 p-8 rounded-lg shadow-md border border-slate-100 dark:border-slate-800">
        <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto">
          <EmergencyIcon size={32} className="animate-pulse" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">System Error Occurred</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            A critical workflow error interrupted your request. If this is a medical emergency, please dial our immediate responder line.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-xs font-mono text-slate-400 border border-slate-100 dark:border-slate-800/80">
          Digest: {error.digest || 'ERR_UNKNOWN'}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="accessible-control px-4 py-2.5 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-sm font-semibold rounded-md transition-all flex-1"
          >
            Reset Workspace
          </button>
          <a
            href={`tel:${CONTACT_INFO.emergencyPhone}`}
            className="accessible-control px-4 py-2.5 bg-danger text-white text-sm font-semibold rounded-md hover:bg-danger-hover transition-all flex items-center justify-center gap-1.5 flex-1"
          >
            Call ER ER
          </a>
        </div>
      </div>
    </main>
  );
}
