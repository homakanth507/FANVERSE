import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onCreateClick: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  onCreateClick,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0c0e16]/95 backdrop-blur-lg border-t border-[#1b2136] px-3 py-2 flex items-center justify-around max-w-lg mx-auto">
      {/* Home / Sports */}
      <button
        onClick={() => onNavigate('sports')}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'sports'
            ? 'text-[#ff5733]'
            : 'text-[#ab8982] hover:text-[#e2e1ee]'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">home</span>
        <span className="font-space text-[10px] font-bold tracking-wider uppercase">
          Home
        </span>
      </button>

      {/* Discover / Movies */}
      <button
        onClick={() => onNavigate('movies')}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'movies' || currentScreen === 'movie-chrono'
            ? 'text-[#ff5733]'
            : 'text-[#ab8982] hover:text-[#e2e1ee]'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">explore</span>
        <span className="font-space text-[10px] font-bold tracking-wider uppercase">
          Discover
        </span>
      </button>

      {/* Center Create Button (+) */}
      <button
        onClick={onCreateClick}
        className="relative -top-3 w-12 h-12 rounded-full bg-gradient-to-tr from-[#ff5733] to-[#ff9800] text-white flex items-center justify-center shadow-lg shadow-[#ff5733]/40 hover:scale-105 active:scale-95 transition-transform"
        aria-label="Create Post or Prediction"
      >
        <span className="material-symbols-outlined text-2xl font-bold">add</span>
      </button>

      {/* Live Match Center */}
      <button
        onClick={() => onNavigate('match-live')}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all relative ${
          currentScreen === 'match-live'
            ? 'text-[#00e475]'
            : 'text-[#ab8982] hover:text-[#e2e1ee]'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">sensors</span>
        <span className="font-space text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
          Live
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e475] animate-ping"></span>
        </span>
      </button>

      {/* Profile */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all ${
          currentScreen === 'profile'
            ? 'text-[#ff5733]'
            : 'text-[#ab8982] hover:text-[#e2e1ee]'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">account_circle</span>
        <span className="font-space text-[10px] font-bold tracking-wider uppercase">
          Profile
        </span>
      </button>
    </nav>
  );
};
