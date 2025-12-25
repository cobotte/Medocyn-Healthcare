import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Health Packages — Preventive Care & Wellness Programs',
  description:
    'Choose from MEDOCYN HEALTHCARE\'s comprehensive preventive health packages including annual check-ups, cardiac screening, diabetes management, women\'s wellness, pediatric care, and executive health programs.',
  keywords: [
    'health packages', 'preventive care package', 'annual health check-up',
    'cardiac screening', 'diabetes screening', "women's wellness package",
    'pediatric health package', 'executive health check', 'wellness program',
    'preventive medicine', 'health screening',
  ],
  path: '/health-packages',
});

export default function HealthPackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
