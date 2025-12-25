'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from '@/components/common/OptimizedImage';
import { HeartIcon } from '@/components/common/Icons';

interface DBDepartment {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface DBDoctor {
  id: string;
  name: string;
  photo: string;
  image?: string;
  qualification: string;
  title?: string;
  experience: string;
  languages: string;
  availability: { days?: string[]; slots?: string[] } | string; // parsed from JSON string or raw string
  consultationFee: number;
  departmentId: string;
  rating?: number;
}

interface Appointment {
  id: string;
  appointmentId: string;
  patientName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  department: { name: string };
  doctor: { name: string };
  consultationType: string;
  date: string;
  timeSlot: string;
  concern: string;
  symptoms: string;
  status: string;
}

export default function AppointmentPage() {
  const [activeTab, setActiveTab] = useState<'booking' | 'dashboard'>('booking');
  const [step, setStep] = useState(1);

  // Dynamic database lists
  const [departments, setDepartments] = useState<DBDepartment[]>([]);
  const [doctors, setDoctors] = useState<DBDoctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [patientName, setPatientName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');

  const [selectedDeptId, setSelectedDeptId] = useState('');
  const [selectedDocId, setSelectedDocId] = useState('');
  const [consultationType, setConsultationType] = useState('In-Person Consultation');

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  const [concern, setConcern] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [consentPolicy, setConsentPolicy] = useState(false);
  const [consentSchedule, setConsentSchedule] = useState(false);

  // Form Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState('');

  // Created appointments state (linked to DB)
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [generatedBookingId, setGeneratedBookingId] = useState('');

  // Fetch initial configuration data on mount
  useEffect(() => {
    const initData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Session
        const sessionRes = await fetch('/api/auth/session');
        const sessionData = await sessionRes.json();
        if (sessionData.authenticated && sessionData.user.role === 'patient') {
          setPatientName(sessionData.user.name || '');
          setEmail(sessionData.user.email || '');
          setPhone(sessionData.user.phone || '');
          // Pull patient's real bookings
          const appRes = await fetch('/api/appointments');
          if (appRes.ok) {
            const appData = await appRes.json();
            setAppointments(appData);
          }
        }

        // 2. Fetch Departments
        const deptRes = await fetch('/api/departments');
        const deptData = await deptRes.json();
        setDepartments(deptData);

        // 3. Fetch Doctors
        const docRes = await fetch('/api/doctors');
        const docData = await docRes.json();
        setDoctors(docData);
      } catch (err) {
        console.error('Error initializing booking details:', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // Filtering doctors based on selected department
  const filteredDoctors = useMemo(() => {
    if (!selectedDeptId) return [];
    return doctors.filter((doc) => doc.departmentId === selectedDeptId);
  }, [selectedDeptId, doctors]);

  const selectedDepartmentInfo = useMemo(() => {
    return departments.find((d) => d.id === selectedDeptId);
  }, [selectedDeptId, departments]);

  const selectedDoctorInfo = useMemo(() => {
    return doctors.find((doc) => doc.id === selectedDocId);
  }, [selectedDocId, doctors]);

  // Parse availability slots
  const doctorAvailableSlots = useMemo(() => {
    if (!selectedDoctorInfo) return [];
    const avail = selectedDoctorInfo.availability;
    if (typeof avail === 'string') {
      try {
        const parsed = JSON.parse(avail);
        return parsed.slots || [];
      } catch {
        return [];
      }
    }
    return avail?.slots || [];
  }, [selectedDoctorInfo]);

  // Client-side validation per step
  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!patientName.trim()) newErrors.patientName = 'Full Name is required.';
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Please enter a valid email address.';
      if (!phone.match(/^\+?[0-9\s-]{7,15}$/)) newErrors.phone = 'Please enter a valid mobile number.';
      if (!dob) {
        newErrors.dob = 'Date of birth is required.';
      } else {
        const birthDate = new Date(dob);
        if (birthDate > new Date()) newErrors.dob = 'Date of birth cannot be in the future.';
      }
    }

    if (currentStep === 2) {
      if (!selectedDeptId) newErrors.dept = 'Please select a clinical department.';
    }

    if (currentStep === 3) {
      if (!selectedDocId) newErrors.doctor = 'Please select a medical practitioner.';
    }

    if (currentStep === 4) {
      if (!selectedDate) newErrors.date = 'Please select an appointment date.';
      if (!selectedTimeSlot) newErrors.timeSlot = 'Please select an available time slot.';
    }

    if (currentStep === 5) {
      if (!concern.trim()) newErrors.concern = 'Please input your primary health concern.';
      if (!consentPolicy) newErrors.consentPolicy = 'You must agree to the Privacy Policy.';
      if (!consentSchedule) newErrors.consentSchedule = 'You must consent to information processing.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleConfirmSubmit = async () => {
    setSubmitError('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          email,
          phone,
          dob,
          gender,
          departmentId: selectedDeptId,
          doctorId: selectedDocId,
          consultationType,
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          concern,
          symptoms,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeneratedBookingId(data.appointment.appointmentId);
        // Refresh appointment ledger
        const appRes = await fetch('/api/appointments');
        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData);
        }
        setStep(7); // Show confirmation step
      } else {
        setSubmitError(data.error || 'Failed to submit appointment.');
      }
    } catch {
      setSubmitError('Connection error. Please try again.');
    }
  };

  const handleResetForm = () => {
    setPatientName('');
    setEmail('');
    setPhone('');
    setDob('');
    setGender('Male');
    setSelectedDeptId('');
    setSelectedDocId('');
    setSelectedDate('');
    setSelectedTimeSlot('');
    setConcern('');
    setSymptoms('');
    setMedicalConditions('');
    setMedications('');
    setConsentPolicy(false);
    setConsentSchedule(false);
    setSubmitError('');
    setStep(1);
  };

  // Live cancel operation on dashboard
  const handleCancelAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Cancelled' }),
      });
      if (res.ok) {
        alert('Appointment cancelled successfully.');
        // Refresh appointments list
        const appRes = await fetch('/api/appointments');
        if (appRes.ok) {
          const appData = await appRes.json();
          setAppointments(appData);
        }
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to cancel appointment.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRescheduleAppointment = (id: string) => {
    alert(`To reschedule appointment ${id}, please complete a new booking using the scheduler wizard below. The administration team will auto-reconcile your previous slot.`);
    setActiveTab('booking');
    handleResetForm();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <span className="text-xs font-semibold text-slate-400">Loading clinic scheduling gateway...</span>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-16 min-h-screen text-left">
      
      {/* 1. Header Navigation Tabs */}
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-black text-primary dark:text-accent uppercase tracking-widest block">Scheduling Gateway</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
          Clinical Bookings
        </h1>
        <p className="text-sm text-text-secondary max-w-xl mx-auto">
          Access our enterprise booking wizard or check scheduled visits through the patient status dashboard.
        </p>

        {/* Tab Buttons */}
        <div className="inline-flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800 shadow-sm relative z-10">
          <button
            onClick={() => setActiveTab('booking')}
            className={`accessible-control px-6 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'booking'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-secondary hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Booking Portal
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`accessible-control px-6 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? 'bg-primary text-white shadow-md'
                : 'text-text-secondary hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Booking Dashboard (Demo)
          </button>
        </div>
      </header>

      {/* TAB 1: Booking Flow Wizard */}
      {activeTab === 'booking' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Main Wizard Area (8 cols) */}
          <div className="lg:col-span-8 p-8 sm:p-10 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/55 shadow-2xl glass-panel space-y-8">
            
            
            {/* Step Progress indicators */}
            {step < 7 && (
              <div className="border-b border-slate-100 dark:border-slate-850 pb-4">
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span>Progress Step {step} of 6</span>
                  <span className="text-primary">
                    {step === 1 && 'Patient Information'}
                    {step === 2 && 'Department Selection'}
                    {step === 3 && 'Doctor Selection'}
                    {step === 4 && 'Date & Time Selection'}
                    {step === 5 && 'Medical Details'}
                    {step === 6 && 'Review Details'}
                  </span>
                </div>
                {/* Horizontal Progress bar indicators */}
                <div className="grid grid-cols-6 gap-1.5 mt-2">
                  {[1, 2, 3, 4, 5, 6].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 rounded-full transition-all ${
                        s <= step ? 'bg-primary' : 'bg-slate-100 dark:bg-slate-800'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Patient Information</h2>
                <p className="text-xxs text-text-secondary">Please provide your legal credentials matching your clinical registration document.</p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                    <input
                      type="text"
                      id="name-input"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                      placeholder="e.g. John Doe"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                    />
                    {errors.patientName && <p className="text-[10px] text-danger mt-1">{errors.patientName}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        id="email-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        placeholder="john.doe@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <p className="text-[10px] text-danger mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="phone-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Mobile Number</label>
                      <input
                        type="tel"
                        id="phone-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        placeholder="+1 555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      {errors.phone && <p className="text-[10px] text-danger mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="dob-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Date of Birth</label>
                      <input
                        type="date"
                        id="dob-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                      {errors.dob && <p className="text-[10px] text-danger mt-1">{errors.dob}</p>}
                    </div>
                    <div>
                      <label htmlFor="gender-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Gender</label>
                      <select
                        id="gender-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-2 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Department Selection */}
            {step === 2 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Select Clinical Division</h2>
                <p className="text-xxs text-text-secondary font-medium">Pick the division related to your medical concern. The system will filter available specialists.</p>
                
                {errors.dept && <p className="text-[10px] text-danger">{errors.dept}</p>}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2 border-b border-slate-100 dark:border-slate-850 pb-4">
                  {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setSelectedDeptId(dept.id);
                        setSelectedDocId(''); // Reset doctor when changing dept
                      }}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selectedDeptId === dept.id
                          ? 'border-primary bg-primary/5 text-primary shadow'
                          : 'border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350'
                      }`}
                    >
                      <h4 className="text-xs font-bold">{dept.name}</h4>
                      <p className="text-[10px] opacity-80 mt-1 leading-tight">{dept.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: Doctor Selection */}
            {step === 3 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Choose Practitioner</h2>
                <p className="text-xxs text-text-secondary">Select a doctor in the {selectedDepartmentInfo?.name} division.</p>
                
                {errors.doctor && <p className="text-[10px] text-danger">{errors.doctor}</p>}

                {filteredDoctors.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2">
                    {filteredDoctors.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`p-4 rounded-xl border text-left transition-all flex gap-3 items-center ${
                          selectedDocId === doc.id
                            ? 'border-primary bg-primary/5 text-primary shadow'
                            : 'border-slate-150 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-350'
                        }`}
                      >
                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 flex-shrink-0">
                          <Image
                            src={doc.photo || doc.image || "/images/doctors/doc_female_1.png"}
                            alt={`${doc.name} profile photo`}
                            fill
                            sizes="50px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{doc.name}</h4>
                          <span className="block text-[10px] opacity-75">{doc.qualification || doc.title}</span>
                          <span className="block text-[9px] text-slate-400 font-medium">Exp: {doc.experience} | Rating: ★ {doc.rating || 4.9}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 text-center rounded border border-slate-150 dark:border-slate-850 text-xs">
                    Please go back and select a department to populate available doctors.
                  </div>
                )}
              </div>
            )}

            {/* STEP 4: Date & Time Picker */}
            {step === 4 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Preferred Date & Time</h2>
                <p className="text-xxs text-text-secondary">Pick a day and select from available time slots matching {selectedDoctorInfo?.name}.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Calendar Widget */}
                  <div className="space-y-2">
                    <label htmlFor="date-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider">Date Selection</label>
                    <input
                      type="date"
                      id="date-input"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2.5 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                      value={selectedDate}
                      min="2026-07-10" // Disable past dates
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    {errors.date && <p className="text-[10px] text-danger">{errors.date}</p>}
                    <p className="text-[9px] text-slate-400 leading-tight">Note: Weekend scheduling is restricted to emergency code calloffs only.</p>
                  </div>

                  {/* Time Slots */}
                  <div className="space-y-3">
                    <label className="block text-xxs font-bold text-slate-400 uppercase tracking-wider">Available Slots</label>
                    <div className="grid grid-cols-3 gap-2">
                      {doctorAvailableSlots.map((slot: string) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={`py-2 text-xxs font-bold rounded border transition-all text-center ${
                            selectedTimeSlot === slot
                              ? 'bg-primary text-white border-primary shadow'
                              : 'bg-white dark:bg-slate-905 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                    {errors.timeSlot && <p className="text-[10px] text-danger">{errors.timeSlot}</p>}
                  </div>

                </div>

                {/* Consultation types segment */}
                <div className="space-y-3 border-t border-slate-100 dark:border-slate-850 pt-4">
                  <span className="block text-xxs font-bold text-slate-400 uppercase tracking-wider">Consultation Format</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {['In-Person Consultation', 'Video Consultation', 'Follow-Up Consultation', 'Emergency Consultation'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setConsultationType(type)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          consultationType === type
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-slate-150 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        <span className="block text-[10px] font-bold">{type.split(' ')[0]}</span>
                        <span className="block text-[8px] opacity-75 mt-0.5">Secure channel</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* STEP 5: Medical Information */}
            {step === 5 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Medical Context</h2>
                <p className="text-xxs text-text-secondary">Please add symptoms or concern notes to help the medical team coordinate diagnostics.</p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="concern-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Primary Health Concern *</label>
                    <input
                      type="text"
                      id="concern-input"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                      placeholder="e.g. Chronic back ache, annual heart monitoring scan"
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                    />
                    {errors.concern && <p className="text-[10px] text-danger mt-1">{errors.concern}</p>}
                  </div>

                  <div>
                    <label htmlFor="symptoms-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Symptoms (Describe briefly)</label>
                    <textarea
                      id="symptoms-input"
                      rows={2}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white resize-none"
                      placeholder="e.g. Mild pain in lumbar muscles spreading after sitting"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="conditions-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Existing Medical Conditions</label>
                      <input
                        type="text"
                        id="conditions-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        placeholder="e.g. Hypertension"
                        value={medicalConditions}
                        onChange={(e) => setMedicalConditions(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="meds-input" className="block text-xxs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Current Medications</label>
                      <input
                        type="text"
                        id="meds-input"
                        className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 px-3 py-2 text-xs rounded focus:outline-none focus:border-primary text-slate-900 dark:text-white"
                        placeholder="e.g. Lisinopril 10mg daily"
                        value={medications}
                        onChange={(e) => setMedications(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Consents checks */}
                  <div className="space-y-2 border-t border-slate-100 dark:border-slate-850 pt-4">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="check-policy"
                        className="mt-1 accent-primary"
                        checked={consentPolicy}
                        onChange={(e) => setConsentPolicy(e.target.checked)}
                      />
                      <label htmlFor="check-policy" className="text-[10px] text-text-secondary leading-tight">
                        I agree to the <Link href="/privacy-policy/" className="text-primary hover:underline">Privacy Policy</Link> and allow MEDOCYN to store my demographics.
                      </label>
                    </div>
                    {errors.consentPolicy && <p className="text-[9px] text-danger">{errors.consentPolicy}</p>}

                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="check-schedule"
                        className="mt-1 accent-primary"
                        checked={consentSchedule}
                        onChange={(e) => setConsentSchedule(e.target.checked)}
                      />
                      <label htmlFor="check-schedule" className="text-[10px] text-text-secondary leading-tight">
                        I consent to processing my medical details for clinical diagnostic assessment mapping.
                      </label>
                    </div>
                    {errors.consentSchedule && <p className="text-[9px] text-danger">{errors.consentSchedule}</p>}
                  </div>

                </div>
              </div>
            )}

            {/* STEP 6: Review Screen */}
            {step === 6 && (
              <div className="space-y-6 text-left">
                <h2 className="text-h3 text-slate-900 dark:text-white">Review Registration</h2>
                <p className="text-xxs text-text-secondary font-medium text-slate-400 block border-b pb-2 mb-4">Please verify all clinical fields before scheduling submission.</p>

                <div className="space-y-4 text-xs text-text-secondary">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Patient Name</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{patientName}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Contact</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{email} | {phone}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Birth details / Gender</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{dob} ({gender})</span>
                    </div>
                    <div className="space-y-1">
                      <button onClick={() => setStep(1)} className="text-[10px] text-primary font-bold hover:underline">
                        Edit Patient Info
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Department / Specialist</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedDepartmentInfo?.name} - {selectedDoctorInfo?.name}</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Schedule slot</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedDate} at {selectedTimeSlot} ({consultationType})</span>
                    </div>
                    <div className="space-y-1">
                      <button onClick={() => setStep(2)} className="text-[10px] text-primary font-bold hover:underline">
                        Edit Booking Info
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl space-y-2 text-left">
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Primary Concern</span>
                    <p className="font-semibold text-slate-850 dark:text-slate-100 leading-snug">{concern}</p>
                    <button onClick={() => setStep(5)} className="text-[10px] text-primary font-bold hover:underline block pt-2">
                      Edit Health Context
                    </button>
                  </div>
                </div>

              </div>
            )}

            {/* STEP 7: Booking Confirmation (Receipt Success) */}
            {step === 7 && (
              <div className="space-y-6 text-center py-8">
                <div className="w-16 h-16 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center">
                  <HeartIcon size={32} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Appointment Successfully Scheduled</h2>
                  <p className="text-xs text-text-secondary max-w-md mx-auto">
                    Thank you for choosing MEDOCYN HEALTHCARE. Your appointment request has been successfully received.
                  </p>
                </div>

                <div className="max-w-md mx-auto bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl text-left text-xs space-y-3">
                  <div className="flex justify-between border-b pb-2 border-slate-200 dark:border-slate-850">
                    <span className="font-bold text-slate-400">Appointment ID:</span>
                    <span className="font-extrabold text-primary">{generatedBookingId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Patient:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Department:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedDepartmentInfo?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Practitioner:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedDoctorInfo?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Date/Time:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{selectedDate} at {selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Format:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-100">{consultationType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Location:</span>
                    <span className="font-semibold text-slate-850 dark:text-slate-100">Main Medical Clinic, Tower B, Level 4</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setStep(1);
                    }}
                    className="accessible-control px-5 py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    View Appointment
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="accessible-control px-5 py-2.5 border border-slate-200 dark:border-slate-800 text-xs font-bold text-text-secondary rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Book Another Appointment
                  </button>
                  <Link
                    href="/"
                    className="accessible-control px-5 py-2.5 border border-slate-200 dark:border-slate-800 text-xs font-bold text-text-secondary rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            )}

            {/* Form control buttons next / previous */}
            {step < 6 && (
              <div className="flex justify-between border-t border-slate-100 dark:border-slate-850 pt-4">
                {step > 1 ? (
                  <button
                    onClick={handlePrev}
                    className="accessible-control px-4 py-2 border border-slate-250 dark:border-slate-850 text-xxs font-bold text-text-secondary rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  className="accessible-control px-6 py-2 bg-primary text-white text-xxs font-bold rounded hover:bg-primary-hover transition-colors"
                >
                  Next Step
                </button>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-850 pt-4">
                {submitError && (
                  <div className="p-3 bg-danger/10 border border-danger/20 rounded-lg text-xs font-semibold text-danger">
                    {submitError}
                  </div>
                )}
                <div className="flex justify-between">
                  <button
                    onClick={handlePrev}
                    className="accessible-control px-4 py-2 border border-slate-250 dark:border-slate-850 text-xxs font-bold text-text-secondary rounded hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleConfirmSubmit}
                    className="accessible-control px-6 py-2 bg-success text-white text-xxs font-bold rounded hover:bg-success/90 transition-colors"
                  >
                    Confirm Appointment
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Details Sidebar / Summary Panel (4 cols) */}
          <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-white/70 dark:bg-slate-900/40 backdrop-blur-xl border border-white/60 dark:border-slate-800/55 shadow-2xl glass-panel text-left space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-850 pb-3 uppercase tracking-wider">
              Appointment Summary
            </h3>

            <div className="space-y-4 text-xxs text-text-secondary">
              <div className="space-y-1">
                <span className="block text-slate-400 font-bold">Patient:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{patientName || '(Not Provided)'}</span>
              </div>

              <div className="space-y-1">
                <span className="block text-slate-400 font-bold">Department:</span>
                <span className="font-semibold text-slate-850 dark:text-slate-100">{selectedDepartmentInfo?.name || '(Not Selected)'}</span>
              </div>

              <div className="space-y-1">
                <span className="block text-slate-400 font-bold">Practitioner:</span>
                <span className="font-semibold text-slate-850 dark:text-slate-100">{selectedDoctorInfo?.name || '(Not Selected)'}</span>
              </div>

              <div className="space-y-1">
                <span className="block text-slate-400 font-bold">Preferred Schedule:</span>
                <span className="font-semibold text-slate-850 dark:text-slate-100">
                  {selectedDate ? `${selectedDate} at ${selectedTimeSlot || '(Pick Time)'}` : '(Pick Date & Time)'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-slate-400 font-bold">Format:</span>
                <span className="font-semibold text-slate-850 dark:text-slate-100">{consultationType}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl space-y-1 text-slate-400 text-[10px]">
              <span className="font-bold text-slate-500 uppercase tracking-wider block">Security Protocol</span>
              <p className="leading-tight">All medical records are saved behind secure HIPAA-compliant socket filters.</p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: Booking Dashboard */}
      {activeTab === 'dashboard' && (
        <div className="space-y-8 text-left max-w-4xl mx-auto">
          
          <div className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800/80 shadow-medical-soft space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Upcoming Consultations</h3>
            
            {appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((app) => (
                  <div key={app.id} className="p-5 border border-slate-150 dark:border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50 dark:bg-slate-900">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded uppercase">
                          {app.appointmentId}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{app.consultationType}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{app.doctor.name}</h4>
                      <p className="text-[10px] text-text-secondary leading-tight">
                        Department: {app.department.name} | Date: {app.date} at {app.timeSlot}
                      </p>
                      <p className="text-[10px] text-slate-400">Concern: {app.concern}</p>
                    </div>
 
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => handleRescheduleAppointment(app.appointmentId)}
                        className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-text-secondary rounded hover:bg-slate-150 dark:hover:bg-slate-800 transition-colors"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() => handleCancelAppointment(app.id)}
                        className="accessible-control flex-1 sm:flex-initial px-3 py-1.5 bg-danger text-white text-[10px] font-bold rounded hover:bg-danger-hover transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-slate-400 border border-dashed rounded-lg">
                No active appointments scheduled.
              </div>
            )}
          </div>
 
          {/* Consultation Notes Section (Demo) */}
          <div className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800/80 shadow-medical-soft space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Consultation Notes & Directives</h3>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 text-xxs text-text-secondary leading-relaxed">
              <span className="block font-bold text-primary mb-1">Pre-Appointment Clinical Reminder</span>
              <p>For in-person consultations, please arrive 15 minutes before your scheduled slot for vital checks. Bring your medical insurance card and previous health records. If you scheduled a video consult, the video room link will activate in your portal dashboard 5 minutes prior to the start time.</p>
            </div>
          </div>
 
          {/* Patient Notification Logs (Demo) */}
          <div className="bg-white dark:bg-slate-905 p-6 rounded-2xl border border-slate-150 dark:border-slate-800/80 shadow-medical-soft space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b pb-2">Patient Notification logs (Demo Templates)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Email Template Preview */}
              <div className="p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Email Confirmation Preview</span>
                <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded text-[10px] text-text-secondary font-mono space-y-1">
                  <p>Subject: Medocyn Healthcare Confirmation</p>
                  <p>Booking ID: {appointments[0]?.appointmentId || 'MED-XXXXX'}</p>
                  <p>Doctor: {appointments[0]?.doctor.name || 'Dr. Anderson'}</p>
                  <p>Date: {appointments[0]?.date || '2026-07-24'} at {appointments[0]?.timeSlot || '11:00 AM'}</p>
                  <p>Clinic: Tower B, Level 4, Main Street Campus</p>
                </div>
              </div>

              {/* SMS Alert templates */}
              <div className="p-4 border border-slate-150 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SMS Reminder Logs</span>
                <ul className="text-[10px] text-text-secondary space-y-2">
                  <li>• <strong className="text-slate-600 dark:text-slate-300">24-Hr Alert:</strong> &quot;Reminder: Your Medocyn session is tomorrow at 11:00 AM.&quot;</li>
                  <li>• <strong className="text-slate-600 dark:text-slate-300">2-Hr Alert:</strong> &quot;Reminder: Your video consult begins in 2 hours. Log in to check setup.&quot;</li>
                  <li>• <strong className="text-slate-600 dark:text-slate-300">Same Day:</strong> &quot;Reminder: Doctor is ready. Access video consultation lobby.&quot;</li>
                </ul>
              </div>

            </div>
          </div>

        </div>
      )}

    </article>
  );
}
