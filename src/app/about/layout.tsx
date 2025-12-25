import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'About MEDOCYN HEALTHCARE — Our Mission, Vision & Healthcare Team',
  description:
    'Learn about MEDOCYN HEALTHCARE\'s mission to deliver patient-centered digital healthcare, our experienced medical leadership, core values, innovation strategy, and commitment to advancing global health outcomes.',
  keywords: [
    'about MEDOCYN HEALTHCARE', 'healthcare mission', 'medical organization', 'digital health',
    'patient centered care', 'healthcare innovation', 'medical leadership team',
  ],
  path: '/about',
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
