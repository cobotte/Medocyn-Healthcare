import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Medical Departments — Specialized Healthcare Divisions',
  description:
    'Browse MEDOCYN HEALTHCARE\'s specialized medical departments including Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, Women\'s Health, Emergency Services, and Laboratory & Diagnostics.',
  keywords: [
    'medical departments', 'cardiology department', 'neurology center', 'orthopedics unit',
    'pediatrics ward', 'dermatology clinic', "women's health", 'emergency department',
    'diagnostic laboratory', 'radiology imaging', 'medical specialties',
  ],
  path: '/departments',
});

export default function DepartmentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
