'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StatsCounts {
  patients: number;
  appointments: number;
  messages: number;
  subscribers: number;
  doctors: number;
}

interface AppointmentItem {
  id: string;
  appointmentId: string;
  patientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  status: string;
  doctor: {
    name: string;
  };
  department: {
    name: string;
  };
}

interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface SubscriberItem {
  id: string;
  email: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<StatsCounts>({ patients: 0, appointments: 0, messages: 0, subscribers: 0, doctors: 0 });
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setCounts(data.counts);
        setAppointments(data.appointments);
        setMessages(data.messages);
        setSubscribers(data.subscribers);
      } else {
        router.replace('/patient-portal');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setActionLoading(id);
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        await fetchStats();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update appointment status.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/patient-portal');
    } catch (err) {
      console.error(err);
    }
  };

  const filteredAppointments = appointments.filter((app) => {
    if (filterStatus === 'All') return true;
    return app.status === filterStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Loading Medocyn Admin Telemetry...</span>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 text-left">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Panel */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-black text-slate-900 leading-tight">Admin Operations Command</h1>
            <p className="text-xxs text-slate-400 mt-1">Enterprise clinical dashboards, appointment scheduling triage, and subscriber lists.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/database-inspector"
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-50 text-xxs font-bold text-slate-600 rounded-xl transition-all"
            >
              Database Inspector
            </Link>
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-full uppercase tracking-wider">
              System Admin
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-slate-200 text-xxs font-bold text-danger bg-transparent hover:bg-danger/5 rounded-xl transition-all"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Counter cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Total Patients', value: counts.patients, color: 'text-primary bg-primary/5 border-primary/10' },
            { title: 'Scheduled Bookings', value: counts.appointments, color: 'text-secondary bg-secondary/5 border-secondary/10' },
            { title: 'Contact inquiries', value: counts.messages, color: 'text-amber-600 bg-amber-50 border-amber-100' },
            { title: 'Newsletter Subscribers', value: counts.subscribers, color: 'text-success bg-success/5 border-success/10' },
          ].map((card, idx) => (
            <div key={idx} className={`p-6 rounded-2xl border bg-white shadow-sm flex flex-col justify-between gap-2`}>
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">{card.title}</span>
              <span className={`text-3xl font-black ${card.color.split(' ')[0]}`}>{card.value}</span>
            </div>
          ))}
        </div>

        {/* Dynamic section grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* APPOINTMENTS MANAGER PANEL */}
          <section className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b pb-4">
              <h2 className="text-sm font-bold text-slate-900">Clinical Bookings Manager</h2>
              
              {/* Filter tabs */}
              <div className="flex bg-slate-100 p-1 rounded-xl gap-1">
                {['All', 'Upcoming', 'Completed', 'Cancelled'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`px-3 py-1.5 text-[9px] font-bold rounded-lg transition-colors ${
                      filterStatus === status ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {filteredAppointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xxs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-2.5 px-2">Ref</th>
                      <th className="py-2.5 px-2">Patient</th>
                      <th className="py-2.5 px-2">Doctor</th>
                      <th className="py-2.5 px-2">Date/Time</th>
                      <th className="py-2.5 px-2">Status</th>
                      <th className="py-2.5 px-2 text-right">Operational Triage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredAppointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-2 font-mono font-bold text-primary">{app.appointmentId}</td>
                        <td className="py-3 px-2">
                          <span className="block text-slate-900 font-bold">{app.patientName}</span>
                          <span className="block text-[9px] text-slate-400 font-normal">{app.phone}</span>
                        </td>
                        <td className="py-3 px-2">
                          <span className="block text-slate-900">{app.doctor.name}</span>
                          <span className="block text-[9px] text-slate-400 font-normal">{app.department.name}</span>
                        </td>
                        <td className="py-3 px-2 text-slate-600">{app.date}<br/>{app.timeSlot}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            app.status === 'Upcoming' ? 'bg-primary/10 text-primary' :
                            app.status === 'Completed' ? 'bg-success/10 text-success' :
                            'bg-danger/10 text-danger'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">
                          {actionLoading === app.id ? (
                            <span className="text-[9px] text-slate-400">Processing...</span>
                          ) : (
                            <div className="inline-flex gap-2">
                              {app.status === 'Upcoming' && (
                                <>
                                  <button
                                    onClick={() => handleUpdateStatus(app.id, 'Completed')}
                                    className="px-2 py-1 bg-success/10 text-success text-[9px] font-bold rounded hover:bg-success/20 transition-colors"
                                  >
                                    Complete
                                  </button>
                                  <button
                                    onClick={() => handleUpdateStatus(app.id, 'Cancelled')}
                                    className="px-2 py-1 bg-danger/10 text-danger text-[9px] font-bold rounded hover:bg-danger/20 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                              {app.status !== 'Upcoming' && (
                                <span className="text-slate-300 text-[9px] font-medium">—</span>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-lg">
                No appointments matched the status filter.
              </div>
            )}
          </section>

          <div className="space-y-8">
            
            {/* CONTACT MESSAGES INBOX */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b pb-3 flex justify-between items-center">
                <span>Inquiries Inbox</span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[8px] font-bold rounded">Recent 20</span>
              </h2>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {messages.length > 0 ? (
                  messages.map((msg) => (
                    <div key={msg.id} className="p-4 bg-slate-50 border border-slate-150 rounded-xl space-y-1.5 text-xxs">
                      <div className="flex justify-between items-start">
                        <span className="font-bold text-slate-800">{msg.name}</span>
                        <span className="text-[9px] text-slate-400 font-normal">{new Date(msg.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="block font-mono text-[9px] text-slate-450">{msg.email}</span>
                      <h4 className="font-bold text-slate-900 text-xxs">Subject: {msg.subject}</h4>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-normal bg-white p-2 border border-slate-100 rounded italic">
                        &quot;{msg.message}&quot;
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[10px] text-slate-400">No contact submissions logged.</div>
                )}
              </div>
            </section>

            {/* NEWSLETTER SUBSCRIBERS LIST */}
            <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b pb-3 flex justify-between items-center">
                <span>Newsletter Audience</span>
                <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[8px] font-bold rounded">Recent 20</span>
              </h2>

              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {subscribers.length > 0 ? (
                  subscribers.map((sub) => (
                    <div key={sub.id} className="flex justify-between items-center p-3 bg-slate-50 border border-slate-100 rounded-xl text-xxs">
                      <span className="font-bold text-slate-800 font-mono">{sub.email}</span>
                      <span className="text-[9px] text-slate-400">{new Date(sub.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-[10px] text-slate-450">No newsletter subscribers yet.</div>
                )}
              </div>
            </section>

          </div>

        </div>

      </div>
    </article>
  );
}
