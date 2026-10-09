import React, { useState } from 'react';
import { ASSETS } from '../assets/images';

interface MovieDetailScreenProps {
  onBack: () => void;
  onOpenDiscussion: () => void;
  onAddFanPoints: (points: number) => void;
}

export const MovieDetailScreen: React.FC<MovieDetailScreenProps> = ({
  onBack,
  onOpenDiscussion,
  onAddFanPoints,
}) => {
  const [userRating, setUserRating] = useState<number | null>(9);
  const [inWatchlist, setInWatchlist] = useState<boolean>(true);
  const [revealedSpoiler, setRevealedSpoiler] = useState<boolean>(false);
  const [activeReviewFilter, setActiveReviewFilter] = useState<'all' | 'verified' | 'critics'>('all');
  const [helpfulCounts, setHelpfulCounts] = useState<{ [id: string]: number }>({
    r1: 248,
    r2: 112,
    r3: 89,
  });
  const [userHelpful, setUserHelpful] = useState<{ [id: string]: boolean }>({});
  const [showReviewComposer, setShowReviewComposer] = useState<boolean>(false);
  const [newReviewText, setNewReviewText] = useState<string>('');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleHelpful = (id: string) => {
    const isVoted = userHelpful[id];
    setUserHelpful((prev) => ({ ...prev, [id]: !isVoted }));
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: isVoted ? prev[id] - 1 : prev[id] + 1,
    }));
    if (!isVoted) {
      onAddFanPoints(5);
    }
  };

  const handleRate = (rating: number) => {
    setUserRating(rating);
    onAddFanPoints(20);
    showToast(`Rated Chrono Horizon ${rating}/10! +20 FanPoints`);
  };

  const handleSubmitReview = () => {
    if (!newReviewText.trim()) return;
    onAddFanPoints(50);
    setShowReviewComposer(false);
    setNewReviewText('');
    showToast('Review published to FanPulse! +50 FanPoints earned.');
  };

  return (
    <div className="flex flex-col w-full pb-32 relative">
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
          Chrono Horizon
        </span>

        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-[#181e30] flex items-center justify-center text-[#94a3b8] hover:text-white transition-colors">
            <span className="material-symbols-outlined text-lg">share</span>
          </button>
          <button
            onClick={() => {
              setInWatchlist(!inWatchlist);
              showToast(inWatchlist ? 'Removed from Watchlist' : 'Saved to Watchlist!');
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              inWatchlist
                ? 'bg-[#181e30] text-[#00e475] border border-[#00e475]/40'
                : 'bg-[#181e30] text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {inWatchlist ? 'bookmark_added' : 'bookmark'}
            </span>
          </button>
        </div>
      </div>

      {/* Movie Identity & Banner Card */}
      <div className="px-4 py-3">
        <div className="flex items-start gap-3.5">
          {/* Poster Miniature */}
          <div className="w-20 aspect-[2/3] rounded-2xl overflow-hidden bg-[#181e30] border border-[#2b3555] shadow-xl shrink-0">
            <img
              src={ASSETS.chronoHorizonPoster}
              alt="Chrono Horizon"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.2 rounded-full bg-[#ff5733]/15 text-[#ff5733] font-space text-[9px] font-bold">
                IMAX 70MM
              </span>
              <span className="text-[11px] font-space text-[#94a3b8]">2025</span>
            </div>

            <h1 className="font-space font-bold text-xl text-white tracking-tight mt-1">
              Chrono Horizon
            </h1>

            <p className="text-xs text-[#94a3b8] mt-0.5">Dir. Christopher Nolan • 2h 48m</p>

            <div className="mt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475] font-space text-[10px] font-bold border border-[#00e475]/30">
                <span className="material-symbols-outlined text-xs">verified</span>
                Universal Acclaim
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Big Score & Breakdown Card */}
      <div className="px-4 mb-4">
        <div className="p-4 rounded-2xl bg-[#121624] border border-[#1b2136] shadow-xl">
          <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#1b2136]">
            {/* Left Big Score */}
            <div className="flex flex-col justify-center">
              <div className="flex items-baseline gap-1">
                <span className="font-space text-4xl font-bold text-white tracking-tight">9.4</span>
                <span className="font-space text-sm text-[#94a3b8]">/ 10</span>
              </div>
              <div className="flex items-center gap-0.5 text-[#ff5733] my-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-base">
                    star
                  </span>
                ))}
              </div>
              <span className="font-space text-[11px] text-[#94a3b8]">
                34.2k Verified Ratings
              </span>
            </div>

            {/* Right Rating Distribution */}
            <div className="flex flex-col justify-center space-y-1.5 font-space text-[10px]">
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8]">Masterpiece</span>
                <div className="w-16 h-1.5 rounded-full bg-[#1b2136] overflow-hidden ml-2">
                  <div className="h-full bg-[#ff5733] rounded-full" style={{ width: '72%' }}></div>
                </div>
                <span className="text-white font-bold ml-1.5">72%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8]">Great</span>
                <div className="w-16 h-1.5 rounded-full bg-[#1b2136] overflow-hidden ml-2">
                  <div className="h-full bg-[#00e475] rounded-full" style={{ width: '16%' }}></div>
                </div>
                <span className="text-white font-bold ml-1.5">16%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8]">Good</span>
                <div className="w-16 h-1.5 rounded-full bg-[#1b2136] overflow-hidden ml-2">
                  <div className="h-full bg-[#cdbdff] rounded-full" style={{ width: '8%' }}></div>
                </div>
                <span className="text-white font-bold ml-1.5">8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8]">Mixed</span>
                <div className="w-16 h-1.5 rounded-full bg-[#1b2136] overflow-hidden ml-2">
                  <div className="h-full bg-[#64748b] rounded-full" style={{ width: '4%' }}></div>
                </div>
                <span className="text-white font-bold ml-1.5">4%</span>
              </div>
            </div>
          </div>

          {/* Platform Scores */}
          <div className="grid grid-cols-3 gap-2 pt-3 font-space text-center">
            <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
              <span className="text-[9px] text-[#94a3b8] font-bold tracking-wider uppercase block">
                IMDB
              </span>
              <span className="font-bold text-sm text-white mt-0.5 block">8.9/10</span>
            </div>
            <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
              <span className="text-[9px] text-[#94a3b8] font-bold tracking-wider uppercase block">
                ROTTEN TOM.
              </span>
              <span className="font-bold text-sm text-[#00e475] mt-0.5 block">93% Fresh</span>
            </div>
            <div className="p-2 rounded-xl bg-[#0c0e16]/60 border border-[#1b2136]">
              <span className="text-[9px] text-[#94a3b8] font-bold tracking-wider uppercase block">
                FAN PULSE
              </span>
              <span className="font-bold text-sm text-[#ff5733] mt-0.5 block">98% Hype</span>
            </div>
          </div>
        </div>
      </div>

      {/* "YOUR VERDICT" Rating & Actions */}
      <div className="px-4 mb-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#181e30] to-[#121624] border border-[#2b3555] shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-space text-[10px] text-[#94a3b8] uppercase font-bold tracking-wider block">
                YOUR VERDICT
              </span>
              <h2 className="font-space font-bold text-sm text-white">Rate Chrono Horizon</h2>
            </div>
            {inWatchlist && (
              <span className="flex items-center gap-1 font-space text-[10px] font-bold text-[#00e475] bg-[#00e475]/15 px-2 py-0.5 rounded-full border border-[#00e475]/30">
                <span className="material-symbols-outlined text-xs">check</span>
                In Watchlist
              </span>
            )}
          </div>

          {/* Interactive 10-Star Rating Strip */}
          <div className="flex items-center justify-between my-2.5 overflow-x-auto py-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
              <button
                key={star}
                onClick={() => handleRate(star)}
                className={`flex flex-col items-center gap-0.5 p-1 rounded-lg transition-transform active:scale-125 ${
                  userRating && userRating >= star ? 'text-[#ff5733]' : 'text-[#64748b]'
                }`}
              >
                <span className="material-symbols-outlined text-lg">star</span>
                <span className="font-space text-[9px] font-bold">{star}</span>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => setShowReviewComposer(!showReviewComposer)}
              className="flex-1 py-2 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white font-space font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#ff5733]/30 hover:opacity-95 transition-all"
            >
              <span className="material-symbols-outlined text-sm">edit_note</span>
              <span>Write Review</span>
            </button>
            <button
              onClick={() => showToast('Quick Log saved to history!')}
              className="py-2 px-3.5 rounded-xl bg-[#181e30] border border-[#2b3555] hover:border-white/40 font-space text-xs font-bold text-white flex items-center gap-1 transition-all"
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              <span>Quick Log</span>
            </button>
          </div>

          {/* Inline Review Composer */}
          {showReviewComposer && (
            <div className="mt-3 pt-3 border-t border-[#1b2136] animate-fadeIn">
              <textarea
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                placeholder="Write your analysis of the film..."
                className="w-full bg-[#0c0e16] border border-[#2b3555] rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-[#ff5733] h-20 resize-none font-medium"
              ></textarea>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => setShowReviewComposer(false)}
                  className="px-3 py-1 rounded-lg font-space text-xs text-[#94a3b8]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReview}
                  className="px-3 py-1 rounded-lg bg-[#ff5733] font-space text-xs font-bold text-white"
                >
                  Post Review
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Filter Tabs */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveReviewFilter('all')}
            className={`px-3 py-1 rounded-full font-space text-xs font-semibold transition-all ${
              activeReviewFilter === 'all'
                ? 'bg-[#181e30] text-white border border-[#ff5733]'
                : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136]'
            }`}
          >
            All (1,480)
          </button>
          <button
            onClick={() => setActiveReviewFilter('verified')}
            className={`px-3 py-1 rounded-full font-space text-xs font-semibold transition-all ${
              activeReviewFilter === 'verified'
                ? 'bg-[#181e30] text-white border border-[#ff5733]'
                : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136]'
            }`}
          >
            Verified Fans
          </button>
          <button
            onClick={() => setActiveReviewFilter('critics')}
            className={`px-3 py-1 rounded-full font-space text-xs font-semibold transition-all ${
              activeReviewFilter === 'critics'
                ? 'bg-[#181e30] text-white border border-[#ff5733]'
                : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136]'
            }`}
          >
            Film Critics &amp; Students
          </button>
        </div>
      </div>

      {/* Reviews Feed */}
      <div className="px-4 space-y-3">
        {/* Review 1: Priya S. */}
        <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136] shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.avatars.priyaS}
                  alt="Priya S."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-xs text-white">Priya S.</span>
                  <span className="font-space text-[9px] font-bold px-2 py-0.2 rounded-full bg-[#7c4dff]/20 text-[#cdbdff]">
                    Verified Critic • USC Cinema
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8]">4h ago</span>
              </div>
            </div>
            <span className="font-space text-xs font-bold text-[#ffb4a4] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">star</span>
              10/10
            </span>
          </div>

          <h3 className="font-space font-bold text-xs text-white mt-2.5">
            Ludwig Göransson and Nolan redefine acoustic scale in 70mm.
          </h3>
          <p className="text-xs text-[#e4beb6] mt-1 leading-relaxed">
            The psychoacoustic pacing in the docking sequence is an engineering triumph. You don’t just watch this film, the low-frequency rumble commands physical attention. A transcendent cinema milestone.
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1b2136] text-[#94a3b8] text-xs font-space">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleHelpful('r1')}
                className={`flex items-center gap-1 hover:text-white transition-colors ${
                  userHelpful['r1'] ? 'text-[#ff5733] font-bold' : ''
                }`}
              >
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                <span>Helpful ({helpfulCounts['r1']})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span>34</span>
              </button>
            </div>
            <button className="hover:text-white">
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>

        {/* Review 2: Aarav M. */}
        <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136] shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.avatars.aaravM}
                  alt="Aarav M."
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-xs text-white">Aarav M.</span>
                  <span className="font-space text-[9px] font-bold px-2 py-0.2 rounded-full bg-[#00e475]/15 text-[#00e475]">
                    Verified Ticket Holder
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8]">Yesterday</span>
              </div>
            </div>
            <span className="font-space text-xs font-bold text-[#ffb4a4] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">star</span>
              9/10
            </span>
          </div>

          <h3 className="font-space font-bold text-xs text-white mt-2.5">
            A mind-bending cerebral experience that demands repeat viewings.
          </h3>
          <p className="text-xs text-[#e4beb6] mt-1 leading-relaxed">
            Leaves you questioning the nature of temporal anchors. Nolan keeps practical cinematography at the core. Minor dialogue pacing in Act 2, but Act 3 is pure cinema.
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1b2136] text-[#94a3b8] text-xs font-space">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleHelpful('r2')}
                className={`flex items-center gap-1 hover:text-white transition-colors ${
                  userHelpful['r2'] ? 'text-[#ff5733] font-bold' : ''
                }`}
              >
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                <span>Helpful ({helpfulCounts['r2']})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span>18</span>
              </button>
            </div>
            <button className="hover:text-white">
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>

        {/* Review 3: DevScriptLab with Spoiler Shield */}
        <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136] shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#181e30] border border-[#2b3555] font-space text-xs font-bold text-white flex items-center justify-center shrink-0">
                D
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-space font-bold text-xs text-white">DevScriptLab</span>
                  <span className="font-space text-[9px] font-bold px-2 py-0.2 rounded-full bg-[#181e30] text-[#cdbdff]">
                    Film Society
                  </span>
                </div>
                <span className="text-[10px] text-[#94a3b8]">2d ago</span>
              </div>
            </div>
            <span className="font-space text-xs font-bold text-[#ffb4a4] flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">star</span>
              9.5/10
            </span>
          </div>

          {/* Spoiler Shield Protected Card */}
          <div
            onClick={() => setRevealedSpoiler(!revealedSpoiler)}
            className={`mt-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
              revealedSpoiler
                ? 'bg-[#181e30] border-[#00e475]/40 text-[#e2e1ee]'
                : 'bg-[#0c0e16]/80 border-[#2b3555] text-center hover:border-[#ff5733]'
            }`}
          >
            {!revealedSpoiler ? (
              <div className="flex flex-col items-center py-2">
                <div className="flex items-center gap-1.5 text-xs font-space font-bold text-[#ffb4a4] mb-1">
                  <span className="material-symbols-outlined text-sm">shield</span>
                  Spoiler Shield Protected
                </div>
                <p className="text-[11px] text-[#94a3b8] max-w-xs">
                  Tap anywhere to reveal spoiler analysis on the black hole sequence &amp; ending mechanics.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-[10px] font-space text-[#00e475] font-bold mb-1">
                  <span>SPOILER REVEALED</span>
                  <span>Tap to re-hide</span>
                </div>
                <p className="text-xs leading-relaxed text-[#e4beb6]">
                  The final temporal divergence paradox reveals that the protagonist is not traveling backwards in linear time, but rather inhabiting the gravitational singularity's folded acoustic horizon. The grandfather paradox is resolved through observer entanglement!
                </p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1b2136] text-[#94a3b8] text-xs font-space">
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleHelpful('r3')}
                className={`flex items-center gap-1 hover:text-white transition-colors ${
                  userHelpful['r3'] ? 'text-[#ff5733] font-bold' : ''
                }`}
              >
                <span className="material-symbols-outlined text-sm">thumb_up</span>
                <span>Helpful ({helpfulCounts['r3']})</span>
              </button>
              <button className="flex items-center gap-1 hover:text-white">
                <span className="material-symbols-outlined text-sm">chat_bubble</span>
                <span>42</span>
              </button>
            </div>
            <button className="hover:text-white">
              <span className="material-symbols-outlined text-base">share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Sticky Theory Room Banner */}
      <div className="fixed bottom-16 left-4 right-4 max-w-md mx-auto z-30">
        <div
          onClick={onOpenDiscussion}
          className="p-3 rounded-2xl bg-[#121624]/95 backdrop-blur-md border border-[#ff5733]/50 hover:border-[#ff5733] shadow-2xl cursor-pointer flex items-center justify-between group transition-all"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#ff5733]/20 flex items-center justify-center text-[#ff5733]">
              <span className="material-symbols-outlined text-lg">forum</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse"></span>
                <span className="font-space text-[10px] font-bold text-[#00e475] uppercase tracking-wider">
                  Live Theory Room
                </span>
              </div>
              <p className="font-space font-bold text-xs text-white truncate max-w-[210px]">
                Join 214 fans debating right n...
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-sm text-[#ff5733] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </div>
      </div>
    </div>
  );
};
