# Nexus

Nexus is Braintrust’s unified Admin + Client portal: a web application that provisions customers, tracks onboarding, runs automated workflows, and surfaces ROI in real-time.  
Built with **Next.js 15**, **Supabase**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**.

---

## ✨ Features

### Shared Core  
- 🔐 Email / password authentication via Supabase Auth  
- 🛡️ Role-based access (Admin • Solutions Engineer • Client) enforced with Row-Level Security  
- 🎛️ Typed RPC layer (PostgreSQL functions) keeps business logic in the DB  
- 🌗 Dark / Light theme switcher with `next-themes`  

### Admin View  
- Global dashboards with ITD / YTD / QTD / 30 d / 7 d filters  
- Client manager (CRUD) + SE assignment  
- Subscription-plan editor & invoice centre  
- Exception explorer with severity filters  
- Revenue, time-saved and execution analytics  

### Client View  
- Visual onboarding pipeline (11 phases)  
- Workflow ROI: executions, $-saved, time-saved, exceptions  
- Raw workflow log explorer  
- Credential vault (encrypted at rest – Secrets Manager ready)  
- In-app billing dashboard & invoice downloads (PDF)  

---

## 🖥️ Demo

📋 Prerequisites
Node.js ≥ 18 (LTS)
Docker Desktop (for local Supabase)
Supabase CLI → brew install supabase/tap/supabase (For Mac OS)

### 1 Clone
```bash
git clone https://github.com/TR1R0G/nexus-dashboard/
cd nexus-dashboard
```

### 2 Install deps
```bash
npm install                # or: pnpm install
```

### 3 Set up environment variables: Create a .env.local file in the root directory with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://klntdpdepvwopbwzyhdx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbnRkcGRlcHZ3b3Bid3p5aGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgxNDEzMjQsImV4cCI6MjA2MzcxNzMyNH0.ufMOZSVwna6q6vXb8oqROCyCcp84l7o8S_TiCV4cBvo
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbnRkcGRlcHZ3b3Bid3p5aGR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0ODE0MTMyNCwiZXhwIjoyMDYzNzE3MzI0fQ.DZIq1SIXbPCf1wkXqjg6SjlNDR5yMXeE3sw_DUPK5bI
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4 Run the dev server
```bash
npm run dev            # http://localhost:3000
```
