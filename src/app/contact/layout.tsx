import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'Contact Us — Healthcare Support Center',
  description:
    'Contact MEDOCYN HEALTHCARE for appointment inquiries, medical support, billing assistance, and emergency services. Reach our care team via phone, email, or our secure contact form.',
  path: '/contact',
});


export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
