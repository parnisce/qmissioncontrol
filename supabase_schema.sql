-- Q Mission Control - Supabase Database Schema

-- 1. AI Employees
CREATE TABLE ai_employees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  status TEXT NOT NULL, -- e.g., 'Active', 'Idle', 'Training'
  avatar_url TEXT,
  success_rate NUMERIC,
  tasks_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Marketplace Skills
CREATE TABLE marketplace_skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  best_for TEXT,
  price TEXT NOT NULL, -- e.g., '$15 / task'
  icon_name TEXT NOT NULL, -- e.g., 'Search', 'Link', 'LayoutTemplate'
  color_class TEXT, -- e.g., 'text-emerald-400'
  bg_class TEXT,
  ring_class TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert dummy data for Marketplace Skills
INSERT INTO marketplace_skills (name, description, best_for, price, icon_name, color_class, bg_class, ring_class) VALUES
('Keyword Researcher', 'Find high-value keywords with low competition and high intent.', 'Content strategy, SEO planning', '$15 / task', 'Search', 'text-emerald-400', 'bg-emerald-950/40', 'ring-emerald-900/50'),
('On-Page SEO Optimizer', 'Optimize titles, meta tags, headers, and content for better rankings.', 'New pages, content updates', '$20 / page', 'LayoutTemplate', 'text-blue-400', 'bg-blue-950/40', 'ring-blue-900/50'),
('Link Building Specialist', 'Find quality backlink opportunities and manage outreach.', 'Authority building, off-page SEO', '$35 / link', 'Link', 'text-cyan-400', 'bg-cyan-950/40', 'ring-cyan-900/50'),
('Technical SEO Auditor', 'Scan and report technical issues that impact performance.', 'Site health, performance improvement', '$45 / audit', 'ShieldCheck', 'text-amber-400', 'bg-amber-950/40', 'ring-amber-900/50'),
('Content Gap Analyst', 'Discover content gaps and topic opportunities your competitors rank for.', 'Content planning, topic strategy', '$25 / report', 'FileText', 'text-emerald-400', 'bg-emerald-950/40', 'ring-emerald-900/50'),
('Competitor Analyst', 'Analyze competitors'' strategies and uncover growth opportunities.', 'Ongoing SEO monitoring', '$30 / report', 'Target', 'text-fuchsia-400', 'bg-fuchsia-950/40', 'ring-fuchsia-900/50'),
('Rank Tracker Reporter', 'Track rankings across keywords and deliver actionable reports.', 'Rank tracking, performance reporting', '$10 / report', 'LineChart', 'text-teal-400', 'bg-teal-950/40', 'ring-teal-900/50'),
('Schema Markup Expert', 'Implement schema markup to improve rich results and CTR.', 'Rich results, visibility boost', '$30 / page', 'Code', 'text-purple-400', 'bg-purple-950/40', 'ring-purple-900/50');

-- 3. Workflows
CREATE TABLE workflows (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  trigger_type TEXT NOT NULL,
  status TEXT NOT NULL, -- 'Active', 'Inactive', 'Draft'
  total_runs INTEGER DEFAULT 0,
  success_rate NUMERIC,
  avg_duration TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Workflow Executions (Live Activity)
CREATE TABLE workflow_executions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
  execution_code TEXT NOT NULL, -- e.g., '#24567'
  status TEXT NOT NULL, -- 'Running', 'Completed', 'Failed'
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  duration TEXT,
  progress INTEGER DEFAULT 0
);

-- 5. Tasks
CREATE TABLE tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL, -- 'In Progress', 'Completed', 'Pending'
  assigned_employee_id UUID REFERENCES ai_employees(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE
);
