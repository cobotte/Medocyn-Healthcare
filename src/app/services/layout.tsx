import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Medical Services — Comprehensive Healthcare Solutions',
  description:
    'Explore MEDOCYN HEALTHCARE\'s full range of medical services including cardiology, neurology, orthopedics, pediatrics, emergency care, diagnostics, telemedicine, and preventive health programs.',
  keywords: [
    'medical services', 'cardiology services', 'neurology', 'orthopedics', 'pediatrics',
    'emergency care', 'telemedicine services', 'diagnostic lab', 'preventive healthcare',
    'specialist consultations', 'general medicine', 'radiology',
  ],
  path: '/services',
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
