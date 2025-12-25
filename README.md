<div align="center">

# 🏥 MEDOCYN HEALTHCARE
### Enterprise Digital Healthcare Platform

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-GitHub_Pages-0057B8?style=for-the-badge)](https://cobotte.github.io/Medocyn-Healthcare/)
[![Built with Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**A premium, high-fidelity enterprise healthcare portal built as a professional portfolio showcase.**

</div>

---

## 🌐 Live Demo

> **🚀 View the live website here:**
> ## 👉 [https://cobotte.github.io/Medocyn-Healthcare/](https://cobotte.github.io/Medocyn-Healthcare/)

The application runs as a fully static website on GitHub Pages using a client-side data simulation layer. All appointments and registrations are persisted in your browser's local storage — no backend server required.

---

## 📸 Preview

| Home Page | Appointment Booking | Patient Portal |
|:---------:|:-------------------:|:--------------:|
| Full featured landing page with hero, services, departments, testimonials, and newsletter | Multi-step appointment wizard with doctor & slot selection | Secure patient dashboard with records, notifications & profile |

---

## ✨ Key Features

### 🏠 Landing Page
- Animated hero section with emergency quick-booking
- Department showcase grid
- Doctor profile cards
- Testimonials and statistics
- Newsletter subscription

### 📅 Appointment Booking Wizard
- 4-step guided booking flow
- Department & doctor selection
- Calendar slot picker
- Patient detail collection
- Confirmation system

### 🧑‍⚕️ Patient Portal
- Secure login (simulated credentials)
- Medical records dashboard
- Appointment history & upcoming
- Notification centre
- Profile & settings management

### 🖥️ Admin Dashboard
- Live statistics (patients, appointments, newsletters)
- Appointment management table
- Contact message inbox
- Patient records overview

### 🔬 Database Inspector
- Real-time table viewer
- JSON schema explorer
- Record filtering and search

### 📝 Content Pages
- Medical blog with dynamic slug routing
- Department-specific doctor listings
- Health packages & pricing tiers
- Contact form with multiple methods
- FAQs, Privacy Policy, Terms & Conditions

---

## 🛠️ Technologies Used

| Category | Technology |
|----------|-----------|
| **Framework** | [Next.js 15](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) + Vanilla CSS |
| **Icons** | Custom SVG icon system |
| **Database (Dev)** | [SQLite](https://sqlite.org/) via [Prisma ORM](https://www.prisma.io/) |
| **Client DB (Demo)** | `localStorage` + `MockApiProvider` fetch interceptor |
| **Static Export** | `next build` with `output: "export"` -> `/out` -> GitHub Pages |
| **CI/CD** | GitHub Actions |
| **Deployment** | GitHub Pages |
| **Fonts** | Inter + Poppins (Google Fonts) |

---

## 📁 Project Structure

```
medocyn-healthcare/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD → GitHub Pages
├── prisma/
│   └── schema.prisma           # Database schema (SQLite, dev only)
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About company page
│   │   ├── admin/              # Admin dashboard
│   │   ├── appointment/        # Appointment booking wizard
│   │   ├── blog/               # Blog list + dynamic [slug] posts
│   │   ├── contact/            # Contact form page
│   │   ├── database-inspector/ # Live DB viewer
│   │   ├── departments/        # Medical departments listing
│   │   ├── doctors/            # Doctor profiles
│   │   ├── faqs/               # FAQ accordion
│   │   ├── faq/                # Static FAQ alias for Pages demo
│   │   ├── health-packages/    # Pricing and package tiers
│   │   ├── patient-portal/     # Patient dashboard
│   │   ├── portal/             # Static portal alias for Pages demo
│   │   ├── privacy/            # Static privacy alias for Pages demo
│   │   ├── privacy-policy/     # Privacy policy
│   │   ├── services/           # Medical services overview
│   │   ├── terms/              # Terms & conditions
│   │   ├── globals.css         # Global CSS + Tailwind tokens
│   │   ├── layout.tsx          # Root layout with providers
│   │   └── page.tsx            # Landing homepage
│   ├── components/
│   │   ├── common/             # Logo, Icons, MockApiProvider, CookieConsent
│   │   └── layout/             # Header, Footer, Breadcrumbs
│   ├── constants/              # Static data, mock records
│   ├── context/                # ThemeContext (light/dark)
│   └── lib/                    # SEO helpers, DB adapter
├── next.config.ts              # Next.js config (static export, GitHub Pages basePath)
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js 18+](https://nodejs.org/)
- npm 9+

### 1. Clone the Repository
```bash
git clone https://github.com/cobotte/Medocyn-Healthcare.git
cd Medocyn-Healthcare
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000)

### 4. Build & Export Static Site
```bash
npm run build
```
Compiled static output is inside the `/out` directory.

For the GitHub Pages repository path locally:
```bash
GITHUB_ACTIONS=true npm run build
```

On Windows PowerShell:
```powershell
$env:GITHUB_ACTIONS='true'; npm run build; Remove-Item Env:\GITHUB_ACTIONS
```

---

## 🔑 Demo Credentials

Since this runs in client-side simulation mode, use the following pre-seeded credentials:

### 🧑‍⚕️ Patient Login
| Field | Value |
|-------|-------|
| **Email** | `sarah.johnson@example.com` |
| **Password** | `password123` |

### 🔐 Admin Login
| Field | Value |
|-------|-------|
| **Email** | `admin@medocyn.com` |
| **Password** | `admin123` |

---

## 🚀 GitHub Pages Deployment

This project is deployed automatically via **GitHub Actions** on every push to the `main` branch.

**Deployment URL:** [https://cobotte.github.io/Medocyn-Healthcare/](https://cobotte.github.io/Medocyn-Healthcare/)

The workflow:
1. Checks out the code
2. Installs Node.js 20 & dependencies
3. Runs `npm run build` with `GITHUB_ACTIONS=true` to set the correct `basePath`
4. Uploads the `/out` folder as a GitHub Pages artifact
5. Deploys to `https://cobotte.github.io/Medocyn-Healthcare/`

---

## 🏢 About Cobotte Solutions

This project was built by **[Cobotte Solutions](https://github.com/cobotte)** — a software development agency delivering premium web applications, enterprise dashboards, and digital healthcare platforms.

**Contributor:** [@kriscode180402](https://github.com/kriscode180402)

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ by [Cobotte Solutions](https://github.com/cobotte)**

</div>
