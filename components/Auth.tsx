
import React, { useState } from 'react';
import { AppView, User } from '../types';
import CircularLoader from './CircularLoader';

interface AuthProps {
  onLogin: (user: User) => void;
  onNavigate: (view: AppView) => void;
  currentView: AppView;
}

const Auth: React.FC<AuthProps> = ({ onLogin, onNavigate, currentView }) => {
  const [loading, setLoading] = useState(false);
  const [successMode, setSuccessMode] = useState(false);
  const [generatedUsername, setGeneratedUsername] = useState('');
  const [newlyCreatedUser, setNewlyCreatedUser] = useState<User | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phone: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const generateUsername = (name: string) => {
    const cleanName = name.replace(/\s+/g, '').toUpperCase().slice(0, 6);
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `DENIS-${cleanName}-${rand}`;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) return alert("Passwords do not match");
    
    setLoading(true);
    const username = generateUsername(formData.name);
    
    setTimeout(() => {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        idNumber: formData.idNumber,
        phone: formData.phone,
        email: formData.email,
        username: username,
        passwordHash: 'ENCRYPTED_' + btoa(formData.password),
        createdAt: Date.now()
      };
      
      const users = JSON.parse(localStorage.getItem('denis_stocks_users') || '[]');
      users.push(newUser);
      localStorage.setItem('denis_stocks_users', JSON.stringify(users));
      
      setGeneratedUsername(username);
      setNewlyCreatedUser(newUser);
      setLoading(false);
      setSuccessMode(true);
    }, 1500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('denis_stocks_users') || '[]');
      const user = users.find((u: any) => u.username === (formData.username || generatedUsername) && u.passwordHash === 'ENCRYPTED_' + btoa(formData.password));
      
      if (user) {
        onLogin(user);
      } else {
        alert("Invalid Username or Password. If you just registered, please ensure you use the generated username: " + generatedUsername);
      }
      setLoading(false);
    }, 1200);
  };

  const handleEnterImmediately = () => {
    if (newlyCreatedUser) {
      onLogin(newlyCreatedUser);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-6">
        <CircularLoader size="lg" />
        <p className="text-blue-500 font-black tracking-widest uppercase animate-pulse">Syncing Secure Channels...</p>
      </div>
    );
  }

  if (successMode) {
    return (
      <div className="max-w-md mx-auto py-12 animate-in zoom-in-95 duration-500">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
          <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-900/40">
            <i className="fas fa-check text-3xl text-white"></i>
          </div>
          <h2 className="text-3xl font-black text-white mb-2 tracking-tighter">REGISTRATION SUCCESSFUL</h2>
          <p className="text-slate-400 text-sm mb-8">Your unique System ID has been generated. Use it to bypass manual entry below.</p>
          
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 mb-8">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2">Your System Username</p>
            <p className="text-2xl font-mono font-black text-blue-400 select-all">{generatedUsername}</p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleEnterImmediately}
              className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-2xl shadow-blue-900/40 transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              <i className="fas fa-bolt"></i> ENTER TERMINAL NOW
            </button>
            <button 
              onClick={() => { setSuccessMode(false); onNavigate('login'); }}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl font-black uppercase tracking-widest text-[10px] transition-all"
            >
              Manual Login Flow
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl -mr-16 -mt-16"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-900/40">
            <i className="fas fa-user-shield text-2xl text-white"></i>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
            {currentView === 'login' ? 'Secure Login' : 'Market Registration'}
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Dynamic Anti-Hack Security Enabled</p>
        </div>

        <form onSubmit={currentView === 'login' ? handleLogin : handleRegister} className="space-y-4">
          {currentView === 'register' && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Full Name</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-500 uppercase ml-2">ID / Passport Number</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  onChange={e => setFormData({...formData, idNumber: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Phone</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </>
          )}

          {currentView === 'login' && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2">System Username</label>
              <input 
                required
                type="text" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="DENIS-USER-XXXX"
                value={formData.username || (generatedUsername ? generatedUsername : '')}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-500 uppercase ml-2">{currentView === 'register' ? 'Create Password' : 'Password'}</label>
            <input 
              required
              type="password" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {currentView === 'register' && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-2">Confirm Password</label>
              <input 
                required
                type="password" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-black uppercase tracking-widest shadow-xl shadow-blue-900/30 transition-all transform active:scale-95"
          >
            {currentView === 'login' ? 'AUTHORIZE ACCESS' : 'PROCEED TO SYSTEM CREATION'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => { setSuccessMode(false); onNavigate(currentView === 'login' ? 'register' : 'login'); }}
            className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-blue-500 transition-colors"
          >
            {currentView === 'login' ? 'New Terminal? Register Here' : 'Already Registered? Secure Login'}
          </button>
        </div>
      </div>
      
      <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale blur-[0.5px]">
         <i className="fas fa-fingerprint text-white text-lg"></i>
         <i className="fas fa-network-wired text-white text-lg"></i>
         <i className="fas fa-key text-white text-lg"></i>
         <i className="fas fa-microchip text-white text-lg"></i>
      </div>
    </div>
  );
};

export default Auth;
