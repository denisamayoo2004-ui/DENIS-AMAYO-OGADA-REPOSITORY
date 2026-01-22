
import React, { useState } from 'react';
import { Stock, UserPortfolio, Transaction } from '../types';

interface VirtualTradingProps {
  stock: Stock;
  portfolio: UserPortfolio;
  onTrade: (transaction: Transaction) => void;
}

const VirtualTrading: React.FC<VirtualTradingProps> = ({ stock, portfolio, onTrade }) => {
  const [amount, setAmount] = useState<number>(0);
  const userHoldings = portfolio.holdings[stock.symbol] || 0;
  const totalCost = amount * stock.price;

  const handleBuy = () => {
    if (amount <= 0) return;
    if (totalCost > portfolio.balance) {
      alert("Insufficient funds in virtual wallet.");
      return;
    }
    const tx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      symbol: stock.symbol,
      type: 'BUY',
      quantity: amount,
      price: stock.price
    };
    onTrade(tx);
    setAmount(0);
  };

  const handleSell = () => {
    if (amount <= 0) return;
    if (amount > userHoldings) {
      alert("You don't own that many shares.");
      return;
    }
    const tx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      symbol: stock.symbol,
      type: 'SELL',
      quantity: amount,
      price: stock.price
    };
    onTrade(tx);
    setAmount(0);
  };

  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h3 className="text-lg font-bold text-white mb-1">Execute Trade</h3>
           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Virtual Terminal</p>
        </div>
        <div className="text-right">
           <p className="text-xs text-slate-400 uppercase font-bold tracking-widest">Balance</p>
           <p className="text-xl font-mono font-bold text-blue-500">KES {portfolio.balance.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
           <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-slate-400">Order Quantity</span>
              <span className="text-slate-500">Max: {Math.floor(portfolio.balance / stock.price).toLocaleString()} Shares</span>
           </div>
           <div className="relative">
              <input 
                type="number" 
                value={amount || ''} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-4 text-2xl font-mono text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold uppercase tracking-widest text-xs">Shares</span>
           </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
           <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-slate-400 uppercase font-bold">Price per Share</span>
              <span className="text-sm font-mono text-white">KES {stock.price.toFixed(2)}</span>
           </div>
           <div className="flex justify-between items-center border-t border-slate-700 pt-3">
              <span className="text-xs text-slate-400 uppercase font-bold">Total Estimated Cost</span>
              <span className="text-lg font-mono font-bold text-white">KES {totalCost.toLocaleString()}</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button 
             onClick={handleBuy}
             disabled={amount <= 0}
             className="py-4 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20"
           >
              Buy {stock.symbol}
           </button>
           <button 
             onClick={handleSell}
             disabled={amount <= 0 || amount > userHoldings}
             className="py-4 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-900/20"
           >
              Sell {stock.symbol}
           </button>
        </div>

        <div className="mt-4 text-center">
           <p className="text-xs text-slate-500">
              Current Holding: <span className="font-bold text-white font-mono">{userHoldings.toLocaleString()} Shares</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default VirtualTrading;
