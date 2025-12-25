import type { Metadata } from 'next';

// ─── Brand Constants ───────────────────────────────────────────────────────────
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://medocynhealthcare.com';
export const BRAND_NAME = 'MEDOCYN HEALTHCARE';
export const BRAND_TAGLINE = 'Advancing Healthcare Through Technology';
export const BRAND_TWITTER = '@MedocynHealth';
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

// ─── Healthcare Address (NAP — Name, Address, Phone) ─────────────────────────
export const NAP = {
  phone: '+18009112025',
  phoneFormatted: '+1 (800) 911-2025',
  emergencyPhone: '+18009113030',
  email: 'info@medocynhealthcare.com',
  address: {
    street: '123 Healthcare Avenue, Medical District',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'US',
    countryName: 'United States',
  },
};

// ─── SEO Interface ────────────────────────────────────────────────────────────
interface SEOProperties {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
}

/**
 * Generate enterprise-level SEO Metadata for Next.js App Router pages.
 * Includes Open Graph, Twitter Cards, Robots, Canonical, and Keywords.
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  ogImage = OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  publishedTime,
  modifiedTime,
  author,
  section,
}: SEOProperties): Metadata {
  const fullTitle = `${title} | ${BRAND_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;

  const defaultKeywords = [
    'healthcare', 'medical services', 'hospital', 'doctor consultation',
    'telemedicine', 'diagnostics', 'emergency care', 'preventive healthcare',
    'specialist doctors', 'digital healthcare platform', 'MEDOCYN HEALTHCARE',
  ];

  const allKeywords = [...defaultKeywords, ...keywords];

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: author ? [{ name: author }] : [{ name: BRAND_NAME }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: 'en_US',
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
          type: 'image/png',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
      ...(section && { section }),
    },
    twitter: {
      card: 'summary_large_image',
      site: BRAND_TWITTER,
      creator: BRAND_TWITTER,
      title: fullTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${BRAND_NAME} — ${BRAND_TAGLINE}`,
        },
      ],
    },
    other: {
      'theme-color': '#0057B8',
      'msapplication-TileColor': '#0057B8',
      'og:locale:alternate': 'en_GB',
    },
  };
}

// ─── Organization Schema ──────────────────────────────────────────────────────
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'MedicalOrganization'],
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    alternateName: 'Medocyn Medical Center',
    description: BRAND_TAGLINE,
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo.png`,
      width: 200,
      height: 60,
    },
    image: OG_IMAGE,
    telephone: NAP.phoneFormatted,
    email: NAP.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.address.street,
      addressLocality: NAP.address.city,
      addressRegion: NAP.address.state,
      postalCode: NAP.address.zip,
      addressCountry: NAP.address.country,
    },
    sameAs: [
      'https://www.facebook.com/MedocynHealth',
      'https://www.instagram.com/medocyn_health',
      'https://www.linkedin.com/company/medocyn-healthcare',
      'https://twitter.com/MedocynHealth',
      'https://www.youtube.com/c/MedocynHealthcare',
    ],
  };
}

// ─── Hospital / MedicalClinic Schema ─────────────────────────────────────────
export function generateMedicalClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Hospital', 'MedicalClinic', 'LocalBusiness'],
    '@id': `${SITE_URL}/#hospital`,
    name: BRAND_NAME,
    alternateName: 'Medocyn Medical Center',
    description: 'MEDOCYN HEALTHCARE is a premium digital healthcare platform providing medical services, telemedicine, emergency care, diagnostics, specialist consultations, and preventive health packages.',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: OG_IMAGE,
    telephone: NAP.phoneFormatted,
    email: NAP.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: NAP.address.street,
      addressLocality: NAP.address.city,
      addressRegion: NAP.address.state,
      postalCode: NAP.address.zip,
      addressCountry: NAP.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7127,
      longitude: -74.006,
    },
    hasMap: 'https://maps.google.com/?q=123+Healthcare+Avenue+New+York+NY+10001',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '17:00',
      },
    ],
    medicalSpecialty: [
      'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
      'Dermatology', 'General Medicine', 'Emergency Medicine',
      'Radiology', 'Laboratory Medicine', 'Preventive Medicine',
    ],
    availableService: [
      { '@type': 'MedicalProcedure', name: 'Telemedicine Consultation' },
      { '@type': 'MedicalProcedure', name: 'Annual Health Check-up' },
      { '@type': 'MedicalProcedure', name: 'Emergency Care' },
      { '@type': 'MedicalProcedure', name: 'Diagnostic Laboratory Services' },
      { '@type': 'MedicalProcedure', name: 'Medical Imaging & Radiology' },
    ],
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, Insurance',
  };
}

// ─── Website Schema ───────────────────────────────────────────────────────────
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: BRAND_NAME,
    url: SITE_URL,
    description: BRAND_TAGLINE,
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/faqs?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────
export function generateBreadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  };
}

// ─── Physician / Doctor Schema ────────────────────────────────────────────────
export function generatePhysicianSchema(doctor: {
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  department: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    description: `${doctor.specialty} specialist at ${BRAND_NAME}`,
    medicalSpecialty: doctor.specialty,
    qualifications: doctor.qualifications,
    hospitalAffiliation: { '@type': 'Hospital', name: BRAND_NAME, url: SITE_URL },
    worksFor: { '@type': 'MedicalOrganization', name: BRAND_NAME },
    knowsAbout: [doctor.specialty, doctor.department],
  };
}

// ─── Article / BlogPosting Schema ─────────────────────────────────────────────
export function generateArticleSchema(article: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  url: string;
  keywords?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    image: article.image || OG_IMAGE,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo.png` },
    },
    url: `${SITE_URL}${article.url}`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${article.url}` },
    keywords: article.keywords?.join(', '),
    inLanguage: 'en-US',
  };
}

// ─── FAQPage Schema ───────────────────────────────────────────────────────────
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

// ─── Service Schema ───────────────────────────────────────────────────────────
export function generateServiceSchema(service: {
  name: string;
  description: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: service.name,
    description: service.description,
    category: service.category,
    provider: { '@type': 'Hospital', name: BRAND_NAME, url: SITE_URL },
  };
}
