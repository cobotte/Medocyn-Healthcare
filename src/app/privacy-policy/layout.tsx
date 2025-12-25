import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Privacy Policy — Data Protection & Patient Privacy',
  description:
    'Read MEDOCYN HEALTHCARE\'s Privacy Policy to understand how we collect, use, protect, and manage your personal health information in compliance with HIPAA, GDPR, and applicable data protection regulations.',
  keywords: ['privacy policy', 'patient data protection', 'HIPAA compliance', 'healthcare privacy', 'data security'],
  path: '/privacy-policy',
  noIndex: false,
});

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
