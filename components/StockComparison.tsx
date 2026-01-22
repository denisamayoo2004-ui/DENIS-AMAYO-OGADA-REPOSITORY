
import React from 'react';
import { Stock, Recommendation } from '../types';

interface StockComparisonProps {
  selectedStocks: Stock[];
  onRemove: (symbol: string) => void;
  onSelect: (stock: Stock) => void;
}

const StockComparison: React.FC<StockComparisonProps> = ({ selectedStocks, onRemove, onSelect }) => {
  if (selectedStocks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-40 bg-slate-900/30 border border-slate-800 rounded-[3rem]">
        <i className="fas fa-layer-group text-6xl text-slate-800 mb-6"></i>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Comparison Tray Empty</h3>
        <p className="text-slate-500 mt-2 font-medium">Select up to 3 stocks from the market board to compare.</p>
      </div>
    );
  }

  const metrics = [
    { label: 'Current Price', key: 'price', format: (v: number) => `KES ${v.toFixed(2)}` },
    { label: 'Day Change', key: 'changePercent', format: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(2)}%` },
    { label: 'Market Volume', key: 'volume', format: (v: number) => `${(v / 1000).toLocaleString()}K` },
    { label: 'Day High', key: 'high', format: (v: number) => `KES ${v.toFixed(2)}` },
    { label: 'Day Low', key: 'low', format: (v: number) => `KES ${v.toFixed(2)}` },
    { label: '52-Week High', key: 'high52', format: (v: number) => `KES ${v.toFixed(2)}` },
    { label: '52-Week Low', key: 'low52', format: (v: number) => `KES ${v.toFixed(2)}` },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Security Comparison</h2>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">Multi-Asset Correlation Matrix</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="p-8 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest bg-slate-950/30 w-1/4">Metric</th>
                {selectedStocks.map((stock) => (
                  <th key={stock.symbol} className="p-8 text-center bg-slate-900 relative group">
                    <button 
                      onClick={() => onRemove(stock.symbol)}
                      className="absolute top-4 right-4 text-slate-600 hover:text-rose-500 transition-colors"
                    >
                      <i className="fas fa-times-circle"></i>
                    </button>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-2xl font-black text-white tracking-tighter">{stock.symbol}</span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase truncate max-w-[150px]">{stock.name}</span>
                      <button 
                        onClick={() => onSelect(stock)}
                        className="mt-2 text-[8px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
                      >
                        Deep Dive <i className="fas fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </th>
                ))}
                {Array.from({ length: 3 - selectedStocks.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-8 text-center bg-slate-900/50">
                    <div className="flex flex-col items-center justify-center py-4 border-2 border-dashed border-slate-800 rounded-2xl">
                       <i className="fas fa-plus text-slate-800 mb-2"></i>
                       <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest">Available Slot</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {metrics.map((m) => (
                <tr key={m.label} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-950/10 border-r border-slate-800 group-hover:text-white transition-colors">
                    {m.label}
                  </td>
                  {selectedStocks.map((stock) => {
                    const value = stock[m.key as keyof Stock];
                    const isPercentage = m.key === 'changePercent';
                    return (
                      <td key={`${stock.symbol}-${m.label}`} className="p-6 text-center">
                        <span className={`text-sm font-mono font-bold ${
                          isPercentage ? (value >= 0 ? 'text-emerald-500' : 'text-rose-500') : 'text-white'
                        }`}>
                          {m.format(value as number)}
                        </span>
                      </td>
                    );
                  })}
                  {Array.from({ length: 3 - selectedStocks.length }).map((_, i) => (
                    <td key={`empty-cell-${i}`} className="p-6 bg-slate-900/10"></td>
                  ))}
                </tr>
              ))}
              {/* AI Insight Placeholder */}
              <tr className="bg-blue-600/5">
                <td className="p-6 text-[10px] font-black text-blue-400 uppercase tracking-widest border-r border-slate-800">
                   AI Recommendation
                </td>
                {selectedStocks.map((stock) => (
                   <td key={`${stock.symbol}-rec`} className="p-6 text-center">
                      <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        stock.isAIPick ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                         {stock.isAIPick ? 'STRONG BUY' : 'HOLD'}
                      </div>
                   </td>
                ))}
                {Array.from({ length: 3 - selectedStocks.length }).map((_, i) => (
                  <td key={`empty-rec-${i}`} className="p-6"></td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center gap-6">
            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500">
               <i className="fas fa-microchip"></i>
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Correlation</p>
               <p className="text-xl font-black text-white">0.82 High</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center gap-6">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
               <i className="fas fa-bolt"></i>
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Volatility Check</p>
               <p className="text-xl font-black text-white">Stable</p>
            </div>
         </div>
         <div className="p-8 bg-slate-900 border border-slate-800 rounded-[2rem] flex items-center gap-6">
            <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500">
               <i className="fas fa-triangle-exclamation"></i>
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Risk Rating</p>
               <p className="text-xl font-black text-white">B+ Balanced</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default StockComparison;
