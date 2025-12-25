'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect } from 'react';

// ─── Default Data for Seeding ─────────────────────────────────────────────────

const DEFAULT_DEPARTMENTS = [
  { id: 'dept-gen-med', name: 'General Medicine', slug: 'general-medicine', description: 'Primary care, checkups, and wellness management.' },
  { id: 'dept-cardiology', name: 'Cardiology', slug: 'cardiology', description: 'Heart health assessment, ECG diagnostics, and prevention.' },
  { id: 'dept-pediatrics', name: 'Pediatrics', slug: 'pediatrics', description: 'Child growth monitoring, immunizations, and child care.' },
  { id: 'dept-orthopedics', name: 'Orthopedics', slug: 'orthopedics', description: 'Joint replacement, bone fractures, and rehabilitation.' },
  { id: 'dept-neurology', name: 'Neurology', slug: 'neurology', description: 'Nerve diagnostics, epilepsy checks, and stroke recovery.' },
  { id: 'dept-womens-health', name: 'Women\'s Health', slug: 'womens-health', description: 'Gynecology checks, prenatal counseling, and maternity.' },
  { id: 'dept-dermatology', name: 'Dermatology', slug: 'dermatology', description: 'Skin cancer screening, acne care, and laser diagnostics.' },
  { id: 'dept-dentistry', name: 'Dentistry', slug: 'dentistry', description: 'Cosmetic fillings, root canals, and teeth implants.' },
  { id: 'dept-laboratory', name: 'Laboratory Services', slug: 'laboratory-services', description: 'Blood profiles, histopathology, and molecular assays.' },
  { id: 'dept-emergency', name: 'Emergency Care', slug: 'emergency-care', description: 'Rapid 24/7 cardiac code and trauma triage stabilization.' },
  { id: 'dept-mental', name: 'Mental Health', slug: 'mental-health', description: 'Confidential therapy and cognitive behavior support.' },
  { id: 'dept-physio', name: 'Physiotherapy', slug: 'physiotherapy', description: 'Neuro-rehab gym and skeletal recovery training.' }
];

const DEFAULT_DOCTORS = [
  {
    id: 'doc-sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    photo: '/images/doctors/doc_female_1.png',
    qualification: 'MD, FACC',
    experience: '16+ Yrs',
    languages: 'English, Spanish',
    availability: JSON.stringify({
      days: ['Monday', 'Tuesday', 'Thursday'],
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
    }),
    biography: 'Dr. Jenkins is a board-certified interventional cardiologist. She specializes in coronary artery disease, valve defects, and congenital heart disorders.',
    consultationFee: 250.00,
    departmentId: 'dept-cardiology'
  },
  {
    id: 'doc-marcus-vance',
    name: 'Dr. Marcus Vance',
    photo: '/images/doctors/doc_male_1.png',
    qualification: 'MD, FAAP',
    experience: '12+ Yrs',
    languages: 'English, French',
    availability: JSON.stringify({
      days: ['Wednesday', 'Thursday', 'Friday'],
      slots: ['08:30 AM', '09:30 AM', '10:30 AM', '01:30 PM', '02:30 PM', '03:30 PM']
    }),
    biography: 'Dr. Vance provides comprehensive pediatric primary care, preventive physical exams, and immunizations.',
    consultationFee: 180.00,
    departmentId: 'dept-pediatrics'
  },
  {
    id: 'doc-emily-carter',
    name: 'Dr. Emily Carter',
    photo: '/images/doctors/doc_female_2.png',
    qualification: 'MD',
    experience: '14+ Yrs',
    languages: 'English, Spanish',
    availability: JSON.stringify({
      days: ['Monday', 'Wednesday', 'Friday'],
      slots: ['08:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '03:00 PM']
    }),
    biography: 'Dr. Carter specializes in chronic illness management, metabolic counseling, and general internal medicine diagnostics.',
    consultationFee: 150.00,
    departmentId: 'dept-gen-med'
  },
  {
    id: 'doc-michael-anderson',
    name: 'Dr. Michael Anderson',
    photo: '/images/doctors/doc_male_2.png',
    qualification: 'MD, FAAOS',
    experience: '18+ Yrs',
    languages: 'English',
    availability: JSON.stringify({
      days: ['Tuesday', 'Thursday', 'Friday'],
      slots: ['09:00 AM', '10:30 AM', '11:30 AM', '02:00 PM', '04:00 PM']
    }),
    biography: 'Dr. Anderson is a leading orthopedic surgeon specializing in joint replacement, sports injuries, and spine stabilization.',
    consultationFee: 300.00,
    departmentId: 'dept-orthopedics'
  },
  {
    id: 'doc-sophia-bennett',
    name: 'Dr. Sophia Bennett',
    photo: '/images/doctors/doc_female_1.png',
    qualification: 'MD, PhD',
    experience: '15+ Yrs',
    languages: 'English, German',
    availability: JSON.stringify({
      days: ['Monday', 'Tuesday', 'Wednesday'],
      slots: ['10:00 AM', '11:00 AM', '01:30 PM', '03:00 PM', '04:30 PM']
    }),
    biography: 'Dr. Bennett focuses on advanced neurology care, nerve diagnostics, and chronic pain management.',
    consultationFee: 280.00,
    departmentId: 'dept-neurology'
  },
  {
    id: 'doc-olivia-martinez',
    name: 'Dr. Olivia Martinez',
    photo: '/images/doctors/doc_female_2.png',
    qualification: 'MD, FACOG',
    experience: '11+ Yrs',
    languages: 'English, Spanish',
    availability: JSON.stringify({
      days: ['Tuesday', 'Thursday'],
      slots: ['08:00 AM', '09:00 AM', '11:00 AM', '02:00 PM', '03:30 PM']
    }),
    biography: 'Dr. Martinez specializes in maternal care plans, gynecology scans, and general women\'s health.',
    consultationFee: 260.00,
    departmentId: 'dept-womens-health'
  },
  {
    id: 'doc-david-lee',
    name: 'Dr. David Lee',
    photo: '/images/doctors/doc_male_1.png',
    qualification: 'MD, FAAD',
    experience: '10+ Yrs',
    languages: 'English, Mandarin',
    availability: JSON.stringify({
      days: ['Monday', 'Wednesday', 'Thursday'],
      slots: ['09:30 AM', '11:00 AM', '02:30 PM', '04:00 PM']
    }),
    biography: 'Dr. Lee specializes in diagnostic skin biopsies, laser surgery, and complex psoriasis treatments.',
    consultationFee: 200.00,
    departmentId: 'dept-dermatology'
  },
  {
    id: 'doc-robert-chen',
    name: 'Dr. Robert Chen',
    photo: '/images/doctors/doc_male_2.png',
    qualification: 'MD, FAPA',
    experience: '13+ Yrs',
    languages: 'English, Cantonese',
    availability: JSON.stringify({
      days: ['Tuesday', 'Wednesday', 'Friday'],
      slots: ['10:00 AM', '11:30 AM', '01:30 PM', '03:00 PM']
    }),
    biography: 'Dr. Chen specializes in psychiatric diagnostics, cognitive behavioral therapy, and anxiety disorders.',
    consultationFee: 220.00,
    departmentId: 'dept-mental'
  }
];

const DEFAULT_USERS = [
  {
    id: 'pat-sarah-johnson',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    password: 'password123',
    age: 34,
    bloodGroup: 'O+',
    patientId: 'MDC-89402',
    membershipStatus: 'Premium Member',
    phone: '+1 555-0185',
    emergencyContactName: 'David Johnson (Spouse)',
    emergencyContactPhone: '+1 555-0189',
    language: 'English',
    emailNotifications: true,
    smsNotifications: true,
    role: 'patient'
  },
  {
    id: 'pat-john-smith',
    name: 'John Smith',
    email: 'john.smith@example.com',
    password: 'password123',
    age: 45,
    bloodGroup: 'A-',
    patientId: 'MDC-77312',
    membershipStatus: 'Standard Member',
    phone: '+1 555-0211',
    emergencyContactName: 'Mary Smith (Wife)',
    emergencyContactPhone: '+1 555-0215',
    language: 'English',
    emailNotifications: true,
    smsNotifications: false,
    role: 'patient'
  },
  {
    id: 'pat-elena-rodriguez',
    name: 'Elena Rodriguez',
    email: 'elena.rod@example.com',
    password: 'password123',
    age: 29,
    bloodGroup: 'B+',
    patientId: 'MDC-45129',
    membershipStatus: 'Premium Member',
    phone: '+1 555-0399',
    emergencyContactName: 'Carlos Rodriguez (Father)',
    emergencyContactPhone: '+1 555-0391',
    language: 'Spanish',
    emailNotifications: true,
    smsNotifications: true,
    role: 'patient'
  },
  {
    id: 'pat-william-davis',
    name: 'William Davis',
    email: 'will.davis@example.com',
    password: 'password123',
    age: 62,
    bloodGroup: 'O-',
    patientId: 'MDC-21093',
    membershipStatus: 'Standard Member',
    phone: '+1 555-0888',
    emergencyContactName: 'Susan Davis (Daughter)',
    emergencyContactPhone: '+1 555-0882',
    language: 'English',
    emailNotifications: true,
    smsNotifications: true,
    role: 'patient'
  },
  {
    id: 'pat-linda-taylor',
    name: 'Linda Taylor',
    email: 'linda.t@example.com',
    password: 'password123',
    age: 51,
    bloodGroup: 'AB+',
    patientId: 'MDC-61849',
    membershipStatus: 'Premium Member',
    phone: '+1 555-1234',
    emergencyContactName: 'Mark Taylor (Husband)',
    emergencyContactPhone: '+1 555-1239',
    language: 'English',
    emailNotifications: false,
    smsNotifications: true,
    role: 'patient'
  },
  {
    id: 'admin-system',
    name: 'System Administrator',
    email: 'admin@medocyn.com',
    password: 'admin123',
    role: 'admin'
  }
];

const DEFAULT_APPOINTMENTS = [
  {
    id: 'apt-1',
    appointmentId: 'APT-10852',
    patientName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0185',
    dob: '1992-04-12',
    gender: 'Female',
    consultationType: 'In-Person Consultation',
    date: '2025-07-24',
    timeSlot: '10:00 AM',
    concern: 'Routine physical exam and metabolic checkup',
    symptoms: 'Mild fatigue in the afternoons',
    status: 'Completed',
    patientId: 'pat-sarah-johnson',
    doctorId: 'doc-emily-carter',
    departmentId: 'dept-gen-med',
    createdAt: '2025-07-20T10:00:00.000Z'
  },
  {
    id: 'apt-2',
    appointmentId: 'APT-21845',
    patientName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0185',
    dob: '1992-04-12',
    gender: 'Female',
    consultationType: 'In-Person Consultation',
    date: '2025-11-12',
    timeSlot: '02:00 PM',
    concern: 'Chest discomfort review and stress analysis',
    symptoms: 'Palpitations after heavy workouts',
    status: 'Completed',
    patientId: 'pat-sarah-johnson',
    doctorId: 'doc-sarah-jenkins',
    departmentId: 'dept-cardiology',
    createdAt: '2025-11-10T14:00:00.000Z'
  },
  {
    id: 'apt-3',
    appointmentId: 'APT-31992',
    patientName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0185',
    dob: '1992-04-12',
    gender: 'Female',
    consultationType: 'Virtual consultation',
    date: '2026-03-05',
    timeSlot: '11:00 AM',
    concern: 'Follow-up on cardiologist medication adjustment',
    symptoms: 'None, feeling significantly better',
    status: 'Completed',
    patientId: 'pat-sarah-johnson',
    doctorId: 'doc-sarah-jenkins',
    departmentId: 'dept-cardiology',
    createdAt: '2026-03-02T11:00:00.000Z'
  },
  {
    id: 'apt-4',
    appointmentId: 'APT-48902',
    patientName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 555-0185',
    dob: '1992-04-12',
    gender: 'Female',
    consultationType: 'In-Person Consultation',
    date: '2026-07-28',
    timeSlot: '09:00 AM',
    concern: 'Annual standard cardiac profile screening',
    symptoms: 'None, annual standard preventative screen',
    status: 'Upcoming',
    patientId: 'pat-sarah-johnson',
    doctorId: 'doc-sarah-jenkins',
    departmentId: 'dept-cardiology',
    createdAt: '2026-07-10T09:00:00.000Z'
  },
  {
    id: 'apt-5',
    appointmentId: 'APT-51029',
    patientName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555-0211',
    dob: '1981-08-20',
    gender: 'Male',
    consultationType: 'In-Person Consultation',
    date: '2025-08-15',
    timeSlot: '09:00 AM',
    concern: 'Soreness in the left knee after jogging',
    symptoms: 'Pain during joint flexion, mild swelling',
    status: 'Completed',
    patientId: 'pat-john-smith',
    doctorId: 'doc-michael-anderson',
    departmentId: 'dept-orthopedics',
    createdAt: '2025-08-10T09:00:00.000Z'
  },
  {
    id: 'apt-6',
    appointmentId: 'APT-66384',
    patientName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555-0211',
    dob: '1981-08-20',
    gender: 'Male',
    consultationType: 'In-Person Consultation',
    date: '2025-09-02',
    timeSlot: '10:30 AM',
    concern: 'Knee joint scan review and recovery plan check',
    symptoms: 'Reduced swelling, recovery exercises check',
    status: 'Completed',
    patientId: 'pat-john-smith',
    doctorId: 'doc-michael-anderson',
    departmentId: 'dept-orthopedics',
    createdAt: '2025-08-30T10:30:00.000Z'
  },
  {
    id: 'apt-7',
    appointmentId: 'APT-71822',
    patientName: 'John Smith',
    email: 'john.smith@example.com',
    phone: '+1 555-0211',
    dob: '1981-08-20',
    gender: 'Male',
    consultationType: 'In-Person Consultation',
    date: '2026-01-20',
    timeSlot: '11:30 AM',
    concern: 'Chronic low back pain check and physical therapy progress',
    symptoms: 'Dull ache after sitting for extended periods',
    status: 'Completed',
    patientId: 'pat-john-smith',
    doctorId: 'doc-michael-anderson',
    departmentId: 'dept-orthopedics',
    createdAt: '2026-01-15T11:30:00.000Z'
  },
  {
    id: 'apt-8',
    appointmentId: 'APT-22019',
    patientName: 'William Davis',
    email: 'will.davis@example.com',
    phone: '+1 555-0888',
    dob: '1964-05-18',
    gender: 'Male',
    consultationType: 'In-Person Consultation',
    date: '2025-08-01',
    timeSlot: '10:00 AM',
    concern: 'Chronic headache and recurring dizziness evaluation',
    symptoms: 'Dull throb in occipital region, feeling unsteady',
    status: 'Completed',
    patientId: 'pat-william-davis',
    doctorId: 'doc-sophia-bennett',
    departmentId: 'dept-neurology',
    createdAt: '2025-07-28T10:00:00.000Z'
  },
  {
    id: 'apt-9',
    appointmentId: 'APT-25910',
    patientName: 'William Davis',
    email: 'will.davis@example.com',
    phone: '+1 555-0888',
    dob: '1964-05-18',
    gender: 'Male',
    consultationType: 'In-Person Consultation',
    date: '2026-06-14',
    timeSlot: '10:00 AM',
    concern: 'Cancelled due to transportation issue',
    symptoms: 'Follow-up check',
    status: 'Cancelled',
    patientId: 'pat-william-davis',
    doctorId: 'doc-emily-carter',
    departmentId: 'dept-gen-med',
    createdAt: '2026-06-10T10:00:00.000Z'
  }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'not-1', title: 'Upcoming Appointment Reminder', desc: 'Your consultation with Dr. Sarah Jenkins is scheduled for July 28 at 09:00 AM.', type: 'reminder', read: false, patientId: 'pat-sarah-johnson', createdAt: '2026-07-10T09:00:00.000Z' },
  { id: 'not-2', title: 'Cardiology PDF Report Available', desc: 'Your electrocardiogram stress test report is compiled. Download details in Portal.', type: 'report', read: true, patientId: 'pat-sarah-johnson', createdAt: '2026-07-08T12:00:00.000Z' },
  { id: 'not-3', title: 'Portal Secure Login Notification', desc: 'Secure connection authorized from Windows Chrome client browser.', type: 'security', read: true, patientId: 'pat-sarah-johnson', createdAt: '2026-07-05T08:00:00.000Z' },
  { id: 'not-4', title: 'Orthopedic Progress Verified', desc: 'Dr. Anderson has cleared your low back physical rehab exercises.', type: 'update', read: false, patientId: 'pat-john-smith', createdAt: '2026-07-09T14:30:00.000Z' },
  { id: 'not-5', title: 'Prescription Refill Approved', desc: 'Zolpidem refill approved. Pick up at Medocyn Pharmacy window.', type: 'prescription', read: false, patientId: 'pat-john-smith', createdAt: '2026-07-07T10:00:00.000Z' }
];

const DEFAULT_BLOGS = [
  {
    id: 'blog-1',
    title: 'The Future of Telemedicine in Modern Clinical Practice',
    slug: 'future-telemedicine-modern-practice',
    summary: 'Explore how remote diagnostic devices and video-consultation integrations are redefining patient recovery pathways.',
    content: 'Telemedicine is no longer just a convenient fallback; it is becoming the backbone of patient-centered healthcare. With high-definition video connections, remote monitoring gadgets, and digital prescription transfers, patients can consult leading specialists from home. This reduces hospital admissions, improves the management of chronic conditions, and accelerates recovery times.',
    category: 'Digital Health',
    readTime: '5 min read',
    image: '/images/blog/blog_digital_health.png',
    createdAt: '2026-07-07T00:00:00.000Z'
  },
  {
    id: 'blog-2',
    title: 'Preventive Cardiology: Early Indicators You Should Not Ignore',
    slug: 'preventive-cardiology-early-indicators',
    summary: 'Identify the subtle clinical markers and lifestyle factors that help prevent cardiovascular disease.',
    content: 'Heart disease remains a leading cause of mortality worldwide, yet most cardiovascular events are preventable. Early diagnostics like hs-CRP tests, coronary calcium scoring, and detailed lipid profiles offer key insights years before symptoms arise. Active management of blood pressure, a balanced diet, and structured physical exercises remain highly effective in maintaining long-term heart health.',
    category: 'Cardiology',
    readTime: '7 min read',
    image: '/images/blog/blog_cardiology.png',
    createdAt: '2026-07-04T00:00:00.000Z'
  },
  {
    id: 'blog-3',
    title: 'Understanding Pediatric Nutrition: Building Blocks for Strong Growth',
    slug: 'pediatric-nutrition-strong-growth',
    summary: 'A pediatrician-guided breakdown of essential macronutrients, vitamins, and eating habits needed to foster early development.',
    content: 'Early childhood nutrition lays the foundation for lifelong physical and cognitive health. Fostering a diverse diet rich in calcium, iron, and key vitamins supports brain growth and strong bone density. Establishing healthy, routine eating behaviors at an early age helps prevent childhood obesity, strengthens immune defenses, and boosts concentration.',
    category: 'Pediatrics',
    readTime: '4 min read',
    image: '/images/blog/blog_nutrition.png',
    createdAt: '2026-07-01T00:00:00.000Z'
  },
  {
    id: 'blog-4',
    title: 'Stress Management: Impact of Stress Hormones on Physical Health',
    slug: 'stress-management-impact-stress-hormones',
    summary: 'Learn about the physiological cascade of cortisol, and explore evidence-based therapies for resilience.',
    content: 'Chronic stress does more than cause mental fatigue; it triggers a physiological cascade. Elevating cortisol and adrenaline levels raises blood pressure, suppresses the immune system, and disrupts digestion. Evidence-based techniques like cognitive behavioral therapy, mindfulness meditation, and regular sleep cycles help restore metabolic balance and build resilience.',
    category: 'Wellness',
    readTime: '6 min read',
    image: '/images/blog/blog_wellness.png',
    createdAt: '2026-06-25T00:00:00.000Z'
  }
];

const DEFAULT_PACKAGES = [
  { id: 'pkg-1', name: 'Executive Cardio Screening', price: 299.00, category: 'Cardiology', description: 'Advanced assessment of cardiac efficiency, lipid profiles, and cardiovascular strain markers.', features: JSON.stringify(['Electrocardiogram (ECG)', 'Cardiovascular Stress Test', 'Advanced Lipid Profile', 'Hs-CRP Heart Inflammation Marker', 'Consolidated Cardiologist Review']) },
  { id: 'pkg-2', name: 'Premium Women\'s Wellness', price: 349.00, category: 'OBGYN', description: 'Comprehensive preventive care screen assessing hormonal profiles, nutritional status, and breast/pelvic health.', features: JSON.stringify(['Pelvic Ultrasound Scan', 'Complete Thyroid Screen', 'Bone Density Scan (DEXA)', 'Hormonal Panel Assessment', 'OBGYN Specialist Consult']) },
  { id: 'pkg-3', name: 'Pediatric Growth Package', price: 199.00, category: 'Pediatrics', description: 'Child wellness screening focusing on vaccine compliance, early cognitive milestones, and pediatric nutrition guidance.', features: JSON.stringify(['Developmental Milestones Review', 'Immunization Compliance Check', 'Growth and BMI Tracking', 'Pediatric Nutrition Assessment', 'Senior Pediatrician Review']) },
  { id: 'pkg-4', name: 'Comprehensive Neurological Profiling', price: 499.00, category: 'Neurology', description: 'Specialized diagnostic checks mapping brain wave functions, nerve transmission, and sleep/stress indicators.', features: JSON.stringify(['Nerve Conduction Study', 'Cognitive & Memory Battery', 'MRI Referral Consultation', 'Sleep Quality Evaluation', 'Chief Neurologist Review']) },
  { id: 'pkg-5', name: 'General Health Assessment', price: 149.00, category: 'General Care', description: 'Essential preventive screen mapping metabolic activity, renal function, blood counts, and primary clinical checkup.', features: JSON.stringify(['Complete Blood Count (CBC)', 'Kidney & Liver Function Test', 'Fasting Blood Glucose', 'Urinalysis and Metabolism check', 'Primary Physician Review']) }
];

// ─── Provider Component ────────────────────────────────────────────────────────

export default function MockApiProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ─── Local Database Initial Seeding ─────────────────────────────────────────
    const ensureSeeded = () => {
      if (localStorage.getItem('medocyn_db_seeded')) return;

      localStorage.setItem('medocyn_db_seeded', 'true');
      localStorage.setItem('medocyn_departments', JSON.stringify(DEFAULT_DEPARTMENTS));
      localStorage.setItem('medocyn_doctors', JSON.stringify(DEFAULT_DOCTORS));
      localStorage.setItem('medocyn_users', JSON.stringify(DEFAULT_USERS));
      localStorage.setItem('medocyn_appointments', JSON.stringify(DEFAULT_APPOINTMENTS));
      localStorage.setItem('medocyn_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
      localStorage.setItem('medocyn_blogs', JSON.stringify(DEFAULT_BLOGS));
      localStorage.setItem('medocyn_packages', JSON.stringify(DEFAULT_PACKAGES));
      localStorage.setItem('medocyn_messages', JSON.stringify([]));
      localStorage.setItem('medocyn_subscribers', JSON.stringify([]));
    };

    ensureSeeded();

    // ─── Fetch Interception Layer ──────────────────────────────────────────────
    const originalFetch = window.fetch;

    window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
      const rawUrl = typeof input === 'string' ? input : (input instanceof URL ? input.href : input.url);
      
      // We only intercept calls that hit `/api/`
      if (!rawUrl.includes('/api/')) {
        return originalFetch(input, init);
      }

      // Parse absolute or relative URLs
      let urlPath = '';
      try {
        const parsedUrl = new URL(rawUrl, window.location.origin);
        urlPath = parsedUrl.pathname.replace(/\/$/, '');
      } catch {
        // Fallback for simple paths
        urlPath = rawUrl.split('?')[0].replace(/\/$/, '');
      }

      const method = init?.method?.toUpperCase() || 'GET';
      const requestData = init?.body ? JSON.parse(init.body as string) : null;

      // Helper functions for reading/writing local databases
      const getTable = (key: string): any[] => JSON.parse(localStorage.getItem(key) || '[]');
      const setTable = (key: string, data: any[]) => localStorage.setItem(key, JSON.stringify(data));

      const responseJSON = (data: any, status = 200): Response => {
        return new Response(JSON.stringify(data), {
          status,
          headers: { 'Content-Type': 'application/json' },
        });
      };

      const responseError = (msg: string, status = 400): Response => {
        return responseJSON({ error: msg }, status);
      };

      const getSessionUser = () => {
        const sessionStr = localStorage.getItem('medocyn_session_user');
        return sessionStr ? JSON.parse(sessionStr) : null;
      };

      // ─── Endpoint Routing Mock ────────────────────────────────────────────────
      try {
        // 1. Session & Auth Endpoints
        if (urlPath === '/api/auth/session') {
          const user = getSessionUser();
          if (user) {
            return responseJSON({ authenticated: true, user });
          }
          return responseJSON({ authenticated: false });
        }

        if (urlPath === '/api/auth/login') {
          if (method !== 'POST') return responseError('Method not allowed', 405);
          const { email, password } = requestData || {};
          const users = getTable('medocyn_users');
          const matched = users.find(u => u.email.toLowerCase() === email?.toLowerCase() && u.password === password);
          
          if (matched) {
            const sessionPayload = { ...matched };
            delete sessionPayload.password;
            localStorage.setItem('medocyn_session_user', JSON.stringify(sessionPayload));
            return responseJSON({ success: true, user: sessionPayload });
          }
          return responseError('Invalid email or password credentials.', 401);
        }

        if (urlPath === '/api/auth/register') {
          if (method !== 'POST') return responseError('Method not allowed', 405);
          const { name, email, password, phone, age, bloodGroup } = requestData || {};
          const users = getTable('medocyn_users');

          if (users.some(u => u.email.toLowerCase() === email?.toLowerCase())) {
            return responseError('Email account already exists.', 400);
          }

          const newUser = {
            id: `pat-${Math.floor(10000 + Math.random() * 90000)}`,
            name,
            email,
            password,
            age: age ? parseInt(age) : null,
            bloodGroup: bloodGroup || 'O+',
            patientId: `MDC-${Math.floor(10000 + Math.random() * 90000)}`,
            membershipStatus: 'Standard Member',
            phone: phone || '',
            emergencyContactName: '',
            emergencyContactPhone: '',
            language: 'English',
            emailNotifications: true,
            smsNotifications: true,
            role: 'patient',
            createdAt: new Date().toISOString()
          };

          users.push(newUser);
          setTable('medocyn_users', users);

          const sessionPayload = { ...newUser };
          delete sessionPayload.password;
          localStorage.setItem('medocyn_session_user', JSON.stringify(sessionPayload));

          return responseJSON({ success: true, user: sessionPayload });
        }

        if (urlPath === '/api/auth/logout') {
          localStorage.removeItem('medocyn_session_user');
          return responseJSON({ success: true });
        }

        if (urlPath === '/api/auth/profile') {
          const user = getSessionUser();
          if (!user) return responseError('Unauthorized', 401);
          
          if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
            const users = getTable('medocyn_users');
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
              const updatedFields = requestData || {};
              users[userIndex] = { ...users[userIndex], ...updatedFields };
              setTable('medocyn_users', users);
              
              const updatedSession = { ...users[userIndex] };
              delete updatedSession.password;
              localStorage.setItem('medocyn_session_user', JSON.stringify(updatedSession));
              return responseJSON({ success: true, user: updatedSession });
            }
          }
          return responseJSON({ success: true, user });
        }

        // 2. Departments & Doctors
        if (urlPath === '/api/departments') {
          return responseJSON(getTable('medocyn_departments'));
        }

        if (urlPath === '/api/doctors') {
          return responseJSON(getTable('medocyn_doctors'));
        }

        // 3. Blogs & Packages
        if (urlPath === '/api/blogs') {
          return responseJSON(getTable('medocyn_blogs'));
        }

        // 4. Appointments CRUD
        if (urlPath === '/api/appointments') {
          const appointments = getTable('medocyn_appointments');
          const user = getSessionUser();

          if (method === 'GET') {
            if (!user) return responseJSON([]);
            // Admins fetch all appointments. Patients fetch only their own.
            if (user.role === 'admin') {
              const doctors = getTable('medocyn_doctors');
              const departments = getTable('medocyn_departments');
              
              // Populate Doctor and Department structures just like the real SQLite relation
              const populated = appointments.map(app => ({
                ...app,
                doctor: doctors.find(d => d.id === app.doctorId) || { name: 'Dr. Practitioner' },
                department: departments.find(d => d.id === app.departmentId) || { name: 'Medical Wing' }
              }));
              return responseJSON(populated);
            } else {
              const filtered = appointments.filter(app => app.email.toLowerCase() === user.email.toLowerCase());
              const doctors = getTable('medocyn_doctors');
              const departments = getTable('medocyn_departments');
              
              const populated = filtered.map(app => ({
                ...app,
                doctor: doctors.find(d => d.id === app.doctorId) || { name: 'Dr. Practitioner' },
                department: departments.find(d => d.id === app.departmentId) || { name: 'Medical Wing' }
              }));
              return responseJSON(populated);
            }
          }

          if (method === 'POST') {
            const {
              patientName, email, phone, dob, gender,
              departmentId, doctorId, consultationType,
              date, timeSlot, concern, symptoms
            } = requestData || {};

            const newApp = {
              id: `apt-${Math.floor(100000 + Math.random() * 900000)}`,
              appointmentId: `APT-${Math.floor(10000 + Math.random() * 90000)}`,
              patientName,
              email,
              phone,
              dob,
              gender,
              consultationType: consultationType || 'In-Person Consultation',
              date,
              timeSlot,
              concern: concern || '',
              symptoms: symptoms || '',
              status: 'Upcoming',
              patientId: user?.role === 'patient' ? user.id : null,
              doctorId,
              departmentId,
              createdAt: new Date().toISOString()
            };

            appointments.unshift(newApp);
            setTable('medocyn_appointments', appointments);
            return responseJSON({ success: true, appointment: newApp });
          }
        }

        // PATCH details for cancellation / status changes
        if (urlPath.startsWith('/api/appointments/')) {
          const parts = urlPath.split('/');
          const appointmentId = parts[parts.length - 1];

          if (method === 'PATCH' || method === 'POST') {
            const appointments = getTable('medocyn_appointments');
            const appIdx = appointments.findIndex(a => a.id === appointmentId || a.appointmentId === appointmentId);
            
            if (appIdx !== -1) {
              const { status } = requestData || {};
              appointments[appIdx].status = status || 'Cancelled';
              appointments[appIdx].updatedAt = new Date().toISOString();
              setTable('medocyn_appointments', appointments);
              return responseJSON({ success: true, appointment: appointments[appIdx] });
            }
            return responseError('Appointment record not found.', 404);
          }
        }

        // 5. Contact Inquiries Inbox
        if (urlPath === '/api/contact') {
          if (method !== 'POST') return responseError('Method not allowed', 405);
          const messages = getTable('medocyn_messages');
          const newMessage = {
            id: `msg-${Math.floor(100000 + Math.random() * 900000)}`,
            ...requestData,
            createdAt: new Date().toISOString()
          };
          messages.unshift(newMessage);
          setTable('medocyn_messages', messages);
          return responseJSON({ success: true, message: newMessage });
        }

        // 6. Newsletter Subscription
        if (urlPath === '/api/newsletter') {
          if (method !== 'POST') return responseError('Method not allowed', 405);
          const subscribers = getTable('medocyn_subscribers');
          const email = requestData?.email;
          if (!email) return responseError('Email is required');
          
          if (!subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) {
            subscribers.unshift({
              id: `sub-${Math.floor(100000 + Math.random() * 900000)}`,
              email,
              createdAt: new Date().toISOString()
            });
            setTable('medocyn_subscribers', subscribers);
          }
          return responseJSON({ success: true });
        }

        // 7. Notifications
        if (urlPath === '/api/notifications') {
          const notifications = getTable('medocyn_notifications');
          const user = getSessionUser();
          if (!user) return responseJSON([]);
          const filtered = notifications.filter(n => n.patientId === user.id);
          return responseJSON(filtered);
        }

        // 8. Admin Telemetry Statistics
        if (urlPath === '/api/admin/stats') {
          const user = getSessionUser();
          if (!user || user.role !== 'admin') return responseError('Unauthorized admin token.', 401);

          const appointments = getTable('medocyn_appointments');
          const users = getTable('medocyn_users');
          const messages = getTable('medocyn_messages');
          const subscribers = getTable('medocyn_subscribers');
          const doctors = getTable('medocyn_doctors');
          const departments = getTable('medocyn_departments');

          const patientsCount = users.filter(u => u.role === 'patient').length;

          // Populate relation references for tables on the dashboard
          const populatedAppointments = appointments.map(app => ({
            ...app,
            doctor: doctors.find(d => d.id === app.doctorId) || { name: 'Dr. Practitioner' },
            department: departments.find(d => d.id === app.departmentId) || { name: 'Medical Wing' }
          }));

          return responseJSON({
            counts: {
              patients: patientsCount,
              appointments: appointments.length,
              messages: messages.length,
              subscribers: subscribers.length,
              doctors: doctors.length
            },
            appointments: populatedAppointments,
            messages: messages.slice(0, 20),
            subscribers: subscribers.slice(0, 20)
          });
        }

        // 9. Database Inspector Real-Time SQLite Tables Stream
        if (urlPath === '/api/admin/database') {
          const user = getSessionUser();
          if (!user) return responseError('Unauthorized access.', 401);

          const params = new URL(rawUrl, window.location.origin).searchParams;
          const table = params.get('table');

          let data: any[] = [];
          if (table === 'patient') {
            data = getTable('medocyn_users').filter(u => u.role === 'patient');
          } else if (table === 'admin') {
            data = getTable('medocyn_users').filter(u => u.role === 'admin');
          } else if (table === 'doctor') {
            data = getTable('medocyn_doctors');
          } else if (table === 'department') {
            data = getTable('medocyn_departments');
          } else if (table === 'appointment') {
            data = getTable('medocyn_appointments');
          } else if (table === 'contactmessage') {
            data = getTable('medocyn_messages');
          } else if (table === 'newslettersubscriber') {
            data = getTable('medocyn_subscribers');
          } else if (table === 'notification') {
            data = getTable('medocyn_notifications');
          } else if (table === 'healthpackage') {
            data = getTable('medocyn_packages');
          }

          return responseJSON({ success: true, data });
        }

      } catch (err) {
        console.error('Mock API Error:', err);
        return responseError('Simulated SQL internal error.', 500);
      }

      return originalFetch(input, init);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return <>{children}</>;
}
