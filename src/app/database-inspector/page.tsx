'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

interface SessionData {
  authenticated: boolean;
  user?: {
    name: string;
    email: string;
    role: 'patient' | 'admin';
  };
}


const TABLES = [
  { id: 'patient', name: 'Patients' },
  { id: 'doctor', name: 'Doctors' },
  { id: 'department', name: 'Departments' },
  { id: 'appointment', name: 'Appointments' },
  { id: 'healthpackage', name: 'Health Packages' },
  { id: 'contactmessage', name: 'Contact Messages' },
  { id: 'blog', name: 'Blogs & Articles' },
  { id: 'newslettersubscriber', name: 'Newsletter Subscribers' },
  { id: 'notification', name: 'Notifications' },
  { id: 'admin', name: 'Admins' },
];

export default function DatabaseInspectorPage() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [selectedTable, setSelectedTable] = useState('patient');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/auth/session');
      if (res.ok) {
        const d = await res.json();
        setSession(d);
        if (!d.authenticated) {
          window.location.replace('/patient-portal?tab=login');
        }
      } else {
        window.location.replace('/patient-portal?tab=login');
      }
    } catch {
      window.location.replace('/patient-portal?tab=login');
    } finally {
      setLoadingSession(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchTableData = useCallback(async (tableId: string) => {
    setLoadingData(true);
    setError('');
    setExpandedRow(null);
    try {
      const res = await fetch(`/api/admin/database?table=${tableId}`);
      const result = await res.json();
      if (res.ok && result.success) {
        setData(result.data);
      } else {
        setError(result.error || 'Failed to fetch data');
      }
    } catch {
      setError('Connection failure while reading prisma telemetry.');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (session?.authenticated) {
      fetchTableData(selectedTable);
    }
  }, [selectedTable, session, fetchTableData]);

  // Filters rows dynamically based on user search query matching any text field
  const filteredData = data.filter((row) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return Object.entries(row).some(([, val]) => {
      if (val === null || val === undefined) return false;
      if (typeof val === 'object') {
        return JSON.stringify(val).toLowerCase().includes(query);
      }
      return String(val).toLowerCase().includes(query);
    });
  });

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Loading Medocyn Admin telemetry...</span>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-55 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 leading-tight">Prisma Database Inspector</h1>
              <span className="px-2.5 py-0.5 bg-sky-100 text-sky-700 text-[9px] font-bold rounded-full uppercase tracking-wider">
                SQLite Realtime
              </span>
            </div>
            <p className="text-xxs text-slate-400 mt-1">
              Read-only live stream of all Prisma database records in <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-600 font-mono text-[10px]">dev.db</code>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href={session?.user?.role === 'admin' ? '/admin' : '/patient-portal'} 
              className="px-4 py-2 border border-slate-200 text-xxs font-bold text-slate-600 bg-transparent hover:bg-slate-50 rounded-xl transition-all"
            >
              Back to Dashboard
            </Link>
          </div>
        </header>

        {/* Local CLI Alert Info */}
        <section className="bg-primary/5 border border-primary/15 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xs font-bold text-primary flex items-center gap-1.5">
              💡 Interactive CLI Studio Available
            </h2>
            <p className="text-xxs text-slate-500 leading-relaxed max-w-2xl">
              You can run the official Prisma Studio tool on your local machine to edit, add, or delete records interactively in a graphical spreadsheet layout.
            </p>
          </div>
          <div className="flex-shrink-0">
            <code className="bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-lg text-slate-700 font-mono text-xxs shadow-xs select-all">
              npx prisma studio
            </code>
          </div>
        </section>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar table selection list */}
          <aside className="lg:col-span-1 space-y-2">
            <h3 className="text-xxs font-extrabold text-slate-400 uppercase tracking-wider px-2">
              Prisma Models
            </h3>
            <nav className="flex flex-col gap-1.5" aria-label="Database tables">
              {TABLES.map((tbl) => {
                const isActive = tbl.id === selectedTable;
                return (
                  <button
                    key={tbl.id}
                    onClick={() => setSelectedTable(tbl.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition-all flex justify-between items-center ${
                      isActive
                        ? 'bg-primary text-white shadow-sm shadow-primary/10'
                        : 'bg-white hover:bg-slate-100 border border-slate-200/80 text-slate-700'
                    }`}
                  >
                    <span>{tbl.name}</span>
                    <span 
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {tbl.id === selectedTable ? filteredData.length : '...'}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Table Inspector Display */}
          <main className="lg:col-span-3 space-y-6">
            
            {/* Filter and controls bar */}
            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs justify-between items-center">
              <div className="relative w-full sm:max-w-md">
                <input
                  type="text"
                  placeholder={`Search in ${TABLES.find(t => t.id === selectedTable)?.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder-slate-400 bg-slate-50/50"
                />
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              <button
                onClick={() => fetchTableData(selectedTable)}
                className="w-full sm:w-auto px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xxs font-bold text-slate-600 rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 7.89H18.2" />
                </svg>
                Sync Live
              </button>
            </div>

            {/* Error messaging */}
            {error && (
              <div className="p-4 bg-danger/5 border border-danger/20 rounded-xl text-danger font-bold text-xs">
                ⚠️ {error}
              </div>
            )}

            {/* Data Grid / Cards view */}
            {loadingData ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center gap-4">
                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-primary animate-spin" />
                <span className="text-xxs font-semibold text-slate-400 uppercase tracking-wider">Syncing database records...</span>
              </div>
            ) : filteredData.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-16 flex flex-col items-center justify-center gap-2 text-center">
                <span className="text-xl">📭</span>
                <h4 className="text-xs font-bold text-slate-800">No Records Found</h4>
                <p className="text-xxs text-slate-400 max-w-sm">
                  We could not find any active table records matching your filter. Try registering or creating data first.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50/70 border-b border-slate-200">
                        <th className="px-6 py-4 text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Record Summary</th>
                        <th className="px-6 py-4 text-xxs font-extrabold text-slate-400 uppercase tracking-wider hidden md:table-cell">Metadata details</th>
                        <th className="px-6 py-4 text-xxs font-extrabold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredData.map((row, index) => {
                        const rowId = row.id || row.email || String(index);
                        const isExpanded = expandedRow === rowId;
                        
                        // Pick user friendly columns depending on table
                        const title = row.name || row.title || row.patientName || row.email || `Record #${index + 1}`;
                        const subtitle = row.email || row.subject || row.appointmentId || row.price || row.category || row.slug || '';
                        const dateText = row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '';

                        return (
                          <React.Fragment key={rowId}>
                            <tr className="hover:bg-slate-50/40 transition-colors">
                              <td className="px-6 py-4">
                                <div className="space-y-1">
                                  <span className="block text-xs font-bold text-slate-900">{title}</span>
                                  {subtitle && <span className="block text-[10px] text-slate-400 font-mono">{subtitle}</span>}
                                </div>
                              </td>
                              <td className="px-6 py-4 hidden md:table-cell">
                                <div className="text-xxs text-slate-500 space-y-0.5">
                                  {row.price !== undefined && <div>Price: <span className="font-semibold text-slate-700">${row.price}</span></div>}
                                  {row.role !== undefined && <div>Role: <span className="font-semibold text-slate-700">{row.role}</span></div>}
                                  {row.status !== undefined && (
                                    <div>
                                      Status:{' '}
                                      <span 
                                        className={`font-bold px-1.5 py-0.5 rounded text-[9px] ${
                                          row.status === 'Completed' ? 'bg-success/10 text-success' :
                                          row.status === 'Cancelled' ? 'bg-danger/10 text-danger' :
                                          'bg-sky-100 text-sky-700'
                                        }`}
                                      >
                                        {row.status}
                                      </span>
                                    </div>
                                  )}
                                  {dateText && <div>Created: {dateText}</div>}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => setExpandedRow(isExpanded ? null : rowId)}
                                  className={`px-3 py-1.5 rounded-lg text-xxs font-bold transition-all ${
                                    isExpanded
                                      ? 'bg-slate-200 text-slate-700'
                                      : 'bg-primary/5 hover:bg-primary/10 text-primary'
                                  }`}
                                >
                                  {isExpanded ? 'Collapse JSON' : 'Inspect JSON'}
                                </button>
                              </td>
                            </tr>
                            {isExpanded && (
                              <tr className="bg-slate-50/50">
                                <td colSpan={3} className="px-6 py-4 border-t border-slate-100">
                                  <div className="relative">
                                    <pre className="bg-slate-900 text-slate-250 p-4 rounded-xl font-mono text-[11px] overflow-x-auto shadow-inner leading-relaxed select-all max-h-96">
                                      {JSON.stringify(row, null, 2)}
                                    </pre>
                                    <div className="absolute top-2 right-2">
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(JSON.stringify(row, null, 2));
                                          alert('JSON schema copied to clipboard!');
                                        }}
                                        className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[10px] font-bold backdrop-blur-sm transition-all"
                                      >
                                        Copy JSON
                                      </button>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>
    </article>
  );
}
