import React, { useState } from 'react';
import { ScreenType, PollState } from '../types';
import { ASSETS } from '../assets/images';

interface MatchLiveCenterScreenProps {
  onBack: () => void;
  onOpenDiscussion: () => void;
  pollState: PollState;
  onVoteTeam: (team: 'IND' | 'AUS') => void;
  onVoteBowler: (bowler: 'bumrah' | 'siraj' | 'hardik') => void;
  onOpenPlayer: (playerId: string) => void;
}

export const MatchLiveCenterScreen: React.FC<MatchLiveCenterScreenProps> = ({
  onBack,
  onOpenDiscussion,
  pollState,
  onVoteTeam,
  onVoteBowler,
  onOpenPlayer,
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'scorecard' | 'commentary'>('summary');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleTeamBet = (team: 'IND' | 'AUS') => {
    onVoteTeam(team);
    showToast(`Locked in +100 FanPoints on ${team === 'IND' ? 'India' : 'Australia'}!`);
  };

  const handleBowlerBet = (bowler: 'bumrah' | 'siraj' | 'hardik') => {
    onVoteBowler(bowler);
    const names = { bumrah: 'Jasprit Bumrah', siraj: 'Mohammed Siraj', hardik: 'Hardik Pandya' };
    showToast(`Voted for ${names[bowler]} to bowl the 50th over!`);
  };

  return (
    <div className="flex flex-col w-full pb-28 relative">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#00e475] text-[#003918] font-space font-bold text-xs px-4 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-1.5 border border-white/20">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {toastMessage}
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

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475] font-space text-[10px] font-bold border border-[#00e475]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e475] animate-pulse"></span>
            LIVE · 2ND INNINGS
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#181e30] text-[#94a3b8] font-space text-[10px] font-semibold border border-[#2b3555]">
            ODI SERIES
          </span>
        </div>

        <button className="w-9 h-9 rounded-full bg-[#181e30] flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
      </div>

      {/* Match Title & Stadium Info */}
      <div className="px-4 py-2.5">
        <h1 className="font-space font-bold text-xl text-white tracking-tight flex items-center gap-2">
          IND vs AUS <span className="text-[#ff5733]">•</span> 3rd ODI Decider
        </h1>
        <p className="text-xs text-[#94a3b8] flex items-center gap-1 mt-0.5 font-space">
          <span className="material-symbols-outlined text-[13px] text-[#ff5733]">stadium</span>
          Wankhede Stadium, Mumbai
        </p>
      </div>

      {/* Hero Banner: High Voltage Finale */}
      <div className="px-4 mb-3">
        <div className="h-28 rounded-2xl overflow-hidden relative border border-[#2b3555] shadow-xl">
          <img
            src={ASSETS.stadiumWankhedeNight}
            alt="Wankhede Stadium"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e16] via-[#0c0e16]/40 to-transparent"></div>
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-space">
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#7dffa2] bg-[#0c0e16]/80 px-2 py-0.5 rounded-full border border-[#00e475]/30">
              <span className="material-symbols-outlined text-xs">local_fire_department</span>
              HIGH VOLTAGE FINALE
            </span>
            <span className="text-xs font-bold text-white bg-[#0c0e16]/80 px-2.5 py-0.5 rounded-full border border-[#2b3555]">
              Target: <strong className="text-[#ff5733]">285</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Main Scoreboard Card */}
      <div className="px-4 mb-3">
        <div className="p-4 rounded-2xl bg-[#121624] border border-[#1b2136] shadow-xl">
          {/* Teams Header */}
          <div className="flex items-center justify-between pb-3 border-b border-[#1b2136]">
            {/* India */}
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#0055a5] flex items-center justify-center font-space text-[10px] font-bold text-white shadow">
                IND
              </span>
              <div className="flex flex-col">
                <span className="font-space font-bold text-sm text-white">India</span>
                <span className="text-[10px] text-[#94a3b8]">1st Innings</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-space font-bold text-lg text-white">284/7</span>
              <span className="text-[11px] text-[#94a3b8] block">(50.0)</span>
            </div>
          </div>

          {/* Australia Active Batting */}
          <div className="flex items-center justify-between pt-3 pb-3 border-b border-[#1b2136]">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#ffcc00] flex items-center justify-center font-space text-[10px] font-bold text-[#11131b] shadow">
                AUS
              </span>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-base text-white">Australia</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#00e475]/20 text-[#00e475] font-space text-[9px] font-bold tracking-wider">
                    BATTING
                  </span>
                </div>
                <span className="text-[11px] text-[#94a3b8]">(45.2 ov)</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-space font-bold text-3xl text-[#00e475] tracking-tight">
                243<span className="text-[#00e475]/60 text-xl font-normal">/5</span>
              </span>
            </div>
          </div>

          {/* Equation & Run Rates */}
          <div className="py-2.5 px-3 rounded-xl bg-[#0c0e16]/80 border border-[#1b2136] my-3">
            <div className="flex items-center gap-1.5 font-space font-bold text-xs text-[#ffdad3] mb-1">
              <span className="material-symbols-outlined text-sm text-[#ff5733]">sports_cricket</span>
              Australia need 42 runs from 28 balls
            </div>
            <div className="flex items-center justify-between text-[11px] text-[#94a3b8] font-space pt-1 border-t border-[#1b2136]/60">
              <span>CRR: <strong className="text-white">5.36</strong></span>
              <span>RRR: <strong className="text-[#ff5733]">8.94</strong></span>
              <span>TARGET: <strong className="text-white">285</strong></span>
            </div>
          </div>

          {/* Current Over 46 Telemetry */}
          <div className="mt-2">
            <div className="flex items-center justify-between text-[11px] font-space mb-2">
              <span className="text-[#94a3b8] font-semibold uppercase tracking-wider">
                OVER 46 (CURRENT)
              </span>
              <span className="text-[#00e475] font-bold">5 runs from 2 balls</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#181e30] border border-[#2b3555] font-space text-xs font-bold text-white flex items-center justify-center">
                1
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#00e475]/20 border border-[#00e475] font-space text-xs font-bold text-[#00e475] flex items-center justify-center shadow-sm">
                4
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#181e30] border border-[#2b3555] font-space text-sm text-[#94a3b8] flex items-center justify-center">
                •
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#121624] border border-[#1b2136] font-space text-sm text-[#64748b] flex items-center justify-center">
                -
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#121624] border border-[#1b2136] font-space text-sm text-[#64748b] flex items-center justify-center">
                -
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#121624] border border-[#1b2136] font-space text-sm text-[#64748b] flex items-center justify-center">
                -
              </span>
            </div>
            <span className="text-[10px] text-[#94a3b8] font-space mt-1.5 block">
              Over 45: [ 1 ] [ 4 ] [ • ] [ W! ] [ 2 ] [ 6 ] (13 runs)
            </span>
          </div>
        </div>
      </div>

      {/* "IN THE MIDDLE" Partnership Card */}
      <div className="px-4 mb-3">
        <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136]">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#1b2136]">
            <span className="flex items-center gap-1 font-space text-xs font-bold text-white uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#ff5733]">groups</span>
              In The Middle
            </span>
            <span className="font-space text-[10px] font-bold text-[#00e475] bg-[#00e475]/15 px-2 py-0.5 rounded-full">
              Partnership: 31(18)
            </span>
          </div>

          <div className="space-y-2">
            {/* Glenn Maxwell */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#ff9800]">bolt</span>
                <span className="font-space font-bold text-white">G. Maxwell *</span>
                <span className="text-[10px] text-[#94a3b8]">4s: 4 · 6s: 3 · SR: 177.7</span>
              </div>
              <div className="font-space text-right">
                <span className="font-bold text-sm text-[#00e475]">48*</span>
                <span className="text-[10px] text-[#94a3b8] ml-1">27 balls</span>
              </div>
            </div>

            {/* Alex Carey */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#94a3b8]">sports_cricket</span>
                <span className="font-space font-medium text-[#e2e1ee]">A. Carey</span>
                <span className="text-[10px] text-[#94a3b8]">4s: 2 · 6s: 0 · SR: 115.7</span>
              </div>
              <div className="font-space text-right">
                <span className="font-bold text-sm text-white">22</span>
                <span className="text-[10px] text-[#94a3b8] ml-1">19 balls</span>
              </div>
            </div>

            {/* Jasprit Bumrah */}
            <div 
              onClick={() => onOpenPlayer('bumrah')}
              className="flex items-center justify-between text-xs pt-2 border-t border-[#1b2136]/60 cursor-pointer group"
            >
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#ff5733]">sports_baseball</span>
                <span className="font-space font-bold text-white group-hover:text-[#ff5733] transition-colors">
                  J. Bumrah
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#ff5733]/15 text-[#ff5733] font-space text-[9px] font-bold">
                  Bowling
                </span>
                <span className="text-[10px] text-[#94a3b8]">Dots: 28</span>
              </div>
              <div className="font-space text-right">
                <span className="font-bold text-sm text-white">2 / 38</span>
                <span className="text-[10px] text-[#94a3b8] ml-1">8.2 overs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub Tabs: Live Summary / Scorecard / Commentary */}
      <div className="px-4 mb-3">
        <div className="flex items-center border-b border-[#1b2136]">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-2 px-3 font-space text-xs font-bold transition-all relative ${
              activeTab === 'summary'
                ? 'text-[#ff5733]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Live Summary
            {activeTab === 'summary' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5733] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('scorecard')}
            className={`pb-2 px-3 font-space text-xs font-bold transition-all relative ${
              activeTab === 'scorecard'
                ? 'text-[#ff5733]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Scorecard
            {activeTab === 'scorecard' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5733] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('commentary')}
            className={`pb-2 px-3 font-space text-xs font-bold transition-all relative ${
              activeTab === 'commentary'
                ? 'text-[#ff5733]'
                : 'text-[#94a3b8] hover:text-white'
            }`}
          >
            Commentary
            {activeTab === 'commentary' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5733] rounded-full"></span>
            )}
          </button>
        </div>
      </div>

      {/* Live Feed Snippets */}
      <div className="px-4 mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-space font-bold text-white flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#00e475]">record_voice_over</span>
            LIVE FEED SNIPPETS
          </span>
          <button className="text-[#94a3b8] text-[11px] font-space hover:text-white">
            Full Stream &gt;
          </button>
        </div>

        {/* Snippet 45.2 */}
        <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136] flex items-start gap-2.5">
          <span className="px-2 py-0.5 rounded bg-[#00e475]/20 text-[#00e475] font-space text-xs font-bold">
            45.2
          </span>
          <div className="flex-1 text-xs">
            <p className="text-[#e2e1ee] leading-relaxed">
              <strong className="text-[#00e475] font-space font-bold">FOUR!</strong> Maxwell shuffles across the stumps and scoops over fine leg! Sensational timing as the crowd erupts at Wankhede!
            </p>
            <div className="flex items-center gap-2 mt-1 font-space text-[10px] text-[#94a3b8]">
              <span className="text-[#ffb4a4] font-semibold">BOUNDARY · 138 KPH</span>
              <span>· Just now</span>
            </div>
          </div>
        </div>

        {/* Snippet 45.1 */}
        <div className="p-3 rounded-xl bg-[#121624] border border-[#1b2136] flex items-start gap-2.5">
          <span className="px-2 py-0.5 rounded bg-[#181e30] text-[#94a3b8] font-space text-xs font-bold">
            45.1
          </span>
          <div className="flex-1 text-xs">
            <p className="text-[#e2e1ee] leading-relaxed">
              <strong className="text-white font-space font-bold">1 run.</strong> Directed towards deep square leg off the hips. Controlled push to rotate strike back to Maxwell.
            </p>
            <div className="flex items-center gap-2 mt-1 font-space text-[10px] text-[#94a3b8]">
              <span>YORKER LENGTH</span>
              <span>· 1m ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* LIVE FANDOM DECIDER POLL */}
      <div className="px-4 mb-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#181e30] to-[#121624] border border-[#2b3555] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 font-space font-bold text-xs text-white">
              <span className="material-symbols-outlined text-[#ff5733] text-sm">how_to_vote</span>
              LIVE FANDOM DECIDER POLL
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#181e30] text-[#cdbdff] font-space text-[9px] font-bold border border-[#2b3555]">
              ZERO RISK · POINTS ONLY
            </span>
          </div>

          <p className="text-xs font-semibold text-[#e2e1ee] mb-2 font-space">
            Who clutches the decider in these last 28 balls?
          </p>

          {/* Progress bar */}
          <div className="h-2 rounded-full bg-[#1b2136] overflow-hidden flex mb-2">
            <div
              className="bg-[#ff5733] transition-all duration-500"
              style={{
                width: `${(pollState.teamIndiaVotes / (pollState.teamIndiaVotes + pollState.teamAusVotes)) * 100}%`,
              }}
            ></div>
            <div
              className="bg-[#00e475] transition-all duration-500"
              style={{
                width: `${(pollState.teamAusVotes / (pollState.teamIndiaVotes + pollState.teamAusVotes)) * 100}%`,
              }}
            ></div>
          </div>

          <div className="flex items-center justify-between font-space text-xs font-bold mb-3">
            <span className="text-[#ff5733]">🇮🇳 IND {Math.round((pollState.teamIndiaVotes / (pollState.teamIndiaVotes + pollState.teamAusVotes)) * 100)}%</span>
            <span className="text-[#00e475]">AUS {Math.round((pollState.teamAusVotes / (pollState.teamIndiaVotes + pollState.teamAusVotes)) * 100)}% 🇦🇺</span>
          </div>

          {/* Interactive Vote Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleTeamBet('IND')}
              className={`py-2 px-3 rounded-xl font-space text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                pollState.userVotedTeam === 'IND'
                  ? 'bg-[#ff5733] text-white shadow-lg shadow-[#ff5733]/30 scale-102'
                  : 'bg-[#181e30] text-[#ffdad3] border border-[#ff5733]/40 hover:border-[#ff5733]'
              }`}
            >
              <span>Back India</span>
              <span className="text-[10px] text-[#ffdad3]/80">+100 FanPoints</span>
            </button>
            <button
              onClick={() => handleTeamBet('AUS')}
              className={`py-2 px-3 rounded-xl font-space text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                pollState.userVotedTeam === 'AUS'
                  ? 'bg-[#00e475] text-[#003918] shadow-lg shadow-[#00e475]/30 scale-102'
                  : 'bg-[#181e30] text-[#7dffa2] border border-[#00e475]/40 hover:border-[#00e475]'
              }`}
            >
              <span>Back Australia</span>
              <span className="text-[10px] text-[#00e475]/80">+100 FanPoints</span>
            </button>
          </div>
        </div>
      </div>

      {/* COMMUNITY TACTICS: Who bowls the crucial 50th over */}
      <div className="px-4 mb-4">
        <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136]">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1 font-space text-xs font-bold text-white uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm text-[#00e475]">tune</span>
              Community Tactics
            </span>
            <span className="text-[11px] text-[#94a3b8] font-space">3,491 votes</span>
          </div>

          <h3 className="font-space font-bold text-sm text-white mb-3">
            Who bowls the crucial 50th over for India?
          </h3>

          <div className="space-y-2">
            {/* Bumrah Option */}
            <div
              onClick={() => handleBowlerBet('bumrah')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                pollState.userVotedBowler === 'bumrah'
                  ? 'bg-[#181e30] border-[#00e475]'
                  : 'bg-[#0c0e16]/60 border-[#1b2136] hover:border-[#2b3555]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-space font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#00e475]"></span>
                  Jasprit Bumrah
                </span>
                <span className="text-[#00e475] font-bold">78%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1b2136] overflow-hidden">
                <div className="h-full bg-[#00e475] rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Siraj Option */}
            <div
              onClick={() => handleBowlerBet('siraj')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                pollState.userVotedBowler === 'siraj'
                  ? 'bg-[#181e30] border-[#ff9800]'
                  : 'bg-[#0c0e16]/60 border-[#1b2136] hover:border-[#2b3555]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-space font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#ff9800]"></span>
                  Mohammed Siraj
                </span>
                <span className="text-[#ff9800] font-bold">14%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1b2136] overflow-hidden">
                <div className="h-full bg-[#ff9800] rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>

            {/* Hardik Option */}
            <div
              onClick={() => handleBowlerBet('hardik')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all ${
                pollState.userVotedBowler === 'hardik'
                  ? 'bg-[#181e30] border-[#cdbdff]'
                  : 'bg-[#0c0e16]/60 border-[#1b2136] hover:border-[#2b3555]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-space font-semibold mb-1">
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-2 h-2 rounded-full bg-[#cdbdff]"></span>
                  Hardik Pandya
                </span>
                <span className="text-[#cdbdff] font-bold">8%</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#1b2136] overflow-hidden">
                <div className="h-full bg-[#cdbdff] rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MATCH DISCUSSION ROOM Banner (Direct trigger for Discussion Sheet) */}
      <div className="px-4">
        <div
          onClick={onOpenDiscussion}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#1f1930] border border-[#ff5733]/50 hover:border-[#ff5733] shadow-lg cursor-pointer flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#ff5733]/20 flex items-center justify-center text-[#ff5733] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">forum</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e475] animate-ping"></span>
                <span className="font-space font-bold text-sm text-white">
                  Match Discussion Room
                </span>
              </div>
              <span className="text-xs text-[#94a3b8]">
                214 active fans talking live reactions &amp; over bets
              </span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#ff5733] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform">
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </div>
        </div>
      </div>
    </div>
  );
};
