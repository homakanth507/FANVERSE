import React, { useState } from 'react';
import { ASSETS } from '../assets/images';

interface DiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFanPoints: (points: number) => void;
  userFanPoints: number;
}

interface LocalComment {
  id: string;
  author: string;
  avatar: string;
  roleBadge?: { text: string; bg: string; color: string };
  categoryTag?: string;
  time: string;
  content: string;
  upvotes: number;
  userUpvoted: boolean;
  replies?: Array<{
    id: string;
    author: string;
    avatar: string;
    location?: string;
    time: string;
    content: string;
    upvotes: number;
    userUpvoted: boolean;
  }>;
  reactions?: { [key: string]: number };
  userReactions?: string[];
  mediaClips?: number;
  isHotTake?: boolean;
}

export const DiscussionModal: React.FC<DiscussionModalProps> = ({
  isOpen,
  onClose,
  onAddFanPoints,
}) => {
  const [activeSort, setActiveSort] = useState<'top' | 'newest' | 'pool'>('top');
  const [spoilerActive, setSpoilerActive] = useState<boolean>(false);
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [tipNotification, setTipNotification] = useState<string | null>(null);

  const [comments, setComments] = useState<LocalComment[]>([
    {
      id: 'c1',
      author: '@BumrahYorkerLab',
      avatar: ASSETS.avatars.bumrahYorkerLab,
      roleBadge: { text: '94% Accuracy', bg: 'bg-[#00e475]/15', color: 'text-[#00e475]' },
      time: 'Master Analyst · 28m ago',
      content:
        'Bumrah has executed 14 blockhole yorkers out of 18 deliveries in death overs this series. His dot-ball percentage at the death is 68.4%. Siraj gives pace, but Maxwell feeds off length. Bumrah is the only mathematical choice.',
      upvotes: 184,
      userUpvoted: false,
      replies: [
        {
          id: 'r1',
          author: '@AussieTactics',
          avatar: ASSETS.avatars.aussieTactics,
          location: 'Melbourne, AU',
          time: '15m ago',
          content:
            'Fair point, but Maxwell has pre-shuffled across his stumps twice already tonight. If Bumrah misses that inside block by just 3 inches, it is dispatched over backward point. High risk!',
          upvotes: 42,
          userUpvoted: false,
        },
      ],
    },
    {
      id: 'c2',
      author: '@KavyaFilmReviewer',
      avatar: ASSETS.avatars.kavyaFilmReviewer,
      roleBadge: { text: 'Film Society', bg: 'bg-[#ff5733]/15', color: 'text-[#ff5733]' },
      categoryTag: "DIRECTOR'S EYE",
      time: 'USC Cinema · 1h ago',
      content:
        'Also notice how the stadium camera angles mirror the claustrophobic wide ratios from Nolan’s Dunkirk. The slow zoom on Rohit’s hands setting the slip cordon during the break—incredible broadcast direction tonight!',
      upvotes: 56,
      userUpvoted: false,
      mediaClips: 12,
    },
    {
      id: 'c3',
      author: '@DeathOversPro',
      avatar: ASSETS.avatars.deathOversPro,
      roleBadge: { text: 'PASSION TIER', bg: 'bg-[#93000a]/30', color: 'text-[#ffb4ab]' },
      isHotTake: true,
      time: 'Fandom Pulse · 8m ago',
      content:
        'If Hardik gets the 50th over instead of Bumrah, I am literally unplugging my router and walking into the sea 😭 Do NOT overthink this management!',
      upvotes: 38,
      userUpvoted: false,
      reactions: {
        '🔥': 24,
        '😂': 89,
        '👏': 12,
      },
      userReactions: [],
    },
  ]);

  if (!isOpen) return null;

  const handleUpvote = (id: string, isReply = false, replyId?: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (!isReply && c.id === id) {
          const voted = !c.userUpvoted;
          return {
            ...c,
            upvotes: voted ? c.upvotes + 1 : c.upvotes - 1,
            userUpvoted: voted,
          };
        }
        if (isReply && c.replies) {
          return {
            ...c,
            replies: c.replies.map((r) => {
              if (r.id === replyId) {
                const voted = !r.userUpvoted;
                return {
                  ...r,
                  upvotes: voted ? r.upvotes + 1 : r.upvotes - 1,
                  userUpvoted: voted,
                };
              }
              return r;
            }),
          };
        }
        return c;
      })
    );
  };

  const handleReaction = (commentId: string, emoji: string) => {
    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId && c.reactions) {
          const userHasReacted = c.userReactions?.includes(emoji);
          const currentCount = c.reactions[emoji] || 0;
          return {
            ...c,
            reactions: {
              ...c.reactions,
              [emoji]: userHasReacted ? Math.max(0, currentCount - 1) : currentCount + 1,
            },
            userReactions: userHasReacted
              ? (c.userReactions || []).filter((e) => e !== emoji)
              : [...(c.userReactions || []), emoji],
          };
        }
        return c;
      })
    );
  };

  const handleTip = (author: string) => {
    onAddFanPoints(10);
    setTipNotification(`Tipped +10 FanPts to ${author}!`);
    setTimeout(() => setTipNotification(null), 2500);
  };

  const handlePostComment = () => {
    if (!newCommentText.trim()) return;
    const newComment: LocalComment = {
      id: `c_${Date.now()}`,
      author: '@FanAnalyst_You',
      avatar: ASSETS.avatars.currentUser,
      roleBadge: { text: 'VERIFIED FAN', bg: 'bg-[#ff5733]/20', color: 'text-[#ff5733]' },
      time: 'Just now',
      content: spoilerActive ? `[Spoiler Tagged] ${newCommentText}` : newCommentText,
      upvotes: 1,
      userUpvoted: true,
      reactions: { '🔥': 1 },
      userReactions: ['🔥'],
    };
    setComments([newComment, ...comments]);
    setNewCommentText('');
    setSpoilerActive(false);
    onAddFanPoints(25); // reward for participating
  };

  const addEmojiToInput = (emoji: string) => {
    setNewCommentText((prev) => `${prev} ${emoji}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Toast Alert */}
      {tipNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 bg-[#7c4dff] text-white font-space font-bold text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-1.5 border border-[#cdbdff]/30">
          <span className="material-symbols-outlined text-sm">diamond</span>
          {tipNotification}
        </div>
      )}

      {/* Sheet Container */}
      <div className="flex flex-col w-full max-h-[92vh] bg-[#0c0e16] rounded-t-3xl border-t border-[#2b3555] shadow-2xl relative overflow-hidden">
        {/* Top Handle */}
        <div className="flex justify-center items-center py-2 w-full shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-[#33343e]"></div>
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#1b2136] shrink-0">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1d1f28] hover:bg-[#282a32] text-[#e2e1ee] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="flex flex-col">
              <h1 className="font-space font-bold text-base text-white tracking-tight flex items-center gap-1.5">
                Discussion
                <span className="font-space text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ff5733]/20 text-[#ff5733]">
                  {214 + (comments.length - 3)}
                </span>
              </h1>
              <span className="text-[11px] text-[#ab8982]">Live Stadium Room · IND v AUS</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1d1f28] border border-[#00e475]/30">
            <span className="w-2 h-2 rounded-full bg-[#00e475] animate-pulse"></span>
            <span className="font-space text-[10px] font-bold text-[#00e475] tracking-wider uppercase">
              Live Feed
            </span>
          </div>
        </div>

        {/* Scrollable Thread Content */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 pb-32 no-scrollbar">
          {/* Pinned Hot Take */}
          <div className="p-3.5 rounded-2xl bg-[#191b24] border border-[#2b3555] shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full overflow-hidden bg-[#33343e] shrink-0 border border-[#2b3555]">
                  <img
                    src={ASSETS.avatars.cricTacticsLab}
                    alt="CricTacticsLab"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-space text-xs font-bold text-white">@CricTacticsLab</span>
                    <span className="font-space text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#00e475]/15 text-[#00e475]">
                      PRO ANALYST
                    </span>
                  </div>
                  <span className="text-[10px] text-[#ab8982]">Match Day 3 · 2m ago</span>
                </div>
              </div>
              <span className="font-space text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#33343e] text-[#ffb4a4]">
                CRICKET · DEATH OVERS
              </span>
            </div>
            <p className="text-xs text-[#e4beb6] font-medium leading-relaxed">
              Who bowls the 50th over with Australia needing 11 runs with Maxwell &amp; Starc at the crease? Bumrah has 1 over left, Siraj has 1. Do we risk pace variation or stick to blockhole fire?
            </p>
            <div className="flex items-center gap-3 mt-2.5 pt-2 border-t border-[#2b3555]/50 text-[#ab8982] font-space text-[11px]">
              <span className="flex items-center gap-1 text-white">
                <span className="material-symbols-outlined text-xs text-[#00e475]">insights</span>
                89% Win Predictor
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-[#ff5733]">local_fire_department</span>
                1.4k voting live
              </span>
            </div>
          </div>

          {/* Filters & Sort Bar */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveSort('top')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-space text-[11px] font-bold transition-all ${
                  activeSort === 'top'
                    ? 'bg-[#ff5733] text-white shadow-sm'
                    : 'bg-[#1d1f28] text-[#ab8982] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xs">trending_up</span>
                Top Rated
              </button>
              <button
                onClick={() => setActiveSort('newest')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-space text-[11px] font-bold transition-all ${
                  activeSort === 'newest'
                    ? 'bg-[#ff5733] text-white shadow-sm'
                    : 'bg-[#1d1f28] text-[#ab8982] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xs">schedule</span>
                Live Newest
              </button>
              <button
                onClick={() => setActiveSort('pool')}
                className={`flex items-center gap-1 px-3 py-1 rounded-full font-space text-[11px] font-bold transition-all ${
                  activeSort === 'pool'
                    ? 'bg-[#ff5733] text-white shadow-sm'
                    : 'bg-[#1d1f28] text-[#ab8982] hover:text-white'
                }`}
              >
                <span className="material-symbols-outlined text-xs">token</span>
                FanPoints Pool
              </button>
            </div>
            <button className="p-1.5 rounded-lg text-[#ab8982] hover:text-white bg-[#1d1f28]">
              <span className="material-symbols-outlined text-sm">tune</span>
            </button>
          </div>

          {/* AI Assisted Fact Check Card */}
          <div className="p-3 rounded-xl bg-[#1d1f28] border border-[#7c4dff]/40 flex items-start gap-2.5 shadow-md">
            <div className="w-7 h-7 rounded-lg bg-[#9a7bff]/30 flex items-center justify-center shrink-0 text-[#cdbdff]">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-space text-[10px] font-bold text-[#cdbdff] uppercase tracking-wider">
                  FANVERSE Intelligence · Match Pulse
                </span>
                <span className="font-space text-[9px] text-[#ab8982]">Verified Match Feed</span>
              </div>
              <p className="text-xs text-[#e2e1ee] mt-1 leading-relaxed">
                <strong className="text-[#ffb4a4] font-semibold">Bumrah vs Maxwell at Death (Overs 47-50):</strong> 12 deliveries, 9 dot balls, 1 wicket, only 7 runs allowed. Maxwell strikes at only 58.3 SR against Jasprit's yorker line.
              </p>
            </div>
          </div>

          {/* Comment Threads */}
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col bg-[#191b24] p-3.5 rounded-2xl border border-[#1b2136] shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-[#33343e] shrink-0 border border-[#2b3555]">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-space text-xs font-bold text-white">
                        {comment.author}
                      </span>
                      {comment.roleBadge && (
                        <span
                          className={`font-space text-[9px] font-bold px-1.5 py-0.2 rounded-full ${comment.roleBadge.bg} ${comment.roleBadge.color}`}
                        >
                          {comment.roleBadge.text}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#ab8982]">{comment.time}</span>
                  </div>
                </div>

                {/* Top right badges / Tip Button */}
                {comment.categoryTag ? (
                  <span className="font-space text-[9px] font-bold px-2 py-0.5 rounded bg-[#1d1f28] text-[#cdbdff]">
                    {comment.categoryTag}
                  </span>
                ) : comment.isHotTake ? (
                  <span className="font-space text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#93000a]/20 text-[#ffb4ab] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[10px]">warning</span> Hot Take
                  </span>
                ) : (
                  <button
                    onClick={() => handleTip(comment.author)}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1d1f28] hover:bg-[#9a7bff]/20 text-[#cdbdff] transition-all cursor-pointer font-space text-[10px] font-bold active:scale-95"
                  >
                    <span className="material-symbols-outlined text-xs">diamond</span>
                    <span>+10 FanPts</span>
                  </button>
                )}
              </div>

              <p className="text-xs text-[#e2e1ee] mt-2.5 leading-relaxed">{comment.content}</p>

              {/* Reaction Badges for Hot Takes */}
              {comment.reactions && (
                <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
                  {Object.entries(comment.reactions).map(([emoji, count]) => {
                    const active = comment.userReactions?.includes(emoji);
                    return (
                      <button
                        key={emoji}
                        onClick={() => handleReaction(comment.id, emoji)}
                        className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-space text-xs transition-all active:scale-95 ${
                          active
                            ? 'bg-[#282a32] text-white border border-[#ff5733]'
                            : 'bg-[#1d1f28] text-[#ab8982] border border-transparent hover:text-white'
                        }`}
                      >
                        <span>{emoji}</span>
                        <span className="text-[10px] font-bold">{count}</span>
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handleReaction(comment.id, '🔥')}
                    className="w-6 h-6 rounded-full bg-[#1d1f28] text-[#ab8982] hover:text-white flex items-center justify-center"
                  >
                    <span className="material-symbols-outlined text-xs">add_reaction</span>
                  </button>
                </div>
              )}

              {/* Action Buttons Strip */}
              <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1b2136] text-[#ab8982] text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(comment.id)}
                    className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-space text-xs font-bold transition-all active:scale-90 ${
                      comment.userUpvoted
                        ? 'bg-[#ff5733]/20 text-[#ff5733]'
                        : 'bg-[#1d1f28] text-[#e2e1ee] hover:bg-[#282a32]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xs text-[#ff5733]">arrow_upward</span>
                    <span>{comment.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#1d1f28] hover:bg-[#282a32] font-space text-xs text-[#ab8982] hover:text-white">
                    <span className="material-symbols-outlined text-xs">chat_bubble</span>
                    <span>Reply</span>
                  </button>
                </div>

                {comment.mediaClips ? (
                  <span className="flex items-center gap-1 text-[11px] font-space text-[#ab8982]">
                    <span className="material-symbols-outlined text-xs">local_movies</span>
                    {comment.mediaClips} Media Clips Attached
                  </span>
                ) : (
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded-full hover:bg-[#1d1f28] hover:text-white">
                      <span className="material-symbols-outlined text-sm">bookmark</span>
                    </button>
                    <button className="p-1 rounded-full hover:bg-[#1d1f28] hover:text-white">
                      <span className="material-symbols-outlined text-sm">share</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Nested Reply */}
              {comment.replies &&
                comment.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="mt-3 ml-2 pl-3.5 relative flex flex-col space-y-1.5"
                  >
                    {/* Branch Line */}
                    <div className="absolute left-0 top-1 bottom-2 w-0.5 bg-[#33343e] rounded-full"></div>
                    <div className="bg-[#1d1f28] p-2.5 rounded-xl border border-[#2b3555]/60">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-[#33343e] shrink-0">
                            <img
                              src={reply.avatar}
                              alt={reply.author}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="font-space text-xs font-bold text-white">
                            {reply.author}
                          </span>
                          <span className="text-[10px] text-[#ab8982]">{reply.time}</span>
                        </div>
                        {reply.location && (
                          <span className="text-[9px] font-space px-1.5 py-0.2 rounded bg-[#282a32] text-[#ab8982]">
                            {reply.location}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#e4beb6]">{reply.content}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] font-space text-[#ab8982]">
                        <button
                          onClick={() => handleUpvote(comment.id, true, reply.id)}
                          className="flex items-center gap-1 hover:text-white"
                        >
                          <span className="material-symbols-outlined text-xs text-[#ff5733]">arrow_upward</span>
                          <span>{reply.upvotes}</span>
                        </button>
                        <button className="hover:text-white">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>

        {/* Sticky Bottom Comment Composer */}
        <div className="absolute bottom-0 left-0 right-0 z-40 bg-[#0c0e16]/95 backdrop-blur-md px-4 pt-2 pb-3 border-t border-[#1b2136] flex flex-col gap-2">
          {/* Quick React Row & Spoiler Shield Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-space text-[10px] font-bold text-[#ab8982] uppercase tracking-wider">
                Quick React:
              </span>
              <div className="flex items-center gap-1">
                {['🔥', '🏏', '🍿', '💡', '👏'].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addEmojiToInput(emoji)}
                    className="px-2 py-0.5 rounded-full bg-[#1d1f28] hover:bg-[#282a32] text-xs transition-transform active:scale-125"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Spoiler Shield Switch */}
            <button
              onClick={() => setSpoilerActive(!spoilerActive)}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-space text-[10px] font-bold transition-all ${
                spoilerActive
                  ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                  : 'bg-[#1d1f28] text-[#ab8982] border border-transparent'
              }`}
            >
              <span className="material-symbols-outlined text-xs">shield</span>
              <span>Spoiler Tag</span>
            </button>
          </div>

          {/* Main Input Row */}
          <div className="flex items-center gap-2 bg-[#191b24] px-3 py-1.5 rounded-2xl border border-[#2b3555]">
            <div className="w-7 h-7 rounded-full overflow-hidden bg-[#33343e] shrink-0 border border-[#2b3555]">
              <img
                src={ASSETS.avatars.currentUser}
                alt="Me"
                className="w-full h-full object-cover"
              />
            </div>
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePostComment();
              }}
              placeholder="Share your perspective or analysis..."
              className="flex-1 bg-transparent text-xs text-[#e2e1ee] placeholder:text-[#ab8982] focus:outline-none font-medium"
            />
            <div className="flex items-center gap-0.5 text-[#ab8982]">
              <button 
                onClick={() => addEmojiToInput('🎥')} 
                className="p-1 rounded-full hover:bg-[#1d1f28] hover:text-white"
              >
                <span className="material-symbols-outlined text-base">gif_box</span>
              </button>
              <button 
                onClick={() => setNewCommentText((prev) => `${prev} @`)}
                className="p-1 rounded-full hover:bg-[#1d1f28] hover:text-white"
              >
                <span className="material-symbols-outlined text-base">alternate_email</span>
              </button>
            </div>
            <button
              onClick={handlePostComment}
              disabled={!newCommentText.trim()}
              className="w-8 h-8 rounded-full bg-[#ff5733] text-white flex items-center justify-center disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#ff5733]/30"
            >
              <span className="material-symbols-outlined text-sm font-bold">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
