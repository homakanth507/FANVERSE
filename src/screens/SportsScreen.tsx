import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ASSETS } from '../assets/images';

interface SportsScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenPlayer: (playerId: string) => void;
  onOpenTeam: (teamId: string) => void;
}

export const SportsScreen: React.FC<SportsScreenProps> = ({
  onNavigate,
  onOpenPlayer,
  onOpenTeam,
}) => {
  const [activeSport, setActiveSport] = useState<'all' | 'cricket' | 'football' | 'f1'>('cricket');
  const [reminders, setReminders] = useState<{ [key: string]: boolean }>({});
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({
    bumrah: true,
  });

  const toggleReminder = (matchId: string) => {
    setReminders((prev) => ({ ...prev, [matchId]: !prev[matchId] }));
  };

  const toggleFavorite = (playerId: string) => {
    setFavorites((prev) => ({ ...prev, [playerId]: !prev[playerId] }));
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveSport('all')}
          className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold whitespace-nowrap transition-all ${
            activeSport === 'all'
              ? 'bg-[#181e30] text-white border border-[#ff5733]'
              : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136] hover:text-white'
          }`}
        >
          All Sports
        </button>
        <button
          onClick={() => setActiveSport('cricket')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-space text-xs font-semibold whitespace-nowrap transition-all ${
            activeSport === 'cricket'
              ? 'bg-[#181e30] text-white border border-[#ff5733]'
              : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5733] animate-pulse"></span>
          Cricket
        </button>
        <button
          onClick={() => setActiveSport('football')}
          className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold whitespace-nowrap transition-all ${
            activeSport === 'football'
              ? 'bg-[#181e30] text-white border border-[#ff5733]'
              : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136] hover:text-white'
          }`}
        >
          Football
        </button>
        <button
          onClick={() => setActiveSport('f1')}
          className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold whitespace-nowrap transition-all ${
            activeSport === 'f1'
              ? 'bg-[#181e30] text-white border border-[#ff5733]'
              : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136] hover:text-white'
          }`}
        >
          Formula 1
        </button>
      </div>

      {/* Featured Live Match Card */}
      <div className="px-4 mb-3">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#181e30] to-[#121624] border border-[#2b3555] shadow-xl relative overflow-hidden">
          {/* Neon accent glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e475]/10 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Top Metadata */}
          <div className="flex items-center justify-between mb-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475] border border-[#00e475]/30">
              <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse"></span>
              <span className="font-space font-bold tracking-wider uppercase text-[10px]">
                LIVE · 2ND INNINGS
              </span>
            </div>
            <div className="flex items-center gap-2 text-[#94a3b8] font-space text-[11px]">
              <span>Champions Trophy 2025</span>
              <span className="flex items-center gap-0.5 text-[#00e475] font-semibold">
                <span className="material-symbols-outlined text-[13px]">sports_cricket</span>
                OVERS 45.2
              </span>
            </div>
          </div>

          {/* Scores Breakdown */}
          <div className="grid grid-cols-2 gap-3 mb-3 pb-3 border-b border-[#1b2136]/80">
            {/* Team India */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#0055a5] flex items-center justify-center font-space text-[10px] font-bold text-white">
                  IND
                </span>
                <span className="font-space font-semibold text-sm text-[#e2e1ee]">India</span>
              </div>
              <div className="font-space text-2xl font-bold text-white tracking-tight">
                284<span className="text-[#94a3b8] text-lg font-normal">/7</span>
              </div>
              <span className="text-[11px] text-[#94a3b8]">50.0 overs (RR 5.68)</span>
            </div>

            {/* Team Australia */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-5 h-5 rounded-full bg-[#ffcc00] flex items-center justify-center font-space text-[10px] font-bold text-[#11131b]">
                  AUS
                </span>
                <span className="font-space font-semibold text-sm text-[#e2e1ee]">Australia</span>
              </div>
              <div className="font-space text-2xl font-bold text-[#00e475] tracking-tight">
                243<span className="text-[#00e475]/70 text-lg font-normal">/5</span>
              </div>
              <span className="text-[11px] text-[#94a3b8]">45.2 overs (Curr 5.36)</span>
            </div>
          </div>

          {/* Equation Strip */}
          <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-[#0c0e16]/60 border border-[#1b2136] mb-3 font-space text-xs">
            <span className="flex items-center gap-1 text-[#ffb4a4] font-semibold">
              <span className="material-symbols-outlined text-sm text-[#ff5733]">bolt</span>
              AUS need 42 off 28 balls
            </span>
            <span className="text-[#94a3b8] font-medium">
              REQ RR: <strong className="text-white">8.94</strong>
            </span>
          </div>

          {/* Primary CTA Button */}
          <button
            onClick={() => onNavigate('match-live')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white font-space font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#ff5733]/30 hover:opacity-95 active:scale-[0.99] transition-all"
          >
            <span>Watch Live Center</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Mini Ticker: ENG vs SA */}
      <div className="px-4 mb-5">
        <div className="px-3.5 py-2.5 rounded-xl bg-[#121624] border border-[#1b2136] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e475]"></span>
            <span className="font-space font-semibold text-white">ENG vs SA</span>
            <span className="text-[10px] text-[#94a3b8] px-1.5 py-0.2 rounded bg-[#181e30]">2nd Test</span>
          </div>
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <span className="text-[11px] hidden sm:inline">Day 4 · Tea Break · ENG lead by 112 runs</span>
            <button className="text-[#ff5733] font-space font-semibold text-[11px] flex items-center gap-0.5 hover:underline">
              Scorecard <span className="material-symbols-outlined text-xs">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Matches Section */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5733] text-lg">calendar_month</span>
            <h2 className="font-space font-bold text-base text-white">Upcoming Matches</h2>
          </div>
          <button className="font-space text-xs text-[#94a3b8] hover:text-white">View Schedule</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Card 1: IND vs PAK */}
          <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1b2136] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#ff5733]/15 text-[#ff5733] font-space text-[10px] font-bold tracking-wider">
                RIVALRY CLASSIC
              </span>
              <span className="font-space text-[11px] text-[#94a3b8]">Tomorrow, 2:30 PM</span>
            </div>
            <div className="flex items-center justify-between my-1">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <span className="w-6 h-6 rounded-full bg-[#0055a5] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#121624]">
                    IND
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#006629] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#121624]">
                    PAK
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-space font-bold text-sm text-white">IND vs PAK</span>
                  <span className="text-[11px] text-[#94a3b8] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">location_on</span>
                    Melbourne Cricket Ground
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleReminder('ind-pak')}
                className={`px-3 py-1 rounded-full font-space text-xs font-semibold flex items-center gap-1 transition-all ${
                  reminders['ind-pak']
                    ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                    : 'bg-[#181e30] text-[#94a3b8] hover:text-white border border-[#2b3555]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">
                  {reminders['ind-pak'] ? 'notifications_active' : 'notifications'}
                </span>
                {reminders['ind-pak'] ? 'Set' : 'Remind'}
              </button>
            </div>
          </div>

          {/* Card 2: AUS vs NZ */}
          <div className="p-3.5 rounded-xl bg-[#121624] border border-[#1b2136] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-full bg-[#7c4dff]/15 text-[#cdbdff] font-space text-[10px] font-bold tracking-wider">
                TRANS-TASMAN CUP
              </span>
              <span className="font-space text-[11px] text-[#94a3b8]">Friday, 7:00 PM</span>
            </div>
            <div className="flex items-center justify-between my-1">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <span className="w-6 h-6 rounded-full bg-[#ffcc00] flex items-center justify-center font-space text-[9px] font-bold text-[#11131b] border border-[#121624]">
                    AUS
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#111] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#121624]">
                    NZ
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-space font-bold text-sm text-white">AUS vs NZ</span>
                  <span className="text-[11px] text-[#94a3b8] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[11px]">location_on</span>
                    Sydney Cricket Ground
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleReminder('aus-nz')}
                className={`px-3 py-1 rounded-full font-space text-xs font-semibold flex items-center gap-1 transition-all ${
                  reminders['aus-nz']
                    ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                    : 'bg-[#181e30] text-[#94a3b8] hover:text-white border border-[#2b3555]'
                }`}
              >
                <span className="material-symbols-outlined text-xs">
                  {reminders['aus-nz'] ? 'notifications_active' : 'notifications'}
                </span>
                {reminders['aus-nz'] ? 'Set' : 'Remind'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Tournaments */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e475] text-lg">emoji_events</span>
            <h2 className="font-space font-bold text-base text-white">Popular Tournaments</h2>
          </div>
          <button className="font-space text-xs text-[#94a3b8] hover:text-white">Explore All</button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#ff5733] transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-[#ff5733] text-xl mb-1 block group-hover:scale-110 transition-transform">
              military_tech
            </span>
            <span className="text-[10px] font-space font-bold text-[#ffb4a4] tracking-wider block">
              ICC MAJOR
            </span>
            <span className="font-space font-bold text-xs text-white block mt-0.5">
              Champions Trophy 2025
            </span>
          </div>

          <div 
            onClick={() => onOpenTeam('mumbai-masters')}
            className="p-3 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#00e475] transition-colors cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[#00e475] text-xl mb-1 block group-hover:scale-110 transition-transform">
              sports_cricket
            </span>
            <span className="text-[10px] font-space font-bold text-[#00e475] tracking-wider block">
              T20 LEAGUE
            </span>
            <span className="font-space font-bold text-xs text-white block mt-0.5">
              Indian Premier League
            </span>
          </div>

          <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#cdbdff] transition-colors cursor-pointer group hidden sm:block">
            <span className="material-symbols-outlined text-[#cdbdff] text-xl mb-1 block group-hover:scale-110 transition-transform">
              shield
            </span>
            <span className="text-[10px] font-space font-bold text-[#cdbdff] tracking-wider block">
              HISTORIC TEST
            </span>
            <span className="font-space font-bold text-xs text-white block mt-0.5">
              The Ashes Series
            </span>
          </div>
        </div>
      </div>

      {/* Recent Results */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#94a3b8] text-lg">history</span>
            <h2 className="font-space font-bold text-base text-white">Recent Results</h2>
          </div>
          <button className="font-space text-xs text-[#94a3b8] hover:text-white">Archive</button>
        </div>

        <div className="space-y-2.5">
          {/* Result 1 */}
          <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136]">
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] mb-1 font-space">
              <span>ODI SERIES · MATCH 3</span>
              <span>WANKHEDE STADIUM</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e475]"></span>
                <span className="font-space font-bold text-sm text-white">
                  IND beat SA by 3 wickets
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#181e30] font-space text-[10px] font-bold text-[#00e475]">
                FINAL
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#94a3b8] mt-1 pt-1 border-t border-[#1b2136]/60 font-space">
              <span>SA 248 (48.4) • IND 251/7 (47.2)</span>
              <span className="text-[#ffb4a4] font-semibold">🎖️ POTM: J. Bumrah (4/22)</span>
            </div>
          </div>

          {/* Result 2 */}
          <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136]">
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] mb-1 font-space">
              <span>T20I TROPHY · MATCH 2</span>
              <span>KENSINGTON OVAL</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e475]"></span>
                <span className="font-space font-bold text-sm text-white">
                  WI beat ENG by 14 runs
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded bg-[#181e30] font-space text-[10px] font-bold text-[#00e475]">
                FINAL
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#94a3b8] mt-1 pt-1 border-t border-[#1b2136]/60 font-space">
              <span>WI 196/6 (20.0) • ENG 182/9 (20.0)</span>
              <span className="text-[#94a3b8]">Series leveled 1-1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Teams & Icons */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00e475] text-lg">groups</span>
            <h2 className="font-space font-bold text-base text-white">Featured Teams &amp; Icons</h2>
          </div>
          <span className="font-space text-[10px] font-bold text-[#94a3b8] uppercase tracking-wider">
            TOP FOLLOWED
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Team India */}
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#0055a5] cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#0055a5] flex items-center justify-center font-space font-bold text-white shadow-md">
              IND
            </div>
            <span className="font-space text-xs text-[#e2e1ee] font-medium text-center truncate w-full">
              Team India
            </span>
          </div>

          {/* Mumbai Masters */}
          <div
            onClick={() => onOpenTeam('mumbai-masters')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#121624] border border-[#ff9800]/40 hover:border-[#ff9800] cursor-pointer transition-all relative group"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#181e30] flex items-center justify-center border border-[#ff9800]/50 shadow-md">
              <img
                src={ASSETS.mumbaiMastersCrest}
                alt="Mumbai Masters Crest"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <span className="font-space text-xs text-[#ffb4a4] font-bold text-center truncate w-full">
              Mumbai Masters
            </span>
          </div>

          {/* Australia */}
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#ffcc00] cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#ffcc00] flex items-center justify-center font-space font-bold text-[#11131b] shadow-md">
              AUS
            </div>
            <span className="font-space text-xs text-[#e2e1ee] font-medium text-center truncate w-full">
              Australia
            </span>
          </div>

          {/* England */}
          <div className="flex flex-col items-center gap-1.5 p-2 rounded-xl bg-[#121624] border border-[#1b2136] hover:border-[#cf142b] cursor-pointer transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#cf142b] flex items-center justify-center font-space font-bold text-white shadow-md">
              ENG
            </div>
            <span className="font-space text-xs text-[#e2e1ee] font-medium text-center truncate w-full">
              England
            </span>
          </div>
        </div>
      </div>

      {/* Top Players Spotlight */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5733] text-lg">star</span>
            <h2 className="font-space font-bold text-base text-white">Top Players Spotlight</h2>
          </div>
          <button className="font-space text-xs text-[#94a3b8] hover:text-white">Rankings</button>
        </div>

        <div className="space-y-2.5">
          {/* Jasprit Bumrah Card */}
          <div
            onClick={() => onOpenPlayer('bumrah')}
            className="p-3 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#2b3555] hover:border-[#ff5733] transition-all cursor-pointer flex items-center justify-between shadow-md group"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#282a32] shrink-0 border border-[#2b3555]">
                <img
                  src={ASSETS.bowlerActionCelebration}
                  alt="Jasprit Bumrah"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-sm text-white group-hover:text-[#ff5733] transition-colors">
                    Jasprit Bumrah
                  </span>
                  <span className="material-symbols-outlined text-xs text-[#00e475]">verified</span>
                </div>
                <span className="text-xs text-[#94a3b8]">Fast Bowler • Team India</span>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.2 rounded-full bg-[#00e475]/15 text-[#00e475] font-space text-[10px] font-bold">
                    #1 ICC ODI BOWLER
                  </span>
                  <span className="text-[10px] font-space text-[#94a3b8]">149.2 km/h avg</span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite('bumrah');
              }}
              className="p-2 text-[#94a3b8] hover:text-[#ff5733] transition-colors"
            >
              <span className={`material-symbols-outlined text-xl ${favorites['bumrah'] ? 'text-[#ff5733] fill-current' : ''}`}>
                favorite
              </span>
            </button>
          </div>

          {/* Virat Kohli */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#181e30] border border-[#2b3555] flex items-center justify-center font-space font-bold text-white text-base">
                VK
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-sm text-white">Virat Kohli</span>
                  <span className="material-symbols-outlined text-xs text-[#00e475]">verified</span>
                </div>
                <span className="text-xs text-[#94a3b8]">Top-order Batter • 80 Centuries</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite('kohli')}
              className="p-2 text-[#94a3b8] hover:text-[#ff5733] transition-colors"
            >
              <span className={`material-symbols-outlined text-xl ${favorites['kohli'] ? 'text-[#ff5733]' : ''}`}>
                favorite
              </span>
            </button>
          </div>

          {/* Glenn Maxwell */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#181e30] border border-[#2b3555] flex items-center justify-center font-space font-bold text-[#ffcc00] text-base">
                GM
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-sm text-white">Glenn Maxwell</span>
                  <span className="material-symbols-outlined text-xs text-[#00e475]">verified</span>
                </div>
                <span className="text-xs text-[#94a3b8]">All-rounder • Australia</span>
              </div>
            </div>
            <button
              onClick={() => toggleFavorite('maxwell')}
              className="p-2 text-[#94a3b8] hover:text-[#ff5733] transition-colors"
            >
              <span className={`material-symbols-outlined text-xl ${favorites['maxwell'] ? 'text-[#ff5733]' : ''}`}>
                favorite
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
