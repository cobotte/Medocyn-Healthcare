import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Frequently Asked Questions',
  description:
    'Find quick answers to common healthcare questions about appointments, consultations, medical reports, telemedicine, insurance, billing, and patient services at MEDOCYN HEALTHCARE.',
  path: '/faqs',
});

export default function FaqsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
