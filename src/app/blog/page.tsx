'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Image from '@/components/common/OptimizedImage';
import Link from 'next/link';
import {
  HeartIcon,
  HospitalIcon,
  MedicalReportIcon,
  HealthcareCloudIcon,
  CalendarIcon,
  ClockIcon,
  NurseIcon,
  DoctorIcon,
  MicroscopeIcon,
  DnaIcon,
  AccessibilityIcon,
  BrainIcon,
  InsuranceIcon,
} from '@/components/common/Icons';

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: 'All', count: 24 },
  { name: 'Medical Tips', count: 6 },
  { name: 'Wellness', count: 5 },
  { name: 'Nutrition', count: 4 },
  { name: 'Preventive Care', count: 4 },
  { name: 'Healthcare Technology', count: 3 },
  { name: 'Health News', count: 2 },
];

const ARTICLES = [
  {
    id: 'advances-modern-cardiology',
    title: 'Advances in Modern Cardiology: What Patients Should Know',
    summary: 'A comprehensive look at breakthrough cardiac treatments, minimally invasive procedures, and how advanced imaging is transforming heart disease management.',
    category: 'Medical Tips',
    readTime: '8 min read',
    author: 'Dr. Emily Carter',
    date: 'July 5, 2026',
    image: '/images/blog/blog_cardiology.png',
    tags: ['Cardiology', 'Heart Health', 'Medical Research'],
    featured: true,
  },
  {
    id: 'future-digital-healthcare',
    title: 'The Future of Digital Healthcare: Telemedicine & AI Diagnostics',
    summary: 'How artificial intelligence, remote patient monitoring, and digital health platforms are reshaping the way healthcare is delivered globally.',
    category: 'Healthcare Technology',
    readTime: '6 min read',
    author: 'Dr. James Walker',
    date: 'July 3, 2026',
    image: '/images/blog/blog_digital_health.png',
    tags: ['Telemedicine', 'AI', 'Digital Health'],
    featured: false,
  },
  {
    id: 'understanding-preventive-medicine',
    title: 'Understanding Preventive Medicine: A Complete Patient Guide',
    summary: 'Why annual screenings, vaccinations, and lifestyle modification programs are your strongest defense against chronic disease and early mortality.',
    category: 'Preventive Care',
    readTime: '5 min read',
    author: 'Dr. Sophia Martinez',
    date: 'July 1, 2026',
    image: '/images/blog/blog_wellness.png',
    tags: ['Prevention', 'Screenings', 'Health Check'],
    featured: false,
  },
  {
    id: 'balanced-diet-benefits',
    title: 'The Benefits of a Balanced Diet: Evidence-Based Nutrition',
    summary: 'Clinical evidence on how a balanced macronutrient diet reduces cardiovascular risk, supports immunity, and promotes cognitive function across all life stages.',
    category: 'Nutrition',
    readTime: '7 min read',
    author: 'Dr. David Morgan',
    date: 'June 28, 2026',
    image: '/images/blog/blog_nutrition.png',
    tags: ['Nutrition', 'Diet', 'Wellness'],
    featured: false,
  },
  {
    id: '10-daily-habits-healthier-life',
    title: '10 Daily Habits for a Healthier and Longer Life',
    summary: 'Evidence-backed micro-habits that have measurable impacts on metabolic health, cardiovascular fitness, and mental resilience when practiced consistently.',
    category: 'Wellness',
    readTime: '5 min read',
    author: 'Dr. Emily Carter',
    date: 'June 25, 2026',
    image: '/images/blog/blog_wellness.png',
    tags: ['Habits', 'Lifestyle', 'Wellness'],
    featured: false,
  },
  {
    id: 'reduce-heart-disease-risk',
    title: 'How to Reduce Your Risk of Heart Disease',
    summary: 'Practical, physician-reviewed steps for managing blood pressure, cholesterol, body weight, and stress to significantly reduce your lifetime cardiac risk.',
    category: 'Medical Tips',
    readTime: '6 min read',
    author: 'Dr. James Walker',
    date: 'June 22, 2026',
    image: '/images/blog/blog_cardiology.png',
    tags: ['Heart Disease', 'Prevention', 'Cardiology'],
    featured: false,
  },
  {
    id: 'recognizing-diabetes-symptoms',
    title: 'Recognizing Early Symptoms of Diabetes',
    summary: 'Early warning signs of Type 1 and Type 2 diabetes that patients often overlook, and why prompt diagnosis makes a critical difference in long-term outcomes.',
    category: 'Medical Tips',
    readTime: '4 min read',
    author: 'Dr. Sophia Martinez',
    date: 'June 20, 2026',
    image: '/images/blog/blog_wellness.png',
    tags: ['Diabetes', 'Diagnosis', 'Prevention'],
    featured: false,
  },
  {
    id: 'superfoods-heart-health',
    title: 'Superfoods for Heart Health: A Nutritionist\'s Guide',
    summary: 'Clinical evidence behind omega-3 rich foods, antioxidant-dense berries, leafy greens, and whole grains in reducing LDL cholesterol and arterial inflammation.',
    category: 'Nutrition',
    readTime: '5 min read',
    author: 'Dr. David Morgan',
    date: 'June 18, 2026',
    image: '/images/blog/blog_nutrition.png',
    tags: ['Superfoods', 'Nutrition', 'Heart Health'],
    featured: false,
  },
];

const WELLNESS_GUIDES = [
  { title: 'Building Healthy Daily Routines', category: 'Lifestyle Management', desc: 'Structure your mornings and evenings to optimize energy, focus, and immune resilience.', icon: <ClockIcon size={18} /> },
  { title: 'Managing Workplace Stress', category: 'Mental Wellness', desc: 'Effective cognitive behavioral strategies to manage professional pressure and prevent burnout.', icon: <BrainIcon size={18} /> },
  { title: 'Staying Active at Every Age', category: 'Fitness', desc: 'Age-specific exercise frameworks designed by physiotherapists for joint preservation and vitality.', icon: <AccessibilityIcon size={18} /> },
  { title: 'Simple Habits for Better Mental Health', category: 'Self-Care', desc: 'Mindfulness, gratitude journaling, and deep-sleep hygiene practices backed by clinical evidence.', icon: <HeartIcon size={18} /> },
];

const MEDICAL_TIPS = [
  { title: 'Managing Blood Pressure', icon: <HeartIcon size={16} />, desc: 'Daily monitoring, DASH diet adherence, and sodium restriction strategies.' },
  { title: 'Heart Health Tips', icon: <MedicalReportIcon size={16} />, desc: 'Regular cardiology check-ups and aerobic exercise recommendations.' },
  { title: 'Diabetes Prevention', icon: <DnaIcon size={16} />, desc: 'Fasting glucose monitoring, portion control, and insulin sensitivity training.' },
  { title: 'Healthy Sleep Habits', icon: <ClockIcon size={16} />, desc: 'Sleep hygiene protocols for restorative REM cycle management.' },
  { title: 'Stress Management', icon: <BrainIcon size={16} />, desc: 'CBT-based stress reduction and mindfulness-based stress reduction (MBSR).' },
  { title: 'Exercise Recommendations', icon: <AccessibilityIcon size={16} />, desc: 'WHO-aligned 150-minute moderate aerobic activity guidelines for adults.' },
  { title: 'Seasonal Health Advice', icon: <NurseIcon size={16} />, desc: 'Flu vaccination schedules and seasonal allergen exposure management.' },
  { title: 'Personal Hygiene', icon: <InsuranceIcon size={16} />, desc: 'Clinical handwashing technique and infection chain prevention education.' },
];

const HEALTHCARE_UPDATES = [
  { title: 'New Telemedicine Services Available', date: 'July 7, 2026', tag: 'Digital Services', desc: 'Our telemedicine platform now supports 28 specialties with 24-hour on-demand consultations.' },
  { title: 'Expanded Cardiology Department', date: 'July 4, 2026', tag: 'Facility Update', desc: 'MEDOCYN\'s Cardiology wing has expanded with 3 new catheterization labs and advanced imaging suites.' },
  { title: 'Digital Patient Portal Improvements', date: 'June 30, 2026', tag: 'Technology', desc: 'Patient portal v3.0 features AI-driven appointment suggestions and real-time lab result alerts.' },
  { title: 'Community Health Awareness Events', date: 'June 26, 2026', tag: 'Community', desc: 'Join our city-wide health screening camps and free blood pressure monitoring events this month.' },
];

const PREVENTIVE_ARTICLES = [
  { title: 'Why Annual Health Screenings Matter', readTime: '5 min', cat: 'Preventive Care' },
  { title: 'Preventing Lifestyle Diseases', readTime: '6 min', cat: 'Preventive Care' },
  { title: 'Understanding Vaccination Benefits', readTime: '4 min', cat: 'Preventive Care' },
  { title: 'Early Detection Saves Lives', readTime: '7 min', cat: 'Preventive Care' },
];

const NUTRITION_ARTICLES = [
  { title: 'The Benefits of a Balanced Diet', tag: 'Nutrition' },
  { title: 'Superfoods for Heart Health', tag: 'Heart-Healthy Foods' },
  { title: 'Nutrition Tips for Children', tag: 'Child Nutrition' },
  { title: 'Healthy Meal Planning for Busy Professionals', tag: 'Meal Planning' },
];

// ─── Components ────────────────────────────────────────────────────────────────

interface BlogArticle {
  id: string;
  slug?: string;
  title: string;
  summary: string;
  category: string;
  image?: string;
  date?: string;
  readTime?: string;
  author?: string;
  createdAt?: string;
  tags?: string[];
  featured?: boolean;
}

const ArticleCard: React.FC<{ article: BlogArticle; compact?: boolean }> = ({ article, compact }) => (
  <article className={`bg-white dark:bg-slate-905 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col ${compact ? '' : 'h-full'}`}>
    <div className="relative w-full aspect-video overflow-hidden">
      <Image
        src={article.image || '/images/blog/blog_default.png'}
        alt={article.title}
        fill
        sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-primary text-white text-[8px] font-extrabold uppercase">
        {article.category}
      </span>
    </div>
    <div className="flex flex-col flex-1 p-5 space-y-3">
      <div className="flex items-center gap-3 text-[9px] text-slate-400">
        <span>{article.createdAt ? new Date(article.createdAt).toLocaleDateString() : (article.date || 'July 05, 2026')}</span>
        <span>·</span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">{article.title}</h3>
      {!compact && <p className="text-[10px] text-text-secondary leading-relaxed flex-1">{article.summary}</p>}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-850">
        <span className="text-[9px] text-slate-400">By {article.author || 'Medocyn Staff'}</span>
        <Link href={`/blog/${article.slug || article.id}`} className="text-[9px] font-bold text-primary hover:underline">
          Read Article →
        </Link>
      </div>
    </div>
  </article>
);

// ─── Main Blog Page ────────────────────────────────────────────────────────────
export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterName, setNewsletterName] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [dbArticles, setDbArticles] = useState<BlogArticle[]>([]);

  // Fetch blogs on mount
  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbArticles(data);
        }
      })
      .catch((err) => console.error('Error fetching dynamic blogs:', err));
  }, []);

  const filtered = useMemo(() => {
    let list = dbArticles.length > 0 ? dbArticles : ARTICLES;
    if (activeCategory !== 'All') list = list.filter((a) => a.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.tags && Array.isArray(a.tags) && a.tags.some((t: string) => t.toLowerCase().includes(q)))
      );
    }
    return list;
  }, [search, activeCategory, dbArticles]);

  const featured = ARTICLES.find((a) => a.featured);
  const latest = filtered.filter((a) => !a.featured);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setSubscribed(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MEDOCYN HEALTHCARE — Healthcare Knowledge Center',
    url: 'https://medocynhealthcare.com/blog',
    description: 'Trusted healthcare articles, wellness guides, preventive care resources, and medical innovations.',
    publisher: {
      '@type': 'MedicalOrganization',
      name: 'MEDOCYN HEALTHCARE',
      url: 'https://medocynhealthcare.com',
    },
    blogPost: ARTICLES.map((a) => ({
      '@type': 'BlogPosting',
      headline: a.title,
      description: a.summary,
      datePublished: a.date,
      author: { '@type': 'Person', name: a.author },
      keywords: a.tags.join(', '),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-20 min-h-screen text-left">

        {/* 1. Blog Hero */}
        <header className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block">Knowledge Center</span>
          <h1 className="text-hero-heading text-slate-900 dark:text-white leading-tight">
            Healthcare Knowledge Center
          </h1>
          <p className="text-paragraph text-text-secondary max-w-2xl mx-auto">
            Explore trusted healthcare articles, wellness guides, preventive care tips, nutrition advice, and the latest medical innovations to support a healthier life.
          </p>
          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {[['24+', 'Articles'], ['10', 'Categories'], ['6', 'Expert Authors'], ['Weekly', 'New Content']].map(([v, l], i) => (
              <div key={i} className="text-center">
                <span className="block text-lg font-black text-primary">{v}</span>
                <span className="block text-[9px] text-slate-400 uppercase font-bold tracking-wide">{l}</span>
              </div>
            ))}
          </div>
        </header>

        {/* 2. Featured Article */}
        {featured && (
          <section id="featured-article" aria-labelledby="featured-heading" className="bg-white dark:bg-slate-905 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-medical-soft overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative aspect-video lg:aspect-auto min-h-[240px]">
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  fetchPriority="high"
                  quality={85}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r" />
              </div>
              <div className="p-8 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[8px] font-extrabold uppercase">Featured Article</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[8px] font-bold uppercase">{featured.category}</span>
                </div>
                <h2 id="featured-heading" className="text-h2 text-slate-900 dark:text-white leading-tight">{featured.title}</h2>
                <p className="text-[11px] text-text-secondary leading-relaxed">{featured.summary}</p>
                <div className="flex items-center gap-4 text-[9px] text-slate-400">
                  <span>By {featured.author}</span>
                  <span>·</span>
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featured.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-bold">{tag}</span>
                  ))}
                </div>
                <a
                  href={`/blog/${featured.id}`}
                  className="accessible-control inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-colors shadow w-fit"
                >
                  Read Article →
                </a>
              </div>
            </div>
          </section>
        )}

        {/* 3. Category Filters + Search + Article Grid */}
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">All Articles</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Latest Health News & Articles</h2>
          </div>

          {/* Search */}
          <div className="relative max-w-xl">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search healthcare articles, topics, or tags…"
              className="w-full bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 pl-11 pr-4 py-3 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
              aria-label="Search articles"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`accessible-control flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${activeCategory === cat.name ? 'bg-primary text-white shadow' : 'bg-white dark:bg-slate-905 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary/30'}`}
              >
                {cat.name}
                <span className={`text-[8px] px-1.5 py-0.5 rounded ${activeCategory === cat.name ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-450'}`}>{cat.count}</span>
              </button>
            ))}
          </div>

          {/* Article Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latest.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 space-y-4">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No articles found for &quot;{search}&quot;</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="accessible-control px-4 py-2 bg-primary text-white text-xs font-bold rounded-lg">
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* 4. Medical Tips */}
        <div className="space-y-8 bg-slate-50/50 dark:bg-slate-900/10 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-100 dark:border-slate-850">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Health Advice</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Medical Tips & Advice</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {MEDICAL_TIPS.map((tip, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 p-4 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs hover:shadow hover:-translate-y-0.5 transition-all space-y-2 cursor-pointer">
                <div className="w-8 h-8 rounded-lg bg-primary/5 text-primary flex items-center justify-center">{tip.icon}</div>
                <h3 className="text-[10px] font-extrabold text-slate-900 dark:text-white">{tip.title}</h3>
                <p className="text-[9px] text-text-secondary leading-tight">{tip.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {['10 Daily Habits for a Healthier Life', 'How to Reduce Your Risk of Heart Disease', 'Recognizing Early Symptoms of Diabetes', 'Maintaining a Healthy Immune System'].map((title, i) => (
              <a key={i} href={`/blog/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                className="flex items-center gap-3 p-3 bg-white dark:bg-slate-905 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs hover:border-primary/30 hover:shadow transition-all"
              >
                <div className="w-7 h-7 rounded bg-primary/5 text-primary flex items-center justify-center flex-shrink-0">
                  <MedicalReportIcon size={14} />
                </div>
                <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">{title}</span>
                <span className="ml-auto text-[9px] text-primary">→</span>
              </a>
            ))}
          </div>
        </div>

        {/* 5. Wellness Guides */}
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Wellness Library</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Wellness Guides</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WELLNESS_GUIDES.map((guide, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800 shadow-xs hover:shadow hover:-translate-y-0.5 transition-all space-y-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center">{guide.icon}</div>
                <div className="space-y-1.5">
                  <span className="text-[8px] font-bold text-primary uppercase tracking-wider block">{guide.category}</span>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">{guide.title}</h3>
                  <p className="text-[10px] text-text-secondary leading-relaxed">{guide.desc}</p>
                </div>
                <a href="#" className="text-[9px] font-bold text-primary hover:underline">Read Guide →</a>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Nutrition Articles */}
        <div className="space-y-8 bg-slate-50/50 dark:bg-slate-900/10 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-100 dark:border-slate-850">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Food & Health</span>
              <h2 className="text-h2 text-slate-900 dark:text-white">Nutrition Articles</h2>
              <p className="text-[11px] text-text-secondary leading-relaxed">
                Evidence-based nutrition guidance from our clinical dietitians covering diet plans, vitamin profiles, weight management, and specialized nutrition needs.
              </p>
              <div className="relative aspect-video rounded-xl overflow-hidden">
                <Image src="/images/blog/blog_nutrition.png" alt="Nutrition and healthy eating — healthy food and balanced diet guide" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" loading="lazy" quality={80} />

              </div>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {NUTRITION_ARTICLES.map((art, i) => (
                <div key={i} className="bg-white dark:bg-slate-905 p-4 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs hover:shadow hover:-translate-y-0.5 transition-all space-y-2">
                  <span className="text-[8px] font-bold text-primary uppercase">{art.tag}</span>
                  <h3 className="text-[10px] font-extrabold text-slate-900 dark:text-white">{art.title}</h3>
                  <a href="#" className="text-[9px] text-primary hover:underline font-bold">Read Article →</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Healthcare Updates */}
        <div className="space-y-8">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Hospital News</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Healthcare Updates</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {HEALTHCARE_UPDATES.map((upd, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 p-5 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs flex gap-4 hover:shadow hover:-translate-y-0.5 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <HospitalIcon size={18} />
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] font-bold text-primary uppercase">{upd.tag}</span>
                    <span className="text-[8px] text-slate-400">· {upd.date}</span>
                  </div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">{upd.title}</h3>
                  <p className="text-[10px] text-text-secondary leading-relaxed">{upd.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Preventive Care */}
        <div className="space-y-8 bg-slate-50/50 dark:bg-slate-900/10 py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-slate-100 dark:border-slate-850">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Prevention First</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Preventive Care</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PREVENTIVE_ARTICLES.map((art, i) => (
              <div key={i} className="bg-white dark:bg-slate-905 p-5 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs hover:shadow hover:-translate-y-0.5 transition-all space-y-3">
                <div className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                  <InsuranceIcon size={18} />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-slate-400 uppercase">{art.cat} · {art.readTime}</span>
                  <h3 className="text-[10px] font-extrabold text-slate-900 dark:text-white leading-snug">{art.title}</h3>
                </div>
                <a href="#" className="text-[9px] font-bold text-primary hover:underline">Read Article →</a>
              </div>
            ))}
          </div>
        </div>

        {/* 9. Blog Categories Grid */}
        <div className="space-y-8">
          <div className="space-y-1 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Browse By Topic</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Blog Categories</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Health News', icon: <HospitalIcon size={20} />, count: '3' },
              { name: 'Medical Tips', icon: <MedicalReportIcon size={20} />, count: '8' },
              { name: 'Wellness', icon: <HeartIcon size={20} />, count: '5' },
              { name: 'Nutrition', icon: <DnaIcon size={20} />, count: '4' },
              { name: 'Preventive Care', icon: <InsuranceIcon size={20} />, count: '4' },
              { name: 'Mental Health', icon: <BrainIcon size={20} />, count: '3' },
              { name: 'Child Health', icon: <NurseIcon size={20} />, count: '2' },
              { name: "Women's Health", icon: <AccessibilityIcon size={20} />, count: '2' },
              { name: 'Senior Health', icon: <ClockIcon size={20} />, count: '2' },
              { name: 'Technology', icon: <HealthcareCloudIcon size={20} />, count: '3' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat.name === 'Technology' ? 'Healthcare Technology' : cat.name)}
                className="accessible-control flex flex-col items-center gap-3 p-5 bg-white dark:bg-slate-905 rounded-xl border border-slate-150 dark:border-slate-800 shadow-xs text-center hover:border-primary/30 hover:shadow hover:-translate-y-0.5 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-colors">{cat.icon}</div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-800 dark:text-white leading-tight">{cat.name}</p>
                  <p className="text-[8px] text-slate-400 mt-0.5">{cat.count} articles</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 10. Newsletter */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-primary to-primary-hover dark:from-slate-900 dark:to-slate-850 p-8 rounded-3xl text-white text-center shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:14px_14px] pointer-events-none" />
            {subscribed ? (
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <h3 className="text-lg font-black">You&apos;re Subscribed!</h3>
                <p className="text-xs text-white/80">Thank you, {newsletterName}! You&apos;ll receive weekly healthcare insights, medical news, and wellness guides from MEDOCYN HEALTHCARE.</p>
              </div>
            ) : (
              <div className="relative z-10 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-black">Stay Updated with Healthcare Insights</h2>
                  <p className="text-xs text-white/80 max-w-lg mx-auto">Subscribe for weekly health tips, medical news, wellness guides, preventive care updates, and hospital announcements.</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center text-[9px] text-white/70">
                  {['Weekly Health Tips', 'Medical News', 'Wellness Guides', 'Preventive Care Updates', 'Hospital Announcements'].map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-white/10">✓ {b}</span>
                  ))}
                </div>
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="text" value={newsletterName} onChange={(e) => setNewsletterName(e.target.value)} required
                    placeholder="Full Name"
                    className="flex-1 px-4 py-2.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <input
                    type="email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required
                    placeholder="Email Address"
                    className="flex-1 px-4 py-2.5 text-xs rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                  <button type="submit" className="accessible-control px-5 py-2.5 bg-white text-primary text-xs font-extrabold rounded-lg hover:bg-slate-50 transition-colors shadow">
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* 11. Blog Workflow Timeline */}
        <div className="space-y-10">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Reading Journey</span>
            <h2 className="text-h2 text-slate-900 dark:text-white">Your Healthcare Learning Journey</h2>
          </div>

          {/* Desktop */}
          <div className="hidden lg:block relative py-8">
            <div className="absolute top-[52px] left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-800" />
            <div className="grid grid-cols-7 gap-2 text-center">
              {[
                { label: 'Open Blog', icon: <HospitalIcon size={14} /> },
                { label: 'Browse Categories', icon: <MedicalReportIcon size={14} /> },
                { label: 'Search Articles', icon: <MicroscopeIcon size={14} /> },
                { label: 'Read Content', icon: <HeartIcon size={14} /> },
                { label: 'Explore Related', icon: <HealthcareCloudIcon size={14} /> },
                { label: 'Subscribe Newsletter', icon: <CalendarIcon size={14} /> },
                { label: 'Book Appointment', icon: <DoctorIcon size={14} /> },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white border-4 border-white dark:border-slate-950 flex items-center justify-center shadow-md">{s.icon}</div>
                  <div>
                    <span className="block text-[8px] font-bold text-slate-400">Step {i + 1}</span>
                    <h3 className="text-[9px] font-extrabold text-slate-800 dark:text-white leading-tight max-w-[80px] mx-auto">{s.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="block lg:hidden space-y-5 max-w-sm mx-auto text-left relative pl-8">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-800" />
            {['Open Blog', 'Browse Categories', 'Search Articles', 'Read Healthcare Content', 'Explore Related Articles', 'Subscribe to Newsletter', 'Book Appointment'].map((s, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[30px] top-0 w-6 h-6 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center shadow">{i + 1}</div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 12. Book Appointment CTA */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-50 dark:bg-slate-905 p-8 rounded-3xl border border-slate-150 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-left">
              <h2 className="text-h2 text-slate-900 dark:text-white">Ready to Take Action?</h2>
              <p className="text-[11px] text-text-secondary max-w-md">Put your health first. Book a preventive health appointment with our expert specialists today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
               <Link href="/appointment/" className="accessible-control px-5 py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-hover transition-colors shadow">
                Book Appointment
              </Link>
              <Link href="/health-packages/" className="accessible-control px-5 py-3 border border-slate-200 dark:border-slate-800 text-xs font-bold text-text-secondary rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors">
                View Health Packages
              </Link>
            </div>
          </div>
        </div>

      </article>
    </>
  );
}
