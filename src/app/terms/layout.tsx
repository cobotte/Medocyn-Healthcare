import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Terms of Service — Conditions of Use',
  description:
    'Review MEDOCYN HEALTHCARE\'s Terms of Service governing the use of our digital healthcare platform, appointment booking system, patient portal, telemedicine services, and healthcare applications.',
  keywords: ['terms of service', 'terms of use', 'healthcare platform terms', 'user agreement'],
  path: '/terms',
  noIndex: false,
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
