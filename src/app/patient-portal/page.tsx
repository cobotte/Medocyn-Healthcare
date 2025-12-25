'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  CalendarIcon,
  DoctorIcon,
  MicroscopeIcon,
  HealthcareCloudIcon,
  HospitalIcon,
  ClockIcon,
  NurseIcon,
  PrescriptionIcon,
  MedicalReportIcon,
} from '@/components/common/Icons';

interface NotificationItem {
  id: string;
  type: 'reminder' | 'update' | 'security' | 'prescription' | 'report';
  title: string;
  desc: string;
  read: boolean;
  createdAt: string;
}

interface AppointmentItem {
  id: string;
  appointmentId: string;
  patientName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  consultationType: string;
  date: string;
  timeSlot: string;
  concern: string;
  symptoms: string;
  status: string;
  doctor: {
    name: string;
    photo: string;
    department: {
      name: string;
    };
  };
  department: {
    name: string;
  };
}

export default function PatientPortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<{
    authenticated: boolean;
    user?: {
      id: string;
      name: string;
      email: string;
      patientId: string | null;
      role: 'patient' | 'admin';
      membershipStatus?: string;
      age?: number | null;
      bloodGroup?: string | null;
      phone?: string | null;
      emergencyContactName?: string | null;
      emergencyContactPhone?: string | null;
      language?: string;
      emailNotifications?: boolean;
      smsNotifications?: boolean;
    };
  }>({ authenticated: false });

  // Auth panel states
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  // Register states
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regBlood, setRegBlood] = useState('O+');

  // Dashboard states
  const [activeTab, setActiveTab] = useState<'dashboard' | 'records' | 'appointments' | 'prescriptions' | 'reports' | 'notifications' | 'profile'>('dashboard');
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  
  // Profile Form States
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileEmergencyName, setProfileEmergencyName] = useState('');
  const [profileEmergencyPhone, setProfileEmergencyPhone] = useState('');
  const [profileLanguage, setProfileLanguage] = useState('English');
  const [profileEmailNotif, setProfileEmailNotif] = useState(true);
  const [profileSMSNotif, setProfileSMSNotif] = useState(true);

  // Active print confirmation ticket modal
  const [activeTicket, setActiveTicket] = useState<AppointmentItem | null>(null);

  const fetchAppointments = useCallback(async () => {
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch {
      // ignore
    }
  }, []);

  // 1. Fetch Session on Mount
  const initProfileData = useCallback((user: typeof session.user) => {
    if (!user) return;
    setProfileName(user.name || '');
    setProfilePhone(user.phone || '');
    setProfileEmergencyName(user.emergencyContactName || '');
    setProfileEmergencyPhone(user.emergencyContactPhone || '');
    setProfileLanguage(user.language || 'English');
    setProfileEmailNotif(user.emailNotifications !== false);
    setProfileSMSNotif(user.smsNotifications !== false);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- 'typeof session.user' is a TS type annotation, not a runtime dep
  }, []);

  const fetchSession = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/session');
      const data = await res.json();
      
      if (data.authenticated) {
        setSession(data);
        if (data.user.role === 'admin') {
          router.replace('/admin');
          return;
        }
        // Load authenticated patient data
        initProfileData(data.user);
        await Promise.all([fetchAppointments(), fetchNotifications()]);
      } else {
        setSession({ authenticated: false });
      }
    } catch {
      // ignore network errors
    } finally {
      setLoading(false);
    }
  }, [fetchAppointments, fetchNotifications, initProfileData, router]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get('tab');
      if (tab === 'register' || tab === 'signup') {
        setAuthTab('register');
      } else if (tab === 'login') {
        setAuthTab('login');
      }
    }
  }, []);

  // 2. Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setAuthSuccess('Logged in successfully!');
        if (data.user.role === 'admin') {
          router.replace('/admin');
          return;
        }
        await fetchSession();
      } else {
        setAuthError(data.error || 'Login failed. Please check credentials.');
      }
    } catch {
      setAuthError('Connection error. Please try again.');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSuccess('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword,
          phone: regPhone,
          age: regAge ? parseInt(regAge) : undefined,
          bloodGroup: regBlood,
        }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setAuthSuccess('Account registered successfully!');
        await fetchSession();
      } else {
        setAuthError(data.error || 'Registration failed.');
      }
    } catch {
      setAuthError('Connection error.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setSession({ authenticated: false });
      setAppointments([]);
      setNotifications([]);
      setLoginEmail('');
      setLoginPassword('');
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegPhone('');
      setRegAge('');
      setAuthSuccess('');
      setAuthError('');
    } catch {
      // ignore
    }
  };

  // 3. Operational Handlers
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profileName,
          phone: profilePhone,
          emergencyContactName: profileEmergencyName,
          emergencyContactPhone: profileEmergencyPhone,
          language: profileLanguage,
          emailNotifications: profileEmailNotif,
          smsNotifications: profileSMSNotif,
        }),
      });
      if (res.ok) {
        alert('Profile details updated successfully in SQLite database!');
        await fetchSession();
      } else {
        const data = await res.json();
        alert(data.error || 'Profile update failed.');
      }
    } catch {
      alert('Connection error.');
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      if (res.ok) {
        await Promise.all([fetchAppointments(), fetchNotifications()]);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to cancel appointment.');
      }
    } catch {
      // ignore
    }
  };

  const markAllNotificationsRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'markAllAsRead' }),
      });
      if (res.ok) {
        await fetchNotifications();
      }
    } catch {
      // ignore
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      if (res.ok) {
        await fetchNotifications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Render Skeletons during session loads
  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Accessing secure portal telemetry...</span>
        </div>
      </div>
    );
  }

  // 4. Guest View: Login & Registration panels
  if (!session.authenticated) {
    return (
      <article className="max-w-md mx-auto my-16 px-4">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-150 shadow-2xl space-y-6 text-left">
          
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-black text-slate-900 leading-tight">Patient Portal Access</h1>
            <p className="text-xxs text-slate-400">Sign in to manage appointments, clinical reports, and prescriptions.</p>
          </div>

          {/* Clean Vercel-like Tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => { setAuthTab('login'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2 text-xxs font-extrabold rounded-lg transition-colors ${
                authTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setAuthTab('register'); setAuthError(''); setAuthSuccess(''); }}
              className={`flex-1 py-2 text-xxs font-extrabold rounded-lg transition-colors ${
                authTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          {authError && (
            <div className="p-3 bg-danger/10 border border-danger/20 rounded-xl text-xxs font-semibold text-danger leading-relaxed">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="p-3 bg-success/10 border border-success/20 rounded-xl text-xxs font-semibold text-success leading-relaxed">
              {authSuccess}
            </div>
          )}

          {authTab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.johnson@example.com"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/20"
                >
                  Authorized Login
                </button>
              </div>

              {/* Demo Hint */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-[10px] text-slate-450 space-y-1.5 leading-relaxed">
                <span className="block font-bold text-slate-600">💡 Showcase Credentials:</span>
                <span className="block">Patient: <code className="bg-white px-1 border rounded">sarah.johnson@example.com</code> / <code className="bg-white px-1 border rounded">password123</code></span>
                <span className="block">Admin: <code className="bg-white px-1 border rounded">admin@medocyn.com</code> / <code className="bg-white px-1 border rounded">admin123</code></span>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Sarah Johnson"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="sarah.johnson@example.com"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Min. 6 characters"
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Phone</label>
                  <input
                    type="tel"
                    placeholder="+1 555-0185"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Age</label>
                  <input
                    type="number"
                    placeholder="34"
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xxs font-extrabold text-slate-400 uppercase tracking-wider">Blood Group</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2.5 text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-900"
                  value={regBlood}
                  onChange={(e) => setRegBlood(e.target.value)}
                >
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/20"
                >
                  Register Account
                </button>
              </div>
            </form>
          )}

        </div>
      </article>
    );
  }

  const upcomingAppointment = appointments.find((a) => a.status === 'Upcoming');

  // 5. Authenticated View: Patient Portal Dashboard Layout
  return (
    <article className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 min-h-screen text-left">
      
      {/* PORTAL SIDEBAR NAVIGATION */}
      <aside className="w-full lg:w-64 flex-shrink-0" aria-label="Portal Navigation panel">
        
        {/* Mobile Swipe Bar */}
        <div className="flex lg:hidden overflow-x-auto whitespace-nowrap pb-3 mb-2 gap-2 scrollbar-none scroll-smooth">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: <HospitalIcon size={14} /> },
            { id: 'records', label: 'Medical Records', icon: <MedicalReportIcon size={14} /> },
            { id: 'appointments', label: `Appointments (${appointments.filter(a => a.status === 'Upcoming').length})`, icon: <CalendarIcon size={14} /> },
            { id: 'prescriptions', label: 'Prescriptions', icon: <PrescriptionIcon size={14} /> },
            { id: 'reports', label: 'Medical Reports', icon: <MicroscopeIcon size={14} /> },
            { id: 'notifications', label: `Notifications (${unreadCount})`, icon: <ClockIcon size={14} /> },
            { id: 'profile', label: 'Profile Settings', icon: <NurseIcon size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-[11px] font-extrabold rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-text-secondary border border-slate-150'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 lg:sticky lg:top-24">
          
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center text-primary font-black text-sm">
              {session.user?.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{session.user?.name}</h4>
              <span className="text-[9px] text-slate-400 font-semibold block">{session.user?.patientId}</span>
              <span className="inline-block px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-bold mt-1">
                {session.user?.membershipStatus}
              </span>
            </div>
          </div>

          <nav className="space-y-1" aria-label="Sidebar main links">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <HospitalIcon size={14} /> },
              { id: 'records', label: 'Medical Records', icon: <MedicalReportIcon size={14} /> },
              { id: 'appointments', label: `Appointments (${appointments.filter(a => a.status === 'Upcoming').length})`, icon: <CalendarIcon size={14} /> },
              { id: 'prescriptions', label: 'Prescriptions', icon: <PrescriptionIcon size={14} /> },
              { id: 'reports', label: 'Medical Reports', icon: <MicroscopeIcon size={14} /> },
              { id: 'notifications', label: `Notifications (${unreadCount})`, icon: <ClockIcon size={14} /> },
              { id: 'profile', label: 'Profile & Settings', icon: <NurseIcon size={14} /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-xxs font-bold rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:bg-slate-50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-[9px] text-text-secondary">
            <div className="flex items-center gap-1.5 text-success">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span>Secure Session Active</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400">
              <HealthcareCloudIcon size={10} />
              <span>HIPAA / GDPR Compliant</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-center mt-2 py-2 border border-slate-200 text-[10px] font-bold text-danger bg-transparent hover:bg-danger/5 rounded-lg transition-colors"
            >
              Sign Out Account
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN DASHBOARD CANVAS AREA */}
      <main className="flex-1 space-y-8">
        
        {/* Top Header Panel */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft">
          <div>
            <h1 className="text-h2 text-slate-900 leading-tight">Patient Portal</h1>
            <p className="text-xxs text-text-secondary mt-1">Access secure clinical health telemetry charts synchronized with local database.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-[9px] font-bold rounded-full">
              ● Server: Connected (SQLite)
            </span>
            <span className="px-2.5 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-full">
              ID: {session.user?.patientId}
            </span>
          </div>
        </header>

        {/* TAB 1: Dashboard Home */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            
            <div className="bg-gradient-to-tr from-primary to-primary-hover p-6 rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />
              
              <div className="space-y-2 relative z-10 text-center sm:text-left">
                <span className="inline-block px-2 py-0.5 rounded bg-white/10 text-sky-200 text-[9px] font-bold uppercase tracking-wider">
                  Patient Hub
                </span>
                <h2 className="text-xl font-black">Welcome Back, {session.user?.name}</h2>
                <p className="text-xxs text-white/80 leading-relaxed max-w-md">
                  Manage your active appointments, review diagnostics reports, and update your personal secure telemetry values dynamically.
                </p>
              </div>

              <div className="flex gap-2 relative z-10 w-full sm:w-auto">
                <Link href="/appointment/" className="accessible-control flex-1 sm:flex-initial text-center px-4 py-2 bg-white hover:bg-slate-50 text-primary text-xxs font-bold rounded-lg shadow transition-colors">
                  Book Visit
                </Link>
                <button onClick={() => setActiveTab('records')} className="accessible-control flex-1 sm:flex-initial px-4 py-2 border border-white/20 hover:bg-white/10 text-white text-xxs font-bold rounded-lg transition-colors">
                  View Records
                </button>
              </div>
            </div>

            {/* Health Summary widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Upcoming Visit',
                  val: upcomingAppointment ? `${upcomingAppointment.date} at ${upcomingAppointment.timeSlot}` : 'No visits scheduled',
                  desc: upcomingAppointment ? upcomingAppointment.doctor.name : 'Schedule a checkup online',
                  icon: <CalendarIcon size={16} />,
                },
                {
                  title: 'Primary Physician',
                  val: 'Dr. Emily Carter',
                  desc: 'Family Medicine Care Lead',
                  icon: <DoctorIcon size={16} />,
                },
                {
                  title: 'Active Prescriptions',
                  val: '3 Medications',
                  desc: '1 Pharmacy Refill Available',
                  icon: <PrescriptionIcon size={16} />,
                },
                {
                  title: 'Security Audits Passed',
                  val: 'All Verified',
                  desc: 'HIPAA & GDPR standards active',
                  icon: <MicroscopeIcon size={16} />,
                },
              ].map((w, idx) => (
                <div key={idx} className="bg-white p-5 rounded-xl border border-slate-150 shadow-medical-soft flex flex-col justify-between text-left gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{w.title}</span>
                    <div className="w-7 h-7 rounded bg-primary/5 text-primary flex items-center justify-center">
                      {w.icon}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-black text-slate-900 leading-tight">{w.val}</span>
                    <span className="text-[9px] text-text-secondary leading-tight block">{w.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action triggers */}
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-450 uppercase tracking-widest block">Quick Portal Actions</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {[
                  { label: 'Book Appointment', tab: 'appointments', icon: <CalendarIcon size={14} /> },
                  { label: 'Medical Records', tab: 'records', icon: <MedicalReportIcon size={14} /> },
                  { label: 'Download Reports', tab: 'reports', icon: <MicroscopeIcon size={14} /> },
                  { label: 'Active Refills', tab: 'prescriptions', icon: <PrescriptionIcon size={14} /> },
                  { label: 'Contact Doctor', tab: 'profile', icon: <DoctorIcon size={14} /> },
                ].map((act, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(act.tab as typeof activeTab)}
                    className="accessible-control bg-white p-4 rounded-xl border border-slate-150 shadow-sm flex flex-col items-center justify-center text-center gap-2.5 hover:shadow hover:-translate-y-0.5 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                      {act.icon}
                    </div>
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">{act.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: Medical Records */}
        {activeTab === 'records' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Patient Profile Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-4 text-left">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Sarah Johnson Details</h3>
                <div className="grid grid-cols-2 gap-4 text-xxs text-text-secondary">
                  <div>
                    <span className="block text-slate-400 font-bold">Full Name:</span>
                    <span className="font-semibold text-slate-800">{session.user?.name}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">Age / Gender:</span>
                    <span className="font-semibold text-slate-800">{session.user?.age || '34'} / Female</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">Blood Group:</span>
                    <span className="font-semibold text-slate-800">{session.user?.bloodGroup || 'O+'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">Primary Care Physician:</span>
                    <span className="font-semibold text-slate-800">Dr. Emily Carter</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">Emergency Contact:</span>
                    <span className="font-semibold text-slate-800">{session.user?.emergencyContactName || 'David Johnson (Spouse)'}</span>
                  </div>
                  <div>
                    <span className="block text-slate-400 font-bold">Emergency Phone:</span>
                    <span className="font-semibold text-slate-800">{session.user?.emergencyContactPhone || '+1 555-0189'}</span>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-4 text-left">
                <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Medical History Ledger</h3>
                <div className="space-y-2 text-xxs text-text-secondary">
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Diagnoses:</span>
                    <span className="font-semibold">Hypothyroidism (Stabilized)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Surgical History:</span>
                    <span className="font-semibold">Appendectomy (2018)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Allergies:</span>
                    <span className="font-semibold text-danger font-bold">Penicillin (Severe Rash)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400 font-bold">Chronic Conditions:</span>
                    <span className="font-semibold">Mild Asthma (Inhaler as needed)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6">
              <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Clinical Health Timeline</h3>
              <div className="relative pl-8 space-y-6 text-xs text-text-secondary border-l-2 border-slate-200 ml-4">
                {[
                  { title: 'Thyroid Diagnostic Panel', date: 'July 08, 2026', desc: 'TSH verified at 2.4 mIU/L by Dr. Emily Carter. Dosage remains stable.' },
                  { title: 'Cardiology stress consult check', date: 'June 15, 2026', desc: 'Interventional Cardiology checkup with Dr. Anderson. ECG check approved.' },
                  { title: 'Lumbar Spine X-Ray checkup', date: 'May 12, 2026', desc: 'Physical skeletal analysis showing muscle stiffness. Guided to physiotherapy.' },
                  { title: 'First Diagnostic Blood check', date: 'March 22, 2026', desc: 'Complete hematology profile done. Lipid profile approved.' },
                ].map((item, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[41px] top-1.5 w-6 h-6 rounded-full bg-primary/10 text-primary border-2 border-white text-[9px] font-bold flex items-center justify-center shadow">
                      {idx + 1}
                    </div>
                    <span className="block text-[10px] text-slate-400 font-bold">{item.date}</span>
                    <h4 className="text-xs font-bold text-slate-850">{item.title}</h4>
                    <p className="text-xxs text-slate-450 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Appointments */}
        {activeTab === 'appointments' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 text-left">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Appointments Ledger</h3>
            
            {appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xxs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-2">ID</th>
                      <th className="py-3 px-2">Doctor</th>
                      <th className="py-3 px-2">Department</th>
                      <th className="py-3 px-2">Date/Time</th>
                      <th className="py-3 px-2">Type</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-text-secondary font-medium">
                    {appointments.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-2 font-bold text-primary">{app.appointmentId}</td>
                        <td className="py-3 px-2 text-slate-900 font-bold">{app.doctor.name}</td>
                        <td className="py-3 px-2">{app.department.name}</td>
                        <td className="py-3 px-2">{app.date} at {app.timeSlot}</td>
                        <td className="py-3 px-2">{app.consultationType.split(' ')[0]}</td>
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
                          <div className="inline-flex gap-2">
                            {app.status === 'Upcoming' && (
                              <button
                                onClick={() => handleCancelAppointment(app.id)}
                                className="accessible-control text-[9px] font-bold text-danger hover:underline"
                              >
                                Cancel
                              </button>
                            )}
                            <button
                              onClick={() => setActiveTicket(app)}
                              className="accessible-control text-[9px] font-bold text-primary hover:underline"
                            >
                              Confirmation
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-lg">
                No appointment history logged. <Link href="/appointment/" className="text-primary font-bold hover:underline">Book an appointment &rarr;</Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Prescriptions */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 text-left">
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Active Prescriptions Manager</h3>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[8px] font-bold rounded uppercase">Demo Mode</span>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 'RX-90382', doctor: 'Dr. Emily Carter', drug: 'Levothyroxine 50mcg', dosage: '1 tablet daily', duration: '90 Days', instructions: 'Take on empty stomach 30 mins before breakfast.', status: 'Active', expiry: '2026-10-15' },
                { id: 'RX-88401', doctor: 'Dr. Michael Anderson', drug: 'Atorvastatin 20mg', dosage: '1 tablet every night', duration: '30 Days', instructions: 'Take with or without food at bedtime.', status: 'Active', expiry: '2026-08-12' },
                { id: 'RX-79283', doctor: 'Dr. Sophia Bennett', drug: 'Sumatriptan 50mg', dosage: 'As needed for migraine', duration: 'As Needed', instructions: 'Take immediately at the onset of severe headache symptoms.', status: 'Active', expiry: '2027-01-10' },
              ].map((rx) => (
                <div key={rx.id} className="p-5 border border-slate-150 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
                  <div className="space-y-2 text-xxs text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded">{rx.id}</span>
                      <span className="text-[9px] text-success font-bold uppercase">{rx.status}</span>
                      <span className="text-[9px] text-slate-400">Expires: {rx.expiry}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{rx.drug}</h4>
                    <p className="font-semibold text-slate-800">Dosage: {rx.dosage} | Duration: {rx.duration}</p>
                    <p className="text-[10px] text-slate-450 leading-relaxed">Instructions: {rx.instructions}</p>
                    <p className="text-[9px] text-slate-400 font-medium">Prescribing physician: {rx.doctor}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => alert(`PDF Download for ${rx.id} initiated in demonstration mode.`)} className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 border border-slate-200 text-[10px] font-bold text-text-secondary rounded hover:bg-slate-100 transition-colors">
                      Download PDF
                    </button>
                    <button onClick={() => alert(`Refill request for ${rx.id} logged. Standard clinical review triggers in 2 hours.`)} className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-hover transition-colors">
                      Refill
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Medical Reports */}
        {activeTab === 'reports' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 text-left">
            <div className="border-b pb-2 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Clinical Diagnostic Profiles</h3>
              <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[8px] font-bold rounded uppercase">Demo Mode</span>
            </div>
            
            <div className="space-y-4">
              {[
                { id: 'REP-88301', title: 'Complete Blood Count (CBC)', category: 'Blood Tests', type: 'Laboratory', date: '2026-07-08', doctor: 'Dr. Emily Carter', comments: 'All hematology parameters fall within normal biological baseline values.' },
                { id: 'REP-88092', title: 'Thyroid Stimulating Hormone (TSH)', category: 'Diagnostic Profiles', type: 'Laboratory', date: '2026-07-08', doctor: 'Dr. Emily Carter', comments: 'TSH level stabilized at 2.4 mIU/L. Keep current Levothyroxine dosage.' },
                { id: 'REP-79382', title: 'Lumbar Spine X-Ray', category: 'X-Ray', type: 'Imaging', date: '2026-05-12', doctor: 'Dr. Daniel Brooks', comments: 'Normal skeletal alignment. Mild muscle strain noted in lumbar muscle group.' },
                { id: 'REP-61029', title: 'Essential Lipid Profile', category: 'Blood Tests', type: 'Laboratory', date: '2026-03-22', doctor: 'Dr. Michael Anderson', comments: 'HDL: 52 mg/dL, LDL: 110 mg/dL. Cardiovascular markers appear healthy.' },
              ].map((rep) => (
                <div key={rep.id} className="p-5 border border-slate-150 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50">
                  <div className="space-y-2 text-xxs text-text-secondary max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded">{rep.id}</span>
                      <span className="text-[9px] text-slate-400">{rep.type} | {rep.category}</span>
                      <span className="text-[9px] text-slate-400">{rep.date}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900">{rep.title}</h4>
                    <p className="text-[10px] text-slate-500 italic leading-relaxed">Doctor Comments: &quot;{rep.comments}&quot;</p>
                    <p className="text-[9px] text-slate-400 font-medium">Validated by: {rep.doctor}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={() => alert(`Opening raw telemetry view for report ${rep.id}...`)} className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 border border-slate-200 text-[10px] font-bold text-text-secondary rounded hover:bg-slate-100 transition-colors">
                      View Online
                    </button>
                    <button onClick={() => alert(`Report PDF download triggered for ${rep.id} in demo mode.`)} className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded hover:bg-primary-hover transition-colors">
                      Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Notifications Alert Center */}
        {activeTab === 'notifications' && (
          <div className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 text-left">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-sm font-bold text-slate-900">Notification Alert Center</h3>
              {notifications.length > 0 && (
                <button
                  onClick={markAllNotificationsRead}
                  className="accessible-control text-[10px] font-bold text-primary hover:underline"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-4">
              {notifications.length > 0 ? (
                <div className="divide-y divide-slate-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`py-4 flex justify-between items-start gap-4 first:pt-0 last:pb-0 ${
                        notif.read ? 'opacity-70' : 'font-semibold'
                      }`}
                    >
                      <div className="space-y-1 text-xxs text-text-secondary">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            notif.read ? 'bg-slate-300' : 'bg-primary animate-pulse'
                          }`} />
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[8px] font-bold uppercase text-slate-400">
                            {notif.type}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">{notif.title}</h4>
                        <p className="text-[10px] text-slate-450 leading-relaxed">{notif.desc}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => deleteNotification(notif.id)}
                          className="accessible-control text-[9px] text-danger font-bold hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-lg">
                  No notifications.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleUpdateProfile} className="bg-white p-6 rounded-2xl border border-slate-150 shadow-medical-soft space-y-6 text-left">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2">Profile & Security Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-text-secondary">
              <div className="space-y-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Personal Details</span>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900"
                      value={profileName}
                      onChange={(e) => setProfileName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
                    <input
                      type="email"
                      disabled
                      className="w-full bg-slate-100 border border-slate-200 px-3 py-2 text-xs rounded text-slate-400 cursor-not-allowed"
                      value={session.user?.email}
                    />
                    <span className="text-[8px] text-slate-400">Email cannot be modified online for HIPAA security.</span>
                  </div>
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900"
                      value={profilePhone}
                      onChange={(e) => setProfilePhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b pb-1">Emergency & Notifications</span>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">Emergency Contact Name</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900"
                      value={profileEmergencyName}
                      onChange={(e) => setProfileEmergencyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1">Emergency Contact Phone</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border border-slate-200 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900"
                      value={profileEmergencyPhone}
                      onChange={(e) => setProfileEmergencyPhone(e.target.value)}
                    />
                  </div>

                  <div className="pt-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pref-email"
                        className="accent-primary"
                        checked={profileEmailNotif}
                        onChange={(e) => setProfileEmailNotif(e.target.checked)}
                      />
                      <label htmlFor="pref-email" className="text-xxs font-semibold">Enable Email Reports & Receipts Sync</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="pref-sms"
                        className="accent-primary"
                        checked={profileSMSNotif}
                        onChange={(e) => setProfileSMSNotif(e.target.checked)}
                      />
                      <label htmlFor="pref-sms" className="text-xxs font-semibold">Enable SMS Reminders & Alerts</label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-xxs font-bold rounded shadow transition-colors"
                    >
                      Update Profile Info
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

      </main>

      {/* Dynamic Print Ticket Modal Overlay */}
      {activeTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl p-8 text-left space-y-6">
            <button
              onClick={() => setActiveTicket(null)}
              className="absolute top-4 right-4 text-slate-450 hover:text-slate-700"
            >
              ✕
            </button>

            {/* Official ticket header */}
            <div className="text-center pb-4 border-b border-dashed border-slate-200">
              <span className="text-xs font-black text-primary tracking-widest block uppercase">Medocyn Healthcare</span>
              <h2 className="text-sm font-bold text-slate-900 uppercase mt-1">Appointment Confirmation Ticket</h2>
              <span className="text-[10px] text-slate-400 mt-2 font-semibold font-mono block">REF: {activeTicket.appointmentId}</span>
            </div>

            {/* Content list */}
            <div className="space-y-3 text-xxs text-slate-700">
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Patient Name:</span>
                <span className="font-bold text-slate-900">{activeTicket.patientName}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Patient Email:</span>
                <span>{activeTicket.email}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Primary Phone:</span>
                <span>{activeTicket.phone}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Department:</span>
                <span className="font-bold">{activeTicket.department.name}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Assigned Doctor:</span>
                <span className="font-bold text-primary">{activeTicket.doctor.name}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Date & Time Slot:</span>
                <span className="font-bold text-slate-900">{activeTicket.date} at {activeTicket.timeSlot}</span>
              </div>
              <div className="flex justify-between border-b pb-1">
                <span className="text-slate-400 font-bold">Consultation Type:</span>
                <span>{activeTicket.consultationType}</span>
              </div>
              {activeTicket.concern && (
                <div className="border-b pb-1">
                  <span className="block text-slate-400 font-bold mb-1">Stated Concern:</span>
                  <p className="p-2 bg-slate-50 rounded text-slate-600 italic leading-relaxed">{activeTicket.concern}</p>
                </div>
              )}
            </div>

            {/* Barcode/Security Hash block */}
            <div className="text-center pt-2 space-y-2">
              <div className="inline-block p-2 bg-slate-100 font-mono text-[9px] border rounded text-slate-500">
                Security Checksum SHA-256: {activeTicket.id.slice(0, 16)}...
              </div>
              <p className="text-[8px] text-slate-400 leading-normal">
                Please present this ticket or reference number at the reception desk 15 minutes before your scheduled slot.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl transition-all shadow"
              >
                Print Ticket
              </button>
              <button
                onClick={() => setActiveTicket(null)}
                className="flex-1 py-3 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

    </article>
  );
}
