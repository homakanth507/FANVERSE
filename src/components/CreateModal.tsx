import React, { useState } from 'react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostSuccess: (title: string, pointsEarned: number) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onPostSuccess,
}) => {
  const [postType, setPostType] = useState<'hottake' | 'tactics' | 'theory'>('hottake');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'cricket' | 'cinema'>('cricket');
  const [isSpoiler, setIsSpoiler] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!text.trim()) return;
    onPostSuccess(text, 50);
    setText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-[#0c0e16] rounded-t-3xl border-t border-[#2b3555] p-4 shadow-2xl flex flex-col space-y-3 pb-8">
        <div className="flex justify-center py-1">
          <div className="w-10 h-1 rounded-full bg-[#33343e]"></div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ff5733]/20 flex items-center justify-center text-[#ff5733]">
              <span className="material-symbols-outlined text-lg">edit_square</span>
            </div>
            <div>
              <h2 className="font-space font-bold text-base text-white">Create Fandom Take</h2>
              <p className="text-[10px] text-[#94a3b8]">Share with 214+ active stadium &amp; cinema analysts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#181e30] text-[#94a3b8] hover:text-white flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        {/* Post Type Chips */}
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setPostType('hottake')}
            className={`px-3 py-1 rounded-full font-space text-xs font-bold transition-all flex items-center gap-1 ${
              postType === 'hottake'
                ? 'bg-[#ff5733] text-white shadow-md'
                : 'bg-[#181e30] text-[#94a3b8]'
            }`}
          >
            <span>🔥 Hot Take</span>
          </button>
          <button
            onClick={() => setPostType('tactics')}
            className={`px-3 py-1 rounded-full font-space text-xs font-bold transition-all flex items-center gap-1 ${
              postType === 'tactics'
                ? 'bg-[#00e475] text-[#003918] shadow-md'
                : 'bg-[#181e30] text-[#94a3b8]'
            }`}
          >
            <span>⚡ Community Tactics</span>
          </button>
          <button
            onClick={() => setPostType('theory')}
            className={`px-3 py-1 rounded-full font-space text-xs font-bold transition-all flex items-center gap-1 ${
              postType === 'theory'
                ? 'bg-[#7c4dff] text-white shadow-md'
                : 'bg-[#181e30] text-[#94a3b8]'
            }`}
          >
            <span>🎬 Film Theory</span>
          </button>
        </div>

        {/* Subject Domain */}
        <div className="flex items-center justify-between text-xs font-space pt-1">
          <div className="flex items-center gap-2">
            <span className="text-[#94a3b8] text-[11px]">Domain:</span>
            <button
              onClick={() => setCategory('cricket')}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-all ${
                category === 'cricket'
                  ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                  : 'text-[#94a3b8]'
              }`}
            >
              🏏 Cricket Live
            </button>
            <button
              onClick={() => setCategory('cinema')}
              className={`px-2.5 py-0.5 rounded-md font-bold transition-all ${
                category === 'cinema'
                  ? 'bg-[#ff5733]/20 text-[#ff5733] border border-[#ff5733]'
                  : 'text-[#94a3b8]'
              }`}
            >
              🍿 Cinema 70mm
            </button>
          </div>

          <button
            onClick={() => setIsSpoiler(!isSpoiler)}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] transition-all ${
              isSpoiler
                ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                : 'bg-[#181e30] text-[#94a3b8]'
            }`}
          >
            <span className="material-symbols-outlined text-xs">shield</span>
            <span>Spoiler Shield</span>
          </button>
        </div>

        {/* Text Input */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={
            postType === 'hottake'
              ? 'Drop an unhinged match take or director hot take...'
              : postType === 'tactics'
              ? 'Which bowler delivers the yorker sequence in the 50th over?'
              : 'Break down the acoustic pacing or temporal paradox...'
          }
          className="w-full h-28 bg-[#121624] border border-[#2b3555] focus:border-[#ff5733] rounded-2xl p-3 text-xs text-white placeholder:text-[#94a3b8] focus:outline-none resize-none"
        ></textarea>

        {/* Submit */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-space text-[#00e475] font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-xs">token</span>
            Earn +50 FanPoints upon posting
          </span>

          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="py-2 px-5 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white font-space font-bold text-xs shadow-lg shadow-[#ff5733]/30 disabled:opacity-40 hover:opacity-95 transition-all"
          >
            Broadcast Take
          </button>
        </div>
      </div>
    </div>
  );
};
