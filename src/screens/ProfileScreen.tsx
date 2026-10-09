import React from 'react';
import { ASSETS } from '../assets/images';
import { ScreenType } from '../types';
import { useFirebase } from '../context/FirebaseContext';

interface ProfileScreenProps {
  fanPoints: number;
  onNavigate: (screen: ScreenType) => void;
  onOpenPlayer: (id: string) => void;
  onOpenTeam: (id: string) => void;
  onOpenMovieDetail: (id: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  fanPoints,
  onNavigate,
  onOpenPlayer,
  onOpenTeam,
  onOpenMovieDetail,
}) => {
  const { user, login, logout } = useFirebase();

  return (
    <div className="flex flex-col w-full pb-28 px-4 pt-3">
      {/* Profile Card Header */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[#181e30] to-[#121624] border border-[#2b3555] shadow-2xl relative overflow-hidden mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#ff5733] shadow-lg shrink-0">
              <img
                src={user?.photoURL || ASSETS.avatars.currentUser}
                alt="Me"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-space font-bold text-lg text-white">
                  {user?.displayName ? `@${user.displayName.replace(/\s+/g, '')}` : '@FanAnalyst_You'}
                </h1>
                <span className="material-symbols-outlined text-sm text-[#00e475]">verified</span>
              </div>
              <span className="font-space text-xs text-[#00e475] font-semibold block">
                Tier: Master Stadium Strategist
              </span>
              <span className="text-[11px] text-[#94a3b8]">
                {user?.email || 'Mumbai, IN • Fandom Member since 2024'}
              </span>
            </div>
          </div>
        </div>

        {/* Auth CTA Banner */}
        <div className="mt-3 pt-2.5 border-t border-[#1b2136] flex items-center justify-between">
          {user ? (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-space text-[#00e475] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse"></span>
                Connected via Google Firebase
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-full bg-[#181e30] hover:bg-[#282a32] text-xs font-space font-bold text-[#ffb4ab] border border-[#5b403a] transition-all"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-[11px] font-space text-[#94a3b8]">
                Sign in to sync your FanPoints &amp; live predictions to the cloud
              </span>
              <button
                onClick={login}
                className="px-3 py-1 rounded-full bg-[#ff5733] text-white text-xs font-space font-bold shadow-md hover:opacity-95 transition-all flex items-center gap-1 shrink-0 ml-2"
              >
                <span className="material-symbols-outlined text-xs">login</span>
                <span>Sign In</span>
              </button>
            </div>
          )}
        </div>

        {/* FanPoints Dashboard Strip */}
        <div className="mt-4 pt-3 border-t border-[#1b2136] grid grid-cols-3 gap-2 text-center font-space">
          <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
            <span className="text-[9px] text-[#94a3b8] uppercase font-bold block">FANPOINTS</span>
            <span className="text-base font-bold text-[#ffdad3] flex items-center justify-center gap-1 mt-0.5">
              <span className="material-symbols-outlined text-xs text-[#ff9800]">token</span>
              {fanPoints.toLocaleString()}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
            <span className="text-[9px] text-[#94a3b8] uppercase font-bold block">PREDICTIONS</span>
            <span className="text-base font-bold text-[#00e475] mt-0.5 block">89% Acc</span>
          </div>
          <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
            <span className="text-[9px] text-[#94a3b8] uppercase font-bold block">BADGES</span>
            <span className="text-base font-bold text-[#cdbdff] mt-0.5 block">14 Unlocked</span>
          </div>
        </div>
      </div>

      {/* Followed Clubs & Teams */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-space font-bold text-sm text-white">Followed Teams</h2>
          <button 
            onClick={() => onNavigate('sports')}
            className="text-[11px] font-space text-[#ff5733] font-bold"
          >
            Explore
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onOpenTeam('mumbai-masters')}
            className="p-3 rounded-2xl bg-[#121624] border border-[#ff9800]/40 hover:border-[#ff9800] transition-colors cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#181e30] shrink-0 border border-[#ff9800]/50">
              <img
                src={ASSETS.mumbaiMastersCrest}
                alt="Mumbai Masters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <span className="font-space font-bold text-xs text-white block truncate">
                Mumbai Masters
              </span>
              <span className="text-[10px] text-[#00e475] font-space">Next: Derby Tomorrow</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('match-live')}
            className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136] hover:border-[#0055a5] transition-colors cursor-pointer flex items-center gap-2.5"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0055a5] flex items-center justify-center font-space font-bold text-white shrink-0 text-xs">
              IND
            </div>
            <div className="overflow-hidden">
              <span className="font-space font-bold text-xs text-white block truncate">
                Team India
              </span>
              <span className="text-[10px] text-[#ff5733] font-space">Live in Match Decider</span>
            </div>
          </div>
        </div>
      </div>

      {/* Followed Players */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-space font-bold text-sm text-white">Followed Athletes</h2>
          <button 
            onClick={() => onNavigate('sports')}
            className="text-[11px] font-space text-[#ff5733] font-bold"
          >
            View All
          </button>
        </div>

        <div
          onClick={() => onOpenPlayer('bumrah')}
          className="p-3 rounded-2xl bg-[#121624] border border-[#00e475]/40 hover:border-[#00e475] transition-colors cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
              <img
                src={ASSETS.bowlerActionCelebration}
                alt="Bumrah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-space font-bold text-xs text-white">Jasprit Bumrah</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#00e475]/20 text-[#00e475] font-space text-[8px] font-bold">
                  #1 ICC ODI
                </span>
              </div>
              <span className="text-[10px] text-[#94a3b8]">2/38 (8.2 ov) Live vs Australia</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#00e475]">chevron_right</span>
        </div>
      </div>

      {/* Saved Watchlist */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-space font-bold text-sm text-white">Cinema Watchlist</h2>
          <button 
            onClick={() => onNavigate('movies')}
            className="text-[11px] font-space text-[#ff5733] font-bold"
          >
            Movies
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div
            onClick={() => onOpenMovieDetail('chrono')}
            className="p-2.5 rounded-2xl bg-[#121624] border border-[#2b3555] hover:border-[#ff5733] transition-colors cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-10 h-14 rounded-lg overflow-hidden bg-[#181e30] shrink-0">
              <img
                src={ASSETS.chronoHorizonPoster}
                alt="Chrono"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <span className="font-space font-bold text-xs text-white block truncate">
                Chrono Horizon
              </span>
              <span className="text-[10px] text-[#ffdad3] font-space block">IMAX 70mm</span>
              <span className="text-[10px] text-[#00e475] font-space font-bold">⭐ 9.4</span>
            </div>
          </div>

          <div
            onClick={() => onNavigate('movies')}
            className="p-2.5 rounded-2xl bg-[#121624] border border-[#2b3555] hover:border-[#7c4dff] transition-colors cursor-pointer flex items-center gap-2 group"
          >
            <div className="w-10 h-14 rounded-lg overflow-hidden bg-[#181e30] shrink-0">
              <img
                src={ASSETS.solarisOdysseyPoster}
                alt="Solaris"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="overflow-hidden">
              <span className="font-space font-bold text-xs text-white block truncate">
                Solaris Odyssey
              </span>
              <span className="text-[10px] text-[#cdbdff] font-space block">Dec 2025</span>
              <span className="text-[10px] text-[#00e475] font-space font-bold">⭐ 9.1</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
