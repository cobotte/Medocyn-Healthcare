'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Logo } from '../common/Logo';
import { NAV_LINKS, DEPARTMENTS } from '@/constants';
import { CalendarIcon } from '../common/Icons';

export const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<'services' | 'doctors' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [session, setSession] = useState<{
    authenticated: boolean;
    user?: {
      name: string;
      email: string;
      role: 'patient' | 'admin';
    };
  }>({ authenticated: false });

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setSession({ authenticated: false });
      router.push('/');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY <= 20) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scroll down
        setVisible(false);
      } else {
        // Scroll up
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile drawer and submenus on route change
  useEffect(() => {
    setIsOpen(false);
    setActiveSubMenu(null);
    setSearchOpen(false);
  }, [pathname]);

  // Focus search input when modal opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Direct user to doctors search or custom filter query
      router.push(`/doctors?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const isHeroOverlay = pathname === '/';
  const isTransparent = !isScrolled && isHeroOverlay;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isTransparent
            ? 'bg-transparent border-transparent'
            : 'bg-white border-b border-slate-250 shadow-sm'
        }`}
        suppressHydrationWarning
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Logo container */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" aria-label="Medocyn Healthcare Home">
                <Logo 
                  variant="horizontal" 
                  themeVariant={isTransparent ? 'dark' : undefined}
                  className="h-10 sm:h-12 w-auto transition-transform duration-300 hover:scale-102" 
                />
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:block">
              <nav className="flex space-x-1 xl:space-x-3 items-center" aria-label="Primary Navigation">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  
                  // Mega menu trigger for Services
                  if (link.label === 'Services') {
                    return (
                      <div 
                        key={link.href}
                        className="relative group"
                        onMouseEnter={() => setActiveSubMenu('services')}
                        onMouseLeave={() => setActiveSubMenu(null)}
                      >
                        <button
                          type="button"
                          className={`accessible-control text-xs xl:text-sm py-2 px-2 xl:px-3 transition-all flex items-center gap-1 active-underline rounded-lg ${
                            isTransparent
                              ? 'hover:bg-white/10 text-white hover:text-sky-200 font-bold'
                              : 'hover:bg-slate-100/50 text-text-secondary hover:text-primary font-semibold'
                          } ${
                            isActive || activeSubMenu === 'services'
                              ? isTransparent ? 'text-white font-extrabold' : 'text-primary font-bold'
                              : ''
                          }`}
                          style={isTransparent ? { textShadow: '0 1px 3px rgba(0,0,0,0.5)' } : undefined}
                        >
                          {link.label}
                          <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Mega Menu Drawer */}
                        <div className="absolute left-1/2 -translate-x-1/2 top-full w-[600px] bg-white border border-slate-250 shadow-2xl rounded-2xl p-6 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 grid grid-cols-2 gap-4 z-50 glass-panel">
                          <div className="col-span-2 pb-2 border-b border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-extrabold text-primary uppercase tracking-wider">Clinical Departments & Divisions</span>
                            <Link href="/departments/" className="text-xxs font-bold text-slate-500 hover:text-primary">View All &rarr;</Link>
                          </div>
                          {DEPARTMENTS.slice(0, 6).map((dept) => (
                            <Link 
                              key={dept.id} 
                              href={`/departments/#${dept.slug}`}
                              className="p-3 rounded-xl hover:bg-primary/5 transition-all flex flex-col group/item border border-transparent hover:border-primary/10"
                            >
                              <span className="text-xs font-bold text-slate-800 group-hover/item:text-primary transition-colors">{dept.name}</span>
                              <span className="text-[10px] text-text-secondary mt-1 line-clamp-1">{dept.description}</span>
                            </Link>
                          ))}
                          <div className="col-span-2 p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-[11px] font-bold text-slate-900">Looking for specialized health checkups?</span>
                              <span className="text-[9px] text-text-secondary">Comprehensive custom screenings for all ages.</span>
                            </div>
                            <Link href="/health-packages/" className="px-3 py-1.5 bg-primary hover:opacity-95 text-white text-xxs font-extrabold rounded-lg shadow-sm">
                              Health Packages
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // Dropdown trigger for Find a Doctor
                  if (link.label === 'Find a Doctor') {
                    return (
                      <div 
                        key={link.href}
                        className="relative group"
                        onMouseEnter={() => setActiveSubMenu('doctors')}
                        onMouseLeave={() => setActiveSubMenu(null)}
                      >
                        <button
                          type="button"
                          className={`accessible-control text-xs xl:text-sm py-2 px-2 xl:px-3 transition-all flex items-center gap-1 active-underline rounded-lg ${
                            isTransparent
                              ? 'hover:bg-white/10 text-white hover:text-sky-200 font-bold'
                              : 'hover:bg-slate-100/50 text-text-secondary hover:text-primary font-semibold'
                          } ${
                            isActive || activeSubMenu === 'doctors'
                              ? isTransparent ? 'text-white font-extrabold' : 'text-primary font-bold'
                              : ''
                          }`}
                          style={isTransparent ? { textShadow: '0 1px 3px rgba(0,0,0,0.5)' } : undefined}
                        >
                          {link.label}
                          <svg className="w-3 h-3 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute left-0 top-full w-56 bg-white border border-slate-200 shadow-2xl rounded-xl p-3 transition-all duration-300 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50 glass-panel">
                          <Link href="/doctors/" className="block p-2 rounded-lg hover:bg-primary/5 text-xs font-bold text-slate-800 hover:text-primary">
                            Top Medical Specialists
                          </Link>
                          <Link href="/appointment/" className="block p-2 rounded-lg hover:bg-primary/5 text-xs font-bold text-slate-800 hover:text-primary border-t border-slate-100 mt-1">
                            Book Appointment Slot
                          </Link>
                          <Link href="/patient-portal/" className="block p-2 rounded-lg hover:bg-primary/5 text-xs font-bold text-slate-800 hover:text-primary border-t border-slate-100 mt-1">
                            Patient Portal Access
                          </Link>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-xs xl:text-sm py-2 px-2 xl:px-3 transition-all active-underline rounded-lg ${
                        isTransparent
                          ? 'hover:bg-white/10 text-white hover:text-sky-200 font-bold'
                          : 'hover:bg-slate-100/50 text-text-secondary hover:text-primary font-semibold'
                      } ${
                        isActive
                          ? isTransparent ? 'text-white font-extrabold active' : 'text-primary font-bold active'
                          : ''
                      }`}
                      style={isTransparent ? { textShadow: '0 1px 3px rgba(0,0,0,0.5)' } : undefined}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Call-to-Actions (Theme Toggle, Search, Appointment / Emergency) */}
            <div className="hidden lg:block">
              <div className="flex items-center space-x-3">
                {/* Search Button */}
                <button
                  onClick={() => setSearchOpen(true)}
                  type="button"
                  className={`accessible-control p-2.5 rounded-xl border transition-all shadow-xs ${
                    isTransparent
                      ? 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                  }`}
                  aria-label="Open search drawer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                {!session.authenticated ? (
                  <Link
                    href="/patient-portal/?tab=login"
                    className={`accessible-control text-xs font-bold px-4 py-2 rounded-xl border transition-all ${
                      isTransparent
                        ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                        : 'bg-slate-100/80 hover:bg-slate-200 border-slate-200 text-slate-700'
                    }`}
                    style={isTransparent ? { textShadow: '0 1px 2px rgba(0,0,0,0.5)' } : undefined}
                  >
                    Login / Signup
                  </Link>
                ) : (
                  <>
                    <Link
                      href={session.user?.role === 'admin' ? '/admin/' : '/patient-portal/'}
                      className={`accessible-control text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${
                        isTransparent
                          ? 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
                          : 'bg-slate-100/80 hover:bg-slate-200 border-slate-200 text-slate-700'
                      }`}
                      style={isTransparent ? { textShadow: '0 1px 2px rgba(0,0,0,0.5)' } : undefined}
                    >
                      {session.user?.role === 'admin' ? 'Admin Board' : 'Portal'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      type="button"
                      className="accessible-control text-xs font-bold text-white bg-danger hover:bg-danger/90 px-3.5 py-2 rounded-xl transition-all shadow-xs"
                    >
                      Sign Out
                    </button>
                  </>
                )}
                <Link
                  href="/appointment/"
                  className="accessible-control text-xs font-bold text-white bg-primary hover:bg-primary-hover active:bg-primary-active px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-primary/10"
                >
                  <CalendarIcon size={15} />
                  Book Appointment
                </Link>
              </div>
            </div>

            {/* Mobile actions area */}
            <div className="lg:hidden flex items-center space-x-2">
              <button
                onClick={() => setSearchOpen(true)}
                type="button"
                className={`accessible-control p-2 transition-colors ${
                  isTransparent ? 'text-white hover:text-sky-300' : 'text-text-secondary hover:text-primary'
                }`}
                aria-label="Open search modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`accessible-control inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                  isTransparent
                    ? 'text-white hover:text-sky-300 hover:bg-white/10'
                    : 'text-text-secondary hover:text-primary hover:bg-slate-100'
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-screen opacity-100 border-t border-slate-200/50' : 'max-h-0 opacity-0 overflow-hidden pointer-events-none'
          }`}
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-6 space-y-2 bg-white shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-3 py-2.5 rounded-xl text-base font-semibold accessible-control transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-text-secondary hover:bg-slate-50 hover:text-primary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Mobile Services list */}
            <div className="pt-2 border-t border-slate-100">
              <span className="block px-3 py-1.5 text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Our Main Divisions</span>
              {DEPARTMENTS.slice(0, 3).map((dept) => (
                <Link
                  key={dept.id}
                  href={`/departments/#${dept.slug}`}
                  className="block px-4 py-2 text-sm font-semibold text-text-secondary hover:text-primary"
                >
                  {dept.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              {!session.authenticated ? (
                <Link
                  href="/patient-portal/?tab=login"
                  className="accessible-control w-full text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  Login / Signup
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2 w-full">
                  <Link
                    href={session.user?.role === 'admin' ? '/admin/' : '/patient-portal/'}
                    className="accessible-control text-center font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 py-3 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2"
                  >
                    {session.user?.role === 'admin' ? 'Admin Board' : 'Portal'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="accessible-control text-center font-bold text-white bg-danger hover:bg-danger/90 py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    Sign Out
                  </button>
                </div>
              )}
              <Link
                href="/appointment/"
                className="accessible-control w-full text-center font-bold text-white bg-primary hover:bg-primary-hover active:bg-primary-active py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <CalendarIcon size={18} />
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Interactive Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 glass-panel animate-scale-in">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              aria-label="Close search overlay"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-sm font-extrabold text-slate-800 tracking-tight mb-4 uppercase">Search Specialist Doctors</h3>
            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by doctor name or specialty (e.g. Jenkins, Cardiology)..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-slate-900"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/10"
              >
                Search
              </button>
            </form>
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider mb-2">Popular Searches</span>
              <div className="flex flex-wrap gap-2">
                {['Jenkins', 'Vance', 'Carter', 'Anderson', 'Bennett', 'Martinez'].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      setSearchQuery(term);
                      if (searchInputRef.current) searchInputRef.current.focus();
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xxs rounded-lg transition-colors font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
