import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import {
  generateMetadata,
  generateMedicalClinicSchema,
  generateOrganizationSchema,
  generateWebSiteSchema,
} from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import CookieConsent from '@/components/common/CookieConsent';
import './globals.css';


// Load Inter font for body text
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  preload: true,
});

// Load Poppins font for enterprise headings
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-display',
  preload: true,
});

// Enterprise homepage metadata
export const metadata: Metadata = generateMetadata({
  title: 'Advanced Healthcare & Digital Medical Services',
  description:
    'MEDOCYN HEALTHCARE provides trusted medical services, experienced specialists, online appointment booking, telemedicine, diagnostics, emergency care, preventive healthcare, and patient-centered digital healthcare solutions.',
  keywords: [
    'book medical appointment', 'online doctor consultation', 'digital healthcare platform',
    'trusted healthcare provider', 'specialist doctors New York', 'preventive health check-up',
    'medical laboratory services', 'family healthcare', 'cardiology', 'pediatrics',
    'orthopedics', 'neurology', 'telemedicine consultation', 'emergency care hospital',
  ],
  path: '/',
});

import { ThemeProvider } from '@/context/ThemeContext';
import MockApiProvider from '@/components/common/MockApiProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const clinicSchema = generateMedicalClinicSchema();
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Anti-flash inline script */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              try {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
              } catch (_) {}
            `,
          }}
        />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Favicons */}
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" href={`${basePath}/favicon.ico`} type="image/x-icon" />

        {/* Theme */}
        <meta name="theme-color" content="#0057B8" />
        <meta name="msapplication-TileColor" content="#0057B8" />

        {/* Geo meta for Local SEO */}
        <meta name="geo.region" content="US-NY" />
        <meta name="geo.placename" content="New York" />
        <meta name="geo.position" content="40.7127;-74.006" />
        <meta name="ICBM" content="40.7127, -74.006" />
      </head>

      <body className="min-h-screen flex flex-col font-sans antialiased bg-slate-50 text-slate-900 transition-colors duration-300" suppressHydrationWarning>
        <MockApiProvider>
          <ThemeProvider>
            {/* Skip Link for screen readers & keyboard navigation */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-white px-4 py-2 rounded-md font-semibold focus:outline-none"
            >
              Skip to main content
            </a>

            <Header />

            <div className="flex-grow flex flex-col">
              <Breadcrumbs />
              <main id="main-content" className="flex-1 flex flex-col">
                {children}
              </main>
            </div>

            <Footer />

            {/* Structured Data — Organization */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            {/* Structured Data — Hospital / MedicalClinic */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
            />
            {/* Structured Data — WebSite with SearchAction */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            {/* Privacy Compliance — Cookie Consent Banner */}
            <CookieConsent />
          </ThemeProvider>
        </MockApiProvider>
      </body>
    </html>
  );
}
