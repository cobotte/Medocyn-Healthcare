'use client';

/**
 * MEDOCYN HEALTHCARE — Cookie Consent Banner
 * Phase 19: Privacy Compliance
 *
 * - Non-blocking: renders after hydration so it never delays LCP
 * - Stores consent in localStorage (not a cookie — to avoid creating a cookie
 *   to consent to cookies, which would be ironic)
 * - Accessible: keyboard navigable, ARIA labelled, focus-managed
 * - Respects user preference: stays dismissed after Accept or Decline
 */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CONSENT_KEY = 'medocyn_cookie_consent';

type ConsentState = 'accepted' | 'declined' | null;

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as ConsentState | null;
      if (!stored) {
        // Delay render to avoid blocking initial paint
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
      setConsent(stored);
    } catch {
      // localStorage not available (private browsing, SSR, etc.)
    }
  }, []);

  function handleAccept() {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {}
    setConsent('accepted');
    setVisible(false);
  }

  function handleDecline() {
    try {
      localStorage.setItem(CONSENT_KEY, 'declined');
    } catch {}
    setConsent('declined');
    setVisible(false);
  }

  // Already consented or declined — don't render
  if (!visible || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      aria-live="polite"
      id="cookie-consent-banner"
      className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Cookie Icon */}
        <div
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ background: 'var(--color-primary, #0ea5e9)', opacity: 0.1 }}
          aria-hidden="true"
        >
          <span className="text-2xl" style={{ filter: 'none', opacity: 1 }}>🍪</span>
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 mb-0.5">
            We use cookies to improve your experience
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            We use essential cookies to keep this site secure and functional. We do{' '}
            <strong>not</strong> use tracking or advertising cookies.{' '}
            <Link
              href="/privacy-policy/"
              className="text-[var(--color-primary,#0ea5e9)] underline hover:no-underline focus-visible:ring-2 focus-visible:ring-[var(--color-primary,#0ea5e9)] rounded"
              aria-label="Read our Privacy Policy"
            >
              Privacy Policy
            </Link>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-row gap-2 flex-shrink-0 w-full sm:w-auto">
          <button
            id="cookie-consent-decline"
            onClick={handleDecline}
            className="flex-1 sm:flex-none px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400 transition-colors"
            aria-label="Decline optional cookies"
          >
            Decline
          </button>
          <button
            id="cookie-consent-accept"
            onClick={handleAccept}
            className="flex-1 sm:flex-none px-5 py-2 rounded-lg text-white text-xs font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary,#0ea5e9)] transition-colors"
            style={{ background: 'var(--color-primary, #0ea5e9)' }}
            aria-label="Accept all cookies"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
