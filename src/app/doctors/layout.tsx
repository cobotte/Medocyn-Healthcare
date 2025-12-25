import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Doctors & Specialists — Expert Medical Professionals',
  description:
    'Meet MEDOCYN HEALTHCARE\'s team of board-certified doctors and specialist physicians. Find cardiologists, neurologists, orthopedic surgeons, pediatricians, and more. Book a consultation today.',
  keywords: [
    'specialist doctors', 'cardiologist', 'neurologist', 'orthopedic surgeon',
    'pediatrician', 'dermatologist', 'find a doctor', 'book doctor consultation',
    'medical specialists', 'physician', 'healthcare professionals',
  ],
  path: '/doctors',
});

export default function DoctorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
