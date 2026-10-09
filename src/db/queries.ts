import { desc, eq } from 'drizzle-orm';
import { db } from './index.ts';
import { comments, movieReviews, predictions } from './schema.ts';

// Comments
export async function getComments(room: string) {
  try {
    return await db
      .select()
      .from(comments)
      .where(eq(comments.room, room))
      .orderBy(desc(comments.createdAt))
      .limit(50);
  } catch (error) {
    console.error('Database getComments failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function createComment(data: {
  commentId: string;
  userId: string;
  author: string;
  avatar?: string;
  content: string;
  room: string;
  isHotTake?: boolean;
  isSpoiler?: boolean;
}) {
  try {
    const result = await db
      .insert(comments)
      .values({
        commentId: data.commentId,
        userId: data.userId,
        author: data.author,
        avatar: data.avatar || null,
        content: data.content,
        room: data.room,
        isHotTake: data.isHotTake || false,
        isSpoiler: data.isSpoiler || false,
        upvotes: 1,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database createComment failed:', error);
    throw new Error('Database insert failed. Please try again later.', { cause: error });
  }
}

export async function upvoteComment(commentId: string) {
  try {
    const existing = await db
      .select({ upvotes: comments.upvotes })
      .from(comments)
      .where(eq(comments.commentId, commentId))
      .limit(1);

    const current = existing[0]?.upvotes || 0;
    const result = await db
      .update(comments)
      .set({ upvotes: current + 1 })
      .where(eq(comments.commentId, commentId))
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database upvoteComment failed:', error);
    throw new Error('Database update failed. Please try again later.', { cause: error });
  }
}

// Predictions
export async function savePrediction(data: {
  predictionId: string;
  userId: string;
  pollId: string;
  selection: string;
  pointsWagered?: number;
}) {
  try {
    const result = await db
      .insert(predictions)
      .values({
        predictionId: data.predictionId,
        userId: data.userId,
        pollId: data.pollId,
        selection: data.selection,
        pointsWagered: data.pointsWagered || 0,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database savePrediction failed:', error);
    throw new Error('Database insert failed. Please try again later.', { cause: error });
  }
}

// Movie Reviews
export async function getMovieReviews(movieId: string) {
  try {
    return await db
      .select()
      .from(movieReviews)
      .where(eq(movieReviews.movieId, movieId))
      .orderBy(desc(movieReviews.createdAt))
      .limit(50);
  } catch (error) {
    console.error('Database getMovieReviews failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function saveMovieReview(data: {
  reviewId: string;
  userId: string;
  movieId: string;
  rating: number;
  review: string;
}) {
  try {
    const result = await db
      .insert(movieReviews)
      .values({
        reviewId: data.reviewId,
        userId: data.userId,
        movieId: data.movieId,
        rating: data.rating,
        review: data.review,
        helpfulCount: 0,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error('Database saveMovieReview failed:', error);
    throw new Error('Database insert failed. Please try again later.', { cause: error });
  }
}
