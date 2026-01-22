
import React from 'react';
import { Stock } from '../types';

interface MarketGridProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  comparisonList?: Stock[];
  onToggleCompare?: (stock: Stock) => void;
}

const MarketGrid: React.FC<MarketGridProps> = ({ stocks, onSelectStock, comparisonList = [], onToggleCompare }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {stocks.map((stock) => {
        const isComparing = comparisonList.some(s => s.symbol === stock.symbol);
        return (
          <div 
            key={stock.symbol}
            className={`group p-5 bg-slate-900/50 border rounded-2xl hover:bg-slate-800/80 transition-all cursor-pointer shadow-sm relative overflow-hidden ${
              isComparing ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-slate-800 hover:border-blue-500/50'
            }`}
          >
            <div 
              onClick={() => onSelectStock(stock)}
              className="absolute inset-0 z-0"
            ></div>
            
            <div className="relative z-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{stock.symbol}</h3>
                  <p className="text-xs text-slate-500 font-medium truncate w-40">{stock.name}</p>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  stock.change >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-2xl font-mono font-bold text-white tracking-tight">
                    KES {stock.price.toFixed(2)}
                  </span>
                  <span className={`text-xs font-medium ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Volume</p>
                  <p className="text-xs font-mono font-medium text-slate-300">
                    {(stock.volume / 1000).toFixed(0)}K
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800/50 flex justify-between items-center relative z-20">
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelectStock(stock); }}
                  className="text-xs text-blue-400 font-semibold flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  Analyze <i className="fas fa-chart-line text-[10px]"></i>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleCompare?.(stock); }}
                  className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border ${
                    isComparing 
                      ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-900/30' 
                      : 'bg-slate-800/50 text-slate-500 border-slate-700 hover:text-blue-400 hover:border-blue-500/30'
                  }`}
                >
                  {isComparing ? 'Comparing' : 'Compare'}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketGrid;
