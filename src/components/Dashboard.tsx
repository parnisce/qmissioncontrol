import React from 'react';
import { 
  LayoutDashboard, Target, Activity, BarChart2, Users, Building2, GitBranch, Calendar, 
  Store, Blocks, LogOut, Command, Plus, 
  SlidersHorizontal, Clock, RotateCw, Sparkles, ChevronRight, 
  MoreVertical, ArrowUpRight, Maximize2, MessageSquare, Monitor,
  Radio, Database, Globe, ChevronDown, CircleDot, TrendingUp, CheckCircle2,
  Menu, X, Folder, CreditCard, Search, Bell, Grid, List, ArrowLeft, ExternalLink,
  Zap, Play, Share2, Megaphone, Mail, Filter, MoreHorizontal, ChevronLeft, Download,
  ClipboardList, Star, Eye, Server, Cloud, RefreshCw, AlertTriangle,
  ShoppingCart, Bookmark, MessageCircle, FileText, Link, Code, ShieldCheck, LineChart as LineChartIcon, LayoutTemplate, ArrowRight
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, LabelList,
  LineChart, Line
} from 'recharts';
import CountUpRaw from 'react-countup';
import GaugeComponentRaw from 'react-gauge-component';
import { WorldMap } from './WorldMap';
import { supabase } from '../lib/supabase';

// Resolve default import mismatch in Vite dev server
const CountUp = (CountUpRaw as any).default || CountUpRaw;
const GaugeComponent = (GaugeComponentRaw as any).default || GaugeComponentRaw;

const SidebarSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-4">{title}</h3>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

const SidebarItem = ({ icon: Icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) => (
  <div onClick={onClick} className={`flex items-center space-x-3 px-4 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-cyan-900/20 text-cyan-400 border-l-2 border-cyan-400 pl-3.5' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'}`}>
    <Icon size={18} className={active ? 'text-cyan-400' : 'text-slate-500'} />
    <span className="text-sm font-medium">{label}</span>
  </div>
);

// Chart Data
const tasksData = [
  { name: 'Mon', thisWeek: 30, lastWeek: 15 },
  { name: 'Tue', thisWeek: 50, lastWeek: 20 },
  { name: 'Wed', thisWeek: 75, lastWeek: 45 },
  { name: 'Thu', thisWeek: 60, lastWeek: 40 },
  { name: 'Fri', thisWeek: 105, lastWeek: 65 },
  { name: 'Sat', thisWeek: 135, lastWeek: 85 },
  { name: 'Sun', thisWeek: 125, lastWeek: 110 },
];

const statusData = [
  { name: 'Completed', value: 54, color: '#22c55e' },
  { name: 'In Progress', value: 45, color: '#3b82f6' },
  { name: 'Review', value: 18, color: '#eab308' },
  { name: 'Blocked', value: 7, color: '#ef4444' },
  { name: 'Cancelled', value: 4, color: '#64748b' },
];

const impactData = [
  { name: 'Time Saved (h)', value: 60, display: '36.4h', fill: '#10b981' },
  { name: 'Tasks Automated', value: 90, display: '87%', fill: '#3b82f6' },
  { name: 'Cost Saved ($)', value: 75, display: '$12,420', fill: '#0ea5e9' },
];

const CustomBarLabel = (props: any) => {
  const { x, y, width, index } = props;
  const displayValue = impactData[index]?.display || '';
  return (
    <text x={x + width / 2} y={y + 12} fill="#020617" textAnchor="middle" dominantBaseline="middle" style={{ fontSize: '10px', fontWeight: 'bold' }}>
      {displayValue}
    </text>
  );
};

const speedData = [
  { name: 'Mon', speed: 1.4 },
  { name: 'Tue', speed: 1.5 },
  { name: 'Wed', speed: 1.1 },
  { name: 'Thu', speed: 1.3 },
  { name: 'Fri', speed: 1.8 },
  { name: 'Sat', speed: 1.6 },
  { name: 'Sun', speed: 2.1 },
];

const brandsData = [
  {
    name: 'Digital Legends',
    type: 'Company',
    subtitle: 'AI Automation & Business Growth Platform',
    desc: 'AI-powered solutions to help businesses automate, scale, and dominate through intelligent automation.',
    aiEmployees: 10,
    workflows: 18,
    tasksCompleted: 256,
    createdDate: 'Created on May 10, 2025',
    logoBg: 'bg-gradient-to-br from-blue-950 to-indigo-950 border-blue-900/50 text-blue-400',
    logoText: 'DL',
    badgeColor: 'bg-teal-500/10 text-teal-400 border-teal-500/20'
  },
  {
    name: 'Autophagy Fasting App',
    type: 'Brand',
    subtitle: 'Health & Wellness • Fasting Tracker',
    desc: 'Help users track their fasting journey, improve health, and live a better life through science.',
    aiEmployees: 6,
    workflows: 8,
    tasksCompleted: 126,
    createdDate: 'Created on May 12, 2025',
    logoBg: 'bg-[#1b2f21] border-[#22c55e]/20 text-[#22c55e]',
    logoIcon: 'leaf',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    name: 'Ramadan Fasting App',
    type: 'Brand',
    subtitle: 'Ramadan Companion • Fasting Tracker',
    desc: 'A complete Ramadan companion to track fasts, prayer times, and spiritual growth.',
    aiEmployees: 4,
    workflows: 6,
    tasksCompleted: 98,
    createdDate: 'Created on May 15, 2025',
    logoBg: 'bg-[#291b3d] border-[#d946ef]/20 text-[#d946ef]',
    logoIcon: 'moon',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  },
  {
    name: 'One Global Fasting App',
    type: 'Brand',
    subtitle: 'Global Fasting Community • Tracker',
    desc: 'Uniting the world through fasting. Track, connect, and grow together for a healthier tomorrow.',
    aiEmployees: 4,
    workflows: 5,
    tasksCompleted: 87,
    createdDate: 'Created on May 18, 2025',
    logoBg: 'bg-[#1b2b3d] border-[#06b6d4]/20 text-[#06b6d4]',
    logoIcon: 'globe',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
  }
];

export const aiEmployeesList = [
  {
    id: 'AI-EMP-001',
    name: 'Content Writer AI',
    role: 'Content Writer',
    roleBadge: 'Content Writer AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Content Creation',
    status: 'Active',
    perf: 98.5,
    tasks: 128,
    lastActive: '2 min ago',
    desc: 'Creates high-quality, SEO-optimized content for blogs, landing pages, and marketing campaigns.',
    brandAccess: '4 Brands',
    joinedOn: 'Apr 18, 2025',
    languages: 'English, Arabic',
    workload: 78,
    perfTrend: [
      { name: 'W1', val: 94 },
      { name: 'W2', val: 96 },
      { name: 'W3', val: 95 },
      { name: 'W4', val: 98.5 }
    ],
    tasksTrend: [
      { name: 'W1', val: 12 },
      { name: 'W2', val: 18 },
      { name: 'W3', val: 15 },
      { name: 'W4', val: 24 }
    ]
  },
  {
    id: 'AI-EMP-002',
    name: 'SEO Assistant AI',
    role: 'SEO Specialist',
    roleBadge: 'SEO Specialist AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 96.2,
    tasks: 96,
    lastActive: '4 min ago',
    desc: 'Conducts keyword research, optimizes on-page SEO factors, and monitors search rankings.',
    brandAccess: '3 Brands',
    joinedOn: 'Apr 20, 2025',
    languages: 'English, French',
    workload: 65,
    perfTrend: [
      { name: 'W1', val: 92 },
      { name: 'W2', val: 94 },
      { name: 'W3', val: 95 },
      { name: 'W4', val: 96.2 }
    ],
    tasksTrend: [
      { name: 'W1', val: 10 },
      { name: 'W2', val: 14 },
      { name: 'W3', val: 12 },
      { name: 'W4', val: 18 }
    ]
  },
  {
    id: 'AI-EMP-003',
    name: 'Data Analyst AI',
    role: 'Data Analyst',
    roleBadge: 'Data Analyst AI',
    roleBadgeColor: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
    dept: 'Analytics',
    status: 'Active',
    perf: 97.1,
    tasks: 85,
    lastActive: '6 min ago',
    desc: 'Processes system analytics, generates performance reports, and extracts optimization models.',
    brandAccess: '5 Brands',
    joinedOn: 'Apr 22, 2025',
    languages: 'English, Python',
    workload: 82,
    perfTrend: [
      { name: 'W1', val: 93 },
      { name: 'W2', val: 95 },
      { name: 'W3', val: 96 },
      { name: 'W4', val: 97.1 }
    ],
    tasksTrend: [
      { name: 'W1', val: 8 },
      { name: 'W2', val: 12 },
      { name: 'W3', val: 11 },
      { name: 'W4', val: 16 }
    ]
  },
  {
    id: 'AI-EMP-004',
    name: 'Social Media AI',
    role: 'Social Media Manager',
    roleBadge: 'Social Media AI',
    roleBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dept: 'Marketing',
    status: 'Idle',
    perf: 92.3,
    tasks: 64,
    lastActive: '15 min ago',
    desc: 'Schedules posts, monitors user engagement, and responds to messages across social platforms.',
    brandAccess: '4 Brands',
    joinedOn: 'Apr 25, 2025',
    languages: 'English, Spanish',
    workload: 50,
    perfTrend: [
      { name: 'W1', val: 90 },
      { name: 'W2', val: 91 },
      { name: 'W3', val: 89 },
      { name: 'W4', val: 92.3 }
    ],
    tasksTrend: [
      { name: 'W1', val: 6 },
      { name: 'W2', val: 10 },
      { name: 'W3', val: 8 },
      { name: 'W4', val: 12 }
    ]
  },
  {
    id: 'AI-EMP-005',
    name: 'Email Marketing AI',
    role: 'Email Marketer',
    roleBadge: 'Email Marketer AI',
    roleBadgeColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 95.7,
    tasks: 72,
    lastActive: '3 min ago',
    desc: 'Drafts and schedules email newsletters, performs A/B tests, and tracks click-through metrics.',
    brandAccess: '2 Brands',
    joinedOn: 'May 01, 2025',
    languages: 'English, German',
    workload: 55,
    perfTrend: [
      { name: 'W1', val: 91 },
      { name: 'W2', val: 93 },
      { name: 'W3', val: 94 },
      { name: 'W4', val: 95.7 }
    ],
    tasksTrend: [
      { name: 'W1', val: 8 },
      { name: 'W2', val: 12 },
      { name: 'W3', val: 10 },
      { name: 'W4', val: 14 }
    ]
  },
  {
    id: 'AI-EMP-006',
    name: 'Customer Support AI',
    role: 'Support Specialist',
    roleBadge: 'Support Specialist AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Customer Support',
    status: 'Active',
    perf: 94.8,
    tasks: 143,
    lastActive: '1 min ago',
    desc: 'Answers user inquiries in real-time, resolves basic support tickets, and maintains helpful customer interactions.',
    brandAccess: '4 Brands',
    joinedOn: 'May 03, 2025',
    languages: 'English, Multi-lingual',
    workload: 90,
    perfTrend: [
      { name: 'W1', val: 90 },
      { name: 'W2', val: 92 },
      { name: 'W3', val: 93 },
      { name: 'W4', val: 94.8 }
    ],
    tasksTrend: [
      { name: 'W1', val: 14 },
      { name: 'W2', val: 20 },
      { name: 'W3', val: 18 },
      { name: 'W4', val: 26 }
    ]
  },
  {
    id: 'AI-EMP-007',
    name: 'Video Editor AI',
    role: 'Video Editor',
    roleBadge: 'Video Editor AI',
    roleBadgeColor: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
    dept: 'Content Creation',
    status: 'Offline',
    perf: 87.6,
    tasks: 41,
    lastActive: '3 hours ago',
    desc: 'Applies color grading, trims segments, inserts visual overlays, and renders high-definition promo materials.',
    brandAccess: '3 Brands',
    joinedOn: 'May 08, 2025',
    languages: 'English',
    workload: 40,
    perfTrend: [
      { name: 'W1', val: 84 },
      { name: 'W2', val: 85 },
      { name: 'W3', val: 84 },
      { name: 'W4', val: 87.6 }
    ],
    tasksTrend: [
      { name: 'W1', val: 4 },
      { name: 'W2', val: 8 },
      { name: 'W3', val: 6 },
      { name: 'W4', val: 10 }
    ]
  },
  {
    id: 'AI-EMP-008',
    name: 'Ads Manager AI',
    role: 'Ads Manager',
    roleBadge: 'Ads Manager AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 97.9,
    tasks: 110,
    lastActive: '5 min ago',
    desc: 'Launches paid campaigns, manages daily ad spend budgets, and optimizes conversion channels.',
    brandAccess: '4 Brands',
    joinedOn: 'May 12, 2025',
    languages: 'English, French',
    workload: 75,
    perfTrend: [
      { name: 'W1', val: 94 },
      { name: 'W2', val: 95 },
      { name: 'W3', val: 96 },
      { name: 'W4', val: 97.9 }
    ],
    tasksTrend: [
      { name: 'W1', val: 10 },
      { name: 'W2', val: 16 },
      { name: 'W3', val: 14 },
      { name: 'W4', val: 22 }
    ]
  },
  {
    id: 'AI-EMP-009',
    name: 'Campaign Planner AI',
    role: 'Growth Specialist',
    roleBadge: 'Growth Specialist AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 95.8,
    tasks: 68,
    lastActive: '12 min ago',
    desc: 'Analyzes market trends, generates paid advertising strategies, and coordinates campaign schedules.',
    brandAccess: '3 Brands',
    joinedOn: 'May 14, 2025',
    languages: 'English',
    workload: 62,
    perfTrend: [{ name: 'W1', val: 90 }, { name: 'W4', val: 95.8 }],
    tasksTrend: [{ name: 'W1', val: 6 }, { name: 'W4', val: 12 }]
  },
  {
    id: 'AI-EMP-010',
    name: 'Brand Identity AI',
    role: 'Creative Designer',
    roleBadge: 'Creative Designer AI',
    roleBadgeColor: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
    dept: 'Content Creation',
    status: 'Active',
    perf: 96.5,
    tasks: 89,
    lastActive: '8 min ago',
    desc: 'Designs custom logos, selects color systems, and establishes visual guidelines across platforms.',
    brandAccess: '4 Brands',
    joinedOn: 'May 16, 2025',
    languages: 'English',
    workload: 70,
    perfTrend: [{ name: 'W1', val: 92 }, { name: 'W4', val: 96.5 }],
    tasksTrend: [{ name: 'W1', val: 8 }, { name: 'W4', val: 16 }]
  },
  {
    id: 'AI-EMP-011',
    name: 'UX Researcher AI',
    role: 'UX Architect',
    roleBadge: 'UX Architect AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Analytics',
    status: 'Active',
    perf: 94.3,
    tasks: 57,
    lastActive: '15 min ago',
    desc: 'Performs wireframe validation, user pathway optimization, and accessibility testing reviews.',
    brandAccess: '3 Brands',
    joinedOn: 'May 18, 2025',
    languages: 'English, Japanese',
    workload: 58,
    perfTrend: [{ name: 'W1', val: 91 }, { name: 'W4', val: 94.3 }],
    tasksTrend: [{ name: 'W1', val: 4 }, { name: 'W4', val: 10 }]
  },
  {
    id: 'AI-EMP-012',
    name: 'Lead Gen AI',
    role: 'Sales Representative',
    roleBadge: 'Sales Rep AI',
    roleBadgeColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 97.4,
    tasks: 112,
    lastActive: '2 min ago',
    desc: 'Identifies qualified B2B contacts, validates email sequences, and executes inbound outreach pipeline.',
    brandAccess: '4 Brands',
    joinedOn: 'May 20, 2025',
    languages: 'English',
    workload: 80,
    perfTrend: [{ name: 'W1', val: 94 }, { name: 'W4', val: 97.4 }],
    tasksTrend: [{ name: 'W1', val: 12 }, { name: 'W4', val: 20 }]
  },
  {
    id: 'AI-EMP-013',
    name: 'Copywriter Assistant AI',
    role: 'Content Writer',
    roleBadge: 'Content Writer AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Content Creation',
    status: 'Idle',
    perf: 91.1,
    tasks: 52,
    lastActive: '20 min ago',
    desc: 'Edits drafts, verifies spelling guidelines, and checks marketing copy compliance.',
    brandAccess: '2 Brands',
    joinedOn: 'May 22, 2025',
    languages: 'English',
    workload: 45,
    perfTrend: [{ name: 'W1', val: 89 }, { name: 'W4', val: 91.1 }],
    tasksTrend: [{ name: 'W1', val: 4 }, { name: 'W4', val: 8 }]
  },
  {
    id: 'AI-EMP-014',
    name: 'Competitor Tracker AI',
    role: 'Data Analyst',
    roleBadge: 'Data Analyst AI',
    roleBadgeColor: 'bg-amber-500/10 text-amber-450 border-amber-500/20',
    dept: 'Analytics',
    status: 'Offline',
    perf: 89.2,
    tasks: 33,
    lastActive: '6 hours ago',
    desc: 'Monitors competitor pricing models and indexes global social sentiment patterns.',
    brandAccess: '3 Brands',
    joinedOn: 'May 24, 2025',
    languages: 'English',
    workload: 35,
    perfTrend: [{ name: 'W1', val: 86 }, { name: 'W4', val: 89.2 }],
    tasksTrend: [{ name: 'W1', val: 2 }, { name: 'W4', val: 6 }]
  },
  {
    id: 'AI-EMP-015',
    name: 'Affiliate Partner AI',
    role: 'Sales Representative',
    roleBadge: 'Sales Rep AI',
    roleBadgeColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 96.0,
    tasks: 79,
    lastActive: '5 min ago',
    desc: 'Onboards affiliate partners, audits promo link attributions, and computes commissions payouts.',
    brandAccess: '4 Brands',
    joinedOn: 'May 26, 2025',
    languages: 'English',
    workload: 68,
    perfTrend: [{ name: 'W1', val: 92 }, { name: 'W4', val: 96.0 }],
    tasksTrend: [{ name: 'W1', val: 8 }, { name: 'W4', val: 14 }]
  },
  {
    id: 'AI-EMP-016',
    name: 'Multivariate Tester AI',
    role: 'UX Architect',
    roleBadge: 'UX Architect AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Analytics',
    status: 'Active',
    perf: 95.1,
    tasks: 82,
    lastActive: '4 min ago',
    desc: 'Sets up multivariate split testing experiments and compiles statistical significance charts.',
    brandAccess: '3 Brands',
    joinedOn: 'May 28, 2025',
    languages: 'English',
    workload: 72,
    perfTrend: [{ name: 'W1', val: 91 }, { name: 'W4', val: 95.1 }],
    tasksTrend: [{ name: 'W1', val: 8 }, { name: 'W4', val: 16 }]
  },
  {
    id: 'AI-EMP-017',
    name: 'Technical Editor AI',
    role: 'Content Writer',
    roleBadge: 'Content Writer AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Content Creation',
    status: 'Active',
    perf: 98.0,
    tasks: 94,
    lastActive: '1 min ago',
    desc: 'Compiles developer API documentation, writes detailed system tutorials, and structures guidebooks.',
    brandAccess: '4 Brands',
    joinedOn: 'Jun 01, 2025',
    languages: 'English',
    workload: 85,
    perfTrend: [{ name: 'W1', val: 95 }, { name: 'W4', val: 98.0 }],
    tasksTrend: [{ name: 'W1', val: 10 }, { name: 'W4', val: 18 }]
  },
  {
    id: 'AI-EMP-018',
    name: 'Social Outreach AI',
    role: 'SEO Specialist',
    roleBadge: 'SEO Specialist AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 94.7,
    tasks: 86,
    lastActive: '7 min ago',
    desc: 'Filters key social profiles, validates contact info, and tracks collaboration request rates.',
    brandAccess: '3 Brands',
    joinedOn: 'Jun 03, 2025',
    languages: 'English',
    workload: 64,
    perfTrend: [{ name: 'W1', val: 91 }, { name: 'W4', val: 94.7 }],
    tasksTrend: [{ name: 'W1', val: 8 }, { name: 'W4', val: 14 }]
  },
  {
    id: 'AI-EMP-019',
    name: 'Database Optimizer AI',
    role: 'Systems Engineer',
    roleBadge: 'Systems Eng AI',
    roleBadgeColor: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    dept: 'Analytics',
    status: 'Active',
    perf: 99.1,
    tasks: 154,
    lastActive: '2 min ago',
    desc: 'Monitors query speeds, structures table index patterns, and schedules database backups.',
    brandAccess: '5 Brands',
    joinedOn: 'Jun 05, 2025',
    languages: 'English, SQL',
    workload: 88,
    perfTrend: [{ name: 'W1', val: 97 }, { name: 'W4', val: 99.1 }],
    tasksTrend: [{ name: 'W1', val: 15 }, { name: 'W4', val: 30 }]
  },
  {
    id: 'AI-EMP-020',
    name: 'Slogan Copywriter AI',
    role: 'Content Writer',
    roleBadge: 'Content Writer AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Content Creation',
    status: 'Idle',
    perf: 93.5,
    tasks: 48,
    lastActive: '18 min ago',
    desc: 'Drafts brand slogans, crafts engaging ad headers, and optimizes landing page copy guidelines.',
    brandAccess: '3 Brands',
    joinedOn: 'Jun 08, 2025',
    languages: 'English',
    workload: 40,
    perfTrend: [{ name: 'W1', val: 90 }, { name: 'W4', val: 93.5 }],
    tasksTrend: [{ name: 'W1', val: 4 }, { name: 'W4', val: 8 }]
  },
  {
    id: 'AI-EMP-021',
    name: 'ROAS Auditor AI',
    role: 'Growth Specialist',
    roleBadge: 'Growth Specialist AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 96.8,
    tasks: 74,
    lastActive: '6 min ago',
    desc: 'Audits cost-per-click values, indexes display ad keywords, and compiles campaign ROAS metrics.',
    brandAccess: '4 Brands',
    joinedOn: 'Jun 10, 2025',
    languages: 'English',
    workload: 66,
    perfTrend: [{ name: 'W1', val: 93 }, { name: 'W4', val: 96.8 }],
    tasksTrend: [{ name: 'W1', val: 6 }, { name: 'W4', val: 12 }]
  },
  {
    id: 'AI-EMP-022',
    name: 'Interface Compliance AI',
    role: 'UX Architect',
    roleBadge: 'UX Architect AI',
    roleBadgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    dept: 'Analytics',
    status: 'Active',
    perf: 95.9,
    tasks: 91,
    lastActive: '4 min ago',
    desc: 'Verifies visual compliance, validates element alignments, and schedules interface diagnostics.',
    brandAccess: '3 Brands',
    joinedOn: 'Jun 12, 2025',
    languages: 'English',
    workload: 75,
    perfTrend: [{ name: 'W1', val: 91 }, { name: 'W4', val: 95.9 }],
    tasksTrend: [{ name: 'W1', val: 8 }, { name: 'W4', val: 16 }]
  },
  {
    id: 'AI-EMP-023',
    name: 'Newsletter Editor AI',
    role: 'Email Marketer',
    roleBadge: 'Email Marketer AI',
    roleBadgeColor: 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20',
    dept: 'Marketing',
    status: 'Offline',
    perf: 86.4,
    tasks: 29,
    lastActive: '8 hours ago',
    desc: 'Structures layout systems, schedules weekly newsletter sendouts, and checks bounce rates.',
    brandAccess: '2 Brands',
    joinedOn: 'Jun 14, 2025',
    languages: 'English',
    workload: 30,
    perfTrend: [{ name: 'W1', val: 84 }, { name: 'W4', val: 86.4 }],
    tasksTrend: [{ name: 'W1', val: 2 }, { name: 'W4', val: 6 }]
  },
  {
    id: 'AI-EMP-024',
    name: 'Friction Optimizer AI',
    role: 'Growth Specialist',
    roleBadge: 'Growth Specialist AI',
    roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    dept: 'Marketing',
    status: 'Active',
    perf: 97.6,
    tasks: 104,
    lastActive: '3 min ago',
    desc: 'Optimizes sales funnels, monitors checkout friction factors, and recommends layout adaptations.',
    brandAccess: '4 Brands',
    joinedOn: 'Jun 16, 2025',
    languages: 'English, German',
    workload: 78,
    perfTrend: [{ name: 'W1', val: 94 }, { name: 'W4', val: 97.6 }],
    tasksTrend: [{ name: 'W1', val: 10 }, { name: 'W4', val: 20 }]
  }
];

interface DigitalLegendsDetailsProps {
  setActiveTab: (tab: 'overview' | 'mission-control' | 'brands' | 'brand-details' | 'brand-tasks') => void;
}

function DigitalLegendsDetails({ setActiveTab }: DigitalLegendsDetailsProps) {
  const [assignedTasks, setAssignedTasks] = React.useState<Record<string, boolean>>({});

  const toggleAssign = (taskTitle: string) => {
    setAssignedTasks(prev => ({
      ...prev,
      [taskTitle]: !prev[taskTitle]
    }));
  };

  const workforce = [
    { 
      name: 'Maya', 
      role: 'Marketing Manager', 
      tasks: '6 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=maya_dl',
      desc: 'Oversees marketing campaigns, content strategy, and brand growth initiatives.', 
      tags: ['Marketing', 'Content', 'Analytics'] 
    },
    { 
      name: 'Leo', 
      role: 'SEO Content Writer', 
      tasks: '5 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=leo_dl',
      desc: 'Creates SEO-optimized content, guides, and technical articles.', 
      tags: ['SEO', 'Writing', 'Research'] 
    },
    { 
      name: 'Zara', 
      role: 'Social Media Expert', 
      tasks: '7 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=zara_dl',
      desc: 'Manages social channels, engagement, and community growth.', 
      tags: ['Social Media', 'Engagement', 'Analytics'] 
    },
    { 
      name: 'Dexter', 
      role: 'Operations Architect', 
      tasks: '4 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=dexter_dl',
      desc: 'Builds automation workflows and ensures operational efficiency.', 
      tags: ['Automation', 'Systems', 'Integration'] 
    },
    { 
      name: 'Kimmy', 
      role: 'AI Receptionist', 
      tasks: '2 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=kimmy_dl',
      desc: 'Handles inquiries, schedules, and client communication.', 
      tags: ['Communication', 'Support', 'Scheduling'] 
    },
    { 
      name: 'Evan', 
      role: 'Data Analyst', 
      tasks: '6 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=evan_dl',
      desc: 'Analyzes data, generates insights, and tracks performance.', 
      tags: ['Data', 'Analytics', 'Reporting'] 
    },
    { 
      name: 'Alex', 
      role: 'CEO AI Assistant', 
      tasks: '4 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=alex_dl',
      desc: 'Supports strategic planning, decision making, and oversight.', 
      tags: ['Strategy', 'Planning', 'Leadership'] 
    },
    { 
      name: 'Nina', 
      role: 'Email Marketing Specialist', 
      tasks: '3 Tasks',
      avatar: 'https://i.pravatar.cc/150?u=nina_dl',
      desc: 'Creates email campaigns and manages subscriber engagement.', 
      tags: ['Email', 'Campaigns', 'Automation'] 
    },
  ];

  const ceoTasks = [
    {
      title: 'Launch AI-Powered SEO Content Hub',
      desc: 'Create pillar content clusters to improve organic rankings and topical authority.',
      priority: 'High Priority',
      priorityColor: 'text-rose-400 bg-rose-950/30 border-rose-900/50',
      icon: Zap,
      iconColor: 'bg-purple-950/60 border border-purple-800/40 text-purple-400',
    },
    {
      title: 'Expand LinkedIn Organic Strategy',
      desc: 'Increase thought leadership posts and employee advocacy.',
      priority: 'High Priority',
      priorityColor: 'text-rose-400 bg-rose-950/30 border-rose-900/50',
      icon: Share2,
      iconColor: 'bg-blue-950/60 border border-blue-800/40 text-blue-400',
    },
    {
      title: 'Build Automated Lead Nurture Workflow',
      desc: 'Create multi-step email + CRM automation for new leads.',
      priority: 'Medium Priority',
      priorityColor: 'text-amber-400 bg-amber-950/30 border-amber-900/50',
      icon: GitBranch,
      iconColor: 'bg-yellow-950/60 border border-yellow-800/40 text-yellow-400',
    },
    {
      title: 'Optimize Conversion Rate on Landing Pages',
      desc: 'A/B test headlines, CTAs, and page layouts.',
      priority: 'Medium Priority',
      priorityColor: 'text-amber-400 bg-amber-950/30 border-amber-900/50',
      icon: SlidersHorizontal,
      iconColor: 'bg-orange-950/60 border border-orange-800/40 text-orange-400',
    },
    {
      title: 'Create YouTube Short Content Series',
      desc: 'Repurpose content into short-form videos for reach.',
      priority: 'Medium Priority',
      priorityColor: 'text-amber-400 bg-amber-950/30 border-amber-900/50',
      icon: Play,
      iconColor: 'bg-rose-950/60 border border-rose-800/40 text-rose-400',
    },
    {
      title: 'Implement Customer Feedback Loop',
      desc: 'Collect and analyze user feedback for product improvement.',
      priority: 'Low Priority',
      priorityColor: 'text-emerald-400 bg-emerald-950/30 border-emerald-900/50',
      icon: CheckCircle2,
      iconColor: 'bg-emerald-950/60 border border-emerald-800/40 text-emerald-400',
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020617] to-[#020617] pointer-events-none"></div>
      
      {/* HEADER BREADCRUMB */}
      <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0 border-b border-slate-900/60">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setActiveTab('brands')}
            className="p-2 bg-[#0b1220]/80 border border-slate-800 hover:border-slate-700 rounded-lg text-slate-400 hover:text-white transition-all cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-1">
              <span className="hover:text-slate-200 cursor-pointer" onClick={() => setActiveTab('brands')}>Brands</span>
              <ChevronRight size={10} className="text-slate-650" />
              <span className="text-slate-350">Digital Legends</span>
            </div>
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-outfit flex items-center">
                Digital Legends
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </h1>
              
              <div className="flex items-center space-x-2">
                <span className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
                  <span>Live</span>
                </span>
                <span className="flex items-center space-x-1.5 px-2.5 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[9px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  <span>AI Operations Active</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0b1220] border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-lg text-xs font-semibold text-slate-300 transition-colors cursor-pointer">
            <ExternalLink size={13} />
            <span>Visit Brand Site</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-[#0070f3] hover:bg-[#0060df] rounded-lg text-xs md:text-sm font-semibold text-white transition-colors shadow-[0_0_15px_rgba(0,112,243,0.35)] cursor-pointer">
            <Plus size={14} />
            <span>Launch Pipeline</span>
          </button>
          <button className="p-2 bg-[#0b1220] border border-slate-800 hover:border-slate-700 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer">
            <MoreVertical size={14} />
          </button>
        </div>
      </header>

      {/* SCROLLABLE CONTENT */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 z-10 custom-scrollbar space-y-6">
        
        {/* HERO BANNER CARD */}
        <div className="relative h-48 rounded-2xl overflow-hidden border border-slate-800/80 bg-[#060814] flex flex-col justify-end p-6 md:p-8 shadow-2xl">
          {/* Cyber City Neon Graphic Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:30px_30px] opacity-10"></div>
          
          {/* City Tower Shapes */}
          <div className="absolute bottom-0 right-10 left-1/3 top-10 pointer-events-none opacity-40 flex items-end justify-end space-x-2.5">
            <div className="w-10 h-[80%] bg-gradient-to-t from-purple-950/80 to-indigo-900/10 rounded-t border-t border-x border-purple-500/20 relative shadow-inner">
              <div className="absolute top-4 left-2 right-2 bottom-4 border-l border-r border-dashed border-purple-400/20"></div>
            </div>
            <div className="w-14 h-[95%] bg-gradient-to-t from-purple-950 to-indigo-900/10 rounded-t border-t border-x border-purple-500/30 relative">
              <div className="absolute top-2 left-3 right-3 bottom-2 border-l border-r border-dashed border-purple-400/20"></div>
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-t from-indigo-500 to-transparent"></div>
            </div>
            <div className="w-8 h-[60%] bg-gradient-to-t from-purple-950/80 to-indigo-900/10 rounded-t border-t border-x border-purple-500/20"></div>
            <div className="w-16 h-[75%] bg-gradient-to-t from-purple-950/90 to-indigo-900/10 rounded-t border-t border-x border-purple-500/20 relative">
              <div className="absolute top-4 left-4 right-4 bottom-4 border-l border-r border-dashed border-purple-400/20"></div>
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[1px] h-16 bg-gradient-to-t from-indigo-500 to-transparent"></div>
            </div>
            <div className="w-12 h-[90%] bg-gradient-to-t from-purple-950 to-indigo-900/10 rounded-t border-t border-x border-purple-500/20 relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-gradient-to-t from-indigo-400 to-transparent"></div>
            </div>
          </div>
          
          <div className="absolute w-80 h-80 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl -top-12 -right-12 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-5">
              <div className="w-20 h-20 rounded-full bg-[#030712] border-2 border-cyan-400/80 flex items-center justify-center text-2xl font-black text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] select-none">
                DL
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-black text-white leading-tight font-outfit">Digital Legends Corporation</h2>
                <p className="text-slate-350 text-xs mt-1.5 max-w-2xl leading-relaxed">
                  AI Automation & Business Growth Platform. Powering automated digital channels with continuous intelligent agent workflows.
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3.5">
                  {['AI Automation', 'Digital Solutions', 'Innovation', 'Future-Ready'].map((tag, i) => (
                    <span key={i} className="px-2.5 py-0.5 bg-[#0b1220] border border-slate-800 text-[10px] font-semibold text-slate-400 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-xs text-slate-400 bg-[#020617]/90 border border-slate-800/85 rounded-xl px-5 py-4 backdrop-blur-md self-start lg:self-center min-w-[280px]">
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Industry</span>
                <span className="font-bold text-white mt-1 block">Technology & AI Solutions</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Headquarters</span>
                <span className="font-bold text-white mt-1 block">Global / Remote</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Status</span>
                <span className="font-bold text-emerald-400 mt-1 block flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1.5"></span>
                  Live
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase font-bold block">Founded</span>
                <span className="font-bold text-white mt-1 block">May 26, 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIX STAT CARDS ROW */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'AI Employees', value: '10', sub: '4 Dedicated • 6 Shared', icon: Users, color: 'text-cyan-400 border-cyan-900/40 bg-cyan-950/20' },
            { label: 'Active Workflows', value: '18', sub: '100% Pipeline Health', icon: GitBranch, color: 'text-purple-400 border-purple-900/40 bg-purple-950/20' },
            { label: 'Tasks Completed', value: '256', sub: '+24% this week', icon: CheckCircle2, color: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20' },
            { label: 'Value ROI', value: '8.4x', sub: '$14,240 Cost Saved', icon: TrendingUp, color: 'text-amber-400 border-amber-900/40 bg-amber-950/20' },
            { label: 'Automation Rate', value: '87%', sub: '+12% this week', icon: SlidersHorizontal, color: 'text-pink-400 border-pink-900/40 bg-pink-950/20' },
            { label: 'Uptime', value: '99.98%', sub: 'All Systems Operational', icon: Clock, color: 'text-slate-400 border-slate-800/40 bg-slate-900/20' },
          ].map((item, i) => (
            <div key={i} className="bg-[#0b1220]/60 border border-slate-800/80 rounded-xl p-4 flex items-center space-x-3.5 shadow-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${item.color.split(' ')[1]} ${item.color.split(' ')[2]} ${item.color.split(' ')[0]}`}>
                <item.icon size={16} />
              </div>
              <div>
                <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{item.label}</div>
                <div className="text-xl font-bold text-white mt-0.5">{item.value}</div>
                <div className="text-[9px] font-medium text-slate-450 mt-0.5 leading-none">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* TWO-COLUMN BOTTOM GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: AI EMPLOYEES */}
          <div className="xl:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div>
                <h3 className="text-base font-bold text-white font-outfit flex items-center">
                  AI Employees
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Your dedicated AI workforce driving Digital Legends forward.</p>
              </div>
              <button className="px-3 py-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-350 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer">
                Manage Employees
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workforce.map((w, idx) => (
                <div key={idx} className="bg-[#0b1220]/60 border border-slate-800/80 hover:border-slate-700/80 rounded-xl p-4 flex flex-col justify-between transition-all group relative">
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <img src={w.avatar} alt={w.name} className="w-10 h-10 rounded-full object-cover border border-slate-850" />
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors leading-tight">{w.name}</h4>
                          <p className="text-slate-500 text-[10px] mt-0.5">{w.role}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-[10px]">
                        <span className="flex items-center text-emerald-400 font-semibold bg-emerald-950/20 px-1.5 py-0.5 rounded border border-emerald-900/30">
                          <span className="w-1 h-1 bg-emerald-400 rounded-full mr-1"></span>
                          Active
                        </span>
                        <span className="text-slate-400 font-bold bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                          {w.tasks}
                        </span>
                      </div>
                    </div>
                    
                    {/* Desc */}
                    <p className="text-[11px] text-slate-400 leading-relaxed mt-4 min-h-[36px]">
                      {w.desc}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3.5 border-t border-slate-800/40">
                    {w.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-[#030712] border border-slate-850 text-[9px] font-bold text-slate-500 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-2.5 bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-350 hover:text-white transition-colors cursor-pointer text-center">
              View All Employees
            </button>
          </div>

          {/* RIGHT COLUMN: RECOMMENDED TASKS */}
          <div className="xl:col-span-6 space-y-4">
            <div className="flex items-center justify-between pb-2">
              <div>
                <h3 className="text-base font-bold text-white font-outfit">
                  AI CEO Recommended Tasks
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Smart suggestions from your AI CEO to accelerate growth.</p>
              </div>
              <button 
                onClick={() => setActiveTab('brand-tasks')}
                className="px-3 py-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-350 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                View All Tasks
              </button>
            </div>

            <div className="space-y-3">
              {ceoTasks.map((t, idx) => {
                const isAssigned = assignedTasks[t.title];
                return (
                  <div key={idx} className="bg-[#0b1220]/60 border border-slate-800/80 hover:border-slate-700/85 rounded-xl p-4 flex items-center justify-between gap-4 transition-all">
                    <div className="flex items-center space-x-3.5 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${t.iconColor}`}>
                        <t.icon size={16} />
                      </div>
                      
                      <div className="min-w-0">
                        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                          <h4 className="text-xs font-bold text-white leading-snug truncate">{t.title}</h4>
                          <span className={`px-2 py-0.5 border rounded text-[8px] font-bold uppercase tracking-wider leading-none shrink-0 ${t.priorityColor}`}>
                            {t.priority}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-snug truncate">
                          {t.desc}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => toggleAssign(t.title)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center space-x-1 ${
                        isAssigned 
                          ? 'bg-emerald-950/40 text-emerald-450 border border-emerald-900/60 hover:bg-emerald-900/30'
                          : 'border border-slate-700 hover:border-slate-600 hover:bg-slate-900 text-slate-200 hover:text-white'
                      }`}
                    >
                      {isAssigned ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 text-emerald-400">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>Assigned</span>
                        </>
                      ) : (
                        <span>Assign</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            <button className="w-full py-2.5 bg-slate-900/30 border border-slate-800/80 hover:border-slate-700 rounded-xl text-xs font-bold text-slate-350 hover:text-white transition-colors cursor-pointer text-center">
              View All Recommended Tasks
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function DigitalLegendsTasks({ setActiveTab }: { setActiveTab: (tab: any) => void }) {
  const [page, setPage] = React.useState(1);
  
  const tasks = [
    { title: 'Define 90-Day Growth Strategy', desc: 'Set clear goals and milestones for the next 90 days.', category: 'Strategy', catColor: 'bg-purple-900/30 text-purple-400', assignee: 'AI CEO', assigneeIcon: 'https://i.pravatar.cc/150?u=alex2', priority: 'High', priorityColor: 'text-red-400', status: 'Completed', statusIcon: CheckCircle2, statusColor: 'text-emerald-400', date: 'May 22, 2025' },
    { title: 'Build Brand Positioning', desc: 'Clarify your value proposition and brand message.', category: 'Branding', catColor: 'bg-blue-900/30 text-blue-400', assignee: 'AI Marketing Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=maya3', priority: 'High', priorityColor: 'text-red-400', status: 'Completed', statusIcon: CheckCircle2, statusColor: 'text-emerald-400', date: 'May 23, 2025' },
    { title: 'Optimize Website & Funnel', desc: 'Improve conversions and user experience.', category: 'Growth', catColor: 'bg-cyan-900/30 text-cyan-400', assignee: 'AI Operations Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=kimmy4', priority: 'Medium', priorityColor: 'text-amber-400', status: 'In Progress', statusIcon: CircleDot, statusColor: 'text-amber-400', date: 'May 28, 2025' },
    { title: 'Content Strategy Plan', desc: 'Build a content roadmap to attract and engage.', category: 'Content', catColor: 'bg-green-900/30 text-green-400', assignee: 'AI Content Strategist', assigneeIcon: 'https://i.pravatar.cc/150?u=leo5', priority: 'Medium', priorityColor: 'text-amber-400', status: 'In Progress', statusIcon: CircleDot, statusColor: 'text-amber-400', date: 'May 30, 2025' },
    { title: 'Set up Analytics & Tracking', desc: 'Track key metrics and growth KPIs.', category: 'Analytics', catColor: 'bg-blue-900/30 text-blue-400', assignee: 'AI Operations Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=kimmy4', priority: 'Low', priorityColor: 'text-green-400', status: 'Completed', statusIcon: CheckCircle2, statusColor: 'text-emerald-400', date: 'May 21, 2025' },
    { title: 'Launch New Campaign', desc: 'Execute the first growth campaign.', category: 'Marketing', catColor: 'bg-fuchsia-900/30 text-fuchsia-400', assignee: 'AI Marketing Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=maya3', priority: 'High', priorityColor: 'text-red-400', status: 'In Progress', statusIcon: CircleDot, statusColor: 'text-amber-400', date: 'May 31, 2025' },
    { title: 'Social Media Content Calendar', desc: 'Plan and schedule content for all platforms.', category: 'Content', catColor: 'bg-green-900/30 text-green-400', assignee: 'AI Content Strategist', assigneeIcon: 'https://i.pravatar.cc/150?u=leo5', priority: 'Medium', priorityColor: 'text-amber-400', status: 'Pending', statusIcon: CircleDot, statusColor: 'text-slate-500', date: 'Jun 02, 2025' },
    { title: 'Hire Additional AI Employees', desc: 'Expand the team to accelerate execution.', category: 'Team', catColor: 'bg-blue-900/30 text-blue-400', assignee: 'AI CEO', assigneeIcon: 'https://i.pravatar.cc/150?u=alex2', priority: 'High', priorityColor: 'text-red-400', status: 'Pending', statusIcon: CircleDot, statusColor: 'text-slate-500', date: 'Jun 03, 2025' },
    { title: 'Setup Email Marketing Automation', desc: 'Build email flows and automation.', category: 'Marketing', catColor: 'bg-fuchsia-900/30 text-fuchsia-400', assignee: 'AI Marketing Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=maya3', priority: 'Low', priorityColor: 'text-green-400', status: 'Pending', statusIcon: CircleDot, statusColor: 'text-slate-500', date: 'Jun 04, 2025' },
    { title: 'Competitor Analysis', desc: 'Analyze competitors and market positioning.', category: 'Research', catColor: 'bg-orange-900/30 text-orange-400', assignee: 'AI Sales Manager', assigneeIcon: 'https://i.pravatar.cc/150?u=zara2', priority: 'Medium', priorityColor: 'text-amber-400', status: 'Pending', statusIcon: CircleDot, statusColor: 'text-slate-500', date: 'Jun 05, 2025' },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative bg-[#020617]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020617] to-[#020617] pointer-events-none"></div>
      
      {/* HEADER */}
      <header className="px-4 md:px-8 pt-6 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-4 z-10 shrink-0 border-b border-slate-800/60 bg-[#060814]/50">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 tracking-widest uppercase mb-2">
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('brands')}>Brands</span>
            <ChevronRight size={10} />
            <span className="hover:text-cyan-400 cursor-pointer transition-colors" onClick={() => setActiveTab('brand-details')}>Digital Legends</span>
            <ChevronRight size={10} />
            <span className="text-slate-300">Tasks</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-outfit mb-1.5">
            All Tasks
          </h1>
          <p className="text-xs text-slate-400">Here's everything we're working on to grow your brand. Track progress, view priorities, and manage execution.</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-700 hover:border-slate-500 rounded-lg text-xs font-bold text-cyan-400 transition-colors bg-slate-900/50">
            <ExternalLink size={14} />
            <span>Export Tasks</span>
          </button>
        </div>
      </header>

      {/* TWO-COLUMN LAYOUT */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* MAIN COLUMN (TASKS TABLE) */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          
          {/* FILTERS */}
          <div className="p-4 md:px-8 shrink-0 flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input type="text" placeholder="Search tasks..." className="bg-slate-900/80 border border-slate-800 focus:border-cyan-500/50 text-xs text-white rounded-lg pl-9 pr-3 py-2 w-56 placeholder-slate-500" />
            </div>
            {['Status', 'Priority', 'Assignee', 'Category'].map(label => (
              <div key={label} className="flex flex-col space-y-1.5">
                <span className="text-[9px] font-bold text-slate-500 px-1">{label}</span>
                <button className="flex items-center justify-between space-x-2 bg-slate-900/50 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg text-xs text-slate-300 w-32">
                  <span>All {label === 'Priority' ? 'Priorities' : label === 'Status' ? 'Status' : label + 's'}</span>
                  <ChevronDown size={12} className="text-slate-500" />
                </button>
              </div>
            ))}
            <button className="text-xs font-bold text-cyan-400 hover:text-cyan-300 mt-5 px-2">Clear Filters</button>
          </div>

          {/* TABLE CONTAINER */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 custom-scrollbar relative">
            <div className="min-w-[800px]">
              {/* TABLE HEADER */}
              <div className="grid grid-cols-12 gap-4 px-4 py-3 border-y border-slate-800/80 text-[9px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                <div className="col-span-5">Task</div>
                <div className="col-span-1">Category</div>
                <div className="col-span-2">Assignee</div>
                <div className="col-span-1">Priority</div>
                <div className="col-span-1.5">Status</div>
                <div className="col-span-1.5 flex justify-between items-center">
                  <span>Due Date</span>
                </div>
              </div>

              {/* TABLE BODY */}
              <div className="space-y-1.5 relative">
                {tasks.map((task, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 px-4 py-3.5 bg-slate-900/30 border border-slate-800/50 hover:bg-slate-800/40 rounded-lg text-xs transition-colors items-center group cursor-pointer relative">
                    <div className="col-span-5 flex items-start space-x-3">
                      <div className="mt-0.5 w-6 h-6 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                        {task.status === 'Completed' ? <CheckCircle2 size={12} className="text-cyan-400" /> : <div className="w-3 h-3 border-2 border-slate-600 rounded-sm"></div>}
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{task.title}</h4>
                        <p className="text-[10px] text-slate-500 mt-0.5">{task.desc}</p>
                      </div>
                    </div>
                    <div className="col-span-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${task.catColor}`}>{task.category}</span>
                    </div>
                    <div className="col-span-2 flex items-center space-x-2">
                      <img src={task.assigneeIcon} className="w-5 h-5 rounded-full border border-slate-700" alt={task.assignee} />
                      <span className="text-slate-300 font-medium">{task.assignee}</span>
                    </div>
                    <div className="col-span-1 font-bold">
                      <span className={task.priorityColor}>{task.priority}</span>
                    </div>
                    <div className="col-span-1.5 flex items-center space-x-1.5">
                      <task.statusIcon size={12} className={task.statusColor} />
                      <span className={`font-semibold ${task.statusColor}`}>{task.status}</span>
                    </div>
                    <div className="col-span-1.5 flex items-center justify-between text-slate-400">
                      <span>{task.date}</span>
                      <MoreVertical size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between py-6 mt-2 border-t border-slate-800/80">
              <span className="text-xs text-slate-500">Showing 1 to 10 of 28 tasks</span>
              <div className="flex items-center space-x-1">
                <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 transition-colors"><ChevronRight size={14} className="rotate-180" /></button>
                {[1, 2, 3].map(num => (
                  <button key={num} onClick={() => setPage(num)} className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-bold transition-colors ${page === num ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-600'}`}>{num}</button>
                ))}
                <button className="w-8 h-8 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 transition-colors"><ChevronRight size={14} /></button>
              </div>
            </div>
          </div>

          {/* FLOATING CHAT BAR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-3xl z-20">
            <div className="bg-[#0b1220]/90 backdrop-blur-xl border border-slate-700/60 rounded-full p-2 pl-4 pr-3 flex items-center shadow-2xl shadow-cyan-500/10 relative">
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center relative z-10 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=alex2" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-[#0b1220] rounded-full z-20"></div>
              </div>
              <input 
                type="text" 
                placeholder="Ask me anything about your tasks, workflows, or team..." 
                className="flex-1 bg-transparent text-sm text-white placeholder-slate-400 px-4 focus:outline-none" 
              />
              <button className="w-8 h-8 rounded-full bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center text-white shrink-0 transition-colors cursor-pointer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-0.5"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
              </button>
            </div>
            <div className="flex items-center space-x-1.5 mt-2.5 ml-6">
              <div className="flex space-x-0.5">
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">AI CEO is online and ready to help...</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (STATS & CHARTS) */}
        <div className="w-full lg:w-[320px] shrink-0 border-l border-slate-800/60 bg-[#040814]/40 overflow-y-auto custom-scrollbar p-6 space-y-6">
          
          {/* Tasks Overview */}
          <div>
            <h3 className="text-[11px] font-bold text-white mb-4">Tasks Overview</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl py-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">28</div>
                <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Total Tasks</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl py-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-emerald-400 mb-1">12</div>
                <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Completed</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl py-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-amber-400 mb-1">9</div>
                <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">In Progress</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl py-4 flex flex-col justify-center">
                <div className="text-2xl font-bold text-slate-300 mb-1">7</div>
                <div className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Pending</div>
              </div>
            </div>
          </div>

          {/* Tasks by Priority */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4">
            <h3 className="text-[11px] font-bold text-white mb-4">Tasks by Priority</h3>
            <div className="flex items-center">
              <div className="w-24 h-24 shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={[{value: 36, fill: '#ef4444'}, {value: 39, fill: '#f59e0b'}, {value: 25, fill: '#0ea5e9'}]} cx="50%" cy="50%" innerRadius={28} outerRadius={42} stroke="none" dataKey="value" paddingAngle={2}>
                      <Cell key="cell-0" fill="#ef4444" />
                      <Cell key="cell-1" fill="#f59e0b" />
                      <Cell key="cell-2" fill="#0ea5e9" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 ml-4 space-y-2.5">
                {[
                  { label: 'High', color: 'bg-red-500', count: '10', perc: '36%' },
                  { label: 'Medium', color: 'bg-amber-500', count: '11', perc: '39%' },
                  { label: 'Low', color: 'bg-cyan-500', count: '7', perc: '25%' }
                ].map(p => (
                  <div key={p.label} className="flex items-center justify-between text-[10px]">
                    <div className="flex items-center space-x-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${p.color}`}></div>
                      <span className="text-slate-300 font-medium">{p.label}</span>
                    </div>
                    <div className="flex space-x-2 text-slate-400">
                      <span>{p.count}</span>
                      <span className="w-8 text-right">({p.perc})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tasks by Category */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4">
            <h3 className="text-[11px] font-bold text-white mb-4">Tasks by Category</h3>
            <div className="space-y-3">
              {[
                { label: 'Strategy', val: 5, max: 6, color: 'bg-purple-500' },
                { label: 'Branding', val: 4, max: 6, color: 'bg-blue-500' },
                { label: 'Marketing', val: 6, max: 6, color: 'bg-fuchsia-500' },
                { label: 'Content', val: 5, max: 6, color: 'bg-green-500' },
                { label: 'Growth', val: 3, max: 6, color: 'bg-cyan-500' },
                { label: 'Analytics', val: 2, max: 6, color: 'bg-sky-500' },
                { label: 'Team', val: 2, max: 6, color: 'bg-indigo-500' },
                { label: 'Research', val: 1, max: 6, color: 'bg-orange-500' }
              ].map(c => (
                <div key={c.label} className="flex items-center text-[9px] font-bold group">
                  <div className="w-16 text-slate-400 group-hover:text-slate-300">{c.label}</div>
                  <div className="flex-1 flex items-center space-x-2 ml-2">
                    <div className="h-1.5 rounded-full bg-slate-800 flex-1 relative overflow-hidden">
                      <div className={`absolute top-0 left-0 bottom-0 ${c.color} rounded-full`} style={{ width: `${(c.val/c.max)*100}%` }}></div>
                    </div>
                    <span className="text-slate-400 w-3 text-right">{c.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Need Help Prioritizing */}
          <div className="bg-[#0f172a] border border-cyan-900/50 rounded-xl p-5 shadow-[0_0_20px_rgba(6,182,212,0.05)] flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-10 translate-x-10 pointer-events-none"></div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded border border-cyan-500/30 bg-cyan-950/40 flex items-center justify-center text-cyan-400 relative z-10">
                <Sparkles size={16} />
              </div>
              <h3 className="text-xs font-bold text-white relative z-10">Need Help Prioritizing?</h3>
            </div>
            <p className="text-[10px] text-slate-400 mb-4 leading-relaxed relative z-10">Ask your AI CEO to reprioritize tasks based on impact and deadlines.</p>
            <button className="w-full py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-[10px] font-bold text-cyan-400 transition-colors rounded-lg flex items-center justify-center space-x-2 relative z-10 cursor-pointer">
              <span>Ask AI CEO</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

function WorkflowsView() {
  const [activeWorkflowTab, setActiveWorkflowTab] = React.useState('All');
  
  const workflows = [
    {
      id: 1,
      title: 'Autophagy Content Automation',
      status: 'Active',
      desc: 'Discover trending news, create SEO blog posts and publish automatically',
      trigger: 'Every 6 Hours',
      lastRun: 'May 17, 2025 11:58 AM',
      success: '100%',
      runs: 7,
      duration: '1m 18s',
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-500',
      icon: Share2
    },
    {
      id: 2,
      title: 'Social Media Post Automation',
      status: 'Active',
      desc: 'Create and schedule engaging social media posts across platforms',
      trigger: 'Daily at 9:00 AM',
      lastRun: 'May 17, 2025 9:00 AM',
      success: '98%',
      runs: 14,
      duration: '45s',
      iconBg: 'bg-emerald-600/20',
      iconColor: 'text-emerald-500',
      icon: Megaphone
    },
    {
      id: 3,
      title: 'Weekly Newsletter Automation',
      status: 'Inactive',
      desc: 'Compile weekly updates and send newsletter to subscribers',
      trigger: 'Every Monday 8:00 AM',
      lastRun: 'May 12, 2025 8:00 AM',
      success: '92%',
      runs: 1,
      duration: '2m 05s',
      iconBg: 'bg-amber-600/20',
      iconColor: 'text-amber-500',
      icon: Mail
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Workflows</h1>
          <p className="text-sm text-slate-400">Create, manage, and monitor your workflows. Automate tasks and achieve more with AI.</p>
        </div>
        <button className="flex items-center space-x-2 bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer">
          <Plus size={16} />
          <span>Create Workflow</span>
        </button>
      </div>

      {/* Tabs & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-800/60 pb-4">
        <div className="flex items-center space-x-6">
          {[
            { name: 'All Workflows', count: 12, id: 'All' },
            { name: 'Active', count: 8, id: 'Active' },
            { name: 'Inactive', count: 4, id: 'Inactive' },
            { name: 'Drafts', count: 2, id: 'Drafts' }
          ].map(t => (
            <button 
              key={t.id}
              onClick={() => setActiveWorkflowTab(t.id)}
              className={`flex items-center space-x-2 pb-4 -mb-[17px] border-b-2 transition-colors ${activeWorkflowTab === t.id ? 'border-teal-400 text-teal-400' : 'border-transparent text-slate-400 hover:text-slate-300'}`}
            >
              <span className="font-medium text-sm">{t.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeWorkflowTab === t.id ? 'bg-teal-900/30 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>{t.count}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search workflows..." className="bg-transparent border border-slate-800 focus:border-slate-600 text-sm text-white rounded-lg pl-9 pr-3 py-1.5 w-64 placeholder-slate-500 focus:outline-none" />
          </div>
          <button className="flex items-center space-x-2 border border-slate-800 hover:border-slate-700 bg-transparent px-3 py-1.5 rounded-lg text-sm text-white transition-colors cursor-pointer">
            <Filter size={14} className="text-slate-400" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Workflows List */}
      <div className="space-y-4">
        {workflows.map(w => (
          <div key={w.id} className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:border-slate-700/80 transition-colors">
            
            <div className="flex items-start space-x-5 flex-1">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${w.iconBg}`}>
                <w.icon size={24} className={w.iconColor} />
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-bold text-white">{w.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${w.status === 'Active' ? 'bg-emerald-950/50 text-emerald-400' : 'bg-amber-950/50 text-amber-400'}`}>
                    {w.status}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{w.desc}</p>
                <div className="flex items-center space-x-6 text-[11px] text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={12} />
                    <span>Trigger: {w.trigger}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock size={12} />
                    <span>Last Run: {w.lastRun}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <BarChart2 size={12} />
                    <span>Success Rate: <span className="text-emerald-400 font-medium">{w.success}</span></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-8 lg:border-l border-slate-800/60 lg:pl-8">
              <div>
                <div className="text-[10px] text-slate-400 mb-1">Runs (Last 7 Days)</div>
                <div className="text-xl font-bold text-white">{w.runs}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 mb-1">Avg. Duration</div>
                <div className="text-xl font-bold text-white">{w.duration}</div>
              </div>
              <button className="w-8 h-8 rounded border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors shrink-0 cursor-pointer">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-8">
        <div className="text-sm text-slate-400">Showing 1 to 3 of 12 workflows</div>
        <div className="flex items-center space-x-1">
          <button className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"><ChevronLeft size={16} /></button>
          <button className="w-8 h-8 rounded bg-teal-500 text-white flex items-center justify-center text-sm font-medium cursor-pointer">1</button>
          <button className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-sm font-medium cursor-pointer">2</button>
          <button className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-sm font-medium cursor-pointer">3</button>
          <button className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-colors text-sm font-medium cursor-pointer">4</button>
          <button className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"><ChevronRight size={16} /></button>
        </div>
        <div className="relative">
          <select className="appearance-none bg-transparent border border-slate-800 hover:border-slate-700 text-slate-400 text-sm rounded-lg px-4 py-2 pr-8 focus:outline-none cursor-pointer">
            <option>Show 10 per page</option>
            <option>Show 20 per page</option>
            <option>Show 50 per page</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsView() {
  const lineData = [
    { name: 'May 11', runs: 18 },
    { name: 'May 12', runs: 25 },
    { name: 'May 13', runs: 20 },
    { name: 'May 14', runs: 30 },
    { name: 'May 15', runs: 22 },
    { name: 'May 16', runs: 28 },
    { name: 'May 17', runs: 35 },
  ];

  const statusData = [
    { name: 'Success', value: 155, fill: '#059669' }, // emerald-600
    { name: 'Failed', value: 2, fill: '#2563eb' }, // blue-600
    { name: 'Canceled', value: 1, fill: '#eab308' }, // yellow-500
    { name: 'In Progress', value: 0, fill: '#dc2626' }, // red-600
  ];

  const triggerData = [
    { name: 'On Schedule', value: 102, fill: '#7c3aed' }, // violet-600
    { name: 'Manual Trigger', value: 34, fill: '#2563eb' }, // blue-600
    { name: 'Webhook', value: 22, fill: '#0891b2' }, // cyan-600
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-sm text-slate-400">Track performance, analyze trends, and gain insights across all your workflows.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-4 py-2 border border-slate-800 bg-slate-900/50 rounded-lg text-sm text-slate-300 font-medium cursor-pointer hover:border-slate-700 transition-colors">
            <Calendar size={14} className="text-slate-500" />
            <span>May 11 - May 17, 2025</span>
            <ChevronDown size={14} className="text-slate-500 ml-1" />
          </div>
          <button className="flex items-center space-x-2 border border-slate-700 hover:border-slate-600 bg-slate-900 px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors cursor-pointer">
            <Download size={14} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {[
          { title: 'Total Workflow Runs', value: '158', trend: '18.6%', vs: 'vs May 4 - May 10', icon: Play, iconColor: 'text-teal-400', iconBg: 'bg-teal-950/30 border-teal-900/50', trendColor: 'text-emerald-400', up: true },
          { title: 'Success Rate', value: '98.2%', trend: '2.7%', vs: 'vs May 4 - May 10', icon: CheckCircle2, iconColor: 'text-emerald-400', iconBg: 'bg-emerald-950/30 border-emerald-900/50', trendColor: 'text-emerald-400', up: true },
          { title: 'Avg. Duration', value: '1m 24s', trend: '8.4%', vs: 'vs May 4 - May 10', icon: Clock, iconColor: 'text-purple-400', iconBg: 'bg-purple-950/30 border-purple-900/50', trendColor: 'text-emerald-400', up: true }, 
          { title: 'Tasks Completed', value: '1,432', trend: '24.1%', vs: 'vs May 4 - May 10', icon: BarChart2, iconColor: 'text-amber-400', iconBg: 'bg-amber-950/30 border-amber-900/50', trendColor: 'text-emerald-400', up: true },
          { title: 'Time Saved', value: '24h 18m', trend: '22.3%', vs: 'vs May 4 - May 10', icon: Clock, iconColor: 'text-blue-400', iconBg: 'bg-blue-950/30 border-blue-900/50', trendColor: 'text-emerald-400', up: true }
        ].map((m, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${m.iconBg}`}>
                <m.icon size={16} className={m.iconColor} />
              </div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">{m.title}</div>
            </div>
            <div className="text-2xl font-bold text-white mb-2">{m.value}</div>
            <div className="flex items-center space-x-1.5 text-[9px]">
              <span className={`font-bold flex items-center ${m.trendColor}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-3 h-3 mr-0.5 ${!m.up ? 'rotate-180' : ''}`}><polyline points="18 15 12 9 6 15"></polyline></svg>
                {m.trend}
              </span>
              <span className="text-slate-500">{m.vs}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: Line Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        {/* Runs Over Time */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex flex-col min-h-[300px]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">Runs Over Time</h3>
                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Daily workflow runs for the selected time period.</p>
            </div>
            <div className="flex items-center space-x-1 px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded text-[10px] font-bold text-slate-300 cursor-pointer">
              <span>Daily</span>
              <ChevronDown size={12} className="ml-1 text-slate-500" />
            </div>
          </div>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px', color: '#fff' }} />
                <Line type="monotone" dataKey="runs" stroke="#06b6d4" strokeWidth={2} dot={{ r: 4, fill: '#06b6d4', stroke: '#020617', strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Runs by Status */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex flex-col min-h-[300px]">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-bold text-white">Runs by Status</h3>
            <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
          </div>
          <p className="text-[10px] text-slate-400 mb-6">Distribution of workflow runs by status.</p>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-40 relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} stroke="#0f172a" strokeWidth={2} dataKey="value" paddingAngle={2}>
                    {statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2.5">
              {statusData.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.fill }}></div>
                    <span className="text-slate-300">{s.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-white font-medium">{s.value}</span>
                    <span className="text-slate-500 w-10 text-right">({s.value === 0 ? '0' : Math.round((s.value/158)*100)}%)</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-[11px] font-bold border-t border-slate-800/80 pt-2.5 mt-2.5">
                <span className="text-slate-400">Total</span>
                <span className="text-white mr-12">158</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Middle Section: Top Workflows & Runs by Trigger Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        
        {/* Top Workflows by Runs */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-bold text-white">Top Workflows by Runs</h3>
            <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
          </div>
          <p className="text-[10px] text-slate-400 mb-6">Workflows ranked by total runs in the selected period.</p>
          
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[10px] text-slate-500 font-bold uppercase">
                  <th className="pb-3 font-medium">Workflow</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                  <th className="pb-3 font-medium text-center">Runs</th>
                  <th className="pb-3 font-medium text-center">Success Rate</th>
                  <th className="pb-3 font-medium text-right">Avg. Duration</th>
                </tr>
              </thead>
              <tbody className="text-[11px]">
                {[
                  { name: 'Autophagy Content Automation', icon: Share2, color: 'text-blue-500', bg: 'bg-blue-600/20', status: 'Active', statusColor: 'bg-emerald-950/50 text-emerald-400', runs: '67', success: '100%', successColor: 'text-emerald-400', duration: '1m 18s' },
                  { name: 'Social Media Post Automation', icon: Megaphone, color: 'text-emerald-500', bg: 'bg-emerald-600/20', status: 'Active', statusColor: 'bg-emerald-950/50 text-emerald-400', runs: '54', success: '98.1%', successColor: 'text-emerald-400', duration: '45s' },
                  { name: 'Weekly Newsletter Automation', icon: Mail, color: 'text-amber-500', bg: 'bg-amber-600/20', status: 'Inactive', statusColor: 'bg-amber-950/50 text-amber-400', runs: '37', success: '94.6%', successColor: 'text-emerald-400', duration: '2m 05s' },
                  { name: 'SEO Content Research', icon: Search, color: 'text-blue-400', bg: 'bg-blue-500/20', status: 'Draft', statusColor: 'bg-slate-800 text-slate-400', runs: '0', success: '-', successColor: 'text-slate-500', duration: '-' },
                  { name: 'Lead Nurture Automation', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-600/20', status: 'Active', statusColor: 'bg-emerald-950/50 text-emerald-400', runs: '0', success: '-', successColor: 'text-slate-500', duration: '-' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 pr-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-7 h-7 rounded border border-slate-700/50 flex items-center justify-center shrink-0 ${row.bg}`}>
                          <row.icon size={12} className={row.color} />
                        </div>
                        <span className="font-bold text-white whitespace-nowrap">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-medium ${row.statusColor}`}>{row.status}</span>
                    </td>
                    <td className="py-3 text-center font-bold text-slate-300">{row.runs}</td>
                    <td className="py-3 text-center font-bold">
                      <span className={row.successColor}>{row.success}</span>
                    </td>
                    <td className="py-3 text-right text-slate-300 font-medium pl-2">{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-center">
            <button className="px-4 py-1.5 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">View All Workflows</button>
          </div>
        </div>

        {/* Runs by Trigger Type */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex flex-col">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-bold text-white">Runs by Trigger Type</h3>
            <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
          </div>
          <p className="text-[10px] text-slate-400 mb-6">Breakdown of runs by trigger type.</p>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="h-40 relative mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={triggerData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} stroke="#0f172a" strokeWidth={2} dataKey="value" paddingAngle={2}>
                    {triggerData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2.5">
              {triggerData.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-[11px]">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.fill }}></div>
                    <span className="text-slate-300">{s.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <span className="text-white font-medium">{s.value}</span>
                    <span className="text-slate-500 w-12 text-right">({Math.round((s.value/158)*100)}%)</span>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between text-[11px] font-bold border-t border-slate-800/80 pt-2.5 mt-2.5">
                <span className="text-slate-400">Total</span>
                <span className="text-white mr-14">158</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Activity Impact & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Recent Activity Impact */}
        <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-bold text-white">Recent Activity Impact</h3>
            <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
          </div>
          <p className="text-[10px] text-slate-400 mb-6">Impact generated by your workflows in the selected period.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Blog Posts Published', value: '28', trend: '21%', icon: Globe, color: 'text-emerald-400' },
              { label: 'Social Posts Created', value: '156', trend: '18%', icon: Users, color: 'text-blue-400' },
              { label: 'Keywords Researched', value: '312', trend: '24%', icon: Search, color: 'text-amber-400' },
              { label: 'Emails Sent', value: '1,842', trend: '16%', icon: Mail, color: 'text-purple-400' },
              { label: 'Hours Saved', value: '24h 18m', trend: '22%', icon: Clock, color: 'text-teal-400' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col">
                <div className="flex items-center space-x-2 mb-2">
                  <item.icon size={16} className={item.color} />
                  <span className="text-[9px] font-bold text-slate-400 uppercase leading-tight max-w-[80px]">{item.label}</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{item.value}</div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-3 h-3 mr-0.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  {item.trend}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="bg-[#0b1220]/80 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-white">Insights</h3>
                <div className="w-3.5 h-3.5 rounded-full border border-slate-600 text-slate-400 flex items-center justify-center text-[8px]">i</div>
              </div>
              <button className="text-[10px] font-bold text-cyan-400 flex items-center space-x-1 hover:text-cyan-300 cursor-pointer">
                <span>View All Insights</span>
                <ChevronRight size={12} />
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'Performance is up!', desc: 'Your workflows ran 18.6% more this week compared to the previous 7 days.', icon: TrendingUp, color: 'text-emerald-400' },
                { title: 'Time saver', desc: 'You saved 24h 18m this week—22.3% more time than the last week.', icon: Clock, color: 'text-blue-400' },
                { title: 'High success rate', desc: 'Amazing! Your workflows maintained a 98.2% success rate.', icon: Sparkles, color: 'text-purple-400' }
              ].map((ins, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="mt-0.5"><ins.icon size={14} className={ins.color} /></div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-tight">{ins.title}</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">{ins.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function LiveActivityView() {
  const lineData = [
    { time: '11:40 AM', started: 15, completed: 10 },
    { time: '11:41 AM', started: 18, completed: 12 },
    { time: '11:42 AM', started: 25, completed: 18 },
    { time: '11:43 AM', started: 20, completed: 15 },
    { time: '11:44 AM', started: 28, completed: 14 },
    { time: '11:45 AM', started: 22, completed: 15 },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-8 py-8 custom-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-white">Live Activity</h1>
            <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/40 border border-emerald-900/50 rounded-full">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]"></div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Live</span>
            </div>
          </div>
          <p className="text-sm text-slate-400">Monitor your workflows in real-time and see what's happening right now.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 border border-slate-800 bg-slate-900/50 rounded-lg text-[11px] text-slate-300 font-bold cursor-pointer hover:border-slate-700 transition-colors">
            <RefreshCw size={12} className="text-slate-400" />
            <span>Auto Refresh</span>
            <span className="text-slate-500 mx-1">|</span>
            <span>5s</span>
            <ChevronDown size={12} className="text-slate-500" />
          </div>
          <button className="flex items-center space-x-2 border border-slate-700 hover:border-slate-600 bg-slate-900 px-4 py-2 rounded-lg text-xs font-bold text-slate-300 transition-colors cursor-pointer">
            <Filter size={12} className="text-slate-400" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {[
          { title: 'Active Workflows', value: '8', subValue: 'of 12 total', trend: '2 vs yesterday', trendColor: 'text-emerald-400', icon: Activity, iconColor: 'text-purple-400', iconBg: 'bg-purple-950/30 border-purple-900/50', up: true },
          { title: 'Running Executions', value: '23', subValue: '', trend: '5 vs yesterday', trendColor: 'text-emerald-400', icon: Play, iconColor: 'text-cyan-400', iconBg: 'bg-cyan-950/30 border-cyan-900/50', up: true },
          { title: 'Success Rate', value: '98.2%', subValue: '', trend: '1.4% vs yesterday', trendColor: 'text-emerald-400', icon: CheckCircle2, iconColor: 'text-blue-500', iconBg: 'bg-blue-950/30 border-blue-900/50', up: true },
          { title: 'Avg. Response Time', value: '1m 24s', subValue: '', trend: '12s vs yesterday', trendColor: 'text-emerald-400', icon: Clock, iconColor: 'text-amber-400', iconBg: 'bg-amber-950/30 border-amber-900/50', up: false } // arrow down is good for time
        ].map((m, i) => (
          <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase">{m.title}</div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${m.iconBg}`}>
                <m.icon size={20} className={m.iconColor} />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <div className="text-2xl font-bold text-white">{m.value}</div>
                  {m.subValue && <div className="text-[10px] text-slate-500">{m.subValue}</div>}
                </div>
                <div className="flex items-center space-x-1 text-[10px]">
                  <span className={`font-bold flex items-center ${m.trendColor}`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-3 h-3 mr-0.5 ${!m.up ? 'rotate-180' : ''}`}><polyline points="18 15 12 9 6 15"></polyline></svg>
                    {m.trend}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Active Executions Table */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center space-x-3">
                <h3 className="text-sm font-bold text-white">Active Executions</h3>
                <div className="px-2 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-900/50 text-cyan-400 text-[10px] font-bold">23 Running</div>
              </div>
              <button className="text-[10px] font-bold text-cyan-400 flex items-center space-x-1 hover:text-cyan-300 cursor-pointer">
                <span>View All Executions</span>
                <ChevronRight size={12} />
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] text-slate-500 font-bold">
                    <th className="pb-3 font-medium w-1/3">Workflow</th>
                    <th className="pb-3 font-medium">Execution ID</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Started</th>
                    <th className="pb-3 font-medium w-1/4">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[11px]">
                  {[
                    { name: 'Autophagy Content Automation', trigger: 'Scheduled Trigger', icon: Share2, color: 'text-blue-500', bg: 'bg-blue-600/20', id: '#24567', time: '11:58:00 AM', duration: '2m 18s', progress: 60 },
                    { name: 'Social Media Post Automation', trigger: 'Manual Trigger', icon: Megaphone, color: 'text-emerald-500', bg: 'bg-emerald-600/20', id: '#24566', time: '11:55:41 AM', duration: '4m 32s', progress: 75 },
                    { name: 'Weekly Newsletter Automation', trigger: 'Manual Trigger', icon: Mail, color: 'text-amber-500', bg: 'bg-amber-600/20', id: '#24565', time: '11:54:12 AM', duration: '3m 06s', progress: 45 },
                    { name: 'SEO Content Research', trigger: 'Manual Trigger', icon: Search, color: 'text-blue-400', bg: 'bg-blue-500/20', id: '#24564', time: '11:53:20 AM', duration: '5m 10s', progress: 80 },
                    { name: 'Lead Nurture Automation', trigger: 'Webhook Trigger', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-600/20', id: '#24563', time: '11:52:33 AM', duration: '1m 42s', progress: 35 },
                    { name: 'Customer Support Automation', trigger: 'Manual Trigger', icon: ClipboardList, color: 'text-emerald-400', bg: 'bg-emerald-500/20', id: '#24562', time: '11:51:08 AM', duration: '6m 23s', progress: 90 },
                    { name: 'Product Update Announcer', trigger: 'Scheduled Trigger', icon: Star, color: 'text-amber-400', bg: 'bg-amber-500/20', id: '#24561', time: '11:50:02 AM', duration: '2m 55s', progress: 65 },
                    { name: 'Competitor Monitoring', trigger: 'Scheduled Trigger', icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/20', id: '#24560', time: '11:48:45 AM', duration: '7m 18s', progress: 70 },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pr-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded border border-slate-700/50 flex items-center justify-center shrink-0 ${row.bg}`}>
                            <row.icon size={14} className={row.color} />
                          </div>
                          <div>
                            <div className="font-bold text-white text-xs whitespace-nowrap">{row.name}</div>
                            <div className="text-[9px] text-slate-500 mt-0.5">{row.trigger}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-400 font-medium">{row.id}</td>
                      <td className="py-3.5">
                        <div className="flex items-center space-x-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_5px_#34d399]"></div>
                          <span className="text-emerald-400 font-bold">Running</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-slate-300 font-medium">{row.time}</td>
                      <td className="py-3.5">
                        <div className="flex items-center justify-between space-x-3">
                          <span className="text-slate-300 font-medium">{row.duration}</span>
                          <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]" style={{ width: `${row.progress}%` }}></div>
                          </div>
                          <span className="text-slate-400 text-[9px] w-6 text-right">{row.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex justify-center">
              <button className="px-4 py-1.5 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer">View All Executions →</button>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">System Health</h3>
            <p className="text-[10px] text-slate-400 mb-5">All systems are operating normally.</p>
            
            <div className="flex flex-wrap items-center gap-6 justify-between lg:justify-start lg:gap-12 pb-2">
              {[
                { name: 'Workflow Engine', icon: Server, color: 'text-cyan-400' },
                { name: 'Integrations', icon: Zap, color: 'text-amber-400' },
                { name: 'Database', icon: Database, color: 'text-emerald-400' },
                { name: 'API Services', icon: Cloud, color: 'text-purple-400' }
              ].map((sys, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <sys.icon size={20} className={sys.color} />
                  <div>
                    <div className="text-[11px] font-bold text-slate-300">{sys.name}</div>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span className="text-[9px] font-bold text-emerald-400">Healthy</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-5 pt-4 border-t border-slate-800 flex justify-center lg:justify-start">
               <button className="text-[10px] font-bold text-slate-400 flex items-center space-x-1 hover:text-white cursor-pointer transition-colors">
                <span>View System Status</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-4">
          
          {/* Real-time Overview */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-1">Real-time Overview</h3>
            <p className="text-[10px] text-slate-400 mb-5">Live data from the last 5 minutes</p>
            
            <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { label: 'Executions Started', val: '18', trend: '12%', up: true, color: 'text-cyan-400' },
                { label: 'Executions Completed', val: '15', trend: '7%', up: true, color: 'text-emerald-400' },
                { label: 'Executions Failed', val: '0', trend: '—', up: null, color: 'text-rose-400' },
                { label: 'Executions In Progress', val: '23', trend: '15%', up: true, color: 'text-purple-400' }
              ].map((s, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-[8px] font-bold text-slate-400 uppercase leading-tight mb-1 h-6">{s.label}</div>
                  <div className={`text-xl font-bold mb-0.5 ${s.val === '0' ? 'text-slate-500' : 'text-white'}`}>{s.val}</div>
                  <div className={`text-[9px] font-bold flex items-center ${s.up ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {s.up !== null && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`w-2.5 h-2.5 mr-0.5 ${!s.up ? 'rotate-180' : ''}`}><polyline points="18 15 12 9 6 15"></polyline></svg>}
                    {s.trend}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-40 w-full relative -ml-4">
               <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} dy={5} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} />
                    <RechartsTooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                    <Line type="monotone" dataKey="started" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3, fill: '#06b6d4', stroke: '#020617', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="completed" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 3, fill: '#8b5cf6', stroke: '#020617', strokeWidth: 2 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-3">
               <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-medium">
                  <div className="w-2 h-0.5 bg-cyan-400"></div>
                  <span>Executions Started</span>
               </div>
               <div className="flex items-center space-x-1.5 text-[9px] text-slate-400 font-medium">
                  <div className="w-2 h-0.5 bg-purple-500 border-dashed border-b border-purple-500"></div>
                  <span>Executions Completed</span>
               </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 flex-1 min-h-[350px] flex flex-col">
            <h3 className="text-sm font-bold text-white mb-1">Recent Activity</h3>
            <p className="text-[10px] text-slate-400 mb-5">Live feed of workflow events</p>
            
            <div className="flex-1 space-y-4">
              {[
                { msg: 'Autophagy Content Automation completed successfully', id: 'Execution #24550', time: '11:58:25 AM', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-950/30' },
                { msg: 'Social Media Post Automation started', id: 'Execution #24556', time: '11:55:41 AM', icon: Play, color: 'text-cyan-400', bg: 'bg-cyan-950/30' },
                { msg: 'SEO Content Research completed successfully', id: 'Execution #24549', time: '11:53:12 AM', icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-950/30' },
                { msg: 'Lead Nurture Automation started', id: 'Execution #24563', time: '11:52:33 AM', icon: Play, color: 'text-cyan-400', bg: 'bg-cyan-950/30' },
                { msg: 'Weekly Newsletter Automation scheduled', id: 'Next run at 12:00 PM', time: '11:50:02 AM', icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-950/30' },
              ].map((ev, i) => (
                <div key={i} className="flex items-start space-x-3 group cursor-pointer">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border border-transparent group-hover:border-slate-700 transition-colors ${ev.bg}`}>
                    <ev.icon size={12} className={ev.color} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[11px] font-bold text-slate-200 leading-tight group-hover:text-white transition-colors">{ev.msg}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5">{ev.id}</div>
                  </div>
                  <div className="text-[9px] text-slate-400 shrink-0">{ev.time}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-center">
               <button className="text-[10px] font-bold text-slate-400 flex items-center space-x-1 hover:text-white cursor-pointer transition-colors">
                <span>View All Activity</span>
                <ChevronRight size={12} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function MarketplaceView() {
  const [activeCategory, setActiveCategory] = React.useState('SEO & Growth');
  const [skills, setSkills] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  
  const categories = [
    'All Categories', 'SEO & Growth', 'Content & Writing', 'Marketing', 
    'Design & Creative', 'Development', 'Data & Analytics', 'Sales & Support'
  ];

  const defaultSkills = [
    { name: 'Keyword Researcher', desc: 'Find high-value keywords with low competition and high intent.', bestFor: 'Content strategy, SEO planning', price: '$15 / task', icon: Search, color: 'text-emerald-400', bg: 'bg-emerald-950/40', ring: 'ring-emerald-900/50' },
    { name: 'On-Page SEO Optimizer', desc: 'Optimize titles, meta tags, headers, and content for better rankings.', bestFor: 'New pages, content updates', price: '$20 / page', icon: LayoutTemplate, color: 'text-blue-400', bg: 'bg-blue-950/40', ring: 'ring-blue-900/50' },
    { name: 'Link Building Specialist', desc: 'Find quality backlink opportunities and manage outreach.', bestFor: 'Authority building, off-page SEO', price: '$35 / link', icon: Link, color: 'text-cyan-400', bg: 'bg-cyan-950/40', ring: 'ring-cyan-900/50' },
    { name: 'Technical SEO Auditor', desc: 'Scan and report technical issues that impact performance.', bestFor: 'Site health, performance improvement', price: '$45 / audit', icon: ShieldCheck, color: 'text-amber-400', bg: 'bg-amber-950/40', ring: 'ring-amber-900/50' },
    { name: 'Content Gap Analyst', desc: 'Discover content gaps and topic opportunities your competitors rank for.', bestFor: 'Content planning, topic strategy', price: '$25 / report', icon: FileText, color: 'text-emerald-400', bg: 'bg-emerald-950/40', ring: 'ring-emerald-900/50' },
    { name: 'Competitor Analyst', desc: "Analyze competitors' strategies and uncover growth opportunities.", bestFor: 'Ongoing SEO monitoring', price: '$30 / report', icon: Target, color: 'text-fuchsia-400', bg: 'bg-fuchsia-950/40', ring: 'ring-fuchsia-900/50' },
    { name: 'Rank Tracker Reporter', desc: 'Track rankings across keywords and deliver actionable reports.', bestFor: 'Rank tracking, performance reporting', price: '$10 / report', icon: LineChartIcon, color: 'text-teal-400', bg: 'bg-teal-950/40', ring: 'ring-teal-900/50' },
    { name: 'Schema Markup Expert', desc: 'Implement schema markup to improve rich results and CTR.', bestFor: 'Rich results, visibility boost', price: '$30 / page', icon: Code, color: 'text-purple-400', bg: 'bg-purple-950/40', ring: 'ring-purple-900/50' },
  ];

  const iconMap: Record<string, any> = {
    'Search': Search,
    'LayoutTemplate': LayoutTemplate,
    'Link': Link,
    'ShieldCheck': ShieldCheck,
    'FileText': FileText,
    'Target': Target,
    'LineChart': LineChartIcon,
    'Code': Code
  };

  React.useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data, error } = await supabase.from('marketplace_skills').select('*');
        if (error || !data || data.length === 0) {
          console.warn('Falling back to default skills (Supabase not configured or table empty).');
          setSkills(defaultSkills);
        } else {
          const formattedSkills = data.map(s => ({
            name: s.name,
            desc: s.description,
            bestFor: s.best_for,
            price: s.price,
            icon: iconMap[s.icon_name] || Star, // fallback icon
            color: s.color_class,
            bg: s.bg_class,
            ring: s.ring_class
          }));
          setSkills(formattedSkills);
        }
      } catch (err) {
        console.error('Failed to fetch from Supabase:', err);
        setSkills(defaultSkills);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617]">
      {/* Top Header */}
      <div className="px-6 md:px-8 pt-8 pb-4 flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-800/60 sticky top-0 bg-[#020617]/90 backdrop-blur-md z-20">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/50 border border-cyan-900/50 flex items-center justify-center">
              <Sparkles size={16} className="text-cyan-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">AI Marketplace</h1>
          </div>
          <p className="text-[11px] text-slate-400 max-w-xl">Access high-skilled AI specialists to supercharge your brand. Pay per task. No subscriptions.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Search specialists or skills..." className="w-64 bg-slate-900/50 border border-slate-800 focus:border-slate-600 rounded-full py-1.5 pl-9 pr-4 text-[11px] text-slate-200 focus:outline-none transition-colors" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="relative w-8 h-8 rounded-full border border-slate-800/80 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Bell size={14} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_8px_rgba(168,85,247,0.6)]">3</span>
            </button>
            <button className="relative w-8 h-8 rounded-full border border-slate-800/80 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer">
              <ShoppingCart size={14} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-purple-500 rounded-full flex items-center justify-center text-[8px] font-bold text-white shadow-[0_0_8px_rgba(168,85,247,0.6)]">2</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:px-8 max-w-7xl mx-auto flex flex-col xl:flex-row gap-6">
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          
          {/* Hero Banner */}
          <div className="relative w-full rounded-2xl overflow-hidden bg-slate-900/40 border border-slate-800/60 p-8 flex flex-col justify-center min-h-[220px]">
             {/* Abstract Background Design */}
             <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
               <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#020617]/0 to-transparent"></div>
               
               {/* Glowing circles mimicking the design */}
               <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-32 rounded-full border-[3px] border-indigo-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                  <div className="w-24 h-24 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 to-transparent flex items-center justify-center backdrop-blur-sm border border-indigo-500/40">
                     <span className="text-2xl font-bold text-white tracking-wider">SEO</span>
                  </div>
               </div>
               
               {/* Decorative nodes */}
               <div className="absolute top-[20%] right-[10%] w-8 h-8 rounded-full bg-cyan-950/60 border border-cyan-800 flex items-center justify-center"><Search size={12} className="text-cyan-400" /></div>
               <div className="absolute bottom-[20%] right-[40%] w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center justify-center"><Link size={12} className="text-emerald-400" /></div>
               <div className="absolute top-[30%] right-[45%] w-6 h-6 rounded-full bg-blue-950/60 border border-blue-800 flex items-center justify-center"><BarChart2 size={10} className="text-blue-400" /></div>
             </div>

             <div className="relative z-10 max-w-md">
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-medium mb-4">
                  <span className="text-blue-500 hover:text-blue-400 cursor-pointer transition-colors">Marketplace</span>
                  <ChevronRight size={10} />
                  <span className="text-slate-300">SEO & Growth</span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center">
                    <TrendingUp size={18} className="text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">SEO & Growth Specialists</h2>
                </div>
                <p className="text-sm text-slate-400 ml-14">Boost your rankings, drive organic traffic, and grow your online presence.</p>
             </div>
          </div>

          {/* Categories Row */}
          <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-2">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${activeCategory === cat ? 'bg-indigo-950/40 border-indigo-500/50 text-indigo-300' : 'bg-slate-900/30 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Filters Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-slate-900/40 border border-slate-800 rounded-lg text-[10px] text-slate-300 cursor-pointer hover:border-slate-700 transition-colors">
              <span>All SEO Skills</span>
              <ChevronDown size={12} className="ml-2 text-slate-500" />
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-400">
              <span>Sort by:</span>
              <div className="flex items-center space-x-1 px-2 py-1 bg-slate-900/40 border border-slate-800 rounded cursor-pointer hover:border-slate-700 transition-colors text-slate-300">
                <span>Popular</span>
                <ChevronDown size={10} className="ml-1 text-slate-500" />
              </div>
            </div>
          </div>

          {/* Grid of Specialists */}
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 rounded-full border-2 border-cyan-500 border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill, i) => (
                <div key={i} className="bg-slate-900/30 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all group">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ring-1 ring-inset ${skill.ring} ${skill.bg}`}>
                        {skill.icon && <skill.icon size={18} className={skill.color} />}
                      </div>
                      <button className="text-slate-600 hover:text-slate-300 transition-colors cursor-pointer">
                        <Bookmark size={14} />
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">{skill.name}</h3>
                    <p className="text-[11px] text-slate-400 mb-4 leading-relaxed min-h-[36px]">{skill.desc}</p>
                    <p className="text-[10px] text-slate-500 mb-6 min-h-[30px]"><span className="text-slate-400 font-medium">Best for:</span> {skill.bestFor}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto border-t border-slate-800/60 pt-4">
                    <div>
                      <div className="text-[9px] text-slate-500 mb-0.5">Starting at</div>
                      <div className="text-[13px] font-bold"><span className={skill.color}>{skill.price.split(' ')[0]}</span> <span className="text-slate-400 text-[10px]">{skill.price.substring(skill.price.indexOf(' '))}</span></div>
                    </div>
                    <button className="px-3 py-1.5 bg-slate-800/50 hover:bg-cyan-950/40 text-[10px] font-bold text-cyan-400 border border-slate-700 hover:border-cyan-900/50 rounded-lg transition-colors cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Banner */}
          <div className="w-full rounded-xl bg-gradient-to-r from-indigo-950/40 to-purple-950/20 border border-indigo-900/30 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6">
             <div className="flex items-start space-x-3">
                <div className="mt-1"><Star size={16} className="text-indigo-400" /></div>
                <div>
                   <h4 className="text-sm font-bold text-white mb-1">Can't find what you need?</h4>
                   <p className="text-[11px] text-slate-400">Submit a custom request and our AI will match you with the perfect specialist.</p>
                </div>
             </div>
             <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 shrink-0 shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer">
               <span>Submit Custom Request</span>
               <ArrowRight size={12} />
             </button>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="w-full xl:w-[280px] shrink-0 space-y-4">
          
          {/* How It Works */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-4">How It Works</h3>
            <div className="space-y-4 relative before:absolute before:inset-y-2 before:left-[11px] before:w-px before:bg-slate-800">
              {[
                { step: '1', title: 'Choose a Specialist', desc: 'Browse specialists and select the one that fits your task.' },
                { step: '2', title: 'Submit Your Task', desc: 'Provide details and specific requirements.' },
                { step: '3', title: 'AI Gets to Work', desc: 'The specialist AI analyzes and executes your task.' },
                { step: '4', title: 'Receive Results', desc: 'Get high-quality results delivered fast.' }
              ].map((s, i) => (
                <div key={i} className="flex items-start space-x-3 relative z-10">
                  <div className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-900/50 flex items-center justify-center text-[10px] font-bold text-cyan-400 shrink-0">
                    {s.step}
                  </div>
                  <div className="pt-0.5">
                    <div className="text-[11px] font-bold text-slate-200 mb-0.5">{s.title}</div>
                    <div className="text-[9px] text-slate-500 leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-5 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors cursor-pointer">
              <span>Learn more</span>
              <ArrowRight size={10} />
            </button>
          </div>

          {/* My Cart */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <ShoppingCart size={14} className="text-slate-400" />
                <h3 className="text-sm font-bold text-white">My Cart</h3>
              </div>
              <div className="w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-[9px] font-bold text-white">2</div>
            </div>
            
            <div className="space-y-3 mb-4">
               <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                     <div className="w-6 h-6 rounded bg-emerald-950/40 border border-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5">
                        <Search size={10} className="text-emerald-400" />
                     </div>
                     <div>
                        <div className="text-[11px] font-bold text-slate-300">Keyword Researcher</div>
                        <div className="text-[9px] text-slate-500">$15 / task</div>
                     </div>
                  </div>
                  <button className="text-slate-600 hover:text-slate-400 p-0.5 cursor-pointer"><X size={10} /></button>
               </div>
               
               <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-2.5">
                     <div className="w-6 h-6 rounded bg-amber-950/40 border border-amber-900/50 flex items-center justify-center shrink-0 mt-0.5">
                        <ShieldCheck size={10} className="text-amber-400" />
                     </div>
                     <div>
                        <div className="text-[11px] font-bold text-slate-300">Technical SEO Auditor</div>
                        <div className="text-[9px] text-slate-500">$45 / audit</div>
                     </div>
                  </div>
                  <button className="text-slate-600 hover:text-slate-400 p-0.5 cursor-pointer"><X size={10} /></button>
               </div>
            </div>

            <div className="border-t border-slate-800/60 pt-4 mb-4 flex items-center justify-between">
               <span className="text-[11px] text-slate-400">Estimated Total</span>
               <span className="text-sm font-bold text-purple-400">$60.00</span>
            </div>

            <button className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold rounded-lg transition-colors shadow-[0_0_10px_rgba(147,51,234,0.3)] cursor-pointer">
               View Cart
            </button>
          </div>

          {/* Need Help */}
          <div className="bg-slate-900/30 border border-slate-800/60 rounded-xl p-5">
             <h3 className="text-xs font-bold text-white mb-2">Need Help?</h3>
             <p className="text-[10px] text-slate-400 mb-4">Our AI Concierge is here to help you find the perfect specialist.</p>
             <button className="w-full py-2 bg-slate-800/50 border border-slate-700 hover:bg-slate-800 text-cyan-400 text-[10px] font-bold rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer">
                <MessageCircle size={12} />
                <span>Chat with Concierge</span>
                <ArrowRight size={10} />
             </button>
          </div>

        </div>

      </div>
      
      {/* Floating Action Button (Optional Chat bubble from design bottom right) */}
      <div className="fixed bottom-6 right-6 z-50">
         <button className="w-12 h-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-transform hover:scale-105 cursor-pointer">
            <MessageSquare size={20} className="fill-slate-900" />
         </button>
      </div>
    </div>
  );
}

export default function Dashboard({ onSignOut }: { onSignOut?: () => void }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'mission-control' | 'brands' | 'brand-details' | 'brand-tasks' | 'ai-employees' | 'workflows' | 'analytics' | 'live-activity' | 'marketplace'>('overview');
  const [employeesList, setEmployeesList] = React.useState(aiEmployeesList);
  const [selectedEmpId, setSelectedEmpId] = React.useState('AI-EMP-001');
  const [empPage, setEmpPage] = React.useState(1);
  const [empSearch, setEmpSearch] = React.useState('');
  const [empTab, setEmpTab] = React.useState('All Employees');
  const [showAddEmpModal, setShowAddEmpModal] = React.useState(false);

  // Helper variables for filtering AI Employees
  const filteredEmployees = employeesList.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(empSearch.toLowerCase()) || 
                          emp.role.toLowerCase().includes(empSearch.toLowerCase()) ||
                          emp.dept.toLowerCase().includes(empSearch.toLowerCase());
    
    if (!matchesSearch) return false;

    if (empTab === 'Active') return emp.status === 'Active';
    if (empTab === 'Idle') return emp.status === 'Idle';
    if (empTab === 'Offline') return emp.status === 'Offline';
    
    return true;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (empTab === 'By Department') {
      return a.dept.localeCompare(b.dept);
    }
    if (empTab === 'By Brand') {
      return a.brandAccess.localeCompare(b.brandAccess);
    }
    return 0;
  });

  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(sortedEmployees.length / itemsPerPage));
  const paginatedEmployees = sortedEmployees.slice((empPage - 1) * itemsPerPage, empPage * itemsPerPage);
  const selectedEmp = employeesList.find(emp => emp.id === selectedEmpId) || employeesList[0];

  const sparkBrandsData = [
    { val: 1 },
    { val: 2 },
    { val: 2 },
    { val: 3 },
    { val: 4 }
  ];

  const sparkEmployeesData = [
    { val: 12 },
    { val: 16 },
    { val: 15 },
    { val: 20 },
    { val: 24 }
  ];

  const sparkWorkflowsData = [
    { val: 10 },
    { val: 15 },
    { val: 12 },
    { val: 22 },
    { val: 25 }
  ];

  const sparkTasksData = [
    { val: 300 },
    { val: 380 },
    { val: 420 },
    { val: 490 },
    { val: 527 }
  ];

  console.log("Dashboard Render Check");
  console.log("CountUp type:", typeof CountUp, CountUp);
  console.log("GaugeComponent type:", typeof GaugeComponent, GaugeComponent);
  console.log("AreaChart type:", typeof AreaChart);
  console.log("BarChart type:", typeof BarChart);
  console.log("SidebarSection type:", typeof SidebarSection);
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 font-sans overflow-hidden">
      
      {/* MOBILE LEFT SIDEBAR BACKDROP */}
      {leftSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setLeftSidebarOpen(false)} />
      )}

      {/* LEFT SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 lg:static w-[260px] border-r border-slate-800/60 bg-[#020617] flex flex-col z-50 lg:z-20 flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-cyan-950 flex items-center justify-center border border-cyan-900/50">
                <Radio size={16} className="text-cyan-400" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 tracking-[0.2em] uppercase leading-none mb-1">Mission Control</div>
                <div className="text-sm font-bold text-white uppercase tracking-wider leading-none">Digital Legends</div>
              </div>
            </div>
            <button onClick={() => setLeftSidebarOpen(false)} className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/30">
              <X size={16} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-cyan-900/10 border border-cyan-900/30 rounded-full w-fit">
             <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>
             <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">All Systems Online</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
          <SidebarSection title="Navigation">
            <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'overview'} onClick={() => { setActiveTab('overview'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={Target} label="Mission Control" active={activeTab === 'mission-control'} onClick={() => { setActiveTab('mission-control'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={Folder} label="Brands" active={activeTab === 'brands' || activeTab === 'brand-details'} onClick={() => { setActiveTab('brands'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={Users} label="AI Employees" active={activeTab === 'ai-employees'} onClick={() => { setActiveTab('ai-employees'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={GitBranch} label="Workflows" active={activeTab === 'workflows'} onClick={() => { setActiveTab('workflows'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={BarChart2} label="Analytics" active={activeTab === 'analytics'} onClick={() => { setActiveTab('analytics'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={Activity} label="Live Activity" active={activeTab === 'live-activity'} onClick={() => { setActiveTab('live-activity'); setLeftSidebarOpen(false); }} />
            <SidebarItem icon={Store} label="Marketplace" active={activeTab === 'marketplace'} onClick={() => { setActiveTab('marketplace'); setLeftSidebarOpen(false); }} />
          </SidebarSection>

          <SidebarSection title="Management">
            <SidebarItem icon={Building2} label="Boutique Manager" />
            <SidebarItem icon={Calendar} label="Roadmap" />
            <SidebarItem icon={CreditCard} label="Billing" />
          </SidebarSection>
        </div>

        <div className="p-4 border-t border-slate-800/60">
          <div onClick={onSignOut} className="flex items-center space-x-3 px-4 py-2 text-slate-400 hover:text-slate-200 cursor-pointer mb-2">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </div>
          
          <div className="flex items-center justify-between px-3 py-2 bg-slate-900/40 rounded-xl border border-slate-800/50 cursor-pointer">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-900/30 flex items-center justify-center text-cyan-400 font-bold border border-cyan-900/50">
                T
              </div>
              <div>
                <div className="text-xs font-bold text-white">Team</div>
                <div className="text-[9px] text-cyan-500 uppercase tracking-widest">Founder</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900/40 via-[#020617] to-[#020617] pointer-events-none"></div>
        {activeTab === 'overview' ? (
          <>
            {/* TOP BAR / HEADER */}
            <header className="px-4 md:px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
              <div>
                <h1 className="text-3xl font-extrabold text-white uppercase tracking-[0.08em] font-outfit leading-tight">
                  Mission Control
                </h1>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Centralized overview of all systems, brands, and operations.
                </p>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative hidden sm:block">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    placeholder="Search anything..." 
                    className="w-56 bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/60 rounded-xl py-1.5 pl-10 pr-10 text-[11px] text-slate-200 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-500 font-bold border border-slate-800 rounded px-1 py-0.2 bg-slate-900/50">
                    ⌘ K
                  </span>
                </div>

                {/* Notifications Bell */}
                <button className="relative w-8 h-8 rounded-xl border border-slate-800/80 bg-slate-950/20 flex items-center justify-center text-slate-450 hover:text-white transition-colors cursor-pointer">
                  <Bell size={15} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]"></span>
                </button>

                {/* Chat Message Box */}
                <button className="w-8 h-8 rounded-xl border border-slate-800/80 bg-slate-950/20 flex items-center justify-center text-slate-450 hover:text-white transition-colors cursor-pointer">
                  <MessageSquare size={15} />
                </button>

                {/* User Profile Info Dropdown */}
                <div className="flex items-center space-x-2.5 pl-2 border-l border-slate-800/80">
                  <div className="w-8 h-8 rounded-full bg-cyan-900/30 border border-cyan-800/40 flex items-center justify-center text-cyan-400 font-bold text-xs font-outfit">
                    T
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-[11px] font-bold text-white leading-none">Team Founder</div>
                    <div className="text-[8px] text-cyan-500 uppercase tracking-widest leading-none mt-1">Active</div>
                  </div>
                </div>

                {/* Date Dropdown */}
                <div className="flex items-center space-x-2 px-3.5 py-1.5 border border-slate-800/85 bg-slate-950/30 rounded-xl text-[10px] font-bold text-slate-350 hover:border-slate-700 transition-all cursor-pointer">
                  <Calendar size={12} className="text-slate-500" />
                  <span>May 22, 2025</span>
                  <ChevronDown size={10} className="text-slate-500" />
                </div>
              </div>
            </header>

            {/* SCROLLABLE ECOSYSTEM VIEW AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 z-10 custom-scrollbar">
              
              {/* FIVE FLEET STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                
                {/* Stat 1: Total Brands */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center text-cyan-400">
                        <Grid size={15} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Brands</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-black text-white font-outfit">4</span>
                      <span className="text-[9px] text-emerald-450 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1 animate-pulse" /> Active Brands
                      </span>
                    </div>
                  </div>
                  {/* Interactive Recharts Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkBrandsData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                        <defs>
                          <linearGradient id="cyanSparkGradStat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={1.5} fillOpacity={1} fill="url(#cyanSparkGradStat)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stat 2: AI Employees */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-900/50 flex items-center justify-center text-purple-400">
                        <Users size={15} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Employees</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-black text-white font-outfit">24</span>
                      <span className="text-[9px] text-purple-400 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-1 animate-pulse" /> Across All Brands
                      </span>
                    </div>
                  </div>
                  {/* Interactive Recharts Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkEmployeesData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                        <defs>
                          <linearGradient id="purpleSparkGradStat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#a855f7" strokeWidth={1.5} fillOpacity={1} fill="url(#purpleSparkGradStat)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stat 3: Active Workflows */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-950/40 border border-emerald-900/50 flex items-center justify-center text-emerald-450">
                        <GitBranch size={15} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Workflows</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-black text-white font-outfit">25</span>
                      <span className="text-[9px] text-emerald-450 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1 animate-pulse" /> Running Now
                      </span>
                    </div>
                  </div>
                  {/* Interactive Recharts Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkWorkflowsData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                        <defs>
                          <linearGradient id="emeraldSparkGradStat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#emeraldSparkGradStat)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stat 4: Tasks Completed */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-yellow-950/40 border border-yellow-900/50 flex items-center justify-center text-yellow-450">
                        <Clock size={15} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-black text-white font-outfit">527</span>
                      <span className="text-[9px] text-yellow-450 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-yellow-550 rounded-full mr-1 animate-pulse" /> This Month
                      </span>
                    </div>
                  </div>
                  {/* Interactive Recharts Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={sparkTasksData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                        <defs>
                          <linearGradient id="yellowSparkGradStat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#eab308" stopOpacity={0.25} />
                            <stop offset="100%" stopColor="#eab308" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#eab308" strokeWidth={1.5} fillOpacity={1} fill="url(#yellowSparkGradStat)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Stat 5: System Health */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center space-x-2.5 mb-1 shrink-0">
                    <div className="w-8 h-8 rounded-lg bg-teal-950/40 border border-teal-900/50 flex items-center justify-center text-teal-400">
                      <Activity size={15} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Health</span>
                  </div>

                  <div className="relative w-full h-28 flex items-center justify-center -mt-2 shrink-0">
                    <div className="w-40 h-28 relative scale-[1.2]">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.1,
                          padding: 0.02,
                          subArcs: [
                            { limit: 20, color: '#ef4444' },
                            { limit: 40, color: '#f97316' },
                            { limit: 60, color: '#eab308' },
                            { limit: 80, color: '#3b82f6' },
                            { limit: 100, color: '#0ea5e9' }
                          ]
                        }}
                        pointer={{ type: 'needle', color: '#fff', width: 3, length: 0.7, elastic: true }}
                        labels={{
                          valueLabel: { formatTextValue: () => '' },
                          tickLabels: {
                            type: 'outer',
                            ticks: [{ value: 20 }, { value: 40 }, { value: 60 }, { value: 80 }],
                            defaultTickValueConfig: { style: { fontSize: '8px', fill: '#94a3b8', textShadow: 'none' } }
                          }
                        }}
                        value={100}
                      />
                      <div className="absolute bottom-2 left-0 right-0 text-center">
                        <div className="text-2xl font-black text-white font-outfit leading-none">100%</div>
                        <div className="text-[9px] text-teal-400 font-bold mt-0.5 leading-none">Online</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-1 shrink-0">
                    <span className="text-[8.5px] text-slate-400 font-medium">
                      All Systems Operational
                    </span>
                  </div>
                </div>

              </div>

              {/* MIDDLE ROW: SYSTEM OVERVIEW (MAP) & LIVE ACTIVITY FEED */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                
                {/* Left System Overview World Map Card */}
                <div className="lg:col-span-2 bg-[#0B1120]/45 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/70 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">
                      System Overview
                    </h2>
                    
                    {/* SVG Map Visualizer Layout */}
                    <div className="relative h-64 w-full flex items-center justify-center mt-3">
                      <WorldMap className="absolute inset-0 w-full h-full opacity-[0.7] text-teal-500/20 hover:text-teal-400/30 transition-all duration-300" />

                      {/* Map Status Overlay Right Card */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-52 bg-slate-950/85 border border-slate-800/80 rounded-xl p-4 shadow-xl backdrop-blur-sm space-y-3 z-20 hover:border-slate-700/60 transition-all">
                        <div className="flex items-center space-x-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <div>
                            <div className="text-[10px] font-bold text-white leading-none">All Systems Operational</div>
                            <div className="text-[7.5px] text-slate-500 leading-none mt-1">Updated just now</div>
                          </div>
                        </div>

                        <div className="border-t border-slate-900/60 pt-2.5 space-y-2">
                          {[
                            { label: 'AI Infrastructure', status: 'Operational' },
                            { label: 'Data Services', status: 'Operational' },
                            { label: 'Automation Engine', status: 'Operational' },
                            { label: 'Brand Operations', status: 'Operational' },
                            { label: 'Security & Compliance', status: 'Operational' }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-[9px] leading-none">
                              <span className="text-slate-450 font-medium">{item.label}</span>
                              <span className="text-emerald-450 font-bold">{item.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shield Check Alert Bar */}
                  <div className="mt-4 flex items-center space-x-3 bg-emerald-950/15 border border-emerald-900/35 rounded-xl px-4 py-2.5">
                    <CheckCircle2 size={14} className="text-emerald-450 shrink-0" />
                    <div className="text-[9.5px] font-bold text-slate-350 leading-snug">
                      All systems are running smoothly. <span className="text-slate-500 font-medium ml-2">Last checked: May 22, 2025 10:45 AM</span>
                    </div>
                  </div>
                </div>

                {/* Right Live Activity Feed Card */}
                <div className="bg-[#0B1120]/45 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/70 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.01] rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider font-outfit">
                        Live Activity Feed
                      </h2>
                      <button className="px-2.5 py-1 bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 rounded-lg text-[9px] font-bold text-slate-400 hover:text-white transition-colors cursor-pointer uppercase tracking-wider">
                        View All
                      </button>
                    </div>

                    <div className="space-y-3.5 flex-1">
                      {[
                        { 
                          badge: CheckCircle2, 
                          color: 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400',
                          title: 'Autophagy Fasting App',
                          desc: 'New user registered',
                          time: '2 min ago'
                        },
                        { 
                          badge: GitBranch, 
                          color: 'bg-purple-950/40 border-purple-900/50 text-purple-400',
                          title: 'Content Creation Workflow',
                          desc: 'Blog post published successfully',
                          time: '5 min ago'
                        },
                        { 
                          badge: Clock, 
                          color: 'bg-yellow-950/40 border-yellow-900/50 text-yellow-400',
                          title: 'Digital Legends',
                          desc: 'Monthly analytics report generated',
                          time: '12 min ago'
                        },
                        { 
                          badge: Users, 
                          color: 'bg-blue-950/40 border-blue-900/50 text-blue-400',
                          title: 'AI Employee: Content Writer',
                          desc: 'Task completed: Write product description',
                          time: '15 min ago'
                        },
                        { 
                          badge: Zap, 
                          color: 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400',
                          title: 'Email Marketing Workflow',
                          desc: 'Campaign "Ramadan Fasting Tips" sent',
                          time: '18 min ago'
                        }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start justify-between space-x-3 text-left">
                          <div className="flex items-start space-x-3 min-w-0">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${item.color}`}>
                              <item.badge size={13} />
                            </div>
                            <div className="min-w-0 leading-tight">
                              <h4 className="text-[10px] font-bold text-white truncate">{item.title}</h4>
                              <p className="text-[9.5px] text-slate-450 mt-1 truncate">{item.desc}</p>
                            </div>
                          </div>
                          <span className="text-[8.5px] text-slate-500 font-medium shrink-0 leading-none mt-1">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* FOUR CHARTS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
                {/* Chart 1: Tasks Completed (This Month) */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg h-56 group hover:border-slate-700/70 transition-all">
                  <div className="shrink-0 leading-none">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Tasks Completed <span className="text-[8.5px] text-slate-500">(This Month)</span></span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white font-outfit">527</span>
                      <span className="text-[9px] font-bold text-emerald-450">+24% <span className="text-slate-500 font-medium">vs last month</span></span>
                    </div>
                  </div>
                  {/* Glowing Blue AreaChart */}
                  <div className="flex-1 w-full min-h-0 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Apr 22', val: 200 },
                        { name: 'Apr 29', val: 320 },
                        { name: 'May 6', val: 280 },
                        { name: 'May 13', val: 450 },
                        { name: 'May 20', val: 527 }
                      ]} margin={{ top: 5, right: 0, left: -32, bottom: -10 }}>
                        <defs>
                          <linearGradient id="glowBlueGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '9px', color: '#fff' }} />
                        <Area type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={1.5} fillOpacity={1} fill="url(#glowBlueGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Workflows Performance */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg h-56 group hover:border-slate-700/70 transition-all">
                  <div className="shrink-0 leading-none">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Workflows Performance</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white font-outfit">25</span>
                      <span className="text-[9px] font-bold text-emerald-450">+12% <span className="text-slate-500 font-medium">vs last month</span></span>
                    </div>
                  </div>
                  {/* Glowing Purple AreaChart */}
                  <div className="flex-1 w-full min-h-0 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Apr 22', val: 10 },
                        { name: 'Apr 29', val: 15 },
                        { name: 'May 6', val: 12 },
                        { name: 'May 13', val: 22 },
                        { name: 'May 20', val: 25 }
                      ]} margin={{ top: 5, right: 0, left: -32, bottom: -10 }}>
                        <defs>
                          <linearGradient id="glowPurpGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '9px', color: '#fff' }} />
                        <Area type="monotone" dataKey="val" stroke="#a855f7" strokeWidth={1.5} fillOpacity={1} fill="url(#glowPurpGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 3: AI Employees Activity */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg h-56 group hover:border-slate-700/70 transition-all">
                  <div className="shrink-0 leading-none">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">AI Employees Activity</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white font-outfit">24</span>
                      <span className="text-[9px] font-bold text-emerald-450">+18% <span className="text-slate-500 font-medium">vs last month</span></span>
                    </div>
                  </div>
                  {/* Glowing Green AreaChart */}
                  <div className="flex-1 w-full min-h-0 mt-3">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { name: 'Apr 22', val: 8 },
                        { name: 'Apr 29', val: 12 },
                        { name: 'May 6', val: 10 },
                        { name: 'May 13', val: 18 },
                        { name: 'May 20', val: 24 }
                      ]} margin={{ top: 5, right: 0, left: -32, bottom: -10 }}>
                        <defs>
                          <linearGradient id="glowGreenGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={8} tickLine={false} axisLine={false} />
                        <RechartsTooltip contentStyle={{ background: '#090d16', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '9px', color: '#fff' }} />
                        <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill="url(#glowGreenGrad)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 4: System Uptime */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-5 flex flex-col justify-between shadow-lg h-56 group hover:border-slate-700/70 transition-all">
                  <div className="shrink-0 leading-none">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">System Uptime</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white font-outfit">100%</span>
                      <span className="text-[9px] text-teal-400 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1 animate-pulse" /> AI Systems Stable
                      </span>
                    </div>
                  </div>
                  {/* Glowing Vertical Bar Chart */}
                  <div className="flex-1 w-full min-h-0 mt-3 flex items-end justify-between h-28 px-1 pb-1">
                    {[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h}%` }} 
                        className="w-1.5 bg-gradient-to-t from-teal-500/10 via-teal-500/35 to-teal-400 rounded-sm shadow-[0_0_4px_rgba(20,184,166,0.25)]"
                      />
                    ))}
                  </div>
                  <div className="flex justify-between text-[8px] text-slate-500 mt-1 uppercase font-bold tracking-wider shrink-0 px-1 border-t border-slate-900/40 pt-1.5">
                    <span>Apr 22</span>
                    <span>May 20</span>
                  </div>
                </div>

              </div>

              {/* BOTTOM SECTION: BRANDS OVERVIEW & QUICK ACTIONS */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left Column: Brands Overview (Col Span 3) */}
                <div className="lg:col-span-3 bg-transparent">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider font-outfit flex items-center">
                      <Folder size={14} className="text-cyan-400 mr-2" /> Brands Overview
                    </h2>
                    <button 
                      onClick={() => setActiveTab('brands')}
                      className="text-[9px] text-cyan-400 font-bold hover:underline transition-colors uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                    >
                      <span>View All Brands</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Brand Card 1: Digital Legends */}
                    <div className="bg-[#0b1220]/45 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#121c2c] border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold font-outfit text-xs">
                            DL
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-white leading-none">Digital Legends</h4>
                            <span className="text-[8px] text-slate-500 leading-none block mt-1">Company</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-center border-t border-slate-900/60 pt-2.5 mb-3">
                          <div>
                            <div className="text-[11px] font-bold text-white">10</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Employees</div>
                          </div>
                          <div className="border-x border-slate-900/60">
                            <div className="text-[11px] font-bold text-white">18</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Workflows</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white">256</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Tasks</div>
                          </div>
                        </div>
                      </div>

                      {/* sparkline */}
                      <div className="w-full h-6 overflow-hidden shrink-0 mb-3">
                        <svg className="w-full h-full text-cyan-400 opacity-80" viewBox="0 0 100 20">
                          <path d="M 0 18 Q 15 8 30 15 T 60 5 T 100 12" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      <button 
                        onClick={() => setActiveTab('brand-details')}
                        className="text-[9px] font-bold text-slate-400 group-hover:text-cyan-450 transition-colors uppercase tracking-wider flex items-center justify-center space-x-1 py-1.5 border border-slate-800/80 rounded-lg bg-slate-950/20 cursor-pointer"
                      >
                        <span>View Brand</span>
                        <ArrowUpRight size={10} />
                      </button>
                    </div>

                    {/* Brand Card 2: Autophagy Fasting App */}
                    <div className="bg-[#0b1220]/45 border border-slate-800/80 hover:border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#132824] border border-emerald-500/20 flex items-center justify-center text-emerald-450">
                            <Globe size={14} className="text-emerald-450" />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-white leading-none">Autophagy Fasting</h4>
                            <span className="text-[8px] text-slate-500 leading-none block mt-1">Brand</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-center border-t border-slate-900/60 pt-2.5 mb-3">
                          <div>
                            <div className="text-[11px] font-bold text-white">6</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Employees</div>
                          </div>
                          <div className="border-x border-slate-900/60">
                            <div className="text-[11px] font-bold text-white">8</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Workflows</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white">126</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Tasks</div>
                          </div>
                        </div>
                      </div>

                      {/* sparkline */}
                      <div className="w-full h-6 overflow-hidden shrink-0 mb-3">
                        <svg className="w-full h-full text-emerald-400 opacity-80" viewBox="0 0 100 20">
                          <path d="M 0 15 Q 15 5 30 12 T 60 4 T 100 8" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      <button 
                        onClick={() => setActiveTab('brands')}
                        className="text-[9px] font-bold text-slate-400 group-hover:text-emerald-450 transition-colors uppercase tracking-wider flex items-center justify-center space-x-1 py-1.5 border border-slate-800/80 rounded-lg bg-slate-950/20 cursor-pointer"
                      >
                        <span>View Brand</span>
                        <ArrowUpRight size={10} />
                      </button>
                    </div>

                    {/* Brand Card 3: Ramadan Fasting App */}
                    <div className="bg-[#0b1220]/45 border border-slate-800/80 hover:border-purple-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#23173d] border border-purple-500/20 flex items-center justify-center text-purple-400">
                            <SlidersHorizontal size={14} className="text-purple-450" />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-white leading-none">Ramadan Fasting</h4>
                            <span className="text-[8px] text-slate-500 leading-none block mt-1">Brand</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-center border-t border-slate-900/60 pt-2.5 mb-3">
                          <div>
                            <div className="text-[11px] font-bold text-white">4</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Employees</div>
                          </div>
                          <div className="border-x border-slate-900/60">
                            <div className="text-[11px] font-bold text-white">6</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Workflows</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white">98</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Tasks</div>
                          </div>
                        </div>
                      </div>

                      {/* sparkline */}
                      <div className="w-full h-6 overflow-hidden shrink-0 mb-3">
                        <svg className="w-full h-full text-purple-400 opacity-80" viewBox="0 0 100 20">
                          <path d="M 0 16 Q 20 6 40 12 T 80 4 T 100 10" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      <button 
                        onClick={() => setActiveTab('brands')}
                        className="text-[9px] font-bold text-slate-400 group-hover:text-purple-400 transition-colors uppercase tracking-wider flex items-center justify-center space-x-1 py-1.5 border border-slate-800/80 rounded-lg bg-slate-950/20 cursor-pointer"
                      >
                        <span>View Brand</span>
                        <ArrowUpRight size={10} />
                      </button>
                    </div>

                    {/* Brand Card 4: One Global Fasting App */}
                    <div className="bg-[#0b1220]/45 border border-slate-800/80 hover:border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group transition-all duration-300">
                      <div>
                        <div className="flex items-center space-x-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-[#12203d] border border-[#06b6d4]/20 flex items-center justify-center text-[#06b6d4]">
                            <Globe size={14} className="text-[#06b6d4]" />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-white leading-none">One Global Fasting</h4>
                            <span className="text-[8px] text-slate-500 leading-none block mt-1">Brand</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1 text-center border-t border-slate-900/60 pt-2.5 mb-3">
                          <div>
                            <div className="text-[11px] font-bold text-white">4</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Employees</div>
                          </div>
                          <div className="border-x border-slate-900/60">
                            <div className="text-[11px] font-bold text-white">5</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Workflows</div>
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white">87</div>
                            <div className="text-[7.5px] text-slate-500 uppercase font-semibold">Tasks</div>
                          </div>
                        </div>
                      </div>

                      {/* sparkline */}
                      <div className="w-full h-6 overflow-hidden shrink-0 mb-3">
                        <svg className="w-full h-full text-[#06b6d4] opacity-80" viewBox="0 0 100 20">
                          <path d="M 0 15 Q 15 5 30 12 T 60 4 T 100 8" fill="none" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>

                      <button 
                        onClick={() => setActiveTab('brands')}
                        className="text-[9px] font-bold text-slate-400 group-hover:text-cyan-455 transition-colors uppercase tracking-wider flex items-center justify-center space-x-1 py-1.5 border border-slate-800/80 rounded-lg bg-slate-950/20 cursor-pointer"
                      >
                        <span>View Brand</span>
                        <ArrowUpRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Column: Quick Actions & Insights (Col Span 1) */}
                <div className="space-y-4">
                  {/* Quick Actions Card */}
                  <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                    <h3 className="text-[10px] font-bold text-slate-450 uppercase tracking-widest mb-3.5 leading-none">
                      Quick Actions
                    </h3>
                    
                    <div className="space-y-3.5">
                      {[
                        { 
                          icon: Plus, 
                          color: 'bg-emerald-950/40 border-emerald-900/50 text-emerald-400',
                          title: 'Create New Workflow', 
                          desc: 'Automate a new business process' 
                        },
                        { 
                          icon: Users, 
                          color: 'bg-purple-950/40 border-purple-900/50 text-purple-400',
                          title: 'Add New AI Employee', 
                          desc: 'Assign AI to handle tasks' 
                        },
                        { 
                          icon: BarChart2, 
                          color: 'bg-yellow-950/40 border-yellow-900/50 text-yellow-400',
                          title: 'Generate Report', 
                          desc: 'Analytics & performance report' 
                        },
                        { 
                          icon: SlidersHorizontal, 
                          color: 'bg-blue-950/40 border-blue-900/50 text-blue-400',
                          title: 'System Settings', 
                          desc: 'Configure system preferences' 
                        }
                      ].map((action, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-slate-950/25 border border-slate-900/40 hover:border-slate-800 cursor-pointer group transition-colors">
                          <div className="flex items-center space-x-3 text-left">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${action.color}`}>
                              <action.icon size={13} />
                            </div>
                            <div>
                              <h4 className="text-[9.5px] font-bold text-white group-hover:text-cyan-400 transition-colors leading-none">{action.title}</h4>
                              <p className="text-[8px] text-slate-500 mt-1 leading-none">{action.desc}</p>
                            </div>
                          </div>
                          <ChevronRight size={12} className="text-slate-650 group-hover:text-white transition-colors shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Insight Card */}
                  <div className="bg-gradient-to-br from-[#0e2c35]/25 via-[#0b1220]/45 to-[#0b1220]/45 border border-cyan-900/30 rounded-2xl p-5 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/[0.03] rounded-full blur-2xl pointer-events-none"></div>
                    
                    <div className="flex items-start space-x-3.5 text-left">
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/55 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.2)] animate-pulse">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest block mb-1">AI Insight</span>
                        <p className="text-[9.5px] text-slate-350 leading-relaxed font-medium">
                          Your productivity is up <span className="text-emerald-450 font-bold">23%</span> this month. Keep up the great work! Your automation strategy is delivering excellent results.
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('mission-control')}
                      className="w-full mt-4 py-2 bg-cyan-950/20 border border-cyan-900/40 hover:bg-cyan-600 hover:text-white rounded-xl text-[9px] font-bold text-cyan-400 transition-all cursor-pointer text-center flex items-center justify-center space-x-1"
                    >
                      <span>View Analytics</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </>
        ) : activeTab === 'ai-employees' ? (
          <>
            {/* TOP BAR / HEADER */}
            <header className="px-4 md:px-8 pt-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
              <div>
                <h1 className="text-3xl font-extrabold text-white uppercase tracking-[0.08em] font-outfit leading-tight">
                  AI Employees
                </h1>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Manage your AI workforce. Monitor performance, assign tasks, and optimize results.
                </p>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center space-x-4">
                {/* Search Bar */}
                <div className="relative hidden sm:block">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="text" 
                    value={empSearch}
                    onChange={(e) => { setEmpSearch(e.target.value); setEmpPage(1); }}
                    placeholder="Search AI employees..." 
                    className="w-56 bg-slate-950/40 border border-slate-800/80 hover:border-slate-700/60 rounded-xl py-1.5 pl-10 pr-10 text-[11px] text-slate-200 focus:outline-none transition-colors"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[9px] text-slate-500 font-bold border border-slate-800 rounded px-1 py-0.2 bg-slate-900/50">
                    ⌘ K
                  </span>
                </div>

                {/* Notifications Bell */}
                <button className="relative w-8 h-8 rounded-xl border border-slate-800/80 bg-slate-950/20 flex items-center justify-center text-slate-455 hover:text-white transition-colors cursor-pointer">
                  <Bell size={15} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]"></span>
                </button>

                {/* + Add AI Employee Button */}
                <button 
                  onClick={() => setShowAddEmpModal(true)}
                  className="flex items-center space-x-2 px-4 py-1.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.3)] cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add AI Employee</span>
                </button>
              </div>
            </header>

            {/* SCROLLABLE ECOSYSTEM VIEW AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 z-10 custom-scrollbar">
              
              {/* FIVE STAT CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                
                {/* Stat 1: Total AI Employees */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total AI Employees</span>
                    <div className="w-8 h-8 rounded-lg bg-purple-950/40 border border-purple-900/50 flex items-center justify-center text-purple-400">
                      <Users size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-outfit">
                      <CountUp end={employeesList.length} duration={1.5} />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold block mt-1">Across all brands</span>
                  </div>
                </div>

                {/* Stat 2: Active Now */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Now</span>
                    <div className="w-8 h-8 rounded-lg bg-teal-950/40 border border-teal-900/50 flex items-center justify-center text-teal-455">
                      <Activity size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-outfit">
                      <CountUp end={employeesList.filter(e => e.status === 'Active').length} duration={1.5} />
                    </div>
                    <span className="text-[9px] text-teal-400 font-bold block mt-1">
                      {Math.round((employeesList.filter(e => e.status === 'Active').length / employeesList.length) * 100)}% of total
                    </span>
                  </div>
                </div>

                {/* Stat 3: Tasks Completed */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</span>
                    <div className="w-8 h-8 rounded-lg bg-yellow-950/40 border border-yellow-900/50 flex items-center justify-center text-yellow-455">
                      <CheckCircle2 size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-outfit">
                      <CountUp end={employeesList.reduce((sum, e) => sum + e.tasks, 0)} separator="," duration={1.5} />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold block mt-1">This Month</span>
                  </div>
                </div>

                {/* Stat 4: Avg. Performance */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg. Performance</span>
                    <div className="w-8 h-8 rounded-lg bg-blue-950/40 border border-blue-900/50 flex items-center justify-center text-blue-455">
                      <TrendingUp size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-outfit">
                      <CountUp end={96.8} decimals={1} suffix="%" duration={1.5} />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold block mt-1">This Month</span>
                  </div>
                </div>

                {/* Stat 5: Total Hours Saved */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Hours Saved</span>
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-900/50 flex items-center justify-center text-cyan-400">
                      <Clock size={15} />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white font-outfit">
                      <CountUp end={532} suffix="h" duration={1.5} />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold block mt-1">This Month</span>
                  </div>
                </div>

              </div>

              {/* FILTERS & SEARCH ROW */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                
                {/* Horizontal tabs */}
                <div className="flex items-center space-x-1.5 bg-[#0b1220]/60 border border-slate-800/60 p-1 rounded-xl w-full sm:w-auto overflow-x-auto scrollbar-none shrink-0">
                  {['All Employees', 'By Department', 'By Brand', 'Active', 'Idle', 'Offline'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => { setEmpTab(tab); setEmpPage(1); }}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        empTab === tab
                          ? 'bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30'
                          : 'border border-transparent text-slate-400 hover:text-white hover:bg-slate-800/35'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Search / Filter Buttons */}
                <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                  <button className="flex items-center space-x-2 px-4 py-1.5 bg-[#0b1220]/45 border border-slate-800/80 rounded-xl text-xs font-bold text-slate-350 hover:text-white hover:border-slate-700 transition-colors cursor-pointer">
                    <SlidersHorizontal size={13} className="text-slate-400" />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center space-x-2 px-3.5 py-1.5 border border-slate-800/85 bg-slate-950/30 rounded-xl text-[10px] font-bold text-slate-350 hover:border-slate-700 transition-all cursor-pointer">
                    <span>Sort by: Newest</span>
                    <ChevronDown size={10} className="text-slate-500" />
                  </div>
                </div>

              </div>

              {/* MAIN CONTENT SPLIT GRID LAYOUT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left side: AI Employees Table (Col Span 2) */}
                <div className="lg:col-span-2 bg-[#0B1120]/45 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300 min-h-[560px]">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="border-b border-slate-900/60 pb-3">
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">AI Employee</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Role</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Department</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Status</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Performance</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Tasks</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3">Last Active</th>
                          <th className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900/40">
                        {paginatedEmployees.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="text-center py-12 text-slate-500 text-xs font-semibold">
                              No AI Employees found matching the filter criteria.
                            </td>
                          </tr>
                        ) : (
                          paginatedEmployees.map((emp) => (
                            <tr 
                              key={emp.id} 
                              onClick={() => setSelectedEmpId(emp.id)}
                              className={`group/row hover:bg-slate-900/35 cursor-pointer transition-colors ${
                                selectedEmpId === emp.id ? 'bg-slate-900/45 border-l-2 border-emerald-500' : ''
                              }`}
                            >
                              {/* AI Employee Avatar & Name */}
                              <td className="py-3.5 pr-2">
                                <div className="flex items-center space-x-3.5">
                                  <div className="relative w-9 h-9 rounded-xl bg-purple-950/40 border border-purple-800/30 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.15)] group-hover/row:border-purple-600/50 transition-colors shrink-0">
                                    <span className="relative flex h-2 w-2 absolute -top-0.5 -right-0.5 z-10">
                                      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                                        emp.status === 'Active' ? 'bg-emerald-400' : emp.status === 'Idle' ? 'bg-amber-400' : 'bg-slate-400'
                                      }`}></span>
                                      <span className={`relative inline-flex rounded-full h-2 w-2 ${
                                        emp.status === 'Active' ? 'bg-emerald-500' : emp.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'
                                      }`}></span>
                                    </span>
                                    <Monitor size={15} />
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-white leading-tight group-hover/row:text-emerald-450 transition-colors leading-none">{emp.name}</h4>
                                    <span className="text-[8.5px] text-slate-500 leading-none mt-1.5 block uppercase tracking-wider">{emp.id}</span>
                                  </div>
                                </div>
                              </td>

                              {/* Role */}
                              <td className="py-3.5 pr-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-bold text-slate-300">{emp.role}</span>
                                  <span className={`px-2 py-0.5 border rounded text-[7.5px] font-bold uppercase tracking-wider leading-none shrink-0 ${emp.roleBadgeColor}`}>
                                    AI
                                  </span>
                                </div>
                              </td>

                              {/* Department */}
                              <td className="py-3.5 pr-2 text-xs font-semibold text-slate-400">
                                {emp.dept}
                              </td>

                              {/* Status Badge */}
                              <td className="py-3.5 pr-2">
                                <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.8 rounded-full border text-[9px] font-black tracking-wide ${
                                  emp.status === 'Active' 
                                    ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-450' 
                                    : emp.status === 'Idle'
                                      ? 'bg-amber-950/40 border-amber-900/50 text-amber-450'
                                      : 'bg-slate-900/60 border-slate-800 text-slate-450'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    emp.status === 'Active' ? 'bg-emerald-500' : emp.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'
                                  }`} />
                                  <span>{emp.status}</span>
                                </span>
                              </td>

                              {/* Performance Micro Chart */}
                              <td className="py-3.5 pr-2">
                                <div className="flex items-center space-x-3.5">
                                  <span className="text-xs font-bold text-white font-outfit">{emp.perf}%</span>
                                  <div className="w-16 h-6 overflow-hidden shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                      <AreaChart data={emp.perfTrend} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                                        <defs>
                                          <linearGradient id={`tblGrad-${emp.id}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={emp.perf >= 95 ? '#10b981' : '#eab308'} stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor={emp.perf >= 95 ? '#10b981' : '#eab308'} stopOpacity={0}/>
                                          </linearGradient>
                                        </defs>
                                        <Area 
                                          type="monotone" 
                                          dataKey="val" 
                                          stroke={emp.perf >= 95 ? '#10b981' : '#eab308'} 
                                          strokeWidth={1.2} 
                                          fillOpacity={1} 
                                          fill={`url(#tblGrad-${emp.id})`} 
                                        />
                                      </AreaChart>
                                    </ResponsiveContainer>
                                  </div>
                                </div>
                              </td>

                              {/* Tasks completed */}
                              <td className="py-3.5 pr-2 leading-none">
                                <span className="text-xs font-bold text-white font-outfit">{emp.tasks}</span>
                                <span className="text-[7.5px] text-slate-500 leading-none mt-1 block font-medium">This Month</span>
                              </td>

                              {/* Last active time */}
                              <td className="py-3.5 pr-2 text-xs font-semibold text-slate-400">
                                {emp.lastActive}
                              </td>

                              {/* Action dots */}
                              <td className="py-3.5 text-right">
                                <button className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors shrink-0">
                                  <MoreVertical size={14} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination Bar */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between border-t border-slate-900/60 pt-4 mt-4 w-full shrink-0">
                      <span className="text-[10px] text-slate-450 font-bold">
                        Showing {Math.min(sortedEmployees.length, (empPage - 1) * itemsPerPage + 1)} to {Math.min(sortedEmployees.length, empPage * itemsPerPage)} of {sortedEmployees.length} AI Employees
                      </span>
                      
                      <div className="flex items-center space-x-1.5">
                        <button 
                          onClick={() => setEmpPage(prev => Math.max(1, prev - 1))}
                          disabled={empPage === 1}
                          className="px-2.5 py-1 border border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                        >
                          &lt;
                        </button>
                        {Array.from({ length: totalPages }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setEmpPage(idx + 1)}
                            className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                              empPage === idx + 1
                                ? 'bg-blue-600 text-white font-black shadow-[0_0_8px_rgba(37,99,235,0.4)]'
                                : 'border border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                        <button 
                          onClick={() => setEmpPage(prev => Math.min(totalPages, prev + 1))}
                          disabled={empPage === totalPages}
                          className="px-2.5 py-1 border border-slate-800 bg-slate-950/20 text-slate-400 hover:text-white disabled:opacity-40 disabled:hover:text-slate-400 rounded-lg text-[10px] font-bold cursor-pointer transition-all"
                        >
                          &gt;
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side: AI Employee Profile Panel Sidebar Card */}
                <div className="bg-[#0B1120]/45 border border-slate-800/80 rounded-2xl p-5 flex flex-col shadow-xl relative overflow-hidden group hover:border-slate-700/60 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/[0.015] rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div className="flex flex-col items-center text-center border-b border-slate-900/60 pb-5 mb-5 shrink-0">
                    {/* Glowing Purple Robot Circle Avatar */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-purple-950/35 to-indigo-950/45 border-2 border-purple-500/35 flex items-center justify-center text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.35)] mb-3">
                      <span className="relative flex h-3.5 w-3.5 absolute bottom-0.5 right-0.5 z-10">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          selectedEmp.status === 'Active' ? 'bg-emerald-400' : selectedEmp.status === 'Idle' ? 'bg-amber-400' : 'bg-slate-400'
                        }`}></span>
                        <span className={`relative inline-flex rounded-full h-3.5 w-3.5 ${
                          selectedEmp.status === 'Active' ? 'bg-emerald-500' : selectedEmp.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'
                        }`}></span>
                      </span>
                      {/* Stylized Robot Shape */}
                      <svg className="w-10 h-10 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="11" width="18" height="10" rx="3" />
                        <path d="M12 2v4" />
                        <path d="M8 5h8" />
                        <circle cx="9" cy="15" r="1.5" className="fill-purple-400" />
                        <circle cx="15" cy="15" r="1.5" className="fill-purple-400" />
                        <path d="M12 18h.01" />
                      </svg>
                    </div>

                    <h3 className="text-base font-extrabold text-white font-outfit">{selectedEmp.name}</h3>
                    <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mt-1">{selectedEmp.id}</span>

                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full border text-[9px] font-black tracking-wide mt-3 ${
                      selectedEmp.status === 'Active' 
                        ? 'bg-emerald-950/40 border-emerald-900/50 text-emerald-455 shadow-[0_0_10px_rgba(16,185,129,0.15)]' 
                        : selectedEmp.status === 'Idle'
                          ? 'bg-amber-950/40 border-amber-900/50 text-amber-455'
                          : 'bg-slate-900/60 border-slate-800 text-slate-450'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        selectedEmp.status === 'Active' ? 'bg-emerald-500' : selectedEmp.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'
                      }`} />
                      <span>{selectedEmp.status}</span>
                    </span>

                    <p className="text-[10.5px] text-slate-350 font-medium leading-relaxed mt-4 px-2">
                      {selectedEmp.desc}
                    </p>
                  </div>

                  {/* Metadata key-value list */}
                  <div className="space-y-3.5 border-b border-slate-900/60 pb-5 mb-5 text-[11px] font-semibold shrink-0">
                    {[
                      { label: 'Role', val: selectedEmp.role },
                      { label: 'Department', val: selectedEmp.dept },
                      { label: 'Brand Access', val: selectedEmp.brandAccess },
                      { label: 'Joined On', val: selectedEmp.joinedOn },
                      { label: 'Languages', val: selectedEmp.languages },
                      { 
                        label: 'Workload', 
                        val: (
                          <div className="flex items-center space-x-2 w-28 justify-end">
                            <span className="font-outfit font-black text-white">{selectedEmp.workload}%</span>
                            <div className="w-14 h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                              <div 
                                style={{ width: `${selectedEmp.workload}%` }} 
                                className={`h-full rounded-full ${
                                  selectedEmp.workload >= 80 ? 'bg-red-500' : selectedEmp.workload >= 60 ? 'bg-amber-500' : 'bg-emerald-500'
                                }`} 
                              />
                            </div>
                          </div>
                        )
                      }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center px-0.5">
                        <span className="text-slate-500">{row.label}</span>
                        <span className="text-slate-200 text-right">{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* Charts & Diagnostics */}
                  <div className="flex-1 space-y-4">
                    
                    {/* Diagnostic 1: Performance */}
                    <div className="bg-slate-950/20 border border-slate-900/60 rounded-xl p-3.5 flex flex-col justify-between h-24">
                      <div className="flex justify-between items-center leading-none">
                        <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest">Performance This Month</span>
                        <span className="text-[8.5px] font-bold text-emerald-455 font-outfit">+4.3% vs last month</span>
                      </div>
                      <div className="flex items-end justify-between mt-2 flex-1 gap-4">
                        <span className="text-2xl font-black text-white font-outfit leading-none">{selectedEmp.perf}%</span>
                        <div className="w-32 h-8 overflow-hidden shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={selectedEmp.perfTrend} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                              <defs>
                                <linearGradient id={`sideGrad-${selectedEmp.id}`} x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="val" stroke="#10b981" strokeWidth={1.5} fillOpacity={1} fill={`url(#sideGrad-${selectedEmp.id})`} />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Diagnostic 2: Tasks Completed */}
                    <div className="bg-slate-950/20 border border-slate-900/60 rounded-xl p-3.5 flex flex-col justify-between h-24">
                      <div className="flex justify-between items-center leading-none">
                        <span className="text-[8.5px] font-bold text-slate-500 uppercase tracking-widest">Tasks Completed</span>
                        <span className="text-[8.5px] font-bold text-emerald-455 font-outfit">+18 vs last month</span>
                      </div>
                      <div className="flex items-end justify-between mt-2 flex-1 gap-4">
                        <span className="text-2xl font-black text-white font-outfit leading-none">{selectedEmp.tasks}</span>
                        <div className="w-32 h-8 overflow-hidden shrink-0">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={selectedEmp.tasksTrend} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
                              <Bar dataKey="val" fill="#0ea5e9" radius={[2, 2, 0, 0]} className="shadow-[0_0_6px_rgba(14,165,233,0.3)]" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Action button */}
                    <button className="w-full py-2.5 bg-cyan-950/15 border border-cyan-900/40 hover:bg-cyan-600 hover:text-white rounded-xl text-[10px] font-black text-cyan-400 uppercase tracking-widest transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5 shadow-[0_0_12px_rgba(6,182,212,0.05)] hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                      <span>View Full Profile</span>
                      <ArrowUpRight size={12} />
                    </button>

                  </div>

                </div>

              </div>

            </div>
          </>
        ) : activeTab === 'mission-control' ? (
          <>
            {/* HEADER */}
            <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-start justify-between w-full md:w-auto">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">
                    <span>Mission Control</span>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-white">Overview</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-outfit">Mission Control</h1>
                    <Sparkles size={20} className="text-purple-400 md:w-6 md:h-6" />
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">Your AI team is working for you.</p>
                </div>
                
                {/* Hamburger menu for small screens */}
                <div className="flex items-center space-x-2 lg:hidden">
                  <button onClick={() => setLeftSidebarOpen(true)} className="p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white">
                    <Menu size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end space-x-3 w-full md:w-auto border-t border-slate-800/40 md:border-t-0 pt-3 md:pt-0">
                <button className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-xs md:text-sm font-medium hover:bg-slate-700 transition-colors">
                  <Command size={14} className="text-slate-400" />
                  <span className="hidden sm:inline">Command Center</span>
                  <span className="sm:hidden">Command</span>
                </button>
                <button className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-purple-600 hover:bg-purple-700 border border-purple-500/50 rounded-lg text-xs md:text-sm font-medium text-white transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]">
                  <Plus size={14} />
                  <span>New Mission</span>
                </button>
                
                {/* System Control Mobile Toggle */}
                <button onClick={() => setRightSidebarOpen(true)} className="xl:hidden p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white">
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </header>

            {/* SCROLLABLE DASHBOARD AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 z-10 custom-scrollbar">
              
              {/* STATS ROW */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Brand Health Score</div>
                  <div className="flex items-center justify-between">
                    <div className="relative w-16 h-16">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" strokeWidth="3" />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#00E5FF" strokeWidth="3" strokeDasharray="98, 100" className="drop-shadow-[0_0_3px_rgba(0,229,255,0.5)]" />
                      </svg>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">
                        <CountUp end={98} suffix="%" duration={2.5} />
                      </div>
                      <div className="text-xs text-cyan-400 font-medium">Excellent</div>
                      <div className="text-[10px] text-cyan-500 mt-1">+8% this week</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Missions Active</div>
                    <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400">
                      <Target size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp end={15} duration={2} />
                    </div>
                    <div className="text-xs text-slate-400 flex items-center mb-1">
                      <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></div>
                      <span className="text-white font-medium mr-1">8</span> In Progress
                    </div>
                    <div className="text-xs text-slate-400 flex items-center">
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                      <span className="text-white font-medium mr-1">7</span> Completed Today
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Tasks Completed</div>
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
                      <CheckCircle2 size={16} />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">
                        <CountUp end={128} duration={2.5} />
                      </div>
                      <div className="text-[10px] text-cyan-400 font-medium">+24% vs yesterday</div>
                    </div>
                    <div className="w-[110px] h-[35px] mr-1">
                      <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="purpleSpark" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#d946ef" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#d946ef" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <path d="M0,25 Q15,25 30,22 T60,15 T80,10 T100,2 L100,30 L0,30 Z" fill="url(#purpleSpark)" />
                        <path d="M0,25 Q15,25 30,22 T60,15 T80,10 T100,2" fill="none" stroke="#d946ef" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Automation Rate</div>
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center text-purple-400">
                      <CircleDot size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp end={87} suffix="%" duration={2.5} />
                    </div>
                    <div className="text-xs text-cyan-400 font-medium">+12% this week</div>
                  </div>
                </div>

                <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Time Saved</div>
                    <div className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center text-yellow-500">
                      <Clock size={16} />
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-white mb-2">
                      <CountUp end={36.4} decimals={1} suffix="h" duration={2.5} />
                    </div>
                    <div className="text-xs text-slate-400">This week</div>
                  </div>
                </div>
              </div>

              {/* AI WORKFORCE */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h2 className="text-lg font-bold text-white">AI Workforce</h2>
                    <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-[10px] text-green-500 font-bold">6 Active</span>
                    </div>
                  </div>
                  <button className="text-[10px] px-3 py-1 bg-slate-800/50 rounded-full text-cyan-400 hover:text-cyan-300 font-bold transition-colors uppercase tracking-wider border border-slate-700/50">View All</button>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
                  {[
                    { name: 'Alex', role: 'CEO', tasks: 4, color: 'from-blue-500', img: 'https://i.pravatar.cc/150?u=alex2' },
                    { name: 'Kimmy', role: 'AI Receptionist', tasks: 2, color: 'from-purple-500', img: 'https://i.pravatar.cc/150?u=kimmy4' },
                    { name: 'Maya', role: 'Marketing Manager', tasks: 6, color: 'from-green-500', img: 'https://i.pravatar.cc/150?u=maya3' },
                    { name: 'Leo', role: 'Content Creator', tasks: 5, color: 'from-orange-500', img: 'https://i.pravatar.cc/150?u=leo5' },
                    { name: 'Zara', role: 'Social Media Manager', tasks: 7, color: 'from-pink-500', img: 'https://i.pravatar.cc/150?u=zara2' },
                    { name: 'Evan', role: 'Data Analyst', tasks: 3, color: 'from-cyan-500', img: 'https://i.pravatar.cc/150?u=evan3' },
                  ].map((ai, i) => (
                    <div key={i} className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-4 flex flex-col items-center text-center hover:border-slate-700 transition-colors group cursor-pointer relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${ai.color} to-transparent opacity-50`}></div>
                      <div className="relative mb-3">
                        <div className={`w-14 h-14 rounded-full p-[2px] bg-gradient-to-b ${ai.color} to-slate-800`}>
                          <img src={ai.img} alt={ai.name} className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
                        </div>
                      </div>
                      <div className="font-bold text-white text-sm mb-0.5">{ai.name}</div>
                      <div className="text-[9px] text-slate-400 leading-tight mb-3 h-6 flex items-center justify-center">{ai.role}</div>
                      <div className="flex items-center space-x-1 mb-3">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[9px] text-green-500 font-medium">Active</span>
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium bg-slate-800/50 px-3 py-1 rounded-full w-full border border-slate-700/50">{ai.tasks} Tasks</div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-slate-700/70 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-slate-500 hover:bg-slate-800/30 transition-all cursor-pointer">
                    <div className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-slate-400 mb-3 group-hover:text-white group-hover:border-slate-400 transition-colors">
                      <Plus size={20} />
                    </div>
                    <div className="text-xs font-medium text-slate-400">Hire AI<br/>Employee</div>
                  </div>
                </div>
              </div>

              {/* MISSION & TASK HEALTH OVERVIEW */}
              <div className="mb-6 bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-sm font-bold text-white">Mission & Task Health Overview</h2>
                  <button className="text-[10px] px-3 py-1 bg-cyan-900/20 border border-cyan-900/50 rounded text-cyan-400 font-bold hover:bg-cyan-900/40 transition-colors">View Analytics</button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-2 lg:divide-x lg:divide-slate-800/50">
                  
                  {/* Gauge 1 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center">Overall Mission Health</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.15,
                          padding: 0,
                          subArcs: [
                            { limit: 92, color: '#00E5FF', showTick: false },
                            { limit: 100, color: '#1e293b', showTick: false }
                          ]
                        }}
                        pointer={{ type: 'needle', width: 0, length: 0, color: 'transparent' }}
                        labels={{ valueLabel: { formatTextValue: () => '' }, tickLabels: { type: "outer", hideMinMax: true, defaultTickValueConfig: { hide: true }, defaultTickLineConfig: { hide: true } } }}
                        value={92}
                      />
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={92} duration={2} />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Excellent</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-green-500 font-medium mt-1">+6 pts this week</div>
                  </div>

                  {/* Gauge 2 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center">Task Health Score</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.15,
                          padding: 0,
                          subArcs: [
                            { limit: 88, color: '#eab308', showTick: false },
                            { limit: 100, color: '#1e293b', showTick: false }
                          ]
                        }}
                        pointer={{ type: 'needle', width: 0, length: 0, color: 'transparent' }}
                        labels={{ valueLabel: { formatTextValue: () => '' }, tickLabels: { type: "outer", hideMinMax: true, defaultTickValueConfig: { hide: true }, defaultTickLineConfig: { hide: true } } }}
                        value={88}
                      />
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={88} duration={2} />
                        </div>
                        <div className="text-[9px] text-green-500 mt-1">Good</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-green-500 font-medium mt-1">+5 pts this week</div>
                  </div>

                  {/* Gauge 3 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center">On-Time Completion</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.15,
                          padding: 0,
                          subArcs: [
                            { limit: 91, color: '#0ea5e9', showTick: false },
                            { limit: 100, color: '#1e293b', showTick: false }
                          ]
                        }}
                        pointer={{ type: 'needle', width: 0, length: 0, color: 'transparent' }}
                        labels={{ valueLabel: { formatTextValue: () => '' }, tickLabels: { type: "outer", hideMinMax: true, defaultTickValueConfig: { hide: true }, defaultTickLineConfig: { hide: true } } }}
                        value={91}
                      />
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={91} suffix="%" duration={2} />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Excellent</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-green-500 font-medium mt-1">+7% this week</div>
                  </div>

                  {/* Gauge 4 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center">Overdue Tasks</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.15,
                          padding: 0,
                          subArcs: [
                            { limit: 8, color: '#ef4444', showTick: false },
                            { limit: 100, color: '#1e293b', showTick: false }
                          ]
                        }}
                        pointer={{ type: 'needle', width: 0, length: 0, color: 'transparent' }}
                        labels={{ valueLabel: { formatTextValue: () => '' }, tickLabels: { type: "outer", hideMinMax: true, defaultTickValueConfig: { hide: true }, defaultTickLineConfig: { hide: true } } }}
                        value={8}
                      />
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={8} suffix="%" duration={2} />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Low</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-red-500 font-medium mt-1">-3% this week</div>
                  </div>

                  {/* Gauge 5 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center">Mission Success Rate</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.15,
                          padding: 0,
                          subArcs: [
                            { limit: 94, color: '#2dd4bf', showTick: false },
                            { limit: 100, color: '#1e293b', showTick: false }
                          ]
                        }}
                        pointer={{ type: 'needle', width: 0, length: 0, color: 'transparent' }}
                        labels={{ valueLabel: { formatTextValue: () => '' }, tickLabels: { type: "outer", hideMinMax: true, defaultTickValueConfig: { hide: true }, defaultTickLineConfig: { hide: true } } }}
                        value={94}
                      />
                      <div className="absolute bottom-1 left-0 right-0 text-center">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={94} suffix="%" duration={2} />
                        </div>
                        <div className="text-[9px] text-slate-400 mt-1">Excellent</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-green-500 font-medium mt-1">+9% this week</div>
                  </div>

                  {/* Gauge 6 */}
                  <div className="flex flex-col items-center px-2">
                    <div className="text-[10px] font-medium text-slate-300 mb-2 text-center whitespace-nowrap">Avg. Task Completion Speed</div>
                    <div className="relative w-28 h-20">
                      <GaugeComponent
                        type="semicircle"
                        arc={{
                          width: 0.1,
                          padding: 0.02,
                          subArcs: [
                            { limit: 20, color: '#ef4444' },
                            { limit: 40, color: '#f97316' },
                            { limit: 60, color: '#eab308' },
                            { limit: 80, color: '#3b82f6' },
                            { limit: 100, color: '#0ea5e9' }
                          ]
                        }}
                        pointer={{ type: 'needle', color: '#fff', width: 3, length: 0.7, elastic: true }}
                        labels={{
                          valueLabel: { formatTextValue: () => '' },
                          tickLabels: {
                            type: 'outer',
                            ticks: [{ value: 20 }, { value: 40 }, { value: 60 }, { value: 80 }],
                            defaultTickValueConfig: { style: { fontSize: '8px', fill: '#94a3b8', textShadow: 'none' } }
                          }
                        }}
                        value={80} // Points roughly to the blue segment for 1.8x
                      />
                      <div className="absolute bottom-0 left-0 right-0 text-center bg-[#0B1120]">
                        <div className="text-2xl font-bold text-white leading-none">
                          <CountUp end={1.8} decimals={1} suffix="x" duration={2} />
                        </div>
                        <div className="text-[9px] text-cyan-400 mt-1">Faster</div>
                      </div>
                    </div>
                    <div className="text-[9px] text-slate-400 font-medium mt-1">vs last week</div>
                  </div>
                </div>
              </div>

              {/* CHARTS ROW */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
                {/* Chart 1: Tasks Completed Over Time */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex flex-col h-60 shadow-lg">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="text-xs font-bold text-white">Tasks Completed Over Time</h3>
                    <div className="flex items-center space-x-3 text-[9px] font-medium text-slate-400">
                      <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-[#d946ef] shadow-[0_0_4px_rgba(217,70,239,0.8)]"></div><span>This Week</span></div>
                      <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div><span>Last Week</span></div>
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={tasksData} margin={{ top: 5, right: 0, left: -25, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorThisWeek" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#d946ef" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorLastWeek" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', fontSize: '10px', color: '#fff', borderRadius: '8px' }}
                          itemStyle={{ fontSize: '10px' }}
                        />
                        <Area type="monotone" dataKey="lastWeek" name="Last Week" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLastWeek)" dot={{ r: 2, fill: '#3b82f6' }} activeDot={{ r: 4 }} />
                        <Area type="monotone" dataKey="thisWeek" name="This Week" stroke="#d946ef" strokeWidth={2} fillOpacity={1} fill="url(#colorThisWeek)" dot={{ r: 2, fill: '#d946ef' }} activeDot={{ r: 4 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 2: Tasks by Status */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex flex-col h-60 shadow-lg">
                  <h3 className="text-xs font-bold text-white mb-2 shrink-0">Tasks by Status</h3>
                  <div className="flex-1 flex items-center justify-between min-h-0">
                    <div className="relative w-28 h-28 flex-shrink-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={30}
                            outerRadius={45}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                          >
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-0.5 pointer-events-none">
                        <span className="text-[18px] font-bold text-white leading-none mb-0.5">128</span>
                        <span className="text-[9px] text-slate-400">Total</span>
                      </div>
                    </div>
                    <div className="space-y-2.5 flex-1 ml-4">
                      {statusData.map((s, i) => (
                        <div key={i} className="flex items-center justify-between text-[9px]">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }}></div>
                            <span className="text-slate-300">{s.name}</span>
                          </div>
                          <div className="text-slate-500 flex items-center">
                            <span className="text-slate-300 w-5 text-right inline-block">{s.value}</span>
                            <span className="w-8 text-right inline-block">({Math.round(s.value/128*100)}%)</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Chart 3: Automation Impact */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex flex-col h-60 shadow-lg">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="text-xs font-bold text-white">Automation Impact</h3>
                    <div className="flex items-center space-x-1 text-[9px] text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-slate-700 cursor-pointer">
                      <span>This Week</span><ChevronDown size={10} />
                    </div>
                  </div>
                  <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={impactData} margin={{ top: 15, right: 10, left: 10, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={32}>
                          {impactData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                          <LabelList content={<CustomBarLabel />} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Chart 4: Task Completion Speed Trend */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex flex-col h-60 shadow-lg relative">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h3 className="text-xs font-bold text-white">Task Completion Speed Trend</h3>
                    <div className="flex items-center space-x-1 text-[9px] text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-slate-700 cursor-pointer">
                      <span>This Week</span><ChevronDown size={10} />
                    </div>
                  </div>
                  
                  <div className="absolute top-[35%] left-[55%] bg-[#0B1120] border border-slate-700 rounded-lg p-2 flex items-center space-x-2 shadow-lg z-20 transform -translate-x-1/2 -translate-y-full pointer-events-none">
                     <TrendingUp size={12} className="text-slate-400" />
                     <div className="flex flex-col">
                       <span className="text-[8px] text-slate-300 leading-none mb-1">Friday</span>
                       <span className="text-[10px] font-bold text-cyan-400 leading-none">2.1x faster</span>
                     </div>
                  </div>

                  <div className="flex-1 w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={speedData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                        <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} dy={10} />
                        <YAxis domain={[0.5, 2.5]} ticks={[0.5, 1.0, 1.5, 2.0, 2.5]} tickFormatter={(val) => `${val.toFixed(1)}x`} tick={{ fontSize: 9, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                          itemStyle={{ color: '#38bdf8', fontSize: '10px', fontWeight: 'bold' }}
                          labelStyle={{ color: '#94a3b8', fontSize: '9px', marginBottom: '2px' }}
                          formatter={(value: any) => [`${value}x faster`, 'Speed']}
                        />
                        <Line type="monotone" dataKey="speed" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3, fill: '#0ea5e9', stroke: '#020617', strokeWidth: 2 }} activeDot={{ r: 5, fill: '#0ea5e9', className: 'animate-pulse' }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
              </div>

              {/* BOTTOM ROW */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
                
                {/* Live Activity Feed */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-sm font-bold text-white">Live Activity Feed</h3>
                    <button className="text-[10px] px-3 py-1 bg-slate-800/50 rounded-full text-cyan-400 hover:text-cyan-300 font-bold transition-colors uppercase tracking-wider border border-slate-700/50">View All</button>
                  </div>
                  <div className="space-y-5">
                    {[
                      { ai: 'Maya', action: 'completed content strategy for Q2 campaign', time: '2m ago', iconUrl: 'https://i.pravatar.cc/150?u=maya3' },
                      { ai: 'Leo', action: 'uploaded final version of promo video', time: '5m ago', iconUrl: 'https://i.pravatar.cc/150?u=leo5' },
                      { ai: 'Zara', action: 'scheduled 12 posts for this week', time: '8m ago', iconUrl: 'https://i.pravatar.cc/150?u=zara2' },
                      { ai: 'Evan', action: 'analyzed competitor data and updated report', time: '12m ago', iconUrl: 'https://i.pravatar.cc/150?u=evan3' },
                      { ai: 'Kimmy', action: 'had a conversation with Alex about Q2 goals', time: '15m ago', iconUrl: 'https://i.pravatar.cc/150?u=kimmy4' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start justify-between group cursor-pointer hover:bg-slate-800/30 p-1 -mx-1 rounded transition-colors">
                        <div className="flex items-start space-x-3">
                          <img src={item.iconUrl} alt={item.ai} className="w-6 h-6 rounded-full mt-0.5 opacity-90 group-hover:opacity-100 transition-opacity border border-slate-700" />
                          <div>
                            <span className="text-xs font-bold text-white">{item.ai}</span>
                            <span className="text-xs text-slate-400 ml-1.5">{item.action}</span>
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-500 whitespace-nowrap ml-4 pt-1">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Browser Session */}
                <div className="bg-slate-900/40 border border-slate-800/60 rounded-xl p-5 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Sparkles size={14} className="text-yellow-400" />
                      <h3 className="text-sm font-bold text-white">Live Browser Session</h3>
                    </div>
                    <div className="flex items-center space-x-1.5 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded-full">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-[9px] text-green-500 font-bold uppercase tracking-wider">Live</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mb-4 flex items-center space-x-2">
                    <img src="https://i.pravatar.cc/150?u=zara2" alt="Zara" className="w-4 h-4 rounded-full border border-slate-700" />
                    <span><strong className="text-white">Zara</strong> is working in Facebook Ads Manager</span>
                  </p>
                  
                  <div className="flex-1 border border-slate-700/50 rounded-lg overflow-hidden flex flex-col bg-[#1c1e21] shadow-inner">
                    <div className="bg-[#242526] px-3 py-2 flex items-center space-x-3 border-b border-slate-700/50">
                      <div className="flex space-x-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                      </div>
                      <div className="flex-1 bg-[#3a3b3c] rounded px-3 py-1.5 flex items-center space-x-2">
                        <Monitor size={10} className="text-slate-400" />
                        <span className="text-[9px] text-slate-300">adsmanager.facebook.com</span>
                      </div>
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <div className="flex items-center space-x-4 mb-3 border-b border-slate-700/50 pb-2">
                        <div className="text-[10px] font-bold text-blue-400 relative">
                          Campaigns
                          <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-blue-400"></div>
                        </div>
                        <div className="text-[10px] font-medium text-slate-400">Ad Sets</div>
                        <div className="text-[10px] font-medium text-slate-400">Ads</div>
                      </div>
                      <div className="bg-[#242526] rounded-md border border-slate-700/50 flex-1 overflow-hidden">
                        <div className="grid grid-cols-4 gap-2 border-b border-slate-700/50 p-2 text-[9px] text-slate-400 font-medium bg-[#1c1e21]/50">
                          <div className="col-span-2 flex items-center space-x-2">
                            <div className="w-2.5 h-2.5 border border-slate-500 rounded-sm"></div>
                            <span>Campaign Name</span>
                          </div>
                          <div>Reach</div>
                          <div>Cost per Result</div>
                        </div>
                        {[
                          { name: 'Autophagy Fasting - Conversions', reach: '12,543', cost: '$1.23' },
                          { name: 'Autophagy Fasting - Traffic', reach: '8,921', cost: '$0.72' },
                        ].map((row, i) => (
                          <div key={i} className="grid grid-cols-4 gap-2 border-b border-slate-700/30 p-2.5 text-[9px] text-slate-200 items-center hover:bg-[#3a3b3c]/30 transition-colors">
                            <div className="col-span-2 flex items-center space-x-2">
                              <div className="w-2.5 h-2.5 border border-slate-500 rounded-sm bg-[#3a3b3c]"></div>
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                              <span className="truncate">{row.name}</span>
                            </div>
                            <div>{row.reach}</div>
                            <div>{row.cost}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-[10px] text-cyan-400 font-bold hover:text-cyan-300 transition-colors uppercase tracking-widest">
                      View Live Session
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </>
        ) : activeTab === 'brands' ? (
          <>
            {/* BRANDS HEADER */}
            <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-start justify-between w-full md:w-auto">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-outfit">Brands</h1>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">Manage and monitor all your brands from one place.</p>
                </div>
                
                {/* Hamburger menu for small screens */}
                <div className="flex items-center space-x-2 lg:hidden">
                  <button onClick={() => setLeftSidebarOpen(true)} className="p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white">
                    <Menu size={18} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between md:justify-end space-x-3 w-full md:w-auto border-t border-slate-800/40 md:border-t-0 pt-3 md:pt-0">
                {/* Search Input */}
                <div className="relative hidden md:block">
                  <input 
                    type="text" 
                    placeholder="Search brands..." 
                    className="w-48 xl:w-60 bg-slate-900/80 border border-slate-805/80 rounded-lg px-3 py-1.5 pl-8 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                  <Search size={12} className="absolute left-2.5 top-2.5 text-slate-500" />
                  <div className="absolute right-2 top-2 px-1 py-0.5 rounded bg-slate-800 text-[8px] text-slate-500 font-bold border border-slate-700">⌘ K</div>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 bg-slate-900/50 border border-slate-800/80 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <Bell size={16} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500"></span>
                </button>

                {/* Messages Icon */}
                <button className="p-2 bg-slate-900/50 border border-slate-800/80 rounded-lg text-slate-400 hover:text-white transition-colors">
                  <MessageSquare size={16} />
                </button>

                {/* Profile Circle */}
                <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400 font-bold border border-cyan-800/50 cursor-pointer">
                  T
                </div>

                {/* Add New Brand Button */}
                <button className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-[#0070f3] hover:bg-[#0060df] rounded-lg text-xs md:text-sm font-medium text-white transition-colors shadow-[0_0_15px_rgba(0,112,243,0.3)]">
                  <Plus size={14} />
                  <span>Add New Brand</span>
                </button>
              </div>
            </header>

            {/* SCROLLABLE BRANDS AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 z-10 custom-scrollbar">
              
              {/* BRANDS TOP STATS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                
                {/* Stat 1: Total Brands */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex items-center space-x-4 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-cyan-950 flex items-center justify-center border border-cyan-900/50 text-cyan-400 relative">
                    <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md"></div>
                    <Folder size={20} className="relative" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Brands</div>
                    <div className="text-3xl font-bold text-white leading-none mb-1">4</div>
                    <div className="text-[9px] text-green-500 flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span> Active brands
                    </div>
                  </div>
                </div>

                {/* Stat 2: Total AI Employees */}
                <div className="bg-[#0B1120] border border-slate-800/60 rounded-xl p-5 flex items-center space-x-4 shadow-lg">
                  <div className="w-12 h-12 rounded-full bg-purple-950/50 flex items-center justify-center border border-purple-900/50 text-purple-400 relative">
                    <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-md"></div>
                    <Users size={20} className="relative" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total AI Employees</div>
                    <div className="text-3xl font-bold text-white leading-none mb-1">24</div>
                    <div className="text-[9px] text-slate-400">Across all brands</div>
                  </div>
                </div>

              </div>

              {/* CONTROLS ROW */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-slate-900/80 border border-cyan-500/30 text-cyan-400 rounded-lg shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                    <Grid size={16} />
                  </button>
                  <button className="p-2 bg-slate-900/40 border border-slate-800 rounded-lg text-slate-500 hover:text-slate-300">
                    <List size={16} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-slate-400 bg-slate-900/50 border border-slate-805/80 px-3 py-1.5 rounded-lg">
                  <span>Sort by:</span>
                  <span className="text-white font-medium cursor-pointer flex items-center space-x-1">
                    <span>Newest</span>
                    <ChevronDown size={12} />
                  </span>
                </div>
              </div>

              {/* BRAND CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {brandsData.map((brand, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-slate-800/60 rounded-xl overflow-hidden shadow-lg flex flex-col hover:border-slate-700/80 transition-colors">
                    
                    {/* Banner Area (Height: 140px) */}
                    <div className="h-[140px] relative w-full overflow-hidden">
                      {idx === 0 && (
                        <div className="absolute inset-0 bg-[#060814] flex flex-col items-center justify-center relative overflow-hidden border-b border-slate-800/50">
                          <div className="absolute w-24 h-24 bg-blue-500/10 rounded-full blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                          <div className="text-center z-10">
                            <div className="text-2xl font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 leading-none">DL</div>
                            <div className="text-[7px] font-bold tracking-[0.3em] text-slate-300 mt-2">DIGITAL LEGENDS</div>
                          </div>
                        </div>
                      )}
                      
                      {idx === 1 && (
                        <div className="absolute inset-0 bg-[#081a11] flex items-center justify-center overflow-hidden border-b border-slate-800/50">
                          <div className="absolute w-32 h-32 bg-[#22c55e]/10 rounded-full blur-3xl"></div>
                          <div className="w-[100px] h-[160px] bg-[#020617] border-4 border-slate-850 rounded-2xl relative shadow-2xl translate-y-12 flex flex-col p-1.5 overflow-hidden">
                            <div className="w-10 h-2 bg-slate-800 rounded-full mx-auto mb-2"></div>
                            <div className="space-y-1">
                              <div className="h-6 rounded bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-between px-1.5">
                                <span className="text-[5px] text-green-400 font-bold">Fasting</span>
                                <span className="text-[4px] text-green-400 font-bold">16:8</span>
                              </div>
                              <div className="h-10 rounded bg-slate-900 border border-slate-800 flex flex-col justify-center items-center">
                                <span className="text-[7px] font-extrabold text-white">14:23</span>
                                <span className="text-[4px] text-slate-500">Remaining</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {idx === 2 && (
                        <div className="absolute inset-0 bg-[#160c28] flex items-center justify-center overflow-hidden border-b border-slate-800/50">
                          <div className="absolute w-36 h-36 bg-[#d946ef]/10 rounded-full blur-3xl"></div>
                          <div className="absolute top-2 right-4 text-purple-400/20">
                            <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current">
                              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                            </svg>
                          </div>
                          <div className="absolute bottom-0 w-full flex justify-center items-end opacity-90 h-24">
                            <svg viewBox="0 0 100 50" fill="none" className="w-32 text-purple-950/80 fill-current">
                              <path d="M0 50 L10 50 L10 20 L20 15 L30 20 L30 50 L40 50 L45 10 L50 0 L55 10 L60 50 L70 50 L70 20 L80 15 L90 20 L90 50 L100 50 Z" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {idx === 3 && (
                        <div className="absolute inset-0 bg-[#041324] flex items-center justify-center overflow-hidden border-b border-slate-800/50">
                          <div className="absolute w-36 h-36 bg-blue-500/10 rounded-full blur-3xl"></div>
                          <div className="w-[85px] h-[85px] rounded-full border border-blue-500/20 relative flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/40 animate-[spin_20s_linear_infinite]"></div>
                            <div className="w-[60px] h-[60px] rounded-full border border-blue-500/30 relative flex items-center justify-center">
                              <div className="absolute inset-0 rounded-full border border-dashed border-cyan-400/50 animate-[spin_10s_linear_infinite_reverse]"></div>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-6 h-6 text-cyan-400/60">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                <path d="M2 12h20" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Logo Badge Overlay */}
                      <div className={`absolute bottom-3 left-4 w-9 h-9 rounded-xl flex items-center justify-center border shadow-lg ${brand.logoBg}`}>
                        {brand.logoText ? (
                          <span className="text-xs font-black">{brand.logoText}</span>
                        ) : brand.logoIcon === 'leaf' ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-green-400">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2Z" />
                            <path d="M9 22v-4" />
                          </svg>
                        ) : brand.logoIcon === 'moon' ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-400">
                            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-cyan-400">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                            <path d="M2 12h20" />
                          </svg>
                        )}
                      </div>

                      {/* Type Badge */}
                      <div className={`absolute bottom-3 right-4 px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider border ${brand.badgeColor}`}>
                        {brand.type}
                      </div>

                    </div>

                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-white mb-0.5">{brand.name}</h3>
                        <div className="text-[10px] text-slate-400 font-medium mb-3">{brand.subtitle}</div>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-5 min-h-[48px]">{brand.desc}</p>
                        
                        {/* Stats list */}
                        <div className="space-y-2.5 border-t border-slate-800/60 pt-4 mb-5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center space-x-2">
                              <Users size={12} className="text-slate-500" />
                              <span>AI Employees</span>
                            </div>
                            <span className="font-bold text-white">{brand.aiEmployees}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center space-x-2">
                              <GitBranch size={12} className="text-slate-500" />
                              <span>Active Workflows</span>
                            </div>
                            <span className="font-bold text-white">{brand.workflows}</span>
                          </div>
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <div className="flex items-center space-x-2">
                              <CheckCircle2 size={12} className="text-slate-500" />
                              <span>Tasks Completed</span>
                            </div>
                            <span className="font-bold text-white">{brand.tasksCompleted}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 text-[10px]">
                        <span className="text-slate-500">{brand.createdDate}</span>
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              if (brand.name === 'Digital Legends') {
                                setActiveTab('brand-details');
                              }
                            }}
                            className="flex items-center space-x-1 px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md text-slate-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <span>View Brand</span>
                            <ArrowUpRight size={10} />
                          </button>
                          <button className="p-1 text-slate-500 hover:text-white transition-colors">
                            <MoreVertical size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          </>
        ) : activeTab === 'brand-details' ? (
          <DigitalLegendsDetails setActiveTab={setActiveTab} />
        ) : activeTab === 'brand-tasks' ? (
          <DigitalLegendsTasks setActiveTab={setActiveTab} />
        ) : activeTab === 'workflows' ? (
          <WorkflowsView />
        ) : activeTab === 'analytics' ? (
          <AnalyticsView />
        ) : activeTab === 'live-activity' ? (
          <LiveActivityView />
        ) : activeTab === 'marketplace' ? (
          <MarketplaceView />
        ) : null}
      </main>

      {/* MOBILE RIGHT SIDEBAR BACKDROP */}
      {rightSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden" onClick={() => setRightSidebarOpen(false)} />
      )}

      {/* RIGHT SIDEBAR */}
      <aside className={`fixed inset-y-0 right-0 xl:static w-[280px] border-l border-slate-800/60 bg-[#020617] flex flex-col z-50 xl:z-20 flex-shrink-0 transition-transform duration-300 ease-in-out xl:translate-x-0 ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* System Status Mobile Close Header */}
          <div className="xl:hidden p-6 pb-0 flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">System Control</h3>
            <button onClick={() => setRightSidebarOpen(false)} className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/30">
              <X size={16} />
            </button>
          </div>

          {/* System Status */}
          <div className="p-6 border-b border-slate-800/60">
            <h3 className="text-sm font-bold text-white mb-1">System Status</h3>
            <p className="text-[10px] text-slate-400 mb-5">All Systems Operational</p>
            
            <div className="space-y-3.5">
              {[
                { name: 'AI Workforce', icon: Users },
                { name: 'Workflows', icon: GitBranch },
                { name: 'Integrations', icon: Blocks },
                { name: 'Automations', icon: RotateCw },
                { name: 'Databases', icon: Database },
                { name: 'APIs & Services', icon: Globe },
              ].map((sys, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center space-x-2 text-slate-300 group-hover:text-white transition-colors">
                    <sys.icon size={12} className="text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[11px] font-medium">{sys.name}</span>
                  </div>
                  <span className="text-[9px] text-green-500 font-medium">Operational</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-5 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
              View System Logs
            </button>
          </div>

          {/* Performance Overview */}
          <div className="p-6 border-b border-slate-800/60">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-white">Performance Overview</h3>
              <div className="flex items-center space-x-1 text-[9px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded cursor-pointer border border-slate-800 hover:border-slate-600 transition-colors">
                <span>Last 7 Days</span>
                <ChevronDown size={10} />
              </div>
            </div>
            
            <div className="space-y-5">
              {[
                { name: 'Engagement', trend: '+24%', color: '#00E5FF', points: '0,20 10,15 20,25 30,10 40,20 50,5' },
                { name: 'Reach', trend: '+18%', color: '#00E5FF', points: '0,25 10,10 20,15 30,5 40,15 50,20' },
                { name: 'Conversions', trend: '+32%', color: '#00E5FF', points: '0,10 10,25 20,5 30,20 40,10 50,5' },
                { name: 'Revenue', trend: '+27%', color: '#00E5FF', points: '0,20 10,5 20,15 30,25 40,5 50,15' },
              ].map((metric, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <span className="text-xs text-slate-300 font-medium w-20 group-hover:text-white transition-colors">{metric.name}</span>
                  <div className="flex-1 mx-3 h-4 relative opacity-80 group-hover:opacity-100 transition-opacity">
                    <svg viewBox="0 0 50 30" preserveAspectRatio="none" className="w-full h-full drop-shadow-[0_0_2px_rgba(0,229,255,0.5)]">
                      <polyline points={metric.points} fill="none" stroke={metric.color} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <span className="text-[10px] text-green-400 font-bold w-8 text-right">{metric.trend}</span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-2.5 text-[10px] font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest text-center">
              View Full Analytics
            </button>
          </div>

          {/* Upcoming Events */}
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-5">Upcoming Events</h3>
            <div className="space-y-4">
              {[
                { title: 'Team Standup', time: 'Today, 10:00 AM' },
                { title: 'Q2 Strategy Review', time: 'Today, 2:00 PM' },
                { title: 'Campaign Review', time: 'Tomorrow, 11:00 AM' },
                { title: 'Monthly Report', time: 'May 10, 9:00 AM' },
              ].map((event, i) => (
                <div key={i} className="flex items-start space-x-3 group cursor-pointer hover:bg-slate-900/50 p-1.5 -mx-1.5 rounded transition-colors">
                  <Calendar size={14} className="text-slate-500 mt-0.5 group-hover:text-cyan-400 transition-colors" />
                  <div>
                    <div className="text-xs text-slate-200 font-medium mb-0.5 group-hover:text-white transition-colors">{event.title}</div>
                    <div className="text-[10px] text-slate-500">{event.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-5 py-2.5 bg-slate-900/50 border border-slate-800 rounded-lg text-[10px] font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors mb-6">
              View Calendar
            </button>
            
            {/* Ask Kimmy Card */}
            <div className="bg-gradient-to-br from-purple-900/30 to-slate-900 border border-purple-800/40 rounded-xl p-5 relative overflow-hidden shadow-[0_0_20px_rgba(147,51,234,0.1)]">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-purple-500/20 blur-2xl rounded-full"></div>
              
              <div className="absolute top-3 right-3 p-1.5 bg-slate-900/80 rounded-md cursor-pointer hover:bg-slate-800 transition-colors border border-slate-700/50">
                <Maximize2 size={10} className="text-slate-400" />
              </div>
              
              <div className="flex items-center space-x-2 mb-4 relative">
                <Sparkles size={14} className="text-purple-400" />
                <div>
                  <div className="text-sm font-bold text-white leading-tight">Ask Kimmy</div>
                  <div className="text-[9px] text-slate-400">AI Assistant</div>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 mb-5 relative">
                <img src="https://i.pravatar.cc/150?u=kimmy4" alt="Kimmy" className="w-8 h-8 rounded-full border border-purple-500/30 shrink-0" />
                <div className="text-[10px] text-slate-300 leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-700/50 shadow-inner">
                  <strong className="text-white block mb-1">Need help with something?</strong>
                  I can help you create content, analyze performance, or manage your team.
                </div>
              </div>
              
              <div className="flex justify-end relative">
                <button className="w-8 h-8 bg-purple-600 hover:bg-purple-500 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all transform hover:scale-105 border border-purple-400/50">
                  <MessageSquare size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ADD AI EMPLOYEE MODAL */}
      {showAddEmpModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0b1220] border border-slate-800 rounded-2xl w-full max-w-md p-6 relative shadow-2xl animate-fade-in text-left">
            <button 
              onClick={() => setShowAddEmpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 hover:bg-slate-800/40 rounded-lg transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2 font-outfit">Add AI Employee</h3>
            <p className="text-[11px] text-slate-400 mb-4 font-semibold">Deploy a new AI Employee to coordinate business operations.</p>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = formData.get('name') as string;
              const role = formData.get('role') as string;
              const dept = formData.get('dept') as string;
              
              if (!name || !role || !dept) return;

              const newEmp = {
                id: `AI-EMP-0${employeesList.length + 1}`,
                name: name.endsWith('AI') ? name : `${name} AI`,
                role,
                roleBadge: role,
                roleBadgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                dept,
                status: 'Active' as const,
                perf: 99.2,
                tasks: 0,
                lastActive: 'Just now',
                desc: `Highly customized AI Employee built to automate ${dept.toLowerCase()} assignments.`,
                brandAccess: '1 Brand',
                joinedOn: 'May 18, 2026',
                languages: 'English',
                workload: 10,
                perfTrend: [
                  { name: 'W1', val: 95 },
                  { name: 'W2', val: 97 },
                  { name: 'W3', val: 98 },
                  { name: 'W4', val: 99.2 }
                ],
                tasksTrend: [
                  { name: 'W1', val: 0 },
                  { name: 'W2', val: 0 },
                  { name: 'W3', val: 0 },
                  { name: 'W4', val: 0 }
                ]
              };
              
              setEmployeesList(prev => [newEmp, ...prev]);
              setSelectedEmpId(newEmp.id);
              setShowAddEmpModal(false);
            }} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Employee Name</label>
                <input 
                  required
                  name="name"
                  type="text" 
                  placeholder="e.g. Content Writer, SEO Agent" 
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Role / Title</label>
                <input 
                  required
                  name="role"
                  type="text" 
                  placeholder="e.g. SEO Specialist, Brand Designer" 
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">Department</label>
                <select 
                  required
                  name="dept"
                  className="w-full bg-slate-950 border border-slate-800/80 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                >
                  <option value="Content Creation">Content Creation</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>

              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-750 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(37,99,235,0.45)] cursor-pointer"
                >
                  Deploy AI Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
