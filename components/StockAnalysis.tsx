
import React, { useState, useEffect } from 'react';
import { Stock, AIAnalysis, Recommendation } from '../types';
import { analyzeStock } from '../services/geminiService';
import CircularLoader from './CircularLoader';

interface StockAnalysisProps {
  stock: Stock;
}

const StockAnalysis: React.FC<StockAnalysisProps> = ({ stock }) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        setLoading(true);
        const result = await analyzeStock(stock.symbol);
        setAnalysis(result);
      } catch (err) {
        setError('Failed to generate AI analysis.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [stock.symbol]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Denish AI Probe: ${stock.symbol}`,
          text: `AI Recommendation for ${stock.symbol}: ${analysis?.recommendation}\nRationale: ${analysis?.rationale}`,
          url: window.location.href,
        });
      } catch (e) { console.error(e); }
    } else { alert("Sharing not supported on this browser."); }
  };

  if (loading) return (
    <div className="py-40 flex flex-col items-center gap-6 animate-pulse">
       <CircularLoader size="lg" />
       <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">Quantum Computing Analysis...</p>
    </div>
  );

  if (!analysis) return (
    <div className="p-20 text-center border border-rose-500/20 rounded-[3rem] bg-rose-500/5">
       <i className="fas fa-exclamation-triangle text-rose-500 text-4xl mb-4"></i>
       <h3 className="text-white font-black uppercase">Probe Failed</h3>
       <p className="text-slate-500 mt-2">The AI terminal was unable to link with the exchange node.</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 no-print">
        <div className="flex items-center gap-4">
           <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
              <i className="fas fa-brain text-white"></i>
           </div>
           <div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter">AI Analysis Hub</h2>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Deep Intelligence Layer V5</p>
           </div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => window.print()} className="flex-1 md:flex-none px-8 py-3 bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">
            <i className="fas fa-print mr-2"></i> Print Report
          </button>
          <button onClick={handleShare} className="flex-1 md:flex-none px-8 py-3 bg-blue-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-900/30">
            <i className="fas fa-share-alt mr-2"></i> Share Intelligence
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
        {/* Recommendation & Sentiment Chart */}
        <div className="xl:col-span-3 space-y-10">
           <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-blue-600/10"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-10 relative z-10">
                 <div className="flex-1">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Market Consensus Vector</p>
                    <div className="flex items-center gap-6 mb-6">
                       <h1 className={`text-7xl font-black tracking-tighter leading-none ${
                         analysis.recommendation.includes('BUY') ? 'text-emerald-500' : 
                         analysis.recommendation.includes('SELL') ? 'text-rose-500' : 'text-amber-500'
                       }`}>
                          {analysis.recommendation}
                       </h1>
                       <div className="w-px h-16 bg-slate-800"></div>
                       <div>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Confidence</p>
                          <p className="text-2xl font-mono font-bold text-white">{(analysis.technicalScore + analysis.fundamentalScore) / 2}%</p>
                       </div>
                    </div>
                    <p className="text-slate-200 text-xl leading-relaxed font-medium mb-10 pl-6 border-l-4 border-blue-600">
                       {analysis.rationale}
                    </p>
                 </div>

                 {/* Sentiment Radar Chart */}
                 <div className="w-full md:w-64 flex flex-col items-center">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-6">AI Sentiment Pulse</p>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                       <svg className="w-full h-full transform -rotate-90">
                          <circle cx="80" cy="80" r="70" className="stroke-slate-800 fill-none stroke-[12]" />
                          <circle 
                            cx="80" cy="80" r="70" 
                            className={`fill-none stroke-[12] transition-all duration-1000 ${analysis.sentimentScore >= 0 ? 'stroke-emerald-500' : 'stroke-rose-500'}`}
                            strokeDasharray="440"
                            strokeDashoffset={440 - (440 * Math.abs(analysis.sentimentScore)) / 100}
                            strokeLinecap="round"
                          />
                       </svg>
                       <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <span className="text-3xl font-black text-white">{analysis.sentimentScore}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase">Points</span>
                       </div>
                    </div>
                    <div className="mt-6 flex gap-2 h-8 items-end">
                       {analysis.sentimentHistory.map((v, i) => (
                         <div key={i} className={`w-3 rounded-full ${v >= 0 ? 'bg-emerald-500/50' : 'bg-rose-500/50'}`} style={{ height: `${Math.max(20, Math.abs(v))}%` }}></div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Indicators & Pattern Matrix */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem]">
                 <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
                    <i className="fas fa-wave-square text-blue-500"></i> Technical Indicator Toolkit
                 </h3>
                 <div className="space-y-4">
                    {analysis.technicalIndicators.map((ti, i) => (
                       <div key={i} className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                          <div>
                             <p className="text-[10px] text-slate-500 font-black uppercase">{ti.name}</p>
                             <p className="text-white font-bold">{ti.value}</p>
                          </div>
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            ti.signal === 'Bullish' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                            ti.signal === 'Bearish' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                             {ti.signal}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem]">
                 <h3 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8 flex items-center gap-3">
                    <i className="fas fa-shapes text-emerald-500"></i> Pattern Recognition Hub
                 </h3>
                 <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-6">
                    <p className="text-slate-300 italic text-sm leading-relaxed">
                       {analysis.patternAnalysis}
                    </p>
                 </div>
                 <div className="p-6 bg-blue-600/5 border border-blue-500/20 rounded-2xl">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-2">Toolkit Refinement Recommendation</p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                       {analysis.toolkitRefinement}
                    </p>
                 </div>
              </div>
           </div>
        </div>

        {/* Action sidebar */}
        <div className="space-y-10">
           <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2.5rem] shadow-xl">
              <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-8">Risk & Benefit Matrix</h3>
              <div className="space-y-10">
                 <div className="space-y-4">
                    <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Competitive Advantages</p>
                    {analysis.benefits.map((b, i) => (
                       <div key={i} className="flex gap-4 text-xs font-medium text-slate-300">
                          <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                          <span>{b}</span>
                       </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <p className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Market Threats</p>
                    {analysis.risks.map((r, i) => (
                       <div key={i} className="flex gap-4 text-xs font-medium text-slate-300">
                          <i className="fas fa-exclamation-circle text-rose-500 mt-0.5"></i>
                          <span>{r}</span>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl shadow-blue-900/40">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-4">Immediate Protocol</p>
              <p className="text-2xl font-black leading-tight uppercase tracking-tighter mb-6">{analysis.suggestedAction}</p>
              <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/20">
                 <i className="fas fa-clock"></i>
                 <span className="text-[10px] font-black uppercase tracking-widest">Horizon: {analysis.horizon}</span>
              </div>
           </div>
        </div>
      </div>

      {/* Grounding References */}
      {analysis.sources.length > 0 && (
        <div className="p-8 bg-slate-950/40 border border-slate-800 rounded-[2.5rem] animate-in fade-in duration-1000">
           <h3 className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em] mb-8">Grounding Verification Data</h3>
           <div className="flex flex-wrap gap-4">
              {analysis.sources.map((s, i) => (
                <a 
                  key={i} 
                  href={s.web} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-[10px] font-black rounded-xl transition-all border border-slate-800 flex items-center gap-3 uppercase shadow-lg group"
                >
                  <i className="fas fa-link text-[8px] text-blue-500 group-hover:scale-125 transition-transform"></i>
                  {s.title}
                </a>
              ))}
           </div>
        </div>
      )}
    </div>
  );
};

export default StockAnalysis;
