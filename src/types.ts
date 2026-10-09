export type ScreenType =
  | 'sports'
  | 'movies'
  | 'match-live'
  | 'player-bumrah'
  | 'team-mumbai'
  | 'movie-chrono'
  | 'profile';

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  roleBadge?: { text: string; bg: string; color: string };
  categoryBadge?: string;
  timestamp: string;
  content: string;
  upvotes: number;
  userUpvoted?: boolean;
  fanPoints?: number;
  location?: string;
  replies?: CommentItem[];
  reactions?: { [emoji: string]: number };
  userReactions?: string[];
  mediaClipsCount?: number;
  isHotTake?: boolean;
}

export interface PollState {
  teamIndiaVotes: number;
  teamAusVotes: number;
  userVotedTeam?: 'IND' | 'AUS';
  bowlerVotes: {
    bumrah: number;
    siraj: number;
    hardik: number;
  };
  userVotedBowler?: 'bumrah' | 'siraj' | 'hardik';
}
