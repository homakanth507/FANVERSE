import React, { useState } from 'react';
import { ASSETS } from '../assets/images';

interface TeamScreenProps {
  onBack: () => void;
  onOpenPlayer: (playerId: string) => void;
  onOpenDiscussion: () => void;
}

export const TeamScreen: React.FC<TeamScreenProps> = ({
  onBack,
  onOpenPlayer,
  onOpenDiscussion,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'squad' | 'matches'>('overview');
  const [isFollowing, setIsFollowing] = useState(true);
  const [reminderSet, setReminderSet] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#00e475] text-[#003918] font-space font-bold text-xs px-4 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-1.5 border border-white/20">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {toast}
        </div>
      )}

      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11131b]/95 backdrop-blur-md border-b border-[#1b2136] sticky top-0 z-20">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-[#181e30] flex items-center justify-center text-[#e2e1ee] hover:bg-[#282a32] transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>

        <span className="font-space font-bold text-sm text-white tracking-wide">
          Mumbai Masters
        </span>

        <button className="w-9 h-9 rounded-full bg-[#181e30] flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
      </div>

      {/* Crest & Team Header */}
      <div className="flex flex-col items-center pt-4 pb-3 px-4 text-center">
        {/* Crest Logo */}
        <div className="w-24 h-24 rounded-2xl p-1 bg-gradient-to-b from-[#ff9800]/30 to-transparent border border-[#ff9800]/50 shadow-2xl shadow-[#ff9800]/20 mb-2 relative">
          <img
            src={ASSETS.mumbaiMastersCrest}
            alt="Mumbai Masters Crest"
            className="w-full h-full object-cover rounded-xl"
          />
          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.2 rounded-full bg-[#00e475] text-[#003918] font-space text-[9px] font-bold shadow">
            PRO
          </span>
        </div>

        <h1 className="font-space font-bold text-2xl text-white tracking-tight mt-2">
          MUMBAI MASTERS
        </h1>
        <p className="text-xs text-[#94a3b8] mt-0.5 font-space">
          Franchise Cricket • <span className="text-[#ffb4a4] font-semibold">5x Champions</span>
        </p>

        {/* Followers & Follow Button */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-xs text-[#e2e1ee] font-space">
            <span className="material-symbols-outlined text-sm text-[#00e475]">groups</span>
            <span className="font-bold">2.4M</span>
            <span className="text-[#94a3b8]">FANS</span>
          </div>

          <button
            onClick={() => {
              setIsFollowing(!isFollowing);
              showToast(isFollowing ? 'Unfollowed Mumbai Masters' : 'Following Mumbai Masters! +50 FanPts');
            }}
            className={`px-5 py-1.5 rounded-full font-space font-bold text-xs flex items-center gap-1 shadow-md transition-all ${
              isFollowing
                ? 'bg-[#181e30] text-[#00e475] border border-[#00e475]'
                : 'bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white shadow-[#ff5733]/30'
            }`}
          >
            <span className="material-symbols-outlined text-xs">
              {isFollowing ? 'check' : 'add'}
            </span>
            <span>{isFollowing ? 'Following' : 'Follow'}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between border-b border-[#1b2136] pb-2 font-space text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-1 font-bold ${
              activeTab === 'overview' ? 'text-[#ff5733]' : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${activeTab === 'overview' ? 'bg-[#ff5733]' : 'bg-transparent'}`}></span>
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('squad')}
            className={`font-bold ${
              activeTab === 'squad' ? 'text-[#ff5733]' : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            SQUAD &amp; PLAYERS
          </button>
          <button
            onClick={() => setActiveTab('matches')}
            className={`font-bold ${
              activeTab === 'matches' ? 'text-[#ff5733]' : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            MATCHES
          </button>
        </div>
      </div>

      {/* Next Fixture Card */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-2xl bg-[#121624] border border-[#2b3555] shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475] font-space text-[10px] font-bold">
              <span className="material-symbols-outlined text-xs">push_pin</span>
              NEXT FIXTURE
            </span>
            <button
              onClick={() => {
                setReminderSet(!reminderSet);
                showToast(reminderSet ? 'Reminder removed' : 'Derby match reminder set!');
              }}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-space text-[10px] font-bold transition-all ${
                reminderSet
                  ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                  : 'bg-[#181e30] text-[#94a3b8] hover:text-white border border-[#2b3555]'
              }`}
            >
              <span className="material-symbols-outlined text-xs">
                {reminderSet ? 'notifications_active' : 'notifications'}
              </span>
              <span>{reminderSet ? 'Reminder Set' : 'Set Reminder'}</span>
            </button>
          </div>

          {/* Teams Encounter */}
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#181e30] border border-[#ff9800]/40 shrink-0">
                <img
                  src={ASSETS.mumbaiMastersCrest}
                  alt="MUM"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-space font-bold text-sm text-white block">MUMBAI</span>
                <span className="text-[10px] text-[#94a3b8]">Masters</span>
              </div>
            </div>

            <div className="flex flex-col items-center">
              <span className="font-space font-bold text-xs text-[#94a3b8]">VS</span>
              <span className="px-2 py-0.2 rounded-full bg-[#ff5733]/20 text-[#ff5733] font-space text-[9px] font-bold uppercase">
                DERBY
              </span>
            </div>

            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="font-space font-bold text-sm text-white block">BANGALORE</span>
                <span className="text-[10px] text-[#94a3b8]">Royals</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#cf142b] border border-red-500/40 flex items-center justify-center font-space font-bold text-white text-xs shrink-0">
                BLR
              </div>
            </div>
          </div>

          {/* Timing & Venue */}
          <div className="mt-3 pt-2.5 border-t border-[#1b2136] text-[11px] font-space space-y-1">
            <div className="flex items-center gap-1 text-white">
              <span className="material-symbols-outlined text-xs text-[#ff5733]">calendar_today</span>
              <span>Tomorrow at 7:30 PM • Wankhede Stadium, Mumbai</span>
            </div>
            <div className="flex items-center justify-between text-[#94a3b8] pt-0.5">
              <span className="flex items-center gap-1 text-[#00e475]">
                <span className="material-symbols-outlined text-xs">timer</span>
                STARTS IN 18H 42M
              </span>
              <span className="flex items-center gap-1 text-[#cdbdff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#cdbdff]"></span>
                TOSS IN 18H 12M
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Dugout Chat Card */}
      <div className="px-4 mb-4">
        <div
          onClick={onOpenDiscussion}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#00e475]/40 hover:border-[#00e475] shadow-md cursor-pointer flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00e475]/15 flex items-center justify-center text-[#00e475] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">forum</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-space font-bold text-xs text-white uppercase tracking-wider">
                  TEAM DUGOUT CHAT
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#00e475]/20 text-[#00e475] font-space text-[9px] font-bold">
                  1.2k Active
                </span>
              </div>
              <p className="text-xs text-[#94a3b8] mt-0.5">
                Fans actively discussing tomorrow’s playing 11
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#94a3b8] group-hover:text-white group-hover:translate-x-1 transition-all">
            arrow_forward
          </span>
        </div>
      </div>

      {/* Recent Form Guide */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm text-[#00e475]">trending_up</span>
            <h2 className="font-space font-bold text-sm text-white">Recent Form Guide</h2>
          </div>
          {/* Form Pills: W W L W W */}
          <div className="flex items-center gap-1">
            <span className="w-5 h-5 rounded bg-[#00e475] font-space text-[10px] font-bold text-[#003918] flex items-center justify-center">
              W
            </span>
            <span className="w-5 h-5 rounded bg-[#00e475] font-space text-[10px] font-bold text-[#003918] flex items-center justify-center">
              W
            </span>
            <span className="w-5 h-5 rounded bg-[#93000a] font-space text-[10px] font-bold text-[#ffdad6] flex items-center justify-center">
              L
            </span>
            <span className="w-5 h-5 rounded bg-[#00e475] font-space text-[10px] font-bold text-[#003918] flex items-center justify-center">
              W
            </span>
            <span className="w-5 h-5 rounded bg-[#00e475] font-space text-[10px] font-bold text-[#003918] flex items-center justify-center">
              W
            </span>
          </div>
        </div>

        <div className="space-y-2">
          {/* Match 1 */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#00e475]/20 text-[#00e475] font-space text-[10px] font-bold flex items-center justify-center">
                W
              </span>
              <div>
                <span className="font-space font-bold text-white block">vs Chennai Kings</span>
                <span className="text-[10px] text-[#94a3b8]">Won by 24 runs • MUM 198/4 vs CHE 174/8</span>
              </div>
            </div>
            <span className="font-space text-[10px] text-[#94a3b8]">3D AGO</span>
          </div>

          {/* Match 2 */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#00e475]/20 text-[#00e475] font-space text-[10px] font-bold flex items-center justify-center">
                W
              </span>
              <div>
                <span className="font-space font-bold text-white block">vs Delhi Capitals</span>
                <span className="text-[10px] text-[#94a3b8]">Won by 6 wickets • DEL 162/9 vs MUM 166/4</span>
              </div>
            </div>
            <span className="font-space text-[10px] text-[#94a3b8]">6D AGO</span>
          </div>

          {/* Match 3 */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#93000a]/30 text-[#ffb4ab] font-space text-[10px] font-bold flex items-center justify-center">
                L
              </span>
              <div>
                <span className="font-space font-bold text-white block">vs Kolkata Riders</span>
                <span className="text-[10px] text-[#94a3b8]">Lost by 4 runs • KOL 189/6 vs MUM 185/8</span>
              </div>
            </div>
            <span className="font-space text-[10px] text-[#94a3b8]">10D AGO</span>
          </div>
        </div>
      </div>

      {/* Key Squad & Stars */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="font-space font-bold text-sm text-white">Key Squad &amp; Stars</h2>
            <span className="text-[10px] text-[#94a3b8]">Core franchise roster &amp; impact metrics</span>
          </div>
          <button className="font-space text-xs text-[#ff5733] font-bold flex items-center gap-0.5 hover:underline">
            ALL 25 <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Featured Card: Jasprit Bumrah */}
        <div
          onClick={() => onOpenPlayer('bumrah')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#ff5733]/50 hover:border-[#ff5733] transition-all cursor-pointer shadow-md mb-2 group"
        >
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#282a32] border border-[#2b3555] shrink-0 relative">
              <img
                src={ASSETS.bowlerActionCelebration}
                alt="Jasprit Bumrah"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-1 left-1 px-1 py-0.2 rounded bg-black/60 font-space text-[8px] font-bold text-white">
                #93
              </span>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.2 rounded-full bg-[#00e475]/15 text-[#00e475] font-space text-[9px] font-bold">
                  VICE CAPTAIN
                </span>
                <span className="material-symbols-outlined text-sm text-[#ff9800]">bolt</span>
              </div>
              <h3 className="font-space font-bold text-sm text-white group-hover:text-[#ff5733] transition-colors mt-0.5">
                Jasprit Bumrah
              </h3>
              <span className="text-[11px] text-[#94a3b8]">Right-arm Fast Bowler</span>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#1b2136] text-center font-space">
                <div>
                  <span className="text-[8px] text-[#94a3b8] uppercase block">WICKETS</span>
                  <span className="text-xs font-bold text-white">22</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#94a3b8] uppercase block">ECONOMY</span>
                  <span className="text-xs font-bold text-[#00e475]">6.42</span>
                </div>
                <div>
                  <span className="text-[8px] text-[#94a3b8] uppercase block">AVG</span>
                  <span className="text-xs font-bold text-white">14.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other Squad Players */}
        <div className="space-y-1.5">
          {/* Rohit Sharma */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#181e30] border border-[#2b3555] font-space text-xs font-bold text-white flex items-center justify-center">
                RS
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-xs text-white">Rohit Sharma</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#ff9800]/20 text-[#ff9800] font-space text-[8px] font-bold">
                    CAPTAIN
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8]">Opening Batter • 412 runs (SR 154.2)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#94a3b8]">chevron_right</span>
          </div>

          {/* Suryakumar Yadav */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#7c4dff]/20 border border-[#7c4dff]/40 font-space text-xs font-bold text-[#cdbdff] flex items-center justify-center">
                SKY
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-xs text-white">Suryakumar Yadav</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#7c4dff]/20 text-[#cdbdff] font-space text-[8px] font-bold">
                    360°
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8]">Top Order Batter • 488 runs (SR 178.6)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#94a3b8]">chevron_right</span>
          </div>

          {/* Hardik Pandya */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#00e475]/20 border border-[#00e475]/40 font-space text-xs font-bold text-[#00e475] flex items-center justify-center">
                HP
              </span>
              <div>
                <span className="font-space font-bold text-xs text-white block">Hardik Pandya</span>
                <span className="text-[10px] text-[#94a3b8]">All-Rounder • 260 runs &amp; 12 wickets</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#94a3b8]">chevron_right</span>
          </div>

          {/* Tilak Varma */}
          <div className="p-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-[#181e30] border border-[#2b3555] font-space text-xs font-bold text-white flex items-center justify-center">
                TV
              </span>
              <div>
                <span className="font-space font-bold text-xs text-white block">Tilak Varma</span>
                <span className="text-[10px] text-[#94a3b8]">Middle Order Batter • 324 runs (Avg 40.5)</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#94a3b8]">chevron_right</span>
          </div>
        </div>
      </div>

      {/* Fan Experience / Official Matchday Kits */}
      <div className="px-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#2b3555] flex items-center justify-between">
          <div>
            <span className="font-space text-[10px] font-bold text-[#00e475] uppercase tracking-wider block">
              FAN EXPERIENCE
            </span>
            <h3 className="font-space font-bold text-sm text-white mt-0.5">Official Matchday Kits</h3>
            <p className="text-[11px] text-[#94a3b8]">
              Exclusive 2025 edition jerseys available in team store.
            </p>
          </div>
          <button 
            onClick={() => showToast('Opening official team merchandise portal...')}
            className="px-3.5 py-1.5 rounded-full bg-[#181e30] border border-[#2b3555] hover:border-[#ff5733] font-space text-xs font-bold text-white flex items-center gap-1 shrink-0"
          >
            <span>SHOP</span>
            <span className="material-symbols-outlined text-xs">north_east</span>
          </button>
        </div>
      </div>
    </div>
  );
};
