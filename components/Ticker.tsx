
import React from 'react';
import { Stock } from '../types';

interface TickerProps {
  stocks: Stock[];
  news?: string[];
}

const Ticker: React.FC<TickerProps> = ({ stocks, news }) => {
  // Triple the items to ensure the gap isn't visible during fast loops
  const stockItems = [...stocks, ...stocks, ...stocks];
  const newsItems = news ? [...news, ...news, ...news] : [];

  return (
    <div className="space-y-px overflow-hidden no-print">
      <div className="w-full bg-slate-950/80 border-b border-slate-800 py-3 select-none relative">
        <div className="flex animate-ticker-scroll whitespace-nowrap gap-10 items-center">
          {stockItems.map((stock, i) => (
            <div key={`${stock.symbol}-${i}`} className="flex items-center gap-4 px-4 py-1 rounded-lg border border-slate-800/50 bg-slate-900/30">
              <span className="font-black text-white tracking-tighter text-xs uppercase">{stock.symbol}</span>
              <span className="font-mono text-blue-500 font-black text-xs">{stock.price.toFixed(2)}</span>
              <span className={`text-[10px] font-black ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.changePercent).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-ticker-scroll {
          animation: ticker-scroll 25s linear infinite;
        }
        .animate-ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default Ticker;
