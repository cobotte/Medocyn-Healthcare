'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/common/OptimizedImage';
import { useRouter } from 'next/navigation';
import {
  HeartIcon,
  DoctorIcon,
  MicroscopeIcon,
  CalendarIcon,
  EmergencyIcon,
  InsuranceIcon,
  GeneralMedicineIcon,
} from '@/components/common/Icons';

export default function Home() {
  const router = useRouter();
  // Simple appointment state for demo form
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [dept, setDept] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  // Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to full booking portal with query parameters
    const params = new URLSearchParams({
      name: patientName,
      phone: phone,
      dept: dept,
      doctor: doctor,
      date: date,
      time: time,
    });
    router.push(`/appointment?${params.toString()}`);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setNewsletterSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setNewsletterSuccess(false), 6000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      
      {/* ─── ROW 1: Hero Section (Full-Width Background Image) ───────────────── */}
      <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-slate-950 border-b border-slate-900">
        {/* Full-bleed Immersive Background Image */}
        <div className="absolute inset-0 z-0" suppressHydrationWarning>
          <Image
            src="/images/hero_v2.png"
            alt="Medocyn Healthcare — doctors and medical staff in a modern hospital"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] z-0"
            quality={95}
            suppressHydrationWarning
          />
          {/* Dark Overlay with Gradient for text readability */}
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent z-10" />
          {/* Top dark gradient overlay for header navigation readability */}
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/70 via-black/20 to-transparent z-10 pointer-events-none" />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col justify-center h-full pt-16">
          <div className="max-w-xl space-y-7 text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white/10 text-sky-300 border border-white/15 shadow-xs">
              <InsuranceIcon size={12} className="text-sky-300" />
              Trusted &bull; Advanced &bull; Compassionate
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight">
              Advanced{' '}
              <span className="text-sky-400 font-black">
                Healthcare
              </span>
              <br />
              Digital Innovation
              <br />
              <span className="text-white font-black">
                Better Tomorrow
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-md">
              Delivering world-class medical care through advanced technology, experienced specialists, and patient-centered healthcare solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/appointment/"
                className="accessible-control inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/20 group focus:ring-4 focus:ring-primary/20"
              >
                <CalendarIcon size={16} className="group-hover:scale-110 transition-transform" />
                Book Appointment
              </Link>
              <Link
                href="/doctors/"
                className="accessible-control inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/30 transition-all shadow-sm"
              >
                <DoctorIcon size={16} />
                Find a Doctor
              </Link>
            </div>
            
            {/* Bottom feature metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-lg">
              {[
                { icon: <DoctorIcon size={14} />, label: 'Expert Doctors', sub: 'Specialized Care', color: 'text-sky-300 border-white/20 bg-white/5' },
                { icon: <HeartIcon size={14} />, label: 'Trusted Care', sub: 'Patient First', color: 'text-emerald-400 border-white/20 bg-white/5' },
                { icon: <MicroscopeIcon size={14} />, label: 'Advanced Tech', sub: 'Modern Facilities', color: 'text-sky-300 border-white/20 bg-white/5' },
                { icon: <EmergencyIcon size={14} />, label: '24/7 Support', sub: "We're Always Here", color: 'text-orange-400 border-white/20 bg-white/5' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full ${item.color} border flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="text-left min-w-0">
                    <span className="block text-[10px] font-extrabold text-white truncate">{item.label}</span>
                    <span className="block text-[8px] text-slate-350 truncate">{item.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ROW 2: Our Medical Services ────────────────────────────────────── */}
      <section className="relative bg-white border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <header className="max-w-3xl text-left space-y-3">
            <span className="text-xs font-black text-primary uppercase tracking-widest block">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Our Medical Services</h2>
            <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
              Comprehensive healthcare services designed to meet your needs with compassion and excellence.
            </p>
          </header>

          {/* Clean 4-column services cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Preventive Care', desc: 'State-of-the-art diagnostic technology for accurate results.', icon: <InsuranceIcon size={20} className="text-emerald-500" />, bg: 'bg-emerald-500/10' },
              { title: 'Specialized Treatment', desc: 'Advanced treatment options for complex health conditions.', icon: <GeneralMedicineIcon size={20} className="text-primary" />, bg: 'bg-primary/10' },
              { title: 'Diagnostics', desc: 'State-of-the-art diagnostic technology for accurate results.', icon: <MicroscopeIcon size={20} className="text-sky-500" />, bg: 'bg-sky-500/10' },
              { title: 'Emergency Care', desc: '24/7 emergency care when you need it most.', icon: <EmergencyIcon size={20} className="text-danger" />, bg: 'bg-danger/10' },
            ].map((svc, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-primary/20 hover:shadow-md transition-all flex flex-col justify-between">
                <div className="space-y-4">
                  <div className={`w-10 h-10 rounded-xl ${svc.bg} flex items-center justify-center`}>
                    {svc.icon}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{svc.title}</h3>
                  <p className="text-xs text-text-secondary leading-relaxed">{svc.desc}</p>
                </div>
                <Link href="/services/" className="inline-block text-[11px] font-bold text-primary hover:underline mt-4">
                  Learn More &rarr;
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <Link
              href="/services/"
              className="accessible-control inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/10"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ROW 3: Our Departments & Metrics ──────────────────────────────── */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Departments Grid */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-black text-primary uppercase tracking-widest block">Our Specialties</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Our Departments</h2>
              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xl">
                Expert care across a wide range of medical specialties.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: 'Cardiology', desc: 'Heart care & cardiac services' },
                { name: 'Neurology', desc: 'Brain & nervous system care' },
                { name: 'Orthopedics', desc: 'Bone, joint & spine specialized care' },
                { name: 'Pediatrics', desc: 'Specialized care for your kids' },
                { name: 'Gynecology', desc: "Women's health & wellness" },
                { name: 'Dental Care', desc: 'Complete dental health solutions' },
              ].map((dept, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-primary/20 transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-900 block">{dept.name}</span>
                    <span className="text-[10px] text-text-secondary leading-snug block">{dept.desc}</span>
                  </div>
                  <Link href="/departments/" className="text-[10px] font-bold text-primary hover:underline mt-4 block">
                    Explore &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Metrics Cards */}
          <div className="lg:col-span-4 space-y-6 text-left lg:pl-6">
            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest block text-center lg:text-left">Trusted by Thousands</h3>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '15+', label: 'Years of Excellence' },
                { value: '25K+', label: 'Happy Patients' },
                { value: '120+', label: 'Expert Doctors' },
                { value: '50+', label: 'Medical Specialties' },
              ].map((stat, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-center space-y-1">
                  <span className="block text-2xl font-black text-primary tracking-tight">{stat.value}</span>
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── ROW 4: About Copy & Quick Appointment Form ─────────────────────── */}
      <section className="bg-white border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Why Choose Us & Family Photo */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-black text-primary uppercase tracking-widest block">Why Choose Us</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Advanced Care. Personal Touch.</h2>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xl">
                We combine advanced medical technology with compassionate care to deliver the best outcomes.
              </p>
            </div>

            {/* Checklist */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
              {[
                'Experienced & Certified Doctors',
                'Advanced Medical Technology',
                'Personalized Treatment Plans',
                '24/7 Emergency Support',
                'Safe & Hygienic Environment',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 text-[10px] font-black">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/about/"
                className="accessible-control inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-primary/10"
              >
                Learn More About Us
              </Link>
            </div>

            {/* Consultation Illustration */}
            <div className="relative h-[250px] rounded-[2rem] overflow-hidden border border-slate-200 shadow-md">
              <Image
                src="/images/about_network.png"
                alt="Doctors explaining treatment plan to family"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Premium Booking Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#1E6091] to-[#164D73] text-white p-8 rounded-[2.5rem] shadow-2xl border border-[#164D73]/50 text-left space-y-6 relative overflow-hidden">
            {/* Background glowing circle */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 filter blur-2xl pointer-events-none" />
            
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-black text-sky-200 uppercase tracking-widest block">Appointment</span>
              <h3 className="text-xl font-extrabold text-white">Book an Appointment</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Schedule your visit with our healthcare experts.
              </p>
            </div>

            <form onSubmit={handleBook} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white focus:bg-white/15 text-white placeholder-slate-300"
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white focus:bg-white/15 text-white placeholder-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <select
                  required
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  className="w-full bg-[#1A5480] border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white text-white"
                >
                  <option value="" disabled>Select Department</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
                
                <select
                  required
                  value={doctor}
                  onChange={(e) => setDoctor(e.target.value)}
                  className="w-full bg-[#1A5480] border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white text-white"
                >
                  <option value="" disabled>Select Doctor</option>
                  <option value="Dr. Emily Carter">Dr. Emily Carter</option>
                  <option value="Dr. Michael Anderson">Dr. Michael Anderson</option>
                  <option value="Dr. Sophia Bennett">Dr. Sophia Bennett</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white text-white"
                />
                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-white text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-white text-primary text-xs font-bold rounded-xl transition-all hover:bg-slate-50 active:scale-[0.98] shadow-lg shadow-black/10"
              >
                Book Appointment Now &rarr;
              </button>
            </form>

            <span className="block text-[10px] text-slate-350 text-center relative z-10">
              or Call Us: <strong className="text-white">+1 (555) 123-4567</strong>
            </span>
          </div>

        </div>
      </section>

      {/* ─── ROW 5: Testimonials, Articles & Newsletter Row ───────────────── */}
      <section className="bg-slate-50 border-b border-slate-200 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Testimonials (4 cols) */}
            <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-left space-y-6 self-stretch flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Patients Say</span>
                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">What Our Patients Say</h3>
                
                <p className="text-xs text-text-secondary italic leading-relaxed">
                  &ldquo;Excellent care and amazing staff! The doctors took time to explain everything and made me feel comfortable throughout my treatment.&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100 mt-auto">
                <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                  <Image
                    src="/images/avatars/avatar_female_1.png"
                    alt="Sarah Johnson"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Sarah Johnson</h4>
                  <p className="text-[9px] text-primary font-bold uppercase tracking-wider">Cardiology Patient</p>
                </div>
              </div>
            </div>

            {/* Health Articles (8 cols) */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-extrabold text-slate-900">Latest Health Articles</h3>
                <Link href="/blog/" className="text-xs font-bold text-primary hover:underline">
                  View All Articles &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: '5 Tips for a Healthy Heart', category: 'Heart Health', date: 'July 5, 2026', image: '/images/blog/blog_cardiology.png' },
                  { title: 'The Importance of Sleep', category: 'Wellness', date: 'July 3, 2026', image: '/images/blog/blog_wellness.png' },
                  { title: 'Eat Right, Live Well', category: 'Nutrition', date: 'June 28, 2026', image: '/images/blog/blog_nutrition.png' },
                ].map((art, i) => (
                  <article key={i} className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between hover:border-primary/20 transition-all">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={art.image}
                        alt={art.title}
                        fill
                        sizes="(max-width: 640px) 100vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[9px] font-black text-primary uppercase tracking-wider block">{art.category}</span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">{art.title}</h4>
                      </div>
                      <Link href="/blog/" className="text-[9px] font-bold text-primary hover:underline mt-4 block">
                        Read More &rarr;
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>

          {/* Stay Updated Newsletter Bar */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-2 max-w-md">
              <h3 className="text-base font-extrabold text-slate-900">Stay Updated</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Subscribe to our newsletter for health tips and updates.
              </p>
            </div>
            
            {newsletterSuccess ? (
              <div className="text-xs font-bold text-success bg-success/10 border border-success/20 px-4 py-3 rounded-xl">
                ✔ Thank you for subscribing to Medocyn Healthcare weekly updates!
              </div>
            ) : (
              <form className="flex w-full md:w-auto md:min-w-[400px]" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  required
                  className="w-full bg-slate-50 border border-slate-200 px-4 py-3 text-xs rounded-l-xl text-slate-900 focus:outline-none focus:border-primary"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary-hover active:bg-primary-active px-6 py-3 rounded-r-xl text-xs font-bold text-white transition-all flex-shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
