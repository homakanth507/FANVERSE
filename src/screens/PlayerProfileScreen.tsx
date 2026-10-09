import React, { useState } from 'react';
import { ASSETS } from '../assets/images';

interface PlayerProfileScreenProps {
  onBack: () => void;
  onOpenDiscussion: () => void;
  onOpenTeam: (teamId: string) => void;
}

export const PlayerProfileScreen: React.FC<PlayerProfileScreenProps> = ({
  onBack,
  onOpenDiscussion,
  onOpenTeam,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    setToast(isFollowing ? 'Unfollowed Jasprit Bumrah' : 'Following Jasprit Bumrah! +50 FanPts');
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Toast */}
      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#00e475] text-[#003918] font-space font-bold text-xs px-4 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-1.5 border border-white/20">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {toast}
        </div>
      )}

      {/* Top Bar Header */}
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
            LIVE TODAY · SPELL IN PROGRESS
          </span>
          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ff9800]/15 text-[#ff9800] font-space text-[10px] font-bold border border-[#ff9800]/30">
            <span className="material-symbols-outlined text-xs">military_tech</span>
            ICC #1
          </span>
        </div>

        <button className="w-9 h-9 rounded-full bg-[#181e30] flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors">
          <span className="material-symbols-outlined text-lg">share</span>
        </button>
      </div>

      {/* Big Hero Image Container */}
      <div className="px-4 py-2">
        <div className="relative h-72 rounded-3xl overflow-hidden border border-[#2b3555] shadow-2xl">
          <img
            src={ASSETS.bowlerActionCelebration}
            alt="Jasprit Bumrah Celebrating"
            className="w-full h-full object-cover object-top"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e16] via-transparent to-transparent"></div>

          {/* Badges on hero image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between font-space text-[11px]">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0c0e16]/80 text-[#ff5733] font-bold border border-[#ff5733]/40 backdrop-blur-md">
              <span className="material-symbols-outlined text-xs">local_fire_department</span>
              WORLD NO. 1 ICC RANKING
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0c0e16]/80 text-[#00e475] font-bold border border-[#00e475]/40 backdrop-blur-md">
              <span className="material-symbols-outlined text-xs">thumb_up</span>
              FAN FAVORITE: 98%
            </span>
          </div>
        </div>
      </div>

      {/* Player Identity Strip */}
      <div className="px-4 mt-2">
        <div className="flex items-center justify-between">
          <h1 className="font-space font-bold text-2xl text-white tracking-tight">
            Jasprit Bumrah
          </h1>
          <span className="font-space text-xs font-bold px-2 py-0.5 rounded bg-[#181e30] text-[#ffdad3] border border-[#ff5733]/30">
            IND #93
          </span>
        </div>

        <p className="text-xs text-[#00e475] font-space font-semibold flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-sm">sports_baseball</span>
          Right-arm Fast Bowler (Premier Pacer)
        </p>
        <p className="text-xs text-[#94a3b8] mt-0.5">
          India National Team •{' '}
          <button
            onClick={() => onOpenTeam('mumbai-masters')}
            className="text-[#ffb4a4] font-semibold hover:underline"
          >
            Mumbai Masters
          </button>
        </p>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={toggleFollow}
            className={`flex-1 py-2.5 px-4 rounded-xl font-space font-bold text-sm flex items-center justify-center gap-1.5 transition-all shadow-md ${
              isFollowing
                ? 'bg-[#181e30] text-[#00e475] border border-[#00e475]'
                : 'bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white shadow-[#ff5733]/30'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isFollowing ? 'check' : 'add'}
            </span>
            <span>{isFollowing ? 'Following' : 'Follow Player'}</span>
          </button>

          <button
            onClick={onOpenDiscussion}
            className="w-11 h-11 rounded-xl bg-[#181e30] border border-[#2b3555] flex items-center justify-center text-[#e2e1ee] hover:text-[#ff5733] transition-colors"
            title="Chat in Player Fan Room"
          >
            <span className="material-symbols-outlined text-xl">forum</span>
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: 'Jasprit Bumrah', text: 'Check out Bumrah on FANVERSE' });
              } else {
                setToast('Profile link copied!');
                setTimeout(() => setToast(null), 2000);
              }
            }}
            className="w-11 h-11 rounded-xl bg-[#181e30] border border-[#2b3555] flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
        </div>
      </div>

      {/* Career Metrics Section */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#ff5733]"></span>
            <h2 className="font-space font-bold text-base text-white">Career Metrics</h2>
          </div>
          <span className="text-[10px] font-space font-bold text-[#94a3b8] uppercase tracking-wider">
            ALL FORMATS
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {/* Matches */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <span className="text-[10px] font-space text-[#94a3b8] uppercase tracking-wider">
              MATCHES
            </span>
            <div className="font-space text-2xl font-bold text-white mt-0.5">184</div>
            <span className="text-[10px] text-[#00e475] font-space flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[10px]">verified</span>
              Cap No. 280
            </span>
          </div>

          {/* Wickets */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <span className="text-[10px] font-space text-[#94a3b8] uppercase tracking-wider">
              WICKETS
            </span>
            <div className="font-space text-2xl font-bold text-white mt-0.5">382</div>
            <span className="text-[10px] text-[#94a3b8] font-space mt-0.5 block">
              Strike: 28.1
            </span>
          </div>

          {/* Economy */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <span className="text-[10px] font-space text-[#94a3b8] uppercase tracking-wider">
              ECONOMY
            </span>
            <div className="font-space text-2xl font-bold text-[#00e475] mt-0.5">4.62</div>
            <span className="text-[10px] text-[#00e475] font-space mt-0.5 block">
              RPO Global #1
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2">
          {/* Best Spell */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-space text-[#94a3b8] uppercase tracking-wider">
                BEST SPELL
              </span>
              <div className="font-space text-2xl font-bold text-white mt-0.5">6/19</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ff5733]/20 flex items-center justify-center text-[#ff5733]">
              <span className="material-symbols-outlined text-base">military_tech</span>
            </div>
          </div>

          {/* Bowling Average */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-space text-[#94a3b8] uppercase tracking-wider">
                BOWLING AVG
              </span>
              <div className="font-space text-2xl font-bold text-white mt-0.5">21.4</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#00e475]/20 flex items-center justify-center text-[#00e475]">
              <span className="material-symbols-outlined text-base">radar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Arsenal Section */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#00e475]"></span>
            <h2 className="font-space font-bold text-base text-white">Signature Arsenal</h2>
          </div>
          <span className="text-[10px] font-space font-bold text-[#00e475] uppercase tracking-wider">
            PACE &amp; PRECISION
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#121624] border border-[#1b2136] space-y-3">
          {/* Weapon */}
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#ff5733]/20 flex items-center justify-center text-[#ff5733] shrink-0">
              <span className="material-symbols-outlined text-xl">bolt</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-space font-bold text-xs text-white">Signature Weapon</span>
                <span className="px-2 py-0.2 rounded-full bg-[#ff5733]/20 text-[#ff5733] font-space text-[9px] font-bold">
                  UNPLAYABLE
                </span>
              </div>
              <h3 className="font-space font-bold text-sm text-[#ffdad3] mt-0.5">
                145 km/h Yorker at the Death
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                Late hyperextension release creates deceptive dip beneath batter eye-line.
              </p>
            </div>
          </div>

          {/* Metric 1 */}
          <div className="pt-2 border-t border-[#1b2136]">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <span className="flex items-center gap-1.5 text-white">
                <span className="w-2 h-2 rounded-full bg-[#00e475]"></span>
                Dot Ball Percentage
              </span>
              <span className="font-bold text-[#00e475]">64.2%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1b2136] overflow-hidden">
              <div className="h-full bg-[#00e475] rounded-full" style={{ width: '64.2%' }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="pt-1">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <span className="flex items-center gap-1.5 text-white">
                <span className="material-symbols-outlined text-xs text-[#cdbdff]">timer</span>
                Death Overs Economy (Overs 41-50)
              </span>
              <span className="font-bold text-[#cdbdff]">5.8 RPO</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#1b2136] overflow-hidden">
              <div className="h-full bg-[#9a7bff] rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Form Section */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#cdbdff]"></span>
            <h2 className="font-space font-bold text-base text-white">Recent Form</h2>
          </div>
          <span className="text-[10px] font-space font-bold text-[#94a3b8] uppercase tracking-wider">
            LAST 4 OUTINGS
          </span>
        </div>

        <div className="space-y-2">
          {/* Match 1: Today live */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#00e475]/40 shadow-sm">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.2 rounded-full bg-[#00e475]/20 text-[#00e475] text-[9px] font-bold">
                  LIVE IN PROGRESS
                </span>
                <span className="text-white font-bold">IND vs AUS</span>
              </div>
              <span className="text-[#00e475] font-bold">TODAY</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-space text-lg font-bold text-white">
                2 / 38 <span className="text-xs text-[#94a3b8] font-normal">(8.2 ov)</span>
              </span>
              <span className="text-xs font-space text-[#94a3b8]">4.56 Econ</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-[#1b2136]">
              <span className="text-[10px] font-space text-[#94a3b8] uppercase mr-1">
                CURRENT SPELL:
              </span>
              {['0', '1', 'W', '0', '0'].map((ball, i) => (
                <span
                  key={i}
                  className={`w-5 h-5 rounded-md font-space text-[10px] font-bold flex items-center justify-center ${
                    ball === 'W'
                      ? 'bg-[#ff5733] text-white shadow-sm'
                      : 'bg-[#181e30] text-[#e2e1ee]'
                  }`}
                >
                  {ball}
                </span>
              ))}
            </div>
          </div>

          {/* Match 2: vs SA */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <span className="text-white font-bold">IND vs SA</span>
              <span className="text-[10px] text-[#94a3b8]">NOV 24</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-space text-base font-bold text-white">
                  4 / 22 <span className="text-xs text-[#94a3b8] font-normal">(10.0 ov)</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-[#ff9800]/20 text-[#ff9800] font-space text-[9px] font-bold">
                  ⭐ PLAYER OF THE MATCH
                </span>
              </div>
              <span className="text-xs font-space text-[#94a3b8]">2.20 Econ</span>
            </div>
          </div>

          {/* Match 3: vs ENG */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <span className="text-white font-bold">IND vs ENG</span>
              <span className="text-[10px] text-[#94a3b8]">NOV 19</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-space text-base font-bold text-white">
                3 / 31 <span className="text-xs text-[#94a3b8] font-normal">(9.4 ov)</span>
              </span>
              <span className="text-xs font-space text-[#94a3b8]">3.20 Econ</span>
            </div>
          </div>

          {/* Match 4: vs NZ */}
          <div className="p-3 rounded-2xl bg-[#121624] border border-[#1b2136]">
            <div className="flex items-center justify-between text-xs font-space mb-1">
              <span className="text-white font-bold">IND vs NZ</span>
              <span className="text-[10px] text-[#94a3b8]">NOV 15</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-space text-base font-bold text-white">
                2 / 40 <span className="text-xs text-[#94a3b8] font-normal">(10.0 ov)</span>
              </span>
              <span className="text-xs font-space text-[#94a3b8]">4.00 Econ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fandom Discourse Card */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[#ff5733]"></span>
            <h2 className="font-space font-bold text-base text-white">Fandom Discourse</h2>
          </div>
          <span className="text-[10px] font-space font-bold text-[#00e475] uppercase tracking-wider">
            ACTIVE NOW
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#181e30] to-[#121624] border border-[#2b3555] shadow-lg">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c4dff]/20 flex items-center justify-center text-[#cdbdff] shrink-0">
              <span className="material-symbols-outlined text-xl">psychology</span>
            </div>
            <div className="flex-1">
              <h3 className="font-space font-bold text-sm text-white">Biomechanical Analysis</h3>
              <p className="text-xs text-[#94a3b8] mt-1 leading-relaxed">
                428 fan discussions analyzing Bumrah's hyperextension wrist release and reverse swing trajectory.
              </p>
            </div>
          </div>

          {/* Creators Miniatures */}
          <div className="flex items-center justify-between pt-2 border-t border-[#1b2136] mb-3">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5">
                <span className="w-6 h-6 rounded-full bg-[#0055a5] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#181e30]">
                  AK
                </span>
                <span className="w-6 h-6 rounded-full bg-[#ff5733] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#181e30]">
                  RS
                </span>
                <span className="w-6 h-6 rounded-full bg-[#7c4dff] flex items-center justify-center font-space text-[9px] font-bold text-white border border-[#181e30]">
                  VK
                </span>
              </div>
              <span className="text-[11px] text-[#94a3b8] font-space">+425 creators</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] font-space text-[#00e475] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse"></span>
              18 ONLINE
            </span>
          </div>

          {/* Trigger Button */}
          <button
            onClick={onOpenDiscussion}
            className="w-full py-2.5 px-4 rounded-xl bg-[#1d1f28] hover:bg-[#282a32] border border-[#2b3555] hover:border-[#ff5733] text-white font-space font-bold text-xs flex items-center justify-center gap-2 transition-all group"
          >
            <span className="material-symbols-outlined text-sm text-[#ff5733]">groups</span>
            <span>Join Player Fan Club Room</span>
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
