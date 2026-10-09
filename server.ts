import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { requireAuth, type AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserProfile, updateUserFanPoints } from './src/db/users.ts';
import {
  getComments,
  createComment,
  upvoteComment,
  savePrediction,
  getMovieReviews,
  saveMovieReview,
} from './src/db/queries.ts';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// 1. User sync route (authenticated)
app.post('/api/users/sync', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || '';
    const { displayName, avatar } = req.body;

    if (!uid) {
      return res.status(401).json({ error: 'Missing user credentials' });
    }

    const user = await getOrCreateUser(uid, email, displayName, avatar);
    res.json(user);
  } catch (error: any) {
    console.error('Failed to sync user:', error);
    res.status(500).json({ error: error.message || 'Failed to sync user' });
  }
});

app.get('/api/users/profile', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Missing user credentials' });

    const profile = await getUserProfile(uid);
    res.json(profile || { fanPoints: 2450 });
  } catch (error: any) {
    console.error('Failed to get user profile:', error);
    res.status(500).json({ error: error.message || 'Failed to get profile' });
  }
});

app.post('/api/users/points', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    const { points } = req.body;
    if (!uid) return res.status(401).json({ error: 'Missing user credentials' });

    const updated = await updateUserFanPoints(uid, points);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to update fan points:', error);
    res.status(500).json({ error: error.message || 'Failed to update points' });
  }
});

// 2. Comments routes
app.get('/api/comments', async (req, res) => {
  try {
    const room = (req.query.room as string) || 'ind-aus';
    const commentsList = await getComments(room);
    res.json(commentsList);
  } catch (error: any) {
    console.error('Failed to fetch comments:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch comments' });
  }
});

app.post('/api/comments', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Missing user credentials' });

    const { commentId, author, avatar, content, room, isHotTake, isSpoiler } = req.body;
    const newComment = await createComment({
      commentId: commentId || `c_${Date.now()}`,
      userId: uid,
      author: author || req.user?.name || '@FanAnalyst',
      avatar,
      content,
      room: room || 'ind-aus',
      isHotTake,
      isSpoiler,
    });
    res.json(newComment);
  } catch (error: any) {
    console.error('Failed to create comment:', error);
    res.status(500).json({ error: error.message || 'Failed to create comment' });
  }
});

app.post('/api/comments/:id/upvote', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await upvoteComment(id);
    res.json(updated);
  } catch (error: any) {
    console.error('Failed to upvote comment:', error);
    res.status(500).json({ error: error.message || 'Failed to upvote comment' });
  }
});

// 3. Prediction routes
app.post('/api/predictions', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Missing user credentials' });

    const { pollId, selection, pointsWagered } = req.body;
    const predictionId = `p_${Date.now()}`;
    const result = await savePrediction({
      predictionId,
      userId: uid,
      pollId,
      selection,
      pointsWagered,
    });
    res.json(result);
  } catch (error: any) {
    console.error('Failed to save prediction:', error);
    res.status(500).json({ error: error.message || 'Failed to save prediction' });
  }
});

// 4. Movie Review routes
app.get('/api/movies/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await getMovieReviews(id);
    res.json(reviews);
  } catch (error: any) {
    console.error('Failed to fetch movie reviews:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reviews' });
  }
});

app.post('/api/movies/:id/reviews', requireAuth, async (req: AuthRequest, res) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Missing user credentials' });

    const { id } = req.params;
    const { rating, review } = req.body;
    const reviewId = `r_${Date.now()}`;

    const newReview = await saveMovieReview({
      reviewId,
      userId: uid,
      movieId: id,
      rating,
      review,
    });
    res.json(newReview);
  } catch (error: any) {
    console.error('Failed to post review:', error);
    res.status(500).json({ error: error.message || 'Failed to post review' });
  }
});

// Vite Middleware for client SPA in dev mode, or static serving in production
async function startServer() {
  const distDir = path.resolve('dist');
  const hasBuiltDist = fs.existsSync(distDir) && fs.existsSync(path.join(distDir, 'index.html'));
  const isDev = process.env.NODE_ENV === 'development' || !hasBuiltDist;

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
