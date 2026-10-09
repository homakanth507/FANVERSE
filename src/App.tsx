import React, { useState } from 'react';
import { ScreenType, PollState } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SportsScreen } from './screens/SportsScreen';
import { MatchLiveCenterScreen } from './screens/MatchLiveCenterScreen';
import { DiscussionModal } from './screens/DiscussionModal';
import { PlayerProfileScreen } from './screens/PlayerProfileScreen';
import { TeamScreen } from './screens/TeamScreen';
import { MoviesScreen } from './screens/MoviesScreen';
import { MovieDetailScreen } from './screens/MovieDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CreateModal } from './components/CreateModal';
import { useFirebase } from './context/FirebaseContext';

export default function App() {
  const { fanPoints, addFanPoints, submitPrediction, user } = useFirebase();
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('sports');
  const [screenHistory, setScreenHistory] = useState<ScreenType[]>(['sports']);
  const [isDiscussionOpen, setIsDiscussionOpen] = useState<boolean>(false);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [toastNotification, setToastNotification] = useState<string | null>(null);

  // Poll state for live decider
  const [pollState, setPollState] = useState<PollState>({
    teamIndiaVotes: 580,
    teamAusVotes: 420,
    bowlerVotes: {
      bumrah: 78,
      siraj: 14,
      hardik: 8,
    },
  });

  const showGlobalToast = (msg: string) => {
    setToastNotification(msg);
    setTimeout(() => setToastNotification(null), 3000);
  };

  const navigateTo = (screen: ScreenType) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop(); // remove current
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('sports');
    }
  };

  const handleVoteTeam = async (team: 'IND' | 'AUS') => {
    setPollState((prev) => ({
      ...prev,
      userVotedTeam: team,
      teamIndiaVotes: team === 'IND' ? prev.teamIndiaVotes + 10 : prev.teamIndiaVotes,
      teamAusVotes: team === 'AUS' ? prev.teamAusVotes + 10 : prev.teamAusVotes,
    }));
    await submitPrediction('ind-aus-decider', team, 100);
    showGlobalToast(`+100 FanPoints synced to Cloud!`);
  };

  const handleVoteBowler = async (bowler: 'bumrah' | 'siraj' | 'hardik') => {
    setPollState((prev) => ({
      ...prev,
      userVotedBowler: bowler,
    }));
    await submitPrediction('50th-over-bowler', bowler, 20);
    showGlobalToast(`+20 FanPoints synced to Cloud!`);
  };

  return (
    <div className="min-h-screen bg-[#11131b] text-[#e2e1ee] flex flex-col font-body selection:bg-[#ff5733] selection:text-white">
      {/* Toast Alert */}
      {toastNotification && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#00e475] text-[#003918] font-space font-bold text-xs px-4 py-2 rounded-full shadow-2xl animate-bounce flex items-center gap-1.5 border border-white/20">
          <span className="material-symbols-outlined text-sm">cloud_done</span>
          {toastNotification}
        </div>
      )}

      {/* App Shell Header */}
      <Header
        fanPoints={fanPoints}
        onSearchClick={() => showGlobalToast('Search across live match feeds, clubs & films')}
        onNotificationsClick={() => showGlobalToast('2 unread: Bumrah wicket alert & Chrono Horizon theory room update')}
        onProfileClick={() => navigateTo('profile')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-lg mx-auto w-full relative">
        {currentScreen === 'sports' && (
          <SportsScreen
            onNavigate={navigateTo}
            onOpenPlayer={() => navigateTo('player-bumrah')}
            onOpenTeam={() => navigateTo('team-mumbai')}
          />
        )}

        {currentScreen === 'match-live' && (
          <MatchLiveCenterScreen
            onBack={handleBack}
            onOpenDiscussion={() => setIsDiscussionOpen(true)}
            pollState={pollState}
            onVoteTeam={handleVoteTeam}
            onVoteBowler={handleVoteBowler}
            onOpenPlayer={() => navigateTo('player-bumrah')}
          />
        )}

        {currentScreen === 'player-bumrah' && (
          <PlayerProfileScreen
            onBack={handleBack}
            onOpenDiscussion={() => setIsDiscussionOpen(true)}
            onOpenTeam={() => navigateTo('team-mumbai')}
          />
        )}

        {currentScreen === 'team-mumbai' && (
          <TeamScreen
            onBack={handleBack}
            onOpenPlayer={() => navigateTo('player-bumrah')}
            onOpenDiscussion={() => setIsDiscussionOpen(true)}
          />
        )}

        {currentScreen === 'movies' && (
          <MoviesScreen
            onNavigate={navigateTo}
            onOpenMovieDetail={() => navigateTo('movie-chrono')}
          />
        )}

        {currentScreen === 'movie-chrono' && (
          <MovieDetailScreen
            onBack={handleBack}
            onOpenDiscussion={() => setIsDiscussionOpen(true)}
            onAddFanPoints={addFanPoints}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            fanPoints={fanPoints}
            onNavigate={navigateTo}
            onOpenPlayer={() => navigateTo('player-bumrah')}
            onOpenTeam={() => navigateTo('team-mumbai')}
            onOpenMovieDetail={() => navigateTo('movie-chrono')}
          />
        )}
      </main>

      {/* Universal Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={navigateTo}
        onCreateClick={() => setIsCreateOpen(true)}
      />

      {/* Discussion Sheet (Live Stadium Room / Live Theory Room) */}
      <DiscussionModal
        isOpen={isDiscussionOpen}
        onClose={() => setIsDiscussionOpen(false)}
        onAddFanPoints={addFanPoints}
        userFanPoints={fanPoints}
      />

      {/* Create Modal for (+) Button */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onPostSuccess={(title, points) => {
          addFanPoints(points);
          showGlobalToast(`Take shared live! +${points} FanPoints`);
        }}
      />
    </div>
  );
}

