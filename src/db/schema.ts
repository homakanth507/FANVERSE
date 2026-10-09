import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table with Firebase UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  displayName: text('display_name'),
  avatar: text('avatar'),
  fanPoints: integer('fan_points').default(2450).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Live match and theory comments
export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  commentId: text('comment_id').notNull().unique(),
  userId: text('user_id').references(() => users.uid).notNull(),
  author: text('author').notNull(),
  avatar: text('avatar'),
  content: text('content').notNull(),
  room: text('room').notNull(),
  upvotes: integer('upvotes').default(1).notNull(),
  isHotTake: boolean('is_hot_take').default(false).notNull(),
  isSpoiler: boolean('is_spoiler').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Live predictions and decider votes
export const predictions = pgTable('predictions', {
  id: serial('id').primaryKey(),
  predictionId: text('prediction_id').notNull().unique(),
  userId: text('user_id').references(() => users.uid).notNull(),
  pollId: text('poll_id').notNull(),
  selection: text('selection').notNull(),
  pointsWagered: integer('points_wagered').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Movie ratings and reviews
export const movieReviews = pgTable('movie_reviews', {
  id: serial('id').primaryKey(),
  reviewId: text('review_id').notNull().unique(),
  userId: text('user_id').references(() => users.uid).notNull(),
  movieId: text('movie_id').notNull(),
  rating: integer('rating').notNull(),
  review: text('review').notNull(),
  helpfulCount: integer('helpful_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  comments: many(comments),
  predictions: many(predictions),
  reviews: many(movieReviews),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  user: one(users, {
    fields: [comments.userId],
    references: [users.uid],
  }),
}));

export const predictionsRelations = relations(predictions, ({ one }) => ({
  user: one(users, {
    fields: [predictions.userId],
    references: [users.uid],
  }),
}));

export const movieReviewsRelations = relations(movieReviews, ({ one }) => ({
  user: one(users, {
    fields: [movieReviews.userId],
    references: [users.uid],
  }),
}));
