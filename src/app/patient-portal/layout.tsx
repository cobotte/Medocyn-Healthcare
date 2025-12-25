import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Patient Portal — Your Personal Health Dashboard',
  description:
    'Access your MEDOCYN HEALTHCARE patient portal. View health records, lab reports, prescriptions, upcoming appointments, billing statements, and communicate securely with your care team.',
  keywords: [
    'patient portal', 'health dashboard', 'view medical records', 'lab results online',
    'prescription management', 'telemedicine access', 'health history', 'patient login',
  ],
  path: '/patient-portal',
});

export default function PatientPortalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
