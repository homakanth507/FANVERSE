import React, { useState } from 'react';
import { ScreenType } from '../types';
import { ASSETS } from '../assets/images';

interface MoviesScreenProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenMovieDetail: (movieId: string) => void;
}

export const MoviesScreen: React.FC<MoviesScreenProps> = ({
  onNavigate,
  onOpenMovieDetail,
}) => {
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [watchlist, setWatchlist] = useState<{ [id: string]: boolean }>({
    chrono: true,
    interstellar: true,
  });
  const [reminders, setReminders] = useState<{ [id: string]: boolean }>({});

  const toggleWatchlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWatchlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Header Info */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="font-space text-[11px] font-bold text-[#ab8982] uppercase tracking-wider">
            CINEMA &amp; RELEASES
          </span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475] border border-[#00e475]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e475] animate-pulse"></span>
            <span className="font-space text-[10px] font-bold tracking-wider uppercase">
              Live Festival Discourse
            </span>
          </div>
        </div>
        <h1 className="font-space font-bold text-2xl text-white tracking-tight">Movies</h1>
      </div>

      {/* Search Input Bar */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-2 bg-[#121624] px-3.5 py-2.5 rounded-2xl border border-[#1b2136] focus-within:border-[#ff5733] transition-colors">
          <span className="material-symbols-outlined text-[#ab8982] text-lg">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies, directors, genres..."
            className="flex-1 bg-transparent text-xs text-white placeholder:text-[#ab8982] focus:outline-none font-medium"
          />
          <button className="text-[#ab8982] hover:text-white">
            <span className="material-symbols-outlined text-lg">tune</span>
          </button>
        </div>
      </div>

      {/* Genre Filter Pills */}
      <div className="flex items-center gap-2 px-4 mb-4 overflow-x-auto no-scrollbar">
        {['All', 'Sci-Fi', 'Action', 'Drama', 'Thriller', 'Anime'].map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`px-4 py-1.5 rounded-full font-space text-xs font-semibold whitespace-nowrap transition-all ${
              activeGenre === genre
                ? 'bg-[#181e30] text-white border border-[#ff5733]'
                : 'bg-[#121624] text-[#94a3b8] border border-[#1b2136] hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Featured Hero Banner: CHRONO HORIZON */}
      <div className="px-4 mb-5">
        <div className="relative rounded-2xl overflow-hidden border border-[#2b3555] shadow-2xl h-84 flex flex-col justify-end p-4 group">
          {/* Background Poster */}
          <img
            src={ASSETS.chronoHorizonPoster}
            alt="Chrono Horizon Event"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-90"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e16] via-[#0c0e16]/60 to-transparent"></div>

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ff5733] text-white font-space text-[10px] font-bold shadow-md">
                <span className="material-symbols-outlined text-xs">local_fire_department</span>
                TRENDING #1
              </span>
              <span className="px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#cdbdff] font-space text-[10px] font-bold border border-[#7c4dff]/40">
                IMAX 70MM
              </span>
            </div>

            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#00e475] font-space text-xs font-bold border border-[#00e475]/30">
              <span className="material-symbols-outlined text-xs">star</span>
              9.4
            </div>
          </div>

          {/* Content Overlay */}
          <div className="relative z-10">
            <span className="text-[11px] font-space font-bold text-[#ffdad3] uppercase tracking-wider block">
              DIR. CHRISTOPHER NOLAN
            </span>
            <h2 className="font-space font-bold text-2xl text-white tracking-tight mt-0.5">
              CHRONO HORIZON
            </h2>
            <div className="flex items-center gap-2 text-xs text-[#94a3b8] font-space mt-1">
              <span>Nov 2025</span>
              <span>•</span>
              <span>Sci-Fi / Cosmic Thriller</span>
              <span>•</span>
              <span className="text-[#00e475] font-bold">98% Match</span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onOpenMovieDetail('chrono')}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ff5733] to-[#ff7a59] text-white font-space font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-[#ff5733]/30 hover:opacity-95 active:scale-[0.99] transition-all"
              >
                <span className="material-symbols-outlined text-base">play_arrow</span>
                <span>EXPLORE DETAILS</span>
              </button>

              <button
                onClick={(e) => toggleWatchlist('chrono', e)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                  watchlist['chrono']
                    ? 'bg-[#181e30] border-[#00e475] text-[#00e475]'
                    : 'bg-black/60 border-white/20 text-white hover:bg-black/80'
                }`}
                aria-label="Bookmark"
              >
                <span className="material-symbols-outlined text-lg">
                  {watchlist['chrono'] ? 'bookmark_added' : 'bookmark'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Movies (Global) */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-space font-bold text-base text-white">Trending Movies</h2>
            <span className="font-space text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#181e30] text-[#94a3b8] border border-[#2b3555]">
              GLOBAL
            </span>
          </div>
          <button className="font-space text-xs text-[#ff5733] font-bold flex items-center gap-0.5 hover:underline">
            See All <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="grid grid-cols-3 gap-3">
          {/* Card 1: Chrono Horizon */}
          <div
            onClick={() => onOpenMovieDetail('chrono')}
            className="flex flex-col cursor-pointer group"
          >
            <div className="aspect-[2/3] rounded-2xl overflow-hidden relative border border-[#2b3555] bg-[#181e30] shadow-md">
              <img
                src={ASSETS.chronoHorizonPoster}
                alt="Chrono Horizon"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => toggleWatchlist('chrono', e)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-sm">
                  {watchlist['chrono'] ? 'bookmark_added' : 'bookmark'}
                </span>
              </button>
              <div className="absolute bottom-1.5 left-2 flex items-center gap-0.5 font-space text-[11px] font-bold text-[#00e475]">
                <span className="material-symbols-outlined text-xs">star</span>
                9.4
              </div>
            </div>
            <span className="font-space font-bold text-xs text-white mt-1.5 truncate group-hover:text-[#ff5733] transition-colors">
              Chrono Horizon
            </span>
            <span className="text-[10px] text-[#94a3b8] font-space truncate">2025 • Sci-Fi Epic</span>
          </div>

          {/* Card 2: Solaris Odyssey */}
          <div className="flex flex-col cursor-pointer group">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden relative border border-[#2b3555] bg-[#181e30] shadow-md">
              <img
                src={ASSETS.solarisOdysseyPoster}
                alt="Solaris Odyssey"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => toggleWatchlist('solaris', e)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-sm">
                  {watchlist['solaris'] ? 'bookmark_added' : 'bookmark'}
                </span>
              </button>
              <div className="absolute bottom-1.5 left-2 flex items-center gap-0.5 font-space text-[11px] font-bold text-[#00e475]">
                <span className="material-symbols-outlined text-xs">star</span>
                9.1
              </div>
            </div>
            <span className="font-space font-bold text-xs text-white mt-1.5 truncate group-hover:text-[#ff5733] transition-colors">
              Solaris Odyssey
            </span>
            <span className="text-[10px] text-[#94a3b8] font-space truncate">Dec 2025 • Space Mystery</span>
          </div>

          {/* Card 3: Shadow Labyrinth */}
          <div className="flex flex-col cursor-pointer group">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden relative border border-[#2b3555] bg-[#181e30] shadow-md">
              <img
                src={ASSETS.shadowLabyrinthPoster}
                alt="Shadow Labyrinth"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button
                onClick={(e) => toggleWatchlist('shadow', e)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white"
              >
                <span className="material-symbols-outlined text-sm">
                  {watchlist['shadow'] ? 'bookmark_added' : 'bookmark'}
                </span>
              </button>
              <div className="absolute bottom-1.5 left-2 flex items-center gap-0.5 font-space text-[11px] font-bold text-[#00e475]">
                <span className="material-symbols-outlined text-xs">star</span>
                8.8
              </div>
            </div>
            <span className="font-space font-bold text-xs text-white mt-1.5 truncate group-hover:text-[#ff5733] transition-colors">
              Shadow Labyrinth
            </span>
            <span className="text-[10px] text-[#94a3b8] font-space truncate">Oct 2025 • Thriller</span>
          </div>
        </div>
      </div>

      {/* Upcoming Releases */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-space font-bold text-base text-white">Upcoming Releases</h2>
            <span className="text-[11px] text-[#94a3b8]">Exclusive premiere countdowns</span>
          </div>
          <button className="font-space text-xs text-[#94a3b8] hover:text-white">See Calendar &gt;</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Release 1: Project Hail Mary */}
          <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-[#00e475]/15 text-[#00e475]">
                <span className="material-symbols-outlined text-xs">timer</span>
                IN 18 DAYS
              </span>
              <span className="font-space text-[11px] text-[#94a3b8]">MAR 2026</span>
            </div>

            <div className="flex items-center gap-3 my-1">
              <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.solarisOdysseyPoster}
                  alt="Hail Mary"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-sm text-white">Project Hail Mary</span>
                <span className="text-xs text-[#94a3b8]">Dir. Lord &amp; Miller</span>
                <span className="text-[10px] text-[#cdbdff] font-space mt-0.5">Sci-Fi / Discovery</span>
              </div>
            </div>

            <button
              onClick={() => toggleReminder('hailmary')}
              className={`w-full py-1.5 mt-2 rounded-xl font-space text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                reminders['hailmary']
                  ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                  : 'bg-[#181e30] text-[#94a3b8] hover:text-white border border-[#2b3555]'
              }`}
            >
              <span className="material-symbols-outlined text-xs">
                {reminders['hailmary'] ? 'notifications_active' : 'notifications'}
              </span>
              <span>{reminders['hailmary'] ? 'Reminder Set' : 'Remind Me'}</span>
            </button>
          </div>

          {/* Release 2: Gladiator II */}
          <div className="p-3.5 rounded-2xl bg-[#121624] border border-[#1b2136] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1 text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-[#7c4dff]/15 text-[#cdbdff]">
                <span className="material-symbols-outlined text-xs">calendar_month</span>
                NEXT MONTH
              </span>
              <span className="font-space text-[11px] text-[#94a3b8]">NOV 2025</span>
            </div>

            <div className="flex items-center gap-3 my-1">
              <div className="w-12 h-14 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.shadowLabyrinthPoster}
                  alt="Gladiator"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-space font-bold text-sm text-white">Gladiator II</span>
                <span className="text-xs text-[#94a3b8]">Dir. Ridley Scott</span>
                <span className="text-[10px] text-[#ffdad3] font-space mt-0.5">Historical Epic</span>
              </div>
            </div>

            <button
              onClick={() => toggleReminder('gladiator')}
              className={`w-full py-1.5 mt-2 rounded-xl font-space text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                reminders['gladiator']
                  ? 'bg-[#00e475]/20 text-[#00e475] border border-[#00e475]'
                  : 'bg-[#181e30] text-[#94a3b8] hover:text-white border border-[#2b3555]'
              }`}
            >
              <span className="material-symbols-outlined text-xs">
                {reminders['gladiator'] ? 'notifications_active' : 'notifications'}
              </span>
              <span>{reminders['gladiator'] ? 'Reminder Set' : 'Remind Me'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Hall of Fame (FAN RATED) */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <h2 className="font-space font-bold text-base text-white">Community Hall of Fame</h2>
            <span className="material-symbols-outlined text-[#00e475] text-sm">verified</span>
          </div>
          <span className="font-space text-[10px] font-bold text-[#ab8982] uppercase">
            FAN RATED
          </span>
        </div>

        <div className="space-y-2">
          {/* Oppenheimer */}
          <div className="p-2.5 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.shadowLabyrinthPoster}
                  alt="Oppenheimer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-space font-bold text-sm text-white">Oppenheimer</span>
                  <span className="font-space text-[10px] text-[#94a3b8]">2023</span>
                </div>
                <span className="text-xs text-[#94a3b8]">Dir. Christopher Nolan • Historical</span>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] font-space text-[#94a3b8]">
                  <span className="text-[#00e475] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">star</span>
                    9.3
                  </span>
                  <span>•</span>
                  <span>42.8k ratings</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#181e30] text-[#94a3b8] hover:text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>

          {/* Interstellar */}
          <div className="p-2.5 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.chronoHorizonPoster}
                  alt="Interstellar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-space font-bold text-sm text-white">Interstellar</span>
                  <span className="font-space text-[10px] text-[#94a3b8]">2014</span>
                </div>
                <span className="text-xs text-[#94a3b8]">Dir. Christopher Nolan • Sci-Fi Opera</span>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] font-space text-[#94a3b8]">
                  <span className="text-[#00e475] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">star</span>
                    9.6
                  </span>
                  <span>•</span>
                  <span>89.2k ratings</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#00e475]/20 text-[#00e475] flex items-center justify-center">
              <span className="material-symbols-outlined text-base">check</span>
            </button>
          </div>

          {/* Arrival */}
          <div className="p-2.5 rounded-2xl bg-[#121624] border border-[#1b2136] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
                <img
                  src={ASSETS.solarisOdysseyPoster}
                  alt="Arrival"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-space font-bold text-sm text-white">Arrival</span>
                  <span className="font-space text-[10px] text-[#94a3b8]">2016</span>
                </div>
                <span className="text-xs text-[#94a3b8]">Dir. Denis Villeneuve • Sci-Fi Mystery</span>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] font-space text-[#94a3b8]">
                  <span className="text-[#00e475] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-xs">star</span>
                    8.9
                  </span>
                  <span>•</span>
                  <span>31.4k ratings</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-[#181e30] text-[#94a3b8] hover:text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-base">add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Your Watchlist Banner */}
      <div className="px-4">
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#181e30] to-[#121624] border border-[#2b3555] flex items-center justify-between cursor-pointer hover:border-[#ff5733] transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#181e30] border border-[#2b3555] shrink-0">
              <img
                src={ASSETS.chronoHorizonPoster}
                alt="Watchlist"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-space font-bold text-sm text-white">Your Watchlist</h3>
                <span className="w-4 h-4 rounded-full bg-[#ff5733] font-space text-[10px] font-bold text-white flex items-center justify-center">
                  4
                </span>
              </div>
              <p className="text-xs text-[#94a3b8]">Continue viewing saved titles</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-base text-[#94a3b8]">arrow_forward</span>
        </div>
      </div>
    </div>
  );
};
