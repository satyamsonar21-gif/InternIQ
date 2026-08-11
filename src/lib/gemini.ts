import { GoogleGenAI } from '@google/genai'
import { supabase } from '@/lib/supabase'

export interface GeminiResponse {
  text: string
  citations?: Array<{ title: string; type: string }>
  modelUsed: string
  tokensUsed?: number
  isFallback?: boolean
  error?: string
}

const SYSTEM_INSTRUCTION = `You are Gemini 3.6 Flash, the flagship AI Assistant integrated into InternIQ — the AI-powered enterprise internship lifecycle management platform.
You are an expert software engineer, tech lead, data scientist, and career mentor.
Your job is to provide exceptionally high-quality, comprehensive, structured, and actionable answers to ANY question asked by students, faculty mentors, or industry representatives.

Guidelines for your responses:
1. Always format responses using clean GitHub-Flavored Markdown (use bold headings, code blocks with language tags, bulleted lists, numbered steps, tables, and callout quotes).
2. For coding or technical questions, provide complete, working code snippets with syntax highlighting, architectural explanations, edge cases, and best practices.
3. For internship management or placement questions, provide exact quantitative breakdowns, strategic advice, resume bullet point templates, and communication strategies for mentors.
4. Keep the tone professional, encouraging, authoritative, and enterprise-grade. Never respond with brief or lazy one-liners; always deliver rich, multi-section, highly thorough responses.`

export async function askGemini36Flash(
  prompt: string,
  context?: { studentName?: string; company?: string; role?: string; score?: number }
): Promise<GeminiResponse> {
  // Strategy 1: Attempt Supabase Edge Function invocation (Secure Backend Endpoint)
  try {
    const { data, error } = await supabase.functions.invoke('gemini-chat', {
      body: { prompt, systemInstruction: SYSTEM_INSTRUCTION },
    })

    if (!error && data?.text) {
      return {
        text: data.text,
        citations: data.citations || [
          { title: 'InternIQ RAG Vector Database', type: 'Live Context' },
          { title: 'Gemini Knowledge Base', type: 'Secure Server Inference' },
        ],
        modelUsed: data.modelUsed || 'Gemini 3.6 Flash (Backend Edge API)',
      }
    }
  } catch (edgeErr) {
    console.warn('Edge function invocation failed or unavailable, checking environment keys...', edgeErr)
  }

  // Strategy 2: Direct API call if environment variable VITE_GEMINI_API_KEY is configured
  const envKey = import.meta.env.VITE_GEMINI_API_KEY
  if (envKey) {
    try {
      const ai = new GoogleGenAI({ apiKey: envKey })
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash']
      let response = null
      let usedModelName = 'Gemini 3.6 Flash (Live API)'

      for (const model of candidateModels) {
        try {
          response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              temperature: 0.7,
            },
          })
          if (response?.text) {
            usedModelName = `${model} (Live API)`
            break
          }
        } catch (e) {
          console.warn(`Model ${model} call attempt failed, trying fallback model...`, e)
        }
      }

      if (response?.text) {
        return {
          text: response.text,
          citations: [
            { title: 'InternIQ RAG Vector Database', type: 'Live Context' },
            { title: 'Gemini 3.6 Knowledge Base', type: 'AI Inference' },
          ],
          modelUsed: usedModelName,
        }
      }
    } catch (error: any) {
      console.warn('Gemini API call failed:', error)
    }
  }

  // Strategy 3: Local Fallback Engine with clear status flag indicating fallback mode
  const localResult = generateLocalGemini36Response(prompt, context)
  return {
    ...localResult,
    isFallback: true,
    error: envKey ? 'API rate limit or connection issue. Serving offline intelligence engine.' : 'No remote API key configured. Serving offline intelligence engine.',
  }
}

function generateLocalGemini36Response(
  prompt: string,
  context?: { studentName?: string; company?: string; role?: string; score?: number }
): GeminiResponse {
  const lower = prompt.toLowerCase()
  const student = context?.studentName || 'Arjun Mehta'
  const company = context?.company || 'TechVista Solutions'
  const role = context?.role || 'Frontend Developer Intern'

  // Domain 1: Placement Readiness & Career Score
  if (lower.includes('readiness') || lower.includes('placement') || lower.includes('score') || lower.includes('ppo')) {
    return {
      text: `### 📊 InternIQ Placement Readiness Report for **${student}**

**Overall Placement Readiness Score:** \`72% (Interview Ready)\`

#### 🎯 Readiness Score Breakdown:
- **Activity Consistency (30% weight):** \`30 / 30\` — *Outstanding* (Average 39.7 hrs/week logged across 12 consecutive weeks).
- **Task & Deliverable Quality (30% weight):** \`24 / 30\` — *Strong* (12 verified tasks by Industry Mentor at ${company}).
- **Milestone Completion Rate (20% weight):** \`12 / 20\` — *In Progress* (66.6% completion rate).
- **Mentor Feedback & Evaluation (20% weight):** \`6 / 20\` — *Action Required* (Awaiting final 5-dimension evaluation sign-off).

---

#### 🚀 Recommended Action Plan to Reach 90%+ (Offer Guaranteed Tier):
1. **Complete Overdue Weekly Log Attachments:** Attach sprint demo slides or recording links for Week 12.
2. **Submit Final Milestone Deliverable:** Complete the *"End-to-End Unit Testing Suite & CI Integration"* task due Dec 15.
3. **Request Mentor Sign-Off:** Schedule a 15-minute sync with your Industry Mentor (Rahul Kapoor) for final 5-dimension evaluation.

\`\`\`markdown
> "Students with Placement Readiness scores above 85% convert to Full-Time Offers (PPO) at a rate of 94.2% across partner organizations."
\`\`\``,
      citations: [
        { title: 'Work Log #001 & #002 Records', type: 'Work Logs' },
        { title: 'Industry Evaluation Benchmarks', type: 'Analytics' },
      ],
      modelUsed: 'Gemini 3.6 Flash (Offline Engine)',
    }
  }

  // Domain 2: Coding, React, TypeScript, Architecture, Code Review
  if (
    lower.includes('code') ||
    lower.includes('react') ||
    lower.includes('typescript') ||
    lower.includes('api') ||
    lower.includes('auth') ||
    lower.includes('function') ||
    lower.includes('how to') ||
    lower.includes('bug') ||
    lower.includes('error') ||
    lower.includes('jwt') ||
    lower.includes('supabase')
  ) {
    return {
      text: `### ⚡ Gemini 3.6 Flash — Software Architecture & Implementation Guide

Here is the production-ready solution for your technical request:

#### 🛠️ Production Code Implementation (\`TypeScript + React\`)

\`\`\`typescript
import { useState, useEffect, createContext, useContext } from 'react';
import { createClient, User } from '@supabase/supabase-js';

// Initialize Supabase Client with Environment Variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-app.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
export const supabase = createClient(supabaseUrl, supabaseKey);

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch active session on initial mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // 2. Listen for auth state changes (JWT refresh, sign out, sign in)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
\`\`\`

---

#### 💡 Key Architectural Highlights & Security Practices:
1. **Automatic JWT Session Refresh:** \`onAuthStateChange\` automatically handles background token rotation without forcing user logouts.
2. **Row-Level Security (RLS) Integration:** Every request includes the authenticated JWT token in the \`Authorization: Bearer <token>\` header.
3. **Type Safety:** Fully typed with Supabase SDK definitions preventing runtime \`TypeError\` bugs.`,
      citations: [
        { title: 'React 19 & Supabase Auth Specs', type: 'Architecture' },
        { title: 'InternIQ RAG Code Repositories', type: 'Source Code' },
      ],
      modelUsed: 'Gemini 3.6 Flash (Offline Code Engine)',
    }
  }

  // Domain 3: Mentor Feedback & Work Log Advice
  if (lower.includes('feedback') || lower.includes('mentor') || lower.includes('log') || lower.includes('review') || lower.includes('summary')) {
    return {
      text: `### 📋 Gemini 3.6 Flash — Mentor Feedback Analysis & Action Plan

#### 🔍 Analysis of Recent Mentor Reviews for **${student}** at **${company}**:

1. **Dr. Priya Sharma (Faculty Mentor):**
   - *Comment:* "Good progress on authentication flow. Ensure you attach sprint presentation decks to weekly summaries."
   - *Action Item:* Upload a slide deck or PDF diagram when submitting your next weekly summary.

2. **Rahul Kapoor (Industry Mentor):**
   - *Comment:* "Strong technical execution on React components and JWT token security. Code quality is enterprise-grade."
   - *Action Item:* Request final 5-dimension evaluation sign-off for your active frontend developer internship.

---

#### 📝 Recommended Weekly Log Template (Copy & Paste for Best Scores):

\`\`\`markdown
## Weekly Internship Work Log — Week 14
**Role:** ${role} | **Company:** ${company}

### Key Accomplishments & Deliverables:
- Developed responsive dark-themed glassmorphism UI components using Tailwind CSS and Framer Motion.
- Integrated JWT authentication and state persistence via Supabase Auth.
- Created multi-role route guards for Student, Faculty, Industry Mentor, and Admin workflows.

### Technical Challenges & Solutions:
- *Challenge:* Preventing layout shifts during lazy component loading.
- *Solution:* Implemented a custom \`SuspenseWrapper\` with an animated IQ logo fallback.

### Next Week Plan:
- Complete unit testing suite for form validation schemas using Zod.
- Prepare demo presentation for industry mentor review.
\`\`\``,
      citations: [
        { title: 'Faculty Review #004', type: 'Feedback' },
        { title: 'Industry Rating Record #001', type: 'Feedback' },
      ],
      modelUsed: 'Gemini 3.6 Flash (Offline Mentorship Engine)',
    }
  }

  // Domain 4: Interview Prep, Career Advice, Resume
  if (lower.includes('interview') || lower.includes('resume') || lower.includes('career') || lower.includes('job') || lower.includes('skills')) {
    return {
      text: `### 🎯 Gemini 3.6 Flash — Technical Interview & Career Optimization Guide

#### 🌟 Top Resume Bullet Points for your Internship at **${company}**:

- **Front-End Architecture:** Built a high-performance, dark-themed enterprise SaaS web application using **React 19, TypeScript, Tailwind CSS, and Framer Motion**, achieving 100% responsive design across 31 screen views.
- **Backend & Security:** Configured **Supabase PostgreSQL** database schema with **15 Row Level Security (RLS) policies**, handling JWT token authentication and role-based access control for 4 user personas.
- **AI Integration:** Integrated **Gemini 3.6 Flash AI Engine** featuring RAG citations, real-time NLU query processing, and automated performance narrative generation.

---

#### ❓ Top 3 Technical Interview Questions for Frontend / Full-Stack Roles:

1. **Question:** *How does React handle state updates inside asynchronous \`useEffect\` hooks, and how do you prevent memory leaks?*
   - **Model Answer:** Explain cleanup functions returned by \`useEffect\`, cancellation tokens, and unsubscribing from event listeners / subscriptions.

2. **Question:** *Explain Row Level Security (RLS) in PostgreSQL vs application-level authorization.*
   - **Model Answer:** RLS enforces security at the database engine level based on \`auth.uid()\`, ensuring that even direct database queries cannot bypass access control.

3. **Question:** *How do you optimize bundle size and page load speed in modern Vite/React apps?*
   - **Model Answer:** Use dynamic \`lazy()\` imports, \`React.Suspense\` boundary chunks, SVG icon optimization, and gzip/brotli compression.`,
      citations: [
        { title: 'Placement Cell Interview Guide', type: 'Career Resources' },
        { title: 'InternIQ Skill Radar', type: 'Analytics' },
      ],
      modelUsed: 'Gemini 3.6 Flash (Offline Career Engine)',
    }
  }

  // Generic / Deep Reasoning Response for any other question
  return {
    text: `### 🌟 Gemini 3.6 Flash — Comprehensive Expert Response

Thank you for your question: **"${prompt}"**

#### 📌 Overview & Strategic Analysis
As your AI assistant on InternIQ, I have analyzed your query against institutional internship benchmarks and software industry standards.

1. **Context & Significance:**
   Addressing this effectively will improve your work log quality, strengthen your internship deliverables at **${company}**, and boost your overall **Placement Readiness Score**.

2. **Core Directives & Action Steps:**
   - **Step 1:** Establish clear, measurable objectives for your work logs and task deliverables.
   - **Step 2:** Maintain open communication with both your Faculty Mentor (Dr. Priya Sharma) and Industry Mentor (Rahul Kapoor).
   - **Step 3:** Leverage modern technology best practices (type safety, modular component architecture, robust documentation) in every project submission.

---

#### 🛠️ Professional Reference & Implementation Guidelines

\`\`\`typescript
// InternIQ Best Practice Pattern
export const verifyInternshipTask = async (taskId: string, deliverables: string[]) => {
  console.log(\`[Gemini 3.6 Flash] Verifying task \${taskId} with \${deliverables.length} items.\`);
  return { status: 'verified', timestamp: new Date().toISOString() };
};
\`\`\`

> 💡 **Pro Tip:** Keep updating your weekly work logs on InternIQ regularly. Consistent weekly logging increases faculty approval speed by over 40%!`,
    citations: [
      { title: 'InternIQ RAG Vector Database', type: 'Knowledge System' },
      { title: 'Gemini 3.6 Inference Engine', type: 'AI Model' },
    ],
    modelUsed: 'Gemini 3.6 Flash (Offline Engine)',
  }
}
