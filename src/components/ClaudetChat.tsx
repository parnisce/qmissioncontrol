import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  Play, 
  Settings, 
  Lightbulb, 
  MoreVertical, 
  CheckCircle2, 
  Circle, 
  Volume2, 
  Info, 
  ChevronRight,
  Phone,
  Search,
  Bell,
  MessageSquare,
  Plus,
  CornerDownLeft,
  Send
} from 'lucide-react';

type Message = {
  id: string;
  sender: 'claudet' | 'user';
  type: 'text' | 'voice';
  content: string;
  time: string;
  duration?: string;
};

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'claudet',
    type: 'text',
    content: "Hello! 👋\nI'm Claudet, your personal AI assistant.\n\nI can help you with tasks, answer questions, brainstorm ideas, analyze data, and much more.\n\nWhat would you like to talk about today?",
    time: "10:30 AM"
  },
  {
    id: '2',
    sender: 'user',
    type: 'voice',
    content: "",
    duration: "00:06",
    time: "10:31 AM"
  },
  {
    id: '3',
    sender: 'claudet',
    type: 'text',
    content: "That sounds like a great idea! I can definitely help you create a content plan for your personal LinkedIn.\n\nLet me outline a 4-week plan tailored to your goals.",
    time: "10:32 AM"
  }
];

const ClaudetChat = ({ onBack }: { onBack?: () => void }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, inputMode]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'text',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'claudet',
        type: 'text',
        content: "I've noted that down! I'm here if you need anything else.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  const handleVoiceEnd = () => {
    setInputMode('text');
    
    const voiceMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      type: 'voice',
      content: '',
      duration: '00:08',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, voiceMsg]);
    
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'claudet',
        type: 'text',
        content: "I understood perfectly. I'll get right on it!",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i !== content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="flex-1 p-8 lg:p-10 h-full overflow-y-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <span onClick={onBack} className="hover:text-slate-200 cursor-pointer transition-colors">Dashboard</span>
          <ChevronRight size={14} />
          <span className="hover:text-slate-200 cursor-pointer transition-colors">My Assistant</span>
          <ChevronRight size={14} />
          <span className="text-brand-accent font-semibold">Claudet</span>
        </div>
        
        <div className="flex items-center space-x-5">
          <div className="relative group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-brand-accent transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-slate-900/30 border border-slate-800/60 rounded-xl pl-11 pr-5 py-2.5 text-sm text-slate-300 focus:outline-none focus:border-brand-accent/40 w-72 transition-all placeholder:text-slate-600 font-light"
            />
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-xs flex items-center space-x-1">
              <span className="px-1.5 py-0.5 bg-slate-800 rounded">⌘</span>
              <span className="px-1.5 py-0.5 bg-slate-800 rounded">K</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-slate-900/40 border border-slate-800/50 rounded-lg text-slate-400 hover:text-slate-100 transition-colors relative">
              <Bell size={18} />
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-slate-900"></div>
            </button>
            <button className="p-2 bg-slate-900/40 border border-slate-800/50 rounded-lg text-slate-400 hover:text-slate-100 transition-colors">
              <MessageSquare size={18} />
            </button>
            <div className="w-9 h-9 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm border border-brand-accent/30 cursor-pointer">T</div>
          </div>
        </div>
      </div>

      {/* Main Title Area */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="flex items-center space-x-4 mb-3">
            <h1 className="text-4xl font-bold">Hi, I'm <span className="text-brand-accent">Claudet</span></h1>
            <span className="px-3 py-1 bg-slate-800/80 border border-slate-700 rounded-full text-xs font-medium text-slate-300">Personal AI Assistant</span>
          </div>
          <div className="flex items-center space-x-3 text-slate-400">
            <p>I'm here to help you get things done, save time, and achieve your goals. How can I assist you today?</p>
            <span className="flex items-center space-x-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-500 uppercase">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={() => setInputMode('voice')} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            <Volume2 size={16} />
            <span>Voice Chat</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm font-medium hover:bg-slate-800 transition-colors">
            <Plus size={16} />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-280px)]">
        
        {/* Left Column - Chat Area */}
        <div className="lg:col-span-2 flex flex-col h-full bg-slate-900/30 border border-slate-800/60 rounded-2xl overflow-hidden relative">
          
          {/* Assistant Info Header */}
          <div className="p-5 border-b border-slate-800/50 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm z-10">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full border-2 border-brand-accent p-0.5 overflow-hidden">
                <img src="/claudet.png" alt="Claudet" className="w-full h-full object-cover rounded-full" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Claudet</h3>
                <div className="flex items-center space-x-3 mt-1 text-sm">
                  <span className="text-slate-400">Personal AI Assistant</span>
                  <span className="flex items-center space-x-1.5 px-2 py-0.5 bg-green-500/10 rounded text-[10px] font-bold text-green-500 uppercase">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Online</span>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-colors">
                <Info size={14} />
                <span>About Claudet</span>
              </button>
              <button className="p-1.5 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map(msg => {
              if (msg.sender === 'claudet') {
                return (
                  <div key={msg.id} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full border border-brand-accent/30 p-0.5 overflow-hidden flex-shrink-0">
                      <img src="/claudet.png" alt="Claudet" className="w-full h-full object-cover rounded-full" />
                    </div>
                    <div className="bg-slate-800/40 border border-slate-700/50 rounded-2xl rounded-tl-sm p-5 max-w-[80%]">
                      <p className="text-slate-200 leading-relaxed">
                        {formatContent(msg.content)}
                      </p>
                      <div className="text-right mt-2 text-[10px] text-slate-500">{msg.time}</div>
                    </div>
                  </div>
                );
              } else {
                if (msg.type === 'voice') {
                  return (
                    <div key={msg.id} className="flex items-start justify-end space-x-4">
                      <div className="bg-slate-800/60 border border-slate-700/50 rounded-full py-3 px-4 max-w-[60%] flex items-center space-x-4">
                        <button className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent hover:bg-brand-accent/30 transition-colors">
                          <Play size={14} className="ml-0.5" />
                        </button>
                        <div className="flex items-center space-x-1 opacity-70">
                          {[...Array(24)].map((_, i) => (
                            <div key={i} className={`w-1 bg-brand-accent rounded-full`} style={{ height: `${Math.random() * 20 + 4}px`, opacity: Math.random() * 0.5 + 0.5 }}></div>
                          ))}
                        </div>
                        <span className="text-xs text-slate-400 font-medium">{msg.duration}</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm border border-brand-accent/30 flex-shrink-0">T</div>
                    </div>
                  );
                } else {
                  return (
                    <div key={msg.id} className="flex items-start justify-end space-x-4">
                      <div className="bg-brand-accent/10 border border-brand-accent/20 rounded-2xl rounded-tr-sm p-5 max-w-[80%]">
                        <p className="text-slate-200 leading-relaxed">
                          {formatContent(msg.content)}
                        </p>
                        <div className="text-right mt-2 text-[10px] text-slate-500">{msg.time}</div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold text-sm border border-brand-accent/30 flex-shrink-0">T</div>
                    </div>
                  );
                }
              }
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {inputMode === 'text' && (
            <div className="px-6 py-4 flex items-center space-x-3 overflow-x-auto no-scrollbar">
              {["Sounds good, let's do it!", "Can you include content ideas?", "What's the best posting frequency?"].map((text, i) => (
                <button key={i} onClick={() => handleSendMessage(text)} className="flex items-center space-x-2 px-4 py-2.5 bg-slate-800/40 border border-slate-700 rounded-xl text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors whitespace-nowrap">
                  <span>{text}</span>
                  <CornerDownLeft size={12} className="opacity-50" />
                </button>
              ))}
            </div>
          )}

          {/* Input UI */}
          {inputMode === 'voice' ? (
            <div className="p-4 mx-6 mb-6">
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-6 flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                
                {/* Background waves */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <div className="w-64 h-64 border border-brand-accent rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
                  <div className="absolute w-48 h-48 border border-brand-accent rounded-full animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }}></div>
                </div>

                <div className="w-full flex items-center justify-between z-10 relative">
                  {/* Settings */}
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2 text-slate-400 text-xs font-medium">
                      <Settings size={14} />
                      <span>Voice Settings</span>
                    </div>
                    <div className="text-[10px] text-slate-500">English (US) <span className="mx-1">•</span> Natural Voice ⌄</div>
                  </div>

                  {/* Center Mic */}
                  <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2">
                     <div className="relative mb-3 flex items-center justify-center w-32">
                       <div className="flex items-center space-x-1 opacity-50 mr-4">
                         <div className="w-1 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                         <div className="w-1 h-4 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-1 h-3 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                       </div>
                       
                       <div className="w-20 h-20 rounded-full border-2 border-brand-accent/50 flex items-center justify-center relative cursor-pointer group">
                         <div className="absolute inset-0 border-2 border-brand-accent rounded-full scale-[1.15] opacity-30 animate-pulse"></div>
                         <div className="absolute inset-0 border-2 border-brand-accent rounded-full scale-[1.3] opacity-10 animate-pulse"></div>
                         <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] group-hover:bg-brand-accent/20 transition-colors">
                           <Mic size={24} className="text-brand-accent" />
                         </div>
                       </div>
                       
                       <div className="flex items-center space-x-1 opacity-50 ml-4">
                         <div className="w-1 h-3 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                         <div className="w-1 h-5 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                         <div className="w-1 h-2 bg-brand-accent rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                       </div>
                     </div>
                     <span className="text-sm font-bold text-white tracking-wide">Listening...</span>
                     <span className="text-[10px] text-slate-500 mt-1">Tap to pause</span>
                  </div>

                  {/* End Chat */}
                  <div className="flex flex-col items-end space-y-2">
                    <button onClick={handleVoiceEnd} className="flex items-center space-x-2 px-4 py-2 border border-slate-700 rounded-full text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors bg-slate-900/50 z-20 relative">
                      <span>End Chat</span>
                      <Phone className="rotate-[135deg] text-red-500" size={14} />
                    </button>
                    <span className="text-[10px] text-slate-600">Press ESC to end</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 mx-6 mb-6">
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-2 flex items-center shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md relative">
                <button onClick={() => setInputMode('voice')} className="p-3 text-slate-400 hover:text-brand-accent transition-colors">
                  <Mic size={20} />
                </button>
                <input 
                  type="text" 
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Message Claudet..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-200 placeholder:text-slate-600 px-2"
                />
                <button 
                  onClick={() => handleSendMessage(inputText)}
                  className="p-3 bg-brand-accent text-slate-900 rounded-xl hover:opacity-90 transition-opacity ml-2 flex items-center justify-center disabled:opacity-50"
                  disabled={!inputText.trim()}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Right Column - Context & Onboarding */}
        <div className="flex flex-col space-y-6">
          
          {/* Onboarding Progress */}
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6">
            <h3 className="text-base font-bold mb-6">Onboarding Progress</h3>
            
            <div className="flex justify-between items-start relative mb-8">
              {/* Line behind steps */}
              <div className="absolute top-4 left-4 right-4 h-[1px] bg-slate-800 -z-10"></div>
              
              <div className="flex flex-col items-center group">
                <div className="w-8 h-8 rounded-full border border-brand-accent bg-[#020617] text-brand-accent flex items-center justify-center text-xs font-bold mb-2 shadow-[0_0_10px_rgba(0,229,255,0.2)]">1</div>
                <span className="text-xs font-bold text-brand-accent mb-1">Learn</span>
                <span className="text-[9px] text-slate-500 text-center w-16 leading-tight">AI learns about your business</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="w-8 h-8 rounded-full border border-slate-700 bg-[#020617] text-slate-500 flex items-center justify-center text-xs font-bold mb-2">2</div>
                <span className="text-xs font-medium text-slate-400 mb-1">Build</span>
                <span className="text-[9px] text-slate-500 text-center w-16 leading-tight">AI builds your brand automatically</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="w-8 h-8 rounded-full border border-slate-700 bg-[#020617] text-slate-500 flex items-center justify-center text-xs font-bold mb-2">3</div>
                <span className="text-xs font-medium text-slate-400 mb-1">Setup</span>
                <span className="text-[9px] text-slate-500 text-center w-16 leading-tight">Configuring everything</span>
              </div>
              <div className="flex flex-col items-center opacity-50">
                <div className="w-8 h-8 rounded-full border border-slate-700 bg-[#020617] text-slate-500 flex items-center justify-center text-xs font-bold mb-2">4</div>
                <span className="text-xs font-medium text-slate-400 mb-1">Launch</span>
                <span className="text-[9px] text-slate-500 text-center w-16 leading-tight">Your brand is ready to go</span>
              </div>
            </div>

            <div className="bg-slate-900/60 rounded-xl p-5 border border-slate-800/50">
              <h4 className="text-sm font-bold mb-4">Claudet is learning about you</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={16} className="text-brand-accent" />
                    <span>Understanding your business...</span>
                  </div>
                  <CheckCircle2 size={16} className="text-brand-accent" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={16} className="text-brand-accent" />
                    <span>Identifying your goals...</span>
                  </div>
                  <CheckCircle2 size={16} className="text-brand-accent" />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={16} className="text-brand-accent" />
                    <span>Learning your preferences...</span>
                  </div>
                  <CheckCircle2 size={16} className="text-brand-accent" />
                </div>
                <div className="flex items-center justify-between text-xs opacity-70">
                  <div className="flex items-center space-x-3 text-slate-300">
                    <CheckCircle2 size={16} className="text-brand-accent" />
                    <span>Analyzing your work style...</span>
                  </div>
                  <Circle size={16} className="text-slate-600" />
                </div>
                <div className="flex items-center justify-between text-xs opacity-50">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Circle size={16} className="text-slate-600" />
                    <span>Discovering opportunities...</span>
                  </div>
                  <Circle size={16} className="text-slate-600" />
                </div>
                <div className="flex items-center justify-between text-xs opacity-50">
                  <div className="flex items-center space-x-3 text-slate-400">
                    <Circle size={16} className="text-slate-600" />
                    <span>Preparing personalized suggestions...</span>
                  </div>
                  <Circle size={16} className="text-slate-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Did You Know? */}
          <div className="bg-slate-900/40 border border-slate-800/50 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-yellow-500 flex-shrink-0">
                <Lightbulb size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200 mb-2">Did you know?</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                  You can talk naturally with Claudet. Use Voice Chat for a more natural conversation experience. Claudet can hear you, understand your needs, and respond instantly.
                </p>
                <button onClick={() => setInputMode('voice')} className="px-5 py-2 border border-brand-accent/50 rounded-lg text-xs font-bold text-brand-accent hover:bg-brand-accent/10 transition-colors">
                  Try Voice Chat
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ClaudetChat;
