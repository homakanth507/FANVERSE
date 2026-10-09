import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  updateDoc,
  increment,
} from 'firebase/firestore';
import {
  auth,
  db,
  loginWithGoogle,
  logoutUser,
  handleFirestoreError,
  OperationType,
} from '../firebase';
import { ASSETS } from '../assets/images';

export interface FirestoreComment {
  id: string;
  userId: string;
  author: string;
  avatar: string;
  content: string;
  upvotes: number;
  room: string;
  isHotTake?: boolean;
  isSpoiler?: boolean;
  roleBadgeText?: string;
  categoryTag?: string;
  createdAt?: any;
}

interface FirebaseContextType {
  user: User | null;
  authReady: boolean;
  fanPoints: number;
  addFanPoints: (points: number) => Promise<void>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  comments: FirestoreComment[];
  addComment: (content: string, room: string, isHotTake?: boolean, isSpoiler?: boolean) => Promise<void>;
  upvoteComment: (commentId: string) => Promise<void>;
  submitPrediction: (pollId: string, selection: string, points: number) => Promise<void>;
  submitMovieReview: (movieId: string, rating: number, review: string) => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [fanPoints, setFanPoints] = useState(2450);
  const [comments, setComments] = useState<FirestoreComment[]>([]);

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);

      if (currentUser) {
        // Load or create user profile
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const userSnap = await getDoc(userDocRef);
          if (userSnap.exists()) {
            const data = userSnap.data();
            if (typeof data.fanPoints === 'number') {
              setFanPoints(data.fanPoints);
            }
          } else {
            // Seed profile
            await setDoc(userDocRef, {
              userId: currentUser.uid,
              username: currentUser.displayName || 'FanAnalyst',
              displayName: currentUser.displayName || 'Anonymous Fan',
              avatar: currentUser.photoURL || ASSETS.avatars.currentUser,
              fanPoints: 2450,
              tier: 'Master Stadium Strategist',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.warn('User profile sync notice:', error);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Live Comments Listener
  useEffect(() => {
    const commentsCol = collection(db, 'comments');
    const q = query(commentsCol, limit(50));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const loaded: FirestoreComment[] = [];
          snapshot.forEach((docSnap) => {
            const d = docSnap.data();
            loaded.push({
              id: docSnap.id,
              userId: d.userId,
              author: d.author,
              avatar: d.avatar,
              content: d.content,
              upvotes: d.upvotes || 0,
              room: d.room || 'ind-aus',
              isHotTake: d.isHotTake,
              isSpoiler: d.isSpoiler,
              roleBadgeText: d.roleBadgeText,
              categoryTag: d.categoryTag,
              createdAt: d.createdAt,
            });
          });
          setComments(loaded);
        }
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, 'comments');
      }
    );

    return () => unsubscribe();
  }, []);

  // Add FanPoints
  const addFanPoints = async (points: number) => {
    setFanPoints((prev) => {
      const next = prev + points;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        updateDoc(userRef, { fanPoints: next }).catch((e) => {
          console.warn('Failed to update fanPoints in Firestore:', e);
        });
      }
      return next;
    });
  };

  const login = async () => {
    await loginWithGoogle();
  };

  const logout = async () => {
    await logoutUser();
  };

  const addComment = async (
    content: string,
    room: string,
    isHotTake = false,
    isSpoiler = false
  ) => {
    const id = `c_${Date.now()}`;
    const authorName = user?.displayName ? `@${user.displayName.replace(/\s+/g, '')}` : '@FanAnalyst_You';
    const authorAvatar = user?.photoURL || ASSETS.avatars.currentUser;
    const authorUid = user ? user.uid : 'anon_user';

    if (user) {
      const commentDocRef = doc(db, 'comments', id);
      try {
        await setDoc(commentDocRef, {
          id,
          userId: authorUid,
          author: authorName,
          avatar: authorAvatar,
          content,
          upvotes: 1,
          room,
          isHotTake,
          isSpoiler,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `comments/${id}`);
      }
    } else {
      // Optimistic local update if user is not signed in
      setComments((prev) => [
        {
          id,
          userId: authorUid,
          author: authorName,
          avatar: authorAvatar,
          content,
          upvotes: 1,
          room,
          isHotTake,
          isSpoiler,
        },
        ...prev,
      ]);
    }
    await addFanPoints(25);
  };

  const upvoteComment = async (commentId: string) => {
    if (user) {
      const commentRef = doc(db, 'comments', commentId);
      try {
        await updateDoc(commentRef, { upvotes: increment(1) });
      } catch (err) {
        handleFirestoreError(err, OperationType.UPDATE, `comments/${commentId}`);
      }
    } else {
      setComments((prev) =>
        prev.map((c) => (c.id === commentId ? { ...c, upvotes: c.upvotes + 1 } : c))
      );
    }
  };

  const submitPrediction = async (pollId: string, selection: string, points: number) => {
    if (user) {
      const predId = `p_${Date.now()}`;
      const predRef = doc(db, 'predictions', predId);
      try {
        await setDoc(predRef, {
          id: predId,
          userId: user.uid,
          pollId,
          selection,
          pointsWagered: points,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `predictions/${predId}`);
      }
    }
    await addFanPoints(points);
  };

  const submitMovieReview = async (movieId: string, rating: number, review: string) => {
    if (user) {
      const revId = `r_${Date.now()}`;
      const revRef = doc(db, 'movieReviews', revId);
      try {
        await setDoc(revRef, {
          id: revId,
          movieId,
          userId: user.uid,
          author: user.displayName || 'Verified Critic',
          avatar: user.photoURL || ASSETS.avatars.currentUser,
          rating,
          review,
          helpfulCount: 0,
          isSpoiler: false,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, `movieReviews/${revId}`);
      }
    }
    await addFanPoints(50);
  };

  return (
    <FirebaseContext.Provider
      value={{
        user,
        authReady,
        fanPoints,
        addFanPoints,
        login,
        logout,
        comments,
        addComment,
        upvoteComment,
        submitPrediction,
        submitMovieReview,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
