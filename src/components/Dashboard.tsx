import React from 'react';
import { 
  LayoutDashboard, Target, Activity, BarChart2, Users, Building2, GitBranch, Calendar, 
  Store, Blocks, LogOut, Command, Plus, 
  SlidersHorizontal, Clock, RotateCw, Sparkles, ChevronRight, 
  MoreVertical, ArrowUpRight, Maximize2, MessageSquare, Monitor,
  Radio, Database, Globe, ChevronDown, CircleDot, TrendingUp, CheckCircle2,
  Menu, X, Folder, CreditCard, Search, Bell, Grid, List, ArrowLeft, ExternalLink,
  Zap, Play, Share2
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
  BarChart, Bar, LabelList,
  LineChart, Line
} from 'recharts';
import CountUpRaw from 'react-countup';
import GaugeComponentRaw from 'react-gauge-component';

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

interface DigitalLegendsDetailsProps {
  setActiveTab: (tab: 'overview' | 'mission-control' | 'brands' | 'brand-details') => void;
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
              <button className="px-3 py-1.5 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 text-slate-350 hover:text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer">
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

export default function Dashboard({ onSignOut }: { onSignOut?: () => void }) {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'overview' | 'mission-control' | 'brands' | 'brand-details'>('overview');

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
            <SidebarItem icon={Users} label="AI Employees" />
            <SidebarItem icon={GitBranch} label="Workflows" />
            <SidebarItem icon={BarChart2} label="Analytics" />
            <SidebarItem icon={Activity} label="Live Activity" />
            <SidebarItem icon={Store} label="Marketplace" />
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
            {/* EXECUTIVE ECOSYSTEM OVERVIEW HEADER */}
            <header className="px-4 md:px-8 pt-6 md:pt-8 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 shrink-0">
              <div className="flex items-start justify-between w-full md:w-auto">
                <div>
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-2">
                    <span>Ecosystem</span>
                    <ChevronRight size={12} className="text-slate-600" />
                    <span className="text-white">Executive Overview</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-outfit">Ecosystem Overview</h1>
                    <Sparkles size={20} className="text-cyan-400 md:w-6 md:h-6" />
                  </div>
                  <p className="text-slate-400 text-xs md:text-sm mt-1">High-level orchestration of active brands, agent workforce, and central pipeline.</p>
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
                <button 
                  onClick={() => setActiveTab('mission-control')}
                  className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-cyan-600 hover:bg-cyan-700 border border-cyan-500/50 rounded-lg text-xs md:text-sm font-medium text-white transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-pointer"
                >
                  <Target size={14} />
                  <span>Mission Control Hub</span>
                </button>
                
                {/* System Control Mobile Toggle */}
                <button onClick={() => setRightSidebarOpen(true)} className="xl:hidden p-2 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-400 hover:text-white">
                  <SlidersHorizontal size={18} />
                </button>
              </div>
            </header>

            {/* SCROLLABLE ECOSYSTEM VIEW AREA */}
            <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 z-10 custom-scrollbar">
              
              {/* FLEET KPI CARDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                
                {/* Card 1: Unified Active Brands */}
                <div className="bg-[#0B1120]/80 border border-slate-800/60 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Active Brands</span>
                    <div className="text-2xl font-bold text-white font-outfit">3 Brands</div>
                    <span className="text-[10px] text-cyan-400 font-semibold flex items-center mt-1">
                      <CircleDot size={10} className="mr-1 animate-pulse" /> Fully Connected
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-cyan-950/40 border border-cyan-900/40 rounded-xl flex items-center justify-center text-cyan-400">
                    <Folder size={20} />
                  </div>
                </div>

                {/* Card 2: Total Active Workforce */}
                <div className="bg-[#0B1120]/80 border border-slate-800/60 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Agent Workforce</span>
                    <div className="text-2xl font-bold text-white font-outfit">24 AI Agents</div>
                    <span className="text-[10px] text-purple-400 font-semibold flex items-center mt-1">
                      <Zap size={10} className="mr-1" /> Active Nodes
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-purple-950/40 border border-purple-900/40 rounded-xl flex items-center justify-center text-purple-400">
                    <Users size={20} />
                  </div>
                </div>

                {/* Card 3: Ecosystem ROI Valuation */}
                <div className="bg-[#0B1120]/80 border border-slate-800/60 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Weekly Cost Saved</span>
                    <div className="text-2xl font-bold text-white font-outfit">$42,150</div>
                    <span className="text-[10px] text-emerald-450 font-semibold flex items-center mt-1">
                      <TrendingUp size={10} className="mr-1" /> 8.9x ROI Ratio
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-emerald-950/40 border border-emerald-900/40 rounded-xl flex items-center justify-center text-emerald-450">
                    <CreditCard size={20} />
                  </div>
                </div>

                {/* Card 4: System Integrity */}
                <div className="bg-[#0B1120]/80 border border-slate-800/60 rounded-xl p-5 flex items-center justify-between shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">System integrity</span>
                    <div className="text-2xl font-bold text-white font-outfit">100.0%</div>
                    <span className="text-[10px] text-teal-400 font-semibold flex items-center mt-1">
                      <CheckCircle2 size={10} className="mr-1 text-teal-450" /> Operational
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-teal-950/40 border border-teal-900/40 rounded-xl flex items-center justify-center text-teal-405">
                    <Activity size={20} />
                  </div>
                </div>

              </div>

              {/* ECOSYSTEM BRANDS DIRECTORY GRID */}
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4 font-outfit flex items-center">
                <Folder size={14} className="text-cyan-400 mr-2" /> Connected Brand Ecosystem
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                
                {/* Brand 1: Digital Legends */}
                <div className="bg-[#0B1120]/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-cyan-500/35 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#121c2c] border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold font-outfit text-lg shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-105 transition-transform duration-300">
                        DL
                      </div>
                      <span className="px-2.5 py-0.5 border border-cyan-500/20 bg-cyan-500/10 rounded text-[9px] font-bold text-cyan-400 uppercase tracking-widest leading-none">
                        Live Pipeline
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-450 transition-colors">Digital Legends</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                      AI Automation & Business Growth Platform. Powering automated digital channels with continuous intelligent agent workflows.
                    </p>

                    <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">10</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">AI Employees</div>
                      </div>
                      <div className="text-center border-x border-slate-800/80">
                        <div className="text-sm font-bold text-white">18</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Workflows</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">256</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Tasks Done</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('brand-details')}
                    className="w-full py-2.5 bg-cyan-950/20 border border-cyan-900/60 hover:bg-cyan-600 hover:text-white rounded-xl text-xs font-bold text-cyan-400 transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>Manage Brand Hub</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Brand 2: One Global Fasting */}
                <div className="bg-[#0B1120]/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-emerald-500/35 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#132824] border border-emerald-500/20 flex items-center justify-center text-emerald-450 font-bold group-hover:scale-105 transition-transform duration-300">
                        <Globe size={20} />
                      </div>
                      <span className="px-2.5 py-0.5 border border-emerald-500/20 bg-emerald-500/10 rounded text-[9px] font-bold text-emerald-450 uppercase tracking-widest leading-none">
                        Live Pipeline
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-450 transition-colors">One Global Fasting</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                      Uniting the world through fasting. Automated trackers, community message moderation, and localized analytics.
                    </p>

                    <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">4</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">AI Employees</div>
                      </div>
                      <div className="text-center border-x border-slate-800/80">
                        <div className="text-sm font-bold text-white">5</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Workflows</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-white">87</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Tasks Done</div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveTab('brands')}
                    className="w-full py-2.5 bg-emerald-950/20 border border-emerald-900/60 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold text-emerald-450 transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5"
                  >
                    <span>View Brand Details</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* Brand 3: Boutique Manager */}
                <div className="bg-[#0B1120]/60 border border-slate-800/60 rounded-2xl p-6 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-purple-500/35 transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#23173d] border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold group-hover:scale-105 transition-transform duration-300">
                        <Store size={20} />
                      </div>
                      <span className="px-2.5 py-0.5 border border-slate-700 bg-slate-800/50 rounded text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">
                        Ready
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">Boutique Manager</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                      Intelligent Shopify workflow engine. Synchronizes orders, triggers marketing lists, and generates AI customer replies.
                    </p>

                    <div className="grid grid-cols-3 gap-2 border-t border-slate-800/80 pt-4 mb-6">
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-500">-</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">AI Employees</div>
                      </div>
                      <div className="text-center border-x border-slate-800/80">
                        <div className="text-sm font-bold text-slate-500">-</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Workflows</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-500">-</div>
                        <div className="text-[8px] text-slate-500 uppercase tracking-wider font-semibold">Tasks Done</div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-slate-900/30 border border-slate-800/80 hover:bg-slate-850 hover:text-white rounded-xl text-xs font-bold text-slate-400 transition-all cursor-pointer text-center flex items-center justify-center space-x-1.5">
                    <span>Deploy Agent Workforce</span>
                    <Plus size={14} />
                  </button>
                </div>

              </div>

              {/* LIVE OPERATIONS FEED */}
              <div className="bg-[#0B1120]/75 border border-slate-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider font-outfit flex items-center">
                      <Activity size={14} className="text-cyan-400 mr-2 animate-pulse" /> Central Operations Console
                    </h2>
                    <p className="text-[10px] text-slate-400 mt-1">Real-time log events streaming from all active brand pipelines.</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-[10px] font-bold text-cyan-400 bg-cyan-950/20 border border-cyan-900/40 px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
                    <span>Live Stream</span>
                  </div>
                </div>

                <div className="font-mono text-xs text-slate-300 bg-[#020617]/95 border border-slate-800/80 rounded-xl p-4 space-y-2 h-48 overflow-y-auto custom-scrollbar">
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500">[19:42:01]</span>
                    <span className="text-purple-400">[Maya - DL]</span>
                    <span className="text-slate-450">Generated monthly SEO blog posts for Digital Legends</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500">[19:41:45]</span>
                    <span className="text-purple-400">[Dexter - DL]</span>
                    <span className="text-slate-450">Synchronized lead capture webhooks into main CRM database</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500">[19:38:12]</span>
                    <span className="text-emerald-400">[Leo - Fasting]</span>
                    <span className="text-slate-450">Updated copy for Autophagy Fasting Facebook Ads campaign</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500">[19:35:50]</span>
                    <span className="text-purple-400">[Zara - DL]</span>
                    <span className="text-slate-450">Social Media analysis completed for Q2 Strategy Prep</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-cyan-500">[19:30:11]</span>
                    <span className="text-slate-400">[System]</span>
                    <span className="text-cyan-400 font-semibold">Health check ok. Active agent workforce running at 100% capacity.</span>
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

    </div>
  );
}
