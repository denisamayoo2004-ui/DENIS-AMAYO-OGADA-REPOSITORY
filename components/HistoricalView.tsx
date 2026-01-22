
import React from 'react';
import { Stock } from '../types';

interface HistoricalViewProps {
  stock: Stock;
}

const HistoricalView: React.FC<HistoricalViewProps> = ({ stock }) => {
  // Mocking historical data points if none exist
  const history = stock.history || Array.from({ length: 15 }).map((_, i) => ({
    date: new Date(Date.now() - (15 - i) * 86400000).toLocaleDateString(),
    price: stock.price * (0.95 + Math.random() * 0.1),
    volume: stock.volume * (0.5 + Math.random())
  }));

  const maxPrice = Math.max(...history.map(h => h.price));
  const minPrice = Math.min(...history.map(h => h.price));
  const range = maxPrice - minPrice;

  return (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Historical Timeline</h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mt-1">Nairobi Securities Exchange Archive: {stock.symbol}</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Session High</p>
           <p className="text-2xl font-mono font-bold text-white">KES {maxPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="p-10 bg-slate-900 border border-slate-800 rounded-[3rem] shadow-2xl overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/5 to-transparent"></div>
        
        {/* Simple SVG Chart */}
        <div className="relative h-64 flex items-end gap-2 w-full">
           <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <path 
                d={`M ${history.map((h, i) => `${(i / (history.length - 1)) * 1000},${100 - ((h.price - minPrice) / range) * 100}`).join(' L ')}`} 
                className="fill-none stroke-blue-500 stroke-[3] transition-all duration-1000"
                style={{ strokeDasharray: '2000', strokeDashoffset: '0' }}
                vectorEffect="non-scaling-stroke"
              />
              <path 
                d={`M 0,100 L ${history.map((h, i) => `${(i / (history.length - 1)) * 1000},${100 - ((h.price - minPrice) / range) * 100}`).join(' L ')} L 1000,100 Z`}
                className="fill-blue-500/10"
                vectorEffect="non-scaling-stroke"
              />
           </svg>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 border-t border-slate-800 pt-8">
           {history.slice(-5).map((h, i) => (
             <div key={i} className="text-center p-4 bg-slate-950/40 rounded-2xl border border-slate-800">
                <p className="text-[9px] text-slate-500 font-black uppercase mb-1">{h.date}</p>
                <p className="text-lg font-mono font-bold text-white">KES {h.price.toFixed(2)}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h4 className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4">52-Week Spectrum</h4>
            <div className="h-2 w-full bg-slate-950 rounded-full relative overflow-hidden mb-4">
               <div className="absolute top-0 h-full bg-blue-600 rounded-full" style={{ left: '20%', width: '60%' }}></div>
               <div className="absolute top-0 w-1 h-full bg-white z-10 shadow-[0_0_10px_white]" style={{ left: `${((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100}%` }}></div>
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
               <span>KES {stock.low52.toFixed(2)}</span>
               <span>KES {stock.high52.toFixed(2)}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HistoricalView;
