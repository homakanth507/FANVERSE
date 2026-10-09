import React from 'react';
import { ASSETS } from '../assets/images';
import { useFirebase } from '../context/FirebaseContext';

interface HeaderProps {
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onProfileClick?: () => void;
  fanPoints: number;
}

export const Header: React.FC<HeaderProps> = ({
  onSearchClick,
  onNotificationsClick,
  onProfileClick,
  fanPoints,
}) => {
  const { user, login } = useFirebase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-[#11131b]/95 backdrop-blur-md border-b border-[#1b2136]">
      {/* Brand Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff5733] to-[#ff9800] flex items-center justify-center shadow-lg shadow-[#ff5733]/20">
          <span className="material-symbols-outlined text-white text-xl">local_fire_department</span>
        </div>
        <div className="flex flex-col">
          <span className="font-space font-bold text-lg tracking-wider text-white leading-tight">
            FANVERSE
          </span>
          <span className="text-[9px] font-space tracking-widest text-[#00e475] uppercase font-semibold">
            Live Pulse
          </span>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5">
        {/* FanPoints Chip */}
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1d1f28] border border-[#2b3555] cursor-pointer hover:border-[#ff5733] transition-colors"
          title="Your FanPoints"
        >
          <span className="material-symbols-outlined text-sm text-[#ff9800]">token</span>
          <span className="font-space text-xs font-bold text-[#ffdad3]">
            {fanPoints.toLocaleString()}
          </span>
        </div>

        {/* Search */}
        <button
          onClick={onSearchClick}
          className="w-9 h-9 rounded-full bg-[#1d1f28] flex items-center justify-center text-[#e2e1ee] hover:bg-[#282a32] hover:text-[#ff5733] transition-all"
          aria-label="Search"
        >
          <span className="material-symbols-outlined text-lg">search</span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onNotificationsClick}
          className="relative w-9 h-9 rounded-full bg-[#1d1f28] flex items-center justify-center text-[#e2e1ee] hover:bg-[#282a32] transition-all"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined text-lg">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff5733] animate-pulse"></span>
        </button>

        {/* User Avatar or Sign In */}
        {user ? (
          <button
            onClick={onProfileClick}
            className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#00e475] hover:scale-105 transition-all shrink-0"
            title={user.displayName || 'Profile'}
          >
            <img
              src={user.photoURL || ASSETS.avatars.currentUser}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        ) : (
          <button
            onClick={login}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ff5733]/15 text-[#ffdad3] border border-[#ff5733]/40 hover:bg-[#ff5733] hover:text-white font-space text-[10px] font-bold transition-all"
            title="Sign in with Google"
          >
            <span className="material-symbols-outlined text-xs">login</span>
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};

