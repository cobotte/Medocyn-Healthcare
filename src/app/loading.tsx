import React from 'react';
import { HeartIcon } from '@/components/common/Icons';

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 bg-slate-50/50 dark:bg-slate-950/50">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary/5 text-primary">
          <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <HeartIcon size={32} className="animate-pulse" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold tracking-wide text-slate-800 dark:text-slate-200">
            Connecting Secure Server...
          </h4>
          <p className="text-xs text-slate-400 max-w-[240px]">
            Please wait while we load your clinical workspace data.
          </p>
        </div>
      </div>
    </div>
  );
}
