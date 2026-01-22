
import React from 'react';
import { Stock } from '../types';

interface StockTableProps {
  stocks: Stock[];
  onSelectStock: (stock: Stock) => void;
  onTrade: (stock: Stock, type: 'BUY' | 'SELL') => void;
  comparisonList?: Stock[];
  onToggleCompare?: (stock: Stock) => void;
}

const StockTable: React.FC<StockTableProps> = ({ stocks, onSelectStock, onTrade, comparisonList = [], onToggleCompare }) => {
  return (
    <div className="w-full overflow-hidden bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-800/50 text-[10px] text-slate-400 uppercase font-black tracking-widest border-b border-slate-700">
              <th className="px-6 py-4">Counter</th>
              <th className="px-6 py-4">Security Name</th>
              <th className="px-6 py-4 text-right">Price (KES)</th>
              <th className="px-6 py-4 text-right">Change</th>
              <th className="px-6 py-4 text-right">Volume</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/50">
            {stocks.map((stock, i) => {
              const isComparing = comparisonList.some(s => s.symbol === stock.symbol);
              return (
                <tr 
                  key={stock.symbol} 
                  className={`group transition-colors ${
                    isComparing ? 'bg-blue-600/10' : 'hover:bg-blue-600/5'
                  } ${i % 2 === 0 ? (isComparing ? 'bg-blue-600/10' : 'bg-slate-900') : (isComparing ? 'bg-blue-600/5' : 'bg-slate-900/30')}`}
                >
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => onSelectStock(stock)}
                      className="font-black text-white group-hover:text-blue-400 transition-colors"
                    >
                      {stock.symbol}
                    </button>
                    {stock.isAIPick && (
                      <span className="ml-2 bg-blue-600 text-[8px] text-white px-1 rounded uppercase font-black">AI PICK</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm truncate max-w-[200px]">{stock.name}</td>
                  <td className="px-6 py-4 text-right font-mono font-bold text-white">{stock.price.toFixed(2)}</td>
                  <td className={`px-6 py-4 text-right font-mono font-bold text-sm ${stock.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {stock.change >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                  <td className="px-6 py-4 text-right text-slate-500 text-xs">{(stock.volume / 1000).toLocaleString()}K</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center items-center gap-2">
                      <button 
                        onClick={() => onTrade(stock, 'BUY')}
                        className="px-3 py-1 bg-emerald-600/10 text-emerald-500 text-[10px] font-black rounded border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all"
                      >
                        BUY
                      </button>
                      <button 
                        onClick={() => onToggleCompare?.(stock)}
                        className={`w-8 h-8 flex items-center justify-center rounded transition-all border ${
                          isComparing 
                            ? 'bg-blue-600 text-white border-blue-500' 
                            : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-blue-600/20 hover:text-blue-400'
                        }`}
                        title={isComparing ? "Remove from comparison" : "Add to comparison"}
                      >
                        <i className={`fas ${isComparing ? 'fa-check' : 'fa-layer-group'} text-xs`}></i>
                      </button>
                      <button 
                        onClick={() => onSelectStock(stock)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-800 text-slate-400 rounded hover:bg-blue-600 hover:text-white transition-all border border-slate-700"
                      >
                        <i className="fas fa-chart-line text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;
