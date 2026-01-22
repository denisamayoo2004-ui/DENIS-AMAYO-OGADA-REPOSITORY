import React, { useMemo, useState, useEffect } from 'react';
import { Stock } from '../types';

interface BrokerageDisplayProps {
  stock: Stock;
}

const BrokerageDisplay: React.FC<BrokerageDisplayProps> = ({ stock }) => {
  // Local state for the "lively" volume history
  const [volumePulse, setVolumePulse] = useState<{ buy: number; sell: number }[]>(() => 
    Array.from({ length: 30 }).map(() => ({
      buy: 20 + Math.random() * 60,
      sell: 20 + Math.random() * 60
    }))
  );

  // Simulate incoming ticks to keep the chart "alive"
  useEffect(() => {
    const interval = setInterval(() => {
      setVolumePulse(prev => {
        const next = [...prev.slice(1)];
        const sentimentBias = stock.change >= 0 ? 10 : -10;
        next.push({
          buy: Math.max(10, 30 + sentimentBias + Math.random() * 50),
          sell: Math.max(10, 30 - sentimentBias + Math.random() * 50)
        });
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [stock.symbol, stock.change]);

  const generateOrders = (base: number, size: number, count: number, direction: 'buy' | 'sell') => {
    return Array.from({ length: count }).map((_, i) => ({
      price: direction === 'buy' ? base - (i * 0.05) : base + (i * 0.05),
      size: Math.floor(size * (0.5 + Math.random())),
      broker: ['SBG', 'Dyer', 'AIB-AXYS', 'KCB Cap', 'NCBA Inv', 'Faida'][Math.floor(Math.random() * 6)],
      traders: Math.floor(Math.random() * 15) + 1
    }));
  };

  const buyOrders = useMemo(() => generateOrders(stock.bid, stock.bidSize, 12, 'buy'), [stock.symbol, stock.bid]);
  const sellOrders = useMemo(() => generateOrders(stock.ask, stock.askSize, 12, 'sell'), [stock.symbol, stock.ask]);

  const totalBuyers = useMemo(() => buyOrders.reduce((acc, o) => acc + o.traders, 0), [buyOrders]);
  const totalSellers = useMemo(() => sellOrders.reduce((acc, o) => acc + o.traders, 0), [sellOrders]);
  
  const sentiment = (totalBuyers / (totalBuyers + totalSellers)) * 100;
  const proximityThreshold = 0.15;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl transition-all hover:border-blue-500/30 group/broker">
      {/* Header with Integrated Sentiment Pulse */}
      <div className="p-8 border-b border-slate-800 bg-slate-900/80 backdrop-blur-xl flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <h3 className="font-black text-white text-lg uppercase tracking-tight">
               Brokerage Deep Probe: {stock.symbol}
            </h3>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">Live Order Aggregation Terminal v4.0</p>
        </div>

        {/* The Mini Volume Chart */}
        <div className="flex-1 flex flex-col gap-2 w-full max-w-md">
           <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Buy Velocity</span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Real-time Order Flow</span>
              <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Sell Pressure</span>
           </div>
           <div className="h-16 flex items-end gap-[1px] bg-slate-950/50 p-2 rounded-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none"></div>
              {volumePulse.map((v, i) => (
                <div key={i} className="flex flex-col gap-[1px] flex-1">
                  <div className="bg-emerald-500/40 w-full rounded-t-[1px] transition-all duration-700" style={{ height: `${v.buy * 0.4}%` }}></div>
                  <div className="bg-rose-500/40 w-full rounded-b-[1px] transition-all duration-700" style={{ height: `${v.sell * 0.4}%` }}></div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Sentiment Gauge Section */}
      <div className="px-10 py-6 bg-slate-950/20 border-b border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
             <div className="text-left">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Current Bias</p>
                <p className={`text-2xl font-mono font-black ${sentiment > 50 ? 'text-emerald-500' : 'text-rose-500'}`}>
                   {sentiment > 55 ? 'ACCUMULATION' : sentiment < 45 ? 'DISTRIBUTION' : 'NEUTRAL'}
                </p>
             </div>
          </div>
          <div className="flex gap-10">
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Bullish Intake</p>
                <p className="text-xl font-mono font-bold text-white">{sentiment.toFixed(1)}%</p>
             </div>
             <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Bearish Exhaust</p>
                <p className="text-xl font-mono font-bold text-white">{(100 - sentiment).toFixed(1)}%</p>
             </div>
          </div>
        </div>
        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden flex shadow-inner border border-slate-800">
          <div className="bg-emerald-500 h-full transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.6)]" style={{ width: `${sentiment}%` }}></div>
          <div className="bg-rose-500 h-full transition-all duration-1000 shadow-[0_0_20px_rgba(244,63,94,0.6)]" style={{ width: `${100 - sentiment}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800">
        {/* Bids Column */}
        <div className="bg-emerald-500/[0.02]">
           <div className="grid grid-cols-3 p-4 bg-emerald-500/5 text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400 border-b border-emerald-500/10">
              <span>Traders</span>
              <span className="text-right">Quantity</span>
              <span className="text-right">Bid Price</span>
           </div>
           <div className="divide-y divide-slate-800/30">
              {buyOrders.map((o, i) => {
                const isProximity = Math.abs(o.price - stock.price) <= proximityThreshold;
                const isCurrentBid = i === 0;
                return (
                  <div key={i} className={`grid grid-cols-3 px-5 py-3.5 text-xs font-mono group/row transition-all ${
                    isCurrentBid ? 'bg-emerald-500/10 border-l-4 border-emerald-500' : 
                    isProximity ? 'bg-emerald-400/5 hover:bg-emerald-500/10' : 'hover:bg-slate-800/50'
                  }`}>
                     <span className={`text-slate-500 font-bold flex items-center gap-2 ${isCurrentBid ? 'text-emerald-400' : ''}`}>
                       <span className="text-[9px] text-slate-700">#</span>{o.traders}
                     </span>
                     <span className="text-right text-slate-400">{(o.size/1000).toFixed(1)}K</span>
                     <span className={`text-right font-black ${
                       isCurrentBid ? 'text-emerald-400 text-sm scale-105' : 
                       isProximity ? 'text-emerald-300' : 'text-emerald-500'
                     }`}>
                       {o.price.toFixed(2)}
                     </span>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Asks Column */}
        <div className="bg-rose-500/[0.02]">
           <div className="grid grid-cols-3 p-4 bg-rose-500/5 text-[9px] font-black uppercase tracking-[0.2em] text-rose-400 border-b border-rose-500/10">
              <span>Ask Price</span>
              <span className="text-right">Quantity</span>
              <span className="text-right">Traders</span>
           </div>
           <div className="divide-y divide-slate-800/30">
              {sellOrders.map((o, i) => {
                const isProximity = Math.abs(o.price - stock.price) <= proximityThreshold;
                const isCurrentAsk = i === 0;
                return (
                  <div key={i} className={`grid grid-cols-3 px-5 py-3.5 text-xs font-mono group/row transition-all ${
                    isCurrentAsk ? 'bg-rose-500/10 border-r-4 border-rose-500' : 
                    isProximity ? 'bg-rose-400/5 hover:bg-rose-500/10' : 'hover:bg-slate-800/50'
                  }`}>
                     <span className={`text-rose-500 font-black ${
                       isCurrentAsk ? 'text-rose-400 text-sm scale-105' : 
                       isProximity ? 'text-rose-300' : 'text-rose-500'
                     }`}>
                       {o.price.toFixed(2)}
                     </span>
                     <span className="text-right text-slate-400">{(o.size/1000).toFixed(1)}K</span>
                     <span className={`text-right text-slate-500 font-bold flex items-center justify-end gap-2 ${isCurrentAsk ? 'text-rose-400' : ''}`}>
                        {o.traders}<span className="text-[9px] text-slate-700">#</span>
                     </span>
                  </div>
                );
              })}
           </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="p-6 bg-slate-950/40 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-600">
         <span>Exchange ID: NSE-XTRD-661</span>
         <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Connection: Stable
         </span>
         <span>Latency: 14ms</span>
      </div>
    </div>
  );
};

export default BrokerageDisplay;