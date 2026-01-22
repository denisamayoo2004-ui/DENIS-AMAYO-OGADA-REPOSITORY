
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Stock, AppView, UserPortfolio, Transaction, NewsArticle, User, SystemAudit } from './types';
import { INITIAL_STOCKS, BREAKING_NEWS } from './constants';
import { SecurityService } from './services/securityService';
import Layout from './components/Layout';
import MarketGrid from './components/MarketGrid';
import StockTable from './components/StockTable';
import StockAnalysis from './components/StockAnalysis';
import BrokerageDisplay from './components/BrokerageDisplay';
import VirtualTrading from './components/VirtualTrading';
import Ticker from './components/Ticker';
import Auth from './components/Auth';
import CircularLoader from './components/CircularLoader';
import StockComparison from './components/StockComparison';
import HistoricalView from './components/HistoricalView';
import { getEducationalNotes, getNewsArchive, performGlobalAudit } from './services/geminiService';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('denis_stocks_session');
    return saved ? JSON.parse(saved) : null;
  });
  const [currentView, setCurrentView] = useState<AppView>(() => currentUser ? 'market' : 'login');
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [stocks, setStocks] = useState<Stock[]>(INITIAL_STOCKS);
  const [history, setHistory] = useState<AppView[]>(['market']);
  const [comparisonList, setComparisonList] = useState<Stock[]>([]);
  const [globalAudit, setGlobalAudit] = useState<SystemAudit | null>(null);
  
  const [portfolio, setPortfolio] = useState<UserPortfolio>(() => {
    const saved = localStorage.getItem(`portfolio_${currentUser?.id}`);
    return saved ? JSON.parse(saved) : {
      balance: 1000000,
      holdings: {},
      history: [],
      reminders: []
    };
  });

  const [securityProfile, setSecurityProfile] = useState(SecurityService.getSecurityProfile());
  const auditIntervalRef = useRef<number>(0);

  // News Archive
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [archiveNews, setArchiveNews] = useState<NewsArticle[]>([]);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isArchiveLoading, setIsArchiveLoading] = useState(false);

  // Academy/Education
  const [academySearch, setAcademySearch] = useState('');
  const [academyNote, setAcademyNote] = useState<{ text: string; sources: { title: string; web: string }[] } | null>(null);
  const [isAcademyLoading, setIsAcademyLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('denis_stocks_session', JSON.stringify(currentUser));
      localStorage.setItem(`portfolio_${currentUser.id}`, JSON.stringify(portfolio));
    }
  }, [currentUser, portfolio]);

  useEffect(() => {
    SecurityService.initiateEncryptedHandshake().then(() => {
      setSecurityProfile(SecurityService.getSecurityProfile());
    });
    
    // Global Auditor Loop - Intertwined System Monitoring
    auditIntervalRef.current = window.setInterval(async () => {
      if (currentUser) {
        const audit = await performGlobalAudit(stocks.slice(0, 5));
        setGlobalAudit(audit);
      }
    }, 45000); 

    return () => clearInterval(auditIntervalRef.current);
  }, [currentUser, stocks]);

  // High-speed real-time mirroring
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(stock => {
        if (stock.symbol === 'KQ' || stock.price === 0) return stock;
        const volatility = 0.0035; 
        const change = (Math.random() - 0.5) * stock.price * volatility;
        const newPrice = Math.max(0.05, stock.price + change);
        return {
          ...stock,
          price: newPrice,
          change: newPrice - stock.previousClose,
          changePercent: ((newPrice - stock.previousClose) / stock.previousClose) * 100,
          bid: newPrice - 0.02,
          ask: newPrice + 0.02,
          high: Math.max(stock.high, newPrice),
          low: Math.min(stock.low, newPrice)
        };
      }));
      setSecurityProfile(SecurityService.getSecurityProfile());
    }, 150); 
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('market');
    setHistory(['market']);
  };

  const handleLogout = () => {
    localStorage.removeItem('denis_stocks_session');
    setCurrentUser(null);
    setCurrentView('login');
  };

  const navigateTo = (view: AppView, stock: Stock | null = null) => {
    setHistory(prev => [...prev, view]);
    setCurrentView(view);
    if (stock) setSelectedStock(stock);
    setAcademySearch('');
  };

  const handleBack = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const prevView = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCurrentView(prevView);
    } else {
      setCurrentView('market');
    }
  };

  const toggleComparison = (stock: Stock) => {
    setComparisonList(prev => {
      const exists = prev.find(s => s.symbol === stock.symbol);
      if (exists) return prev.filter(s => s.symbol !== stock.symbol);
      if (prev.length >= 3) return prev;
      return [...prev, stock];
    });
  };

  const handleTrade = useCallback((tx: Transaction) => {
    setPortfolio(prev => {
      const isBuy = tx.type === 'BUY';
      const cost = tx.price * tx.quantity;
      if (isBuy && cost > prev.balance) return prev;
      const currentHoldings = prev.holdings[tx.symbol] || 0;
      if (!isBuy && currentHoldings < tx.quantity) return prev;
      const newHoldings = { ...prev.holdings };
      newHoldings[tx.symbol] = isBuy ? currentHoldings + tx.quantity : currentHoldings - tx.quantity;
      if (newHoldings[tx.symbol] <= 0) delete newHoldings[tx.symbol];
      return {
        ...prev,
        balance: isBuy ? prev.balance - cost : prev.balance + cost,
        holdings: newHoldings,
        history: [tx, ...prev.history]
      };
    });
  }, []);

  const fetchArchive = async (date: string) => {
    setIsArchiveLoading(true);
    const news = await getNewsArchive(date);
    setArchiveNews(news);
    setIsArchiveLoading(false);
  };

  const fetchEducation = async () => {
    if (!academySearch) return;
    setIsAcademyLoading(true);
    const result = await getEducationalNotes(academySearch);
    setAcademyNote(result);
    setIsAcademyLoading(false);
    setAcademySearch(''); 
  };

  const renderContent = () => {
    switch(currentView) {
      case 'market':
        return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 relative">
            {globalAudit && globalAudit.status !== 'HEALTHY' && (
              <div className="p-8 bg-rose-600/20 border border-rose-500/50 rounded-[2.5rem] flex items-center gap-8 animate-pulse shadow-2xl backdrop-blur-md">
                <i className="fas fa-radiation text-rose-500 text-5xl"></i>
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase text-rose-400 tracking-[0.5em] mb-2">CRITICAL AUDITOR ALERT</p>
                  <p className="text-white font-bold text-xl leading-tight">{globalAudit.message}</p>
                </div>
                <button onClick={() => setGlobalAudit(null)} className="text-rose-500 hover:text-white transition-colors"><i className="fas fa-times-circle text-2xl"></i></button>
              </div>
            )}

            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative">
               <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50 backdrop-blur-2xl">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] flex items-center gap-4">
                    <i className="fas fa-microchip text-blue-500"></i>
                    SYNCHRONIZED KERNEL V5.2
                  </h3>
               </div>
               <Ticker stocks={stocks} news={BREAKING_NEWS} />
            </div>

            <section className="space-y-10">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-900/40">
                    <i className="fas fa-robot text-white text-2xl"></i>
                 </div>
                 <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">AI Quantum Picks</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Deep Intelligence Layer 1</p>
                 </div>
              </div>
              <MarketGrid 
                stocks={stocks.filter(s => s.isAIPick)} 
                onSelectStock={(s) => navigateTo('details', s)} 
                comparisonList={comparisonList}
                onToggleCompare={toggleComparison}
              />
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-5">
                 <div className="w-14 h-14 bg-slate-800 rounded-[1.5rem] flex items-center justify-center border border-slate-700">
                    <i className="fas fa-list-ul text-slate-400 text-2xl"></i>
                 </div>
                 <div>
                    <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Global NSE Counters</h2>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Full Synchronous Security Board</p>
                 </div>
              </div>
              <StockTable 
                stocks={stocks} 
                onSelectStock={(s) => navigateTo('details', s)} 
                onTrade={(s, t) => { setSelectedStock(s); navigateTo('details', s); }}
                comparisonList={comparisonList}
                onToggleCompare={toggleComparison}
              />
            </section>
          </div>
        );

      case 'details':
        if (!selectedStock) return null;
        return (
          <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 p-12 bg-slate-900 border border-slate-800 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
               <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                     <span className="bg-blue-600 text-[10px] font-black text-white px-5 py-2 rounded-full uppercase tracking-widest">Secured Security Feed</span>
                  </div>
                  <h1 className="text-6xl font-black text-white mb-6 tracking-tighter">{selectedStock.name}</h1>
                  <div className="flex items-center gap-12">
                     <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Live Valuation</span>
                        <span className="text-5xl font-mono font-bold text-white">KES {selectedStock.price.toFixed(2)}</span>
                     </div>
                     <div className={`px-6 py-4 rounded-3xl border ${selectedStock.change >= 0 ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                        <p className="text-[10px] font-black uppercase tracking-widest mb-1">Day Variance</p>
                        <p className="text-3xl font-bold font-mono">{selectedStock.changePercent.toFixed(2)}%</p>
                     </div>
                  </div>
               </div>
               <div className="flex flex-col sm:flex-row gap-5 relative z-10">
                  <button onClick={() => navigateTo('analysis')} className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-[1.8rem] font-black transition-all flex items-center gap-4 uppercase text-xs shadow-2xl shadow-blue-900/40">
                    <i className="fas fa-brain text-lg"></i> AI PROBE
                  </button>
                  <button onClick={() => navigateTo('historical')} className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-[1.8rem] font-black transition-all flex items-center gap-4 uppercase text-xs border border-slate-700">
                    <i className="fas fa-history"></i> HISTORICAL VIEW
                  </button>
               </div>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
               <div className="xl:col-span-2">
                  <BrokerageDisplay stock={selectedStock} />
               </div>
               <div className="xl:col-span-1">
                  <VirtualTrading stock={selectedStock} portfolio={portfolio} onTrade={handleTrade} />
               </div>
            </div>
          </div>
        );

      case 'analysis':
        return selectedStock ? <StockAnalysis stock={selectedStock} /> : navigateTo('market');

      case 'historical':
        return selectedStock ? <HistoricalView stock={selectedStock} /> : navigateTo('market');

      case 'brokerage':
        return (
          <div className="space-y-12 animate-in fade-in duration-1000">
            <div className="flex justify-between items-end">
               <div>
                  <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Brokerage Terminal</h1>
                  <p className="text-slate-500 mt-2 font-medium">Real-time Order Book Depth Across Active Counters</p>
               </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
               {stocks.slice(0, 10).map(s => <BrokerageDisplay key={s.symbol} stock={s} />)}
            </div>
          </div>
        );

      case 'academy':
        return (
          <div className="space-y-16 animate-in fade-in duration-1000 pb-20">
             <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-8xl font-black text-white mb-6 tracking-tighter uppercase leading-[0.75]">Academy IQ</h1>
                <p className="text-slate-400 text-2xl font-medium">Business Daily Archives & Market Intelligence Terminal</p>
             </div>

             <div className="max-w-4xl mx-auto space-y-12">
                <div className="flex gap-5">
                   <div className="flex-1 relative">
                     <i className="fas fa-search absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 text-2xl"></i>
                     <input 
                       type="text" 
                       value={academySearch}
                       onChange={(e) => setAcademySearch(e.target.value)}
                       placeholder="Lesson Topic (Short Selling, Dividends, Bear Market...)"
                       className="w-full bg-slate-900 border border-slate-800 rounded-[2.5rem] pl-20 pr-10 py-8 text-white font-bold text-xl focus:ring-4 focus:ring-blue-600/20 transition-all shadow-2xl outline-none"
                     />
                   </div>
                   <button 
                     onClick={fetchEducation}
                     disabled={isAcademyLoading}
                     className="px-14 py-8 bg-blue-600 hover:bg-blue-500 text-white rounded-[2.5rem] font-black transition-all flex items-center gap-4 shadow-2xl shadow-blue-900/40 uppercase text-xs"
                   >
                     {isAcademyLoading ? <CircularLoader size="sm" /> : <i className="fas fa-brain text-2xl"></i>}
                     AI PROBE
                   </button>
                </div>

                {academyNote && (
                  <div className="p-14 bg-slate-900 border-l-8 border-l-blue-600 border border-slate-800 rounded-[4rem] shadow-2xl animate-in slide-in-from-bottom-12">
                     <div className="flex justify-between items-center mb-12">
                        <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Terminal Lesson Vector #821</span>
                        <button onClick={() => setAcademyNote(null)} className="text-slate-500 hover:text-white transition-colors"><i className="fas fa-times-circle text-3xl"></i></button>
                     </div>
                     <div className="text-slate-200 leading-[1.8] whitespace-pre-wrap text-2xl font-medium mb-12">
                        {academyNote.text}
                     </div>
                  </div>
                )}
             </div>

             {/* Business Daily News Archive - Mandatory Restoration */}
             <div className="space-y-12 bg-slate-900 border border-slate-800 p-16 rounded-[4.5rem] shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-12">
                   <div>
                      <h2 className="text-5xl font-black text-white flex items-center gap-6 tracking-tighter uppercase">
                        <i className="fas fa-newspaper text-blue-500"></i> Business Daily Archive
                      </h2>
                      <p className="text-slate-500 mt-2 font-medium">Historical Market Context AI-Reader</p>
                   </div>
                   <div className="flex gap-5 w-full md:w-auto">
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="flex-1 md:flex-none bg-slate-800 text-white px-6 py-4 rounded-2xl border border-slate-700 outline-none font-bold" />
                      <button onClick={() => fetchArchive(selectedDate)} className="bg-blue-600 px-10 py-4 rounded-2xl font-black text-white text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/30">Sync Archive</button>
                   </div>
                </div>
                {isArchiveLoading ? (
                   <div className="py-32 flex flex-col items-center gap-10">
                      <CircularLoader size="lg" />
                   </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                     {archiveNews.map((news) => (
                       <div key={news.id} onClick={() => { setActiveArticle(news); navigateTo('news-reader'); }} className="group bg-slate-950 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-blue-500/50 transition-all cursor-pointer shadow-xl">
                          <img src={news.image} alt="" className="w-full h-64 object-cover" />
                          <div className="p-10">
                             <h4 className="font-black text-2xl text-white mb-6 line-clamp-2 leading-tight">{news.headline}</h4>
                             <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed mb-6 font-medium">{news.summary}</p>
                          </div>
                       </div>
                     ))}
                  </div>
                )}
             </div>
          </div>
        );

      case 'news-reader':
        if (!activeArticle) return null;
        return (
          <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-[4rem] overflow-hidden shadow-2xl animate-in fade-in duration-500">
             <div className="relative h-[600px]">
                <img src={activeArticle.image} alt="" className="w-full h-full object-cover" />
                <button onClick={handleBack} className="absolute top-10 left-10 w-16 h-16 bg-black/50 backdrop-blur-2xl rounded-full flex items-center justify-center text-white"><i className="fas fa-arrow-left text-xl"></i></button>
                <div className="absolute bottom-16 left-16 right-16">
                   <h1 className="text-6xl font-black text-white leading-tight tracking-tighter">{activeArticle.headline}</h1>
                </div>
             </div>
             <div className="p-16">
                <div className="text-slate-200 text-2xl leading-[1.8] font-medium whitespace-pre-wrap">{activeArticle.content}</div>
             </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-14 bg-blue-600 rounded-[4rem] shadow-2xl text-white relative overflow-hidden group">
                <p className="text-[11px] uppercase font-black tracking-[0.5em] opacity-80 mb-6">Secured Liquidity</p>
                <h3 className="text-6xl font-black font-mono tracking-tighter">KES {portfolio.balance.toLocaleString()}</h3>
              </div>
              <div className="p-14 bg-slate-900 border border-slate-800 rounded-[4rem] shadow-xl relative group">
                <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.5em] mb-6">Asset Evaluation</p>
                <h3 className="text-6xl font-black font-mono text-white tracking-tighter">
                  KES {Object.entries(portfolio.holdings).reduce((acc: number, [sym, qty]) => acc + (Number(qty) * (stocks.find(s => s.symbol === sym)?.price || 0)), 0).toLocaleString()}
                </h3>
              </div>
              <div className="p-14 bg-slate-900 border border-slate-800 rounded-[4rem] shadow-xl relative group">
                <p className="text-[11px] text-slate-500 uppercase font-black tracking-[0.5em] mb-6">Performance Matrix</p>
                <h3 className="text-6xl font-black font-mono text-emerald-500 tracking-tighter">+1.24%</h3>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
             <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">Security Matrix</h1>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="p-12 bg-slate-900 border border-slate-800 rounded-[3.5rem]">
                   <h3 className="text-blue-500 font-black mb-10 uppercase tracking-[0.5em]">Kernel Status</h3>
                   <div className="space-y-4 font-mono text-xs text-slate-500">
                      <p>[OK] DNS Handshake... PASSED</p>
                      <p>[SEC] SSL Certificate Valid</p>
                      <p>[P2P] Tunnel: {securityProfile.encryption}</p>
                   </div>
                </div>
             </div>
          </div>
        );

      default: return null;
    }
  };

  if (!currentUser) {
    return <Auth onLogin={handleLogin} onNavigate={setCurrentView} currentView={currentView} />;
  }

  return (
    <Layout currentUser={currentUser} currentView={currentView} setView={navigateTo} onBack={handleBack} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
