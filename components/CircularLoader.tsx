
import React from 'react';

const CircularLoader: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-20 h-20' : 'w-12 h-12';
  
  return (
    <div className={`relative ${dimensions}`}>
      <div className="absolute inset-0 border-4 border-blue-500/10 rounded-full"></div>
      {/* Increased spin speed */}
      <div className="absolute inset-0 border-4 border-t-blue-500 rounded-full animate-spin [animation-duration:0.6s]"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default CircularLoader;
