
import React from 'react';
import { AppView, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentView: AppView;
  setView: (view: AppView) => void;
  onBack: () => void;
  currentUser: User | null;
  onLogout?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, setView, onBack, currentUser, onLogout }) => {
  const navItems = [
    { id: 'market', icon: 'fa-chart-line', label: 'Market Board' },
    { id: 'analysis', icon: 'fa-brain', label: 'AI Terminal' },
    { id: 'brokerage', icon: 'fa-building-columns', label: 'Brokerage' },
    { id: 'portfolio', icon: 'fa-wallet', label: 'Vault' },
    { id: 'academy', icon: 'fa-graduation-cap', label: 'Academy' },
    { id: 'security', icon: 'fa-shield-halved', label: 'Security' },
  ];

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden no-print">
      <aside className="w-20 md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300">
        <div className="p-4 flex items-center gap-3 border-b border-slate-800 h-16">
          <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
            <i className="fas fa-landmark text-white"></i>
          </div>
          <span className="hidden md:block font-black text-sm text-white whitespace-nowrap uppercase">DENIS STOCKS</span>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id as AppView)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                currentView === item.id 
                  ? 'bg-blue-600/10 text-blue-500 border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
              }`}
            >
              <div className="w-8 flex justify-center text-lg"><i className={`fas ${item.icon}`}></i></div>
              <span className="hidden md:block font-black uppercase tracking-widest text-[10px]">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-400 font-black uppercase">{currentUser?.name.charAt(0)}</div>
            <div className="hidden md:block overflow-hidden">
              <p className="text-[10px] font-black uppercase text-white truncate">{currentUser?.name}</p>
              <p className="text-[8px] text-slate-500 font-black uppercase">ID: {currentUser?.username.split('-').pop()}</p>
            </div>
          </div>
          <button onClick={onLogout} className="w-full py-2 text-[10px] font-black text-rose-500 hover:text-rose-400 uppercase tracking-widest">Logout System</button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {currentView !== 'market' && (
              <button onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"><i className="fas fa-arrow-left"></i></button>
            )}
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-white">{currentView.replace('-', ' ')} HUB</h2>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden lg:flex items-center gap-4">
                <span className="text-[8px] font-black text-emerald-500 flex items-center gap-2 uppercase">
                   <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> SYNC ACTIVE
                </span>
                <div className="h-4 w-px bg-slate-800"></div>
                <span className="text-[8px] font-black text-blue-500 uppercase">ENCRYPTED TUNNEL</span>
             </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto bg-slate-950 p-6">
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
