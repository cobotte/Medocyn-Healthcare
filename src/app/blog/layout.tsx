import { generateMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateMetadata({
  title: 'Healthcare Knowledge Center — Blog & Health Articles',
  description:
    'Explore trusted healthcare articles, wellness guides, preventive care tips, nutrition advice, and the latest medical innovations from MEDOCYN HEALTHCARE specialists.',
  path: '/blog',
});

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
