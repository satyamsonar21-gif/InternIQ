# InternIQ — AI-Powered Internship Lifecycle & Placement Readiness Platform

[![CI/CD Pipeline](https://github.com/satyamsonar21-gif/InternIQ/actions/workflows/ci.yml/badge.svg)](https://github.com/satyamsonar21-gif/InternIQ/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20RLS-3ecf8e.svg)](https://supabase.com/)
[![Vitest](https://img.shields.io/badge/Vitest-3.0-yellow.svg)](https://vitest.dev/)

**InternIQ** is an enterprise-grade AI-powered platform designed to connect Students, Faculty Mentors, Industry Mentors, and Institutional Administrators. It streamlines the complete internship lifecycle, automates work log submissions, tracks project milestones, and calculates institutional placement readiness scores.

---

## 🏛 System Architecture & Technology Stack

```
                                InternIQ Platform
                                       │
        ┌──────────────────────────────┴──────────────────────────────┐
        │                                                             │
   React 19 UI                                                   Supabase Backend
(Vite + Tailwind)                                                (PostgreSQL)
        │                                                             │
  ProtectedRoute                                              ┌───────┴───────┐
  (Role Scopes)                                               │               │
        │                                                Auth (JWT)        RLS Policies
        ▼                                                     │               │
  Zod Validation                                              └───────┬───────┘
        │                                                             │
        └──────────────────────────────┬──────────────────────────────┘
                                       │
                                       ▼
                             Supabase Edge Functions
                             (Deno Server-Side API)
                                       │
                                 Google Gemini
```

### Core Technologies
- **Frontend Framework**: React 19, Vite 8, TypeScript 5, Tailwind CSS v4, Framer Motion, Recharts.
- **Backend & Security**: Supabase, PostgreSQL 15, Supabase Auth (JWT), Row Level Security (RLS), Supabase Edge Functions.
- **AI Engine**: Google GenAI (`gemini-2.5-flash`), Supabase Edge API endpoints.
- **Quality & Guardrails**: Zod Payload Validation, Vitest 3 Unit Test Suite, Oxlint, GitHub Actions CI/CD Pipeline.

---

## 🔐 Security & Authentication Architecture

1. **Authentication Flow**:
   - `AuthContext.tsx` integrates directly with `supabase.auth.signInWithPassword()` and `supabase.auth.signUp()`.
   - JWT sessions are issued and refreshed automatically by Supabase Auth.
   - User profile records are synchronized with the `public.profiles` PostgreSQL table.

2. **Row-Level Security (RLS)**:
   - Infinite recursion protection enabled via `public.is_admin(user_id uuid)` `SECURITY DEFINER` function.
   - Granular table policies enforce ownership restrictions (`student_id = auth.uid()`) and role scopes across all tables (`profiles`, `work_logs`, `tasks_milestones`, `evaluations`, `notifications`, `audit_logs`).

3. **API Key Security**:
   - Zero client-side API key exposure. Remote AI requests are proxied via Supabase Edge Function `supabase/functions/gemini-ai/index.ts` using server environment secrets (`GEMINI_API_KEY`).

---

## 📊 Deterministic Placement Readiness Scoring Engine

Placement readiness is calculated deterministically via `src/domain/placement/calculateReadiness.ts` using verified student metrics:

$$\text{Readiness Score} = (\text{Work Logs } \times 0.30) + (\text{Milestones } \times 0.20) + (\text{Task Quality } \times 0.20) + (\text{Mentor Evaluation } \times 0.20) + (\text{Skill Assessment } \times 0.10)$$

AI explains score breakdowns and offers strategic advice, but **never manufactures** institutional metrics.

---

## 📂 Repository Structure

```
InternIQ/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Automated GitHub Actions CI Pipeline
├── src/
│   ├── components/                # Reusable UI components & ErrorBoundary
│   ├── contexts/
│   │   └── AuthContext.tsx        # Supabase Authentication & Profile context
│   ├── demo/
│   │   └── demoUsers.ts           # Isolated development demo accounts
│   ├── domain/
│   │   └── placement/
│   │       ├── calculateReadiness.ts       # Deterministic scoring engine
│   │       └── calculateReadiness.test.ts  # Vitest test suite
│   ├── lib/
│   │   ├── asyncHandler.ts        # Async wrapper & submission debouncer
│   │   ├── env.ts                 # Runtime environment guardrails
│   │   ├── fileValidation.ts      # 5MB size limit & MIME type checking
│   │   ├── gemini.ts              # Server-proxied AI Assistant client
│   │   ├── logger.ts              # Structured logger with x-request-id
│   │   ├── supabase.ts            # Supabase client single source of truth
│   │   └── validation.ts          # Zod request validation schemas
│   ├── pages/
│   │   ├── admin/                 # Admin management portals
│   │   ├── auth/                  # Login, Register, Forgot Password, Onboarding
│   │   ├── dashboard/             # Role-specific dashboards
│   │   ├── faculty/               # Faculty mentor evaluation pages
│   │   ├── industry/              # Industry mentor task dispatches
│   │   ├── shared/                # Profile, Notifications, 404, 403 pages
│   │   └── student/               # Student work logs, milestones, AI assistant
│   ├── types/
│   │   ├── database.ts            # Supabase Database Types
│   │   └── index.ts               # Core TypeScript interfaces
│   ├── router.tsx                 # Route definitions & ProtectedRoute guards
│   └── main.tsx                   # React root entry point with ErrorBoundary
├── supabase/
│   ├── functions/
│   │   └── gemini-ai/index.ts     # Server-side Gemini Edge Function
│   ├── migrations/
│   │   └── 001_initial_schema.sql # PostgreSQL schema, RLS policies, & indexes
│   └── seed.sql                   # Development seed SQL data
├── .env.example                   # Environment variable template
├── package.json
└── vite.config.ts
```

---

## 🛠 Local Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Quickstart

```bash
# 1. Clone the repository
git clone https://github.com/satyamsonar21-gif/InternIQ.git
cd InternIQ

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Start local development server
npm run dev
```

### Running Test Suite & Linting

```bash
# Run Vitest unit test suite
npm test

# Run Oxlint static analysis
npm run lint

# Run production build check
npm run build
```

---

## ⚙️ Environment Variables (`.env.example`)

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Optional Development Settings
VITE_DEMO_MODE=false
```

---

## 📜 License & Author

Developed for institutional internship and placement management. Built with React 19, Supabase, and Google Gemini AI.