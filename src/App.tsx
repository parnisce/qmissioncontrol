import React, { useState } from 'react';
import { 
  Shield, 
  Brain, 
  BarChart3, 
  Zap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  Radio,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Dashboard from './components/Dashboard';

const FeatureItem = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex items-start space-x-4 group p-4 rounded-xl hover:bg-slate-800/30 transition-all duration-300"
  >
    <div className="flex-shrink-0 p-3 bg-slate-900/80 border border-slate-700 rounded-lg group-hover:border-brand-accent/50 transition-colors">
      <Icon className="w-5 h-5 text-brand-accent" />
    </div>
    <div>
      <h3 className="text-slate-100 font-semibold mb-1">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <Dashboard onSignOut={() => setIsLoggedIn(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden flex items-center justify-center p-4 sm:p-8 lg:p-12">
      {/* Background Effects (Full Screen) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full text-brand-accent animate-pulse">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
            <ellipse cx="50" cy="50" rx="48" ry="15" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <ellipse cx="50" cy="50" rx="15" ry="48" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <path d="M2 50 Q 50 10 98 50" fill="none" stroke="currentColor" strokeWidth="0.1" />
            <path d="M2 50 Q 50 90 98 50" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-brand-accent/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-12 lg:gap-20">
        
        {/* Left Content */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
          >
            <div>
              <div className="w-16 h-16 bg-slate-900/50 rounded-2xl flex items-center justify-center border border-slate-800 mb-8 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
                <Radio className="w-8 h-8 text-brand-accent animate-pulse" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
                Digital <span className="text-brand-accent cyan-glow block lg:inline mt-2 lg:mt-0">Mission Control</span>
              </h1>
              
              <div className="flex items-center space-x-2 text-[10px] tracking-[0.4em] text-slate-500 font-black mb-6 uppercase opacity-80">
                <span className="border-b border-slate-800 pb-1">Authorized Personnel Only</span>
              </div>
              
              <p className="text-slate-400 text-base sm:text-lg lg:text-xl max-w-lg leading-relaxed font-light">
                Your command center for AI employees, workflows, and mission-critical operations.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 max-w-2xl">
              <FeatureItem 
                icon={Shield} 
                title="Secure & Private" 
                description="Bank-level encryption keeps your data and operations safe."
              />
              <FeatureItem 
                icon={Brain} 
                title="AI-Powered" 
                description="Manage your AI workforce and automate complex tasks."
              />
              <FeatureItem 
                icon={BarChart3} 
                title="Real-Time Insights" 
                description="Track performance, progress, and results in real time."
              />
              <FeatureItem 
                icon={Zap} 
                title="High Performance" 
                description="Built for speed, reliability, and mission-critical work."
              />
            </div>
          </motion.div>
        </div>

        {/* Right Content - Login Form */}
        <div className="w-full lg:w-[450px] flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full p-6 sm:p-8 lg:p-10 rounded-3xl glass-card relative shadow-2xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back 👋</h2>
              <p className="text-slate-400 text-sm">Sign in to your mission control dashboard</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 lg:space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type="email" 
                    className="input-field pl-12"
                    placeholder="team@digitallegendsagency.com"
                    defaultValue="team@digitallegendsagency.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="input-field pl-12 pr-12"
                    placeholder="••••••••••••••••"
                    defaultValue="••••••••••••••••"
                    required
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-brand-accent transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-brand-accent focus:ring-brand-accent focus:ring-offset-0" />
                  <span className="text-slate-400 group-hover:text-slate-200 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-brand-accent hover:underline underline-offset-4">Forgot password?</a>
              </div>

              <button type="submit" className="w-full cyan-gradient-bg py-4 rounded-xl font-bold text-white flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                <span>Sign In</span>
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                <span className="bg-[#0f172a] px-4 text-slate-500">Or continue with</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
               {[
                 { 
                   name: 'Google', 
                   icon: (
                     <svg className="w-5 h-5 mb-1" viewBox="0 0 24 24">
                       <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.273 0 3.19 2.427 1.073 6.073l4.193 3.692z"/>
                       <path fill="#4285F4" d="M23.82 12.24c0-.853-.076-1.674-.218-2.463H12v4.658h6.629c-.286 1.543-1.157 2.85-2.463 3.727l3.84 2.977c2.247-2.07 3.545-5.117 3.545-8.892z"/>
                       <path fill="#FBBC05" d="M5.266 14.235L1.073 17.927A11.967 11.967 0 0 1 0 12c0-2.146.564-4.155 1.555-5.909l4.193 3.692A7.033 7.033 0 0 0 4.91 12c0 1.543.518 2.97 1.39 4.127z"/>
                       <path fill="#34A853" d="M12 24c3.24 0 5.956-1.073 7.942-2.902l-3.84-2.977c-1.064.713-2.427 1.135-4.102 1.135-3.155 0-5.827-2.13-6.782-5.021l-4.193 3.692C3.19 21.573 7.273 24 12 24z"/>
                     </svg>
                   )
                 },
                 { 
                   name: 'Microsoft', 
                   icon: (
                     <svg className="w-5 h-5 mb-1" viewBox="0 0 23 23">
                       <path fill="#f3f3f3" d="M0 0h11v11H0z"/>
                       <path fill="#f3f3f3" d="M12 0h11v11H12z"/>
                       <path fill="#f3f3f3" d="M0 12h11v11H0z"/>
                       <path fill="#f3f3f3" d="M12 12h11v11H12z"/>
                       <path fill="#f25022" d="M0 0h11v11H0z"/>
                       <path fill="#7fba00" d="M12 0h11v11H12z"/>
                       <path fill="#00a4ef" d="M0 12h11v11H0z"/>
                       <path fill="#ffb900" d="M12 12h11v11H12z"/>
                     </svg>
                   )
                 },
                 { 
                   name: 'Apple', 
                   icon: (
                     <svg className="w-5 h-5 mb-1" viewBox="0 0 384 512">
                       <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                     </svg>
                   )
                 }
               ].map((provider) => (
                 <button key={provider.name} className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-800 hover:bg-slate-800/50 transition-all duration-300">
                   {provider.icon}
                   <span className="text-[10px] font-medium text-slate-400">{provider.name}</span>
                 </button>
               ))}
            </div>

            <div className="mt-8 flex items-center justify-center space-x-2 text-slate-500 text-xs">
              <Shield size={14} className="text-brand-accent" />
              <p><span className="text-brand-accent">Secure</span> terminal connection established</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default App;
