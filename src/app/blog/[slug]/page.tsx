import React from 'react';
import Link from 'next/link';
import Image from '@/components/common/OptimizedImage';
import { notFound } from 'next/navigation';
import { MOCK_BLOG_ARTICLES } from '@/constants';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch article from mock data
  const article = MOCK_BLOG_ARTICLES.find((a) => a.id === slug);

  if (!article) {
    notFound();
  }

  // Fetch related articles (same category, excluding current one)
  const relatedArticles = MOCK_BLOG_ARTICLES.filter(
    (a) => a.category === article.category && a.id !== article.id
  ).slice(0, 3);

  return (
    <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8 text-left mt-24">
      <Breadcrumbs />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Main Article Content (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <header className="space-y-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black rounded-full uppercase tracking-wider">
              {article.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center gap-4 text-xxs text-slate-400 font-medium">
              <span>Published: {article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <Image
              src={article.image || '/images/blog/blog_default.png'}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          </div>

          {/* Summary / Pullquote */}
          <p className="text-xs sm:text-sm font-semibold text-slate-650 leading-relaxed border-l-4 border-primary pl-4 py-1 italic bg-slate-50 rounded-r-xl">
            {article.summary}
          </p>

          {/* Full content with beautiful typography spacing */}
          <div className="text-xs sm:text-sm text-slate-700 leading-loose space-y-6">
            {article.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-250">
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 text-xxs font-black text-primary hover:underline"
            >
              ← Back to all articles
            </Link>
          </div>
        </div>

        {/* Sidebar (4 cols) */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28" aria-label="Related articles sidebar">
          
          {/* Related Articles list */}
          {relatedArticles.length > 0 && (
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b pb-2">
                Related Articles
              </h3>
              
              <div className="space-y-4 divide-y divide-slate-100">
                {relatedArticles.map((art, idx) => (
                  <div key={art.id} className={`space-y-1.5 ${idx > 0 ? 'pt-4' : ''}`}>
                    <span className="text-[8px] font-black text-primary uppercase block">
                      {art.category}
                    </span>
                    <Link
                      href={`/blog/${art.id}/`}
                      className="text-xxs font-bold text-slate-900 hover:text-primary leading-snug block transition-colors"
                    >
                      {art.title}
                    </Link>
                    <span className="text-[8px] text-slate-400 font-medium block">
                      {art.readTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Support Widget */}
          <div className="bg-gradient-to-tr from-primary to-primary-hover p-6 rounded-[2rem] text-white shadow-md space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider">Clinical Consultations</h3>
            <p className="text-[10px] text-white/80 leading-relaxed">
              Have questions about symptoms or diagnoses discussed in our articles? Set up a private session with a practitioner.
            </p>
            <Link
              href="/appointment/"
              className="block text-center w-full py-2 bg-white hover:bg-slate-50 text-primary text-xxs font-bold rounded-lg transition-colors shadow"
            >
              Schedule Checkup
            </Link>
          </div>
        </aside>

      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return MOCK_BLOG_ARTICLES.map((article) => ({
    slug: article.id,
  }));
}
