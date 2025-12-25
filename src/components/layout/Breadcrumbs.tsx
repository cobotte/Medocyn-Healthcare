'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();
  
  if (pathname === '/') return null;

  const pathSegments = pathname.split('/').filter((x) => x);

  const getBreadcrumbTitle = (segment: string) => {
    // Replace hyphens with spaces and capitalize
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-slate-100/50 dark:bg-slate-900/30 rounded-md my-4 mt-20 lg:mt-24 border border-slate-100 dark:border-slate-800/50"
    >
      <ol className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400">
        <li>
          <Link href="/" className="hover:text-primary dark:hover:text-accent transition-colors">
            Home
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}/`;
          const isLast = index === pathSegments.length - 1;
          const title = getBreadcrumbTitle(segment);

          return (
            <React.Fragment key={href}>
              <li className="text-slate-400" aria-hidden="true">/</li>
              <li>
                {isLast ? (
                  <span className="text-slate-900 dark:text-slate-100 font-semibold" aria-current="page">
                    {title}
                  </span>
                ) : (
                  <Link href={href} className="hover:text-primary dark:hover:text-accent transition-colors">
                    {title}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
