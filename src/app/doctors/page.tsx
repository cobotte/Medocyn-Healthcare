'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import Link from 'next/link';
import { MOCK_DOCTORS } from '@/constants';
import { useSearchParams } from 'next/navigation';

interface Doctor {
  id: string;
  name: string;
  specialty?: string;
  qualification?: string;
  title?: string;
  experience?: string;
  experienceYears?: number;
  photo?: string;
  image?: string;
  rating?: number;
  reviewCount?: number;
  bio?: string;
  biography?: string;
  education?: string[];
  languages?: string | string[];
  availability?: { days: string[]; slots?: string[] } | string;
  consultationFee?: number;
  department?: { name: string };
  departmentId?: string;
}

function DoctorsSearchAndList() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [dbDoctors, setDbDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState('Experience (High to Low)');

  // Fetch doctors on mount
  useEffect(() => {
    fetch('/api/doctors')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDbDoctors(data);
        }
      })
      .catch((err) => console.error('Error fetching dynamic doctors:', err));
  }, []);

  const doctorsList = (dbDoctors.length > 0 ? dbDoctors : MOCK_DOCTORS) as Doctor[];

  // Extract unique specialties for the filter list
  const specialties = useMemo(() => {
    const specs = new Set<string>();
    doctorsList.forEach(doc => {
      if (doc.specialty) specs.add(doc.specialty);
    });
    return ['All Specialties', ...Array.from(specs)];
  }, [doctorsList]);

  // Filter and Sort Doctors
  const filteredDoctors = useMemo(() => {
    let result = [...doctorsList];

    // Search query filter (matches name, bio, or specialty)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        doc =>
          doc.name.toLowerCase().includes(query) ||
          (doc.specialty && doc.specialty.toLowerCase().includes(query)) ||
          ((doc.bio || doc.biography || '').toLowerCase().includes(query))
      );
    }

    // Specialty filter
    if (selectedSpecialty !== 'All Specialties') {
      result = result.filter(doc => doc.specialty === selectedSpecialty);
    }

    // Sorting logic
    if (sortBy === 'Experience (High to Low)') {
      result.sort((a, b) => {
        const expA = typeof a.experienceYears === 'number' ? a.experienceYears : parseInt(a.experience || '10');
        const expB = typeof b.experienceYears === 'number' ? b.experienceYears : parseInt(b.experience || '10');
        return expB - expA;
      });
    } else if (sortBy === 'Rating (Highest first)') {
      result.sort((a, b) => {
        const ratA = a.rating || 4.9;
        const ratB = b.rating || 4.9;
        return ratB - ratA;
      });
    }

    return result;
  }, [searchQuery, selectedSpecialty, sortBy, doctorsList]);

  return (
    <article className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-12 text-left bg-white text-slate-800">
      
      <header className="space-y-4 max-w-3xl">
        <span className="text-xs font-black text-primary uppercase tracking-widest block">Medical Staff</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">Find a Medical Specialist</h1>
        <p className="text-sm text-text-secondary leading-relaxed">
          Consult with our board-certified medical professionals. Use the filter panel below to search by clinical specialty, doctor availability, or language.
        </p>
      </header>

      {/* Searching, Filtering & Sorting Controls Block */}
      <section id="search-filter-panel" className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-xl grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label htmlFor="search-input" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Search Doctor</label>
          <input
            type="text"
            id="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-primary text-slate-900 shadow-xs"
            placeholder="Search by name or keyword..."
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="specialty-filter" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Clinical Specialty</label>
          <select
            id="specialty-filter"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-primary text-slate-900 shadow-xs"
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="sort-filter" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Sort By</label>
          <select
            id="sort-filter"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-primary text-slate-900 shadow-xs"
          >
            <option>Experience (High to Low)</option>
            <option>Rating (Highest first)</option>
          </select>
        </div>
      </section>

      {/* Grid of Doctor Cards */}
      <section id="doctors-list" className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-200/50 shadow-xl flex flex-col justify-between hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-black bg-primary/10 text-primary uppercase tracking-wider mb-2">
                      {doc.specialty || (doc.department?.name || 'Practitioner')}
                    </span>
                    <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-primary transition-colors">{doc.name}</h2>
                    <p className="text-xs text-slate-400 font-bold tracking-wide mt-0.5">{doc.qualification || doc.title}</p>
                  </div>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed border-t border-slate-100 pt-4">
                  {doc.biography || doc.bio}
                </p>

                {/* Profile specifications */}
                <div className="text-xs space-y-2 text-text-secondary border-t border-b border-slate-100 py-4">
                  <p><strong>Qualifications:</strong> {Array.isArray(doc.education) ? doc.education.join(', ') : (doc.qualification || 'MD')}</p>
                  <p><strong>Experience:</strong> {typeof doc.experienceYears === 'number' ? `${doc.experienceYears} Years` : (doc.experience || '10+ Years')}</p>
                  <p><strong>Languages:</strong> {Array.isArray(doc.languages) ? doc.languages.join(', ') : (doc.languages || 'English')}</p>
                  <p><strong>Availability:</strong> {doc.availability && typeof doc.availability === 'object' ? doc.availability.days.join(', ') : 'Monday, Wednesday, Friday'}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 mt-4">
                <span className="text-xs font-bold text-slate-600">⭐ {doc.rating || 4.9} ({doc.reviewCount || 120} Reviews)</span>
                <Link
                  href={`/appointment?doctor=${doc.id}`}
                  className="accessible-control px-5 py-2.5 bg-gradient-to-r from-primary to-primary-hover hover:from-primary-hover hover:to-primary-active text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/10"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12 space-y-4">
            <span className="text-4xl">🔍</span>
            <p className="text-sm font-bold text-slate-500">No medical specialists match your search criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSpecialty('All Specialties');
              }}
              className="text-xs text-primary font-bold hover:underline"
            >
              Clear filters and view all doctors
            </button>
          </div>
        )}
      </section>

    </article>
  );
}

export default function DoctorsPage() {
  return (
    <Suspense fallback={
      <div className="w-full py-24 px-4 text-center" aria-hidden="true">
        <div className="skeleton h-8 w-48 mx-auto rounded-lg mb-4" />
        <div className="skeleton h-4 w-full max-w-lg mx-auto rounded" />
      </div>
    }>
      <DoctorsSearchAndList />
    </Suspense>
  );
}
