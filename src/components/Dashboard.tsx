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
                  {/* Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <svg className="w-full h-full text-cyan-400" viewBox="0 0 200 40">
                      <defs>
                        <linearGradient id="cyanSparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 Q 25 15 50 30 T 100 10 T 150 25 T 200 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 0 35 Q 25 15 50 30 T 100 10 T 150 25 T 200 8 L 200 40 L 0 40 Z" fill="url(#cyanSparkGrad)" />
                    </svg>
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
                  {/* Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <svg className="w-full h-full text-purple-450" viewBox="0 0 200 40">
                      <defs>
                        <linearGradient id="purpleSparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path d="M 0 32 Q 30 12 60 28 T 120 8 T 180 20 T 200 12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 0 32 Q 30 12 60 28 T 120 8 T 180 20 T 200 12 L 200 40 L 0 40 Z" fill="url(#purpleSparkGrad)" />
                    </svg>
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
                  {/* Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <svg className="w-full h-full text-emerald-450" viewBox="0 0 200 40">
                      <defs>
                        <linearGradient id="emeraldSparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path d="M 0 30 Q 25 8 50 25 T 100 5 T 150 22 T 200 10" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 0 30 Q 25 8 50 25 T 100 5 T 150 22 T 200 10 L 200 40 L 0 40 Z" fill="url(#emeraldSparkGrad)" />
                    </svg>
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
                  {/* Sparkline */}
                  <div className="w-full h-8 mt-2 overflow-hidden shrink-0">
                    <svg className="w-full h-full text-yellow-450" viewBox="0 0 200 40">
                      <defs>
                        <linearGradient id="yellowSparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#eab308" stopOpacity={0.25} />
                          <stop offset="100%" stopColor="#eab308" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path d="M 0 35 Q 35 15 70 30 T 140 8 T 200 15" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M 0 35 Q 35 15 70 30 T 140 8 T 200 15 L 200 40 L 0 40 Z" fill="url(#yellowSparkGrad)" />
                    </svg>
                  </div>
                </div>

                {/* Stat 5: System Health */}
                <div className="bg-[#0b1220]/45 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700/85 transition-all">
                  <div>
                    <div className="flex items-center space-x-2.5 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-teal-950/40 border border-teal-900/50 flex items-center justify-center text-teal-400">
                        <Activity size={15} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">System Health</span>
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-2xl font-black text-white font-outfit">100%</span>
                      <span className="text-[9px] text-teal-400 font-bold flex items-center">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full mr-1 animate-pulse" /> All Systems Online
                      </span>
                    </div>
                  </div>
                  {/* Vertical Glowing Equalizer Bars */}
                  <div className="flex items-end justify-between h-8 px-1 mt-2 shrink-0">
                    {[10, 8, 9, 11, 10, 12, 10, 11, 9, 10, 12, 11, 12, 10, 11, 12].map((h, i) => (
                      <div 
                        key={i} 
                        style={{ height: `${h * 8}%` }} 
                        className="w-1.5 bg-gradient-to-t from-teal-500/20 to-teal-400 rounded-sm shadow-[0_0_4px_rgba(20,184,166,0.4)]"
                      />
                    ))}
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
                    <div className="relative h-56 w-full flex items-center justify-center mt-3">
                      <svg className="absolute inset-0 w-full h-full opacity-[0.25] text-teal-500/30" viewBox="0 0 1000 500" fill="none">
                        {/* Clustered coordinates rendering stylized digital grid continents */}
                        {[
                          // North America
                          { cx: 80, cy: 80 }, { cx: 100, cy: 90 }, { cx: 120, cy: 75 }, { cx: 140, cy: 85 }, { cx: 160, cy: 100 },
                          { cx: 90, cy: 110 }, { cx: 110, cy: 125 }, { cx: 130, cy: 135 }, { cx: 150, cy: 120 }, { cx: 170, cy: 110 },
                          { cx: 100, cy: 150 }, { cx: 120, cy: 160 }, { cx: 140, cy: 170 }, { cx: 160, cy: 150 }, { cx: 180, cy: 140 },
                          { cx: 110, cy: 190 }, { cx: 130, cy: 200 }, { cx: 150, cy: 210 }, { cx: 170, cy: 185 }, { cx: 190, cy: 175 },
                          { cx: 120, cy: 230 }, { cx: 140, cy: 240 }, { cx: 160, cy: 250 }, { cx: 180, cy: 220 }, { cx: 200, cy: 200 },
                          
                          // South America
                          { cx: 210, cy: 260 }, { cx: 220, cy: 280 }, { cx: 230, cy: 300 }, { cx: 240, cy: 320 }, { cx: 250, cy: 340 },
                          { cx: 220, cy: 270 }, { cx: 235, cy: 295 }, { cx: 245, cy: 315 }, { cx: 255, cy: 335 }, { cx: 260, cy: 360 },
                          { cx: 230, cy: 290 }, { cx: 240, cy: 310 }, { cx: 250, cy: 330 }, { cx: 260, cy: 350 }, { cx: 270, cy: 380 },
                          { cx: 240, cy: 330 }, { cx: 250, cy: 350 }, { cx: 260, cy: 370 }, { cx: 270, cy: 400 }, { cx: 280, cy: 420 },
                          { cx: 250, cy: 370 }, { cx: 260, cy: 390 }, { cx: 270, cy: 410 }, { cx: 275, cy: 430 }, { cx: 270, cy: 450 },

                          // Africa
                          { cx: 480, cy: 250 }, { cx: 490, cy: 260 }, { cx: 500, cy: 270 }, { cx: 510, cy: 280 }, { cx: 520, cy: 290 },
                          { cx: 490, cy: 280 }, { cx: 500, cy: 295 }, { cx: 510, cy: 310 }, { cx: 520, cy: 320 }, { cx: 530, cy: 330 },
                          { cx: 500, cy: 310 }, { cx: 510, cy: 330 }, { cx: 525, cy: 345 }, { cx: 535, cy: 360 }, { cx: 540, cy: 370 },
                          { cx: 510, cy: 340 }, { cx: 520, cy: 360 }, { cx: 530, cy: 375 }, { cx: 535, cy: 390 }, { cx: 530, cy: 405 },

                          // Europe / Asia
                          { cx: 450, cy: 100 }, { cx: 470, cy: 90 }, { cx: 490, cy: 80 }, { cx: 510, cy: 95 }, { cx: 530, cy: 110 },
                          { cx: 460, cy: 120 }, { cx: 480, cy: 130 }, { cx: 500, cy: 115 }, { cx: 520, cy: 135 }, { cx: 540, cy: 150 },
                          { cx: 550, cy: 120 }, { cx: 570, cy: 130 }, { cx: 590, cy: 110 }, { cx: 610, cy: 140 }, { cx: 630, cy: 125 },
                          { cx: 560, cy: 150 }, { cx: 580, cy: 160 }, { cx: 600, cy: 145 }, { cx: 620, cy: 165 }, { cx: 640, cy: 150 },
                          { cx: 650, cy: 130 }, { cx: 670, cy: 140 }, { cx: 690, cy: 120 }, { cx: 710, cy: 150 }, { cx: 730, cy: 135 },
                          { cx: 660, cy: 160 }, { cx: 680, cy: 170 }, { cx: 700, cy: 155 }, { cx: 720, cy: 175 }, { cx: 740, cy: 160 },
                          
                          // Southern & Eastern Asia
                          { cx: 580, cy: 190 }, { cx: 600, cy: 200 }, { cx: 620, cy: 210 }, { cx: 640, cy: 195 }, { cx: 660, cy: 185 },
                          { cx: 590, cy: 220 }, { cx: 610, cy: 230 }, { cx: 630, cy: 240 }, { cx: 650, cy: 225 }, { cx: 670, cy: 215 },
                          { cx: 680, cy: 200 }, { cx: 700, cy: 210 }, { cx: 720, cy: 220 }, { cx: 740, cy: 205 }, { cx: 760, cy: 195 },
                          { cx: 690, cy: 230 }, { cx: 710, cy: 240 }, { cx: 730, cy: 250 }, { cx: 750, cy: 235 }, { cx: 770, cy: 225 },
                          
                          // Australia
                          { cx: 750, cy: 350 }, { cx: 770, cy: 360 }, { cx: 790, cy: 345 }, { cx: 810, cy: 355 }, { cx: 830, cy: 370 },
                          { cx: 760, cy: 380 }, { cx: 780, cy: 390 }, { cx: 800, cy: 375 }, { cx: 820, cy: 395 }, { cx: 840, cy: 380 },
                          { cx: 770, cy: 410 }, { cx: 790, cy: 420 }, { cx: 810, cy: 405 }, { cx: 830, cy: 425 }, { cx: 850, cy: 410 }
                        ].map((dot, idx) => (
                          <circle 
                            key={idx}
                            cx={dot.cx * 1.1 + 40}
                            cy={dot.cy * 0.95 + 15}
                            r="2.5"
                            className="fill-teal-500/25 stroke-teal-400/40 stroke-0.5"
                          />
                        ))}
                      </svg>

                      {/* Map Status Overlay Right Card */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-52 bg-slate-950/80 border border-slate-800/80 rounded-xl p-4 shadow-xl backdrop-blur-sm space-y-3 z-20">
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
