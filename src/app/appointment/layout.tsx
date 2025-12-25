import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Book an Appointment — Online Medical Consultation Booking',
  description:
    'Book your medical appointment online at MEDOCYN HEALTHCARE. Schedule in-person or telemedicine consultations with specialist doctors across cardiology, neurology, orthopedics, pediatrics, and more.',
  keywords: [
    'book medical appointment', 'online appointment booking', 'doctor consultation',
    'telemedicine booking', 'specialist appointment', 'medical consultation online',
    'schedule a doctor visit', 'book appointment hospital',
  ],
  path: '/appointment',
});

export default function AppointmentLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
