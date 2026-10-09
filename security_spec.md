# Security Specification for FANVERSE (Firestore ABAC)

## 1. Data Invariants
- **Users**: Users can only create and manage their own user profile document at `/users/{userId}` where `userId == request.auth.uid`. FanPoints cannot be manipulated to negative numbers.
- **Comments**: Any authenticated user can read comments. A comment's `userId` must strictly match `request.auth.uid`. Users can update upvotes or content only if authorized.
- **Replies**: Parent comment must exist. A reply's `userId` must strictly match `request.auth.uid`.
- **Predictions**: A user can only vote on their own behalf (`userId == request.auth.uid`).
- **Movie Reviews**: A user can read all reviews. Creating a review requires `userId == request.auth.uid`, rating must be between 1 and 10.

## 2. The Dirty Dozen Payloads (Targeting Rejection)
1. Impersonated Profile Creation: Payload has `userId: "other_user"` with auth UID `current_user`. -> PERMISSION_DENIED
2. Unauthorized Profile Edit: User B attempts to write to `/users/userA`. -> PERMISSION_DENIED
3. Profile Role Injection: Unauthenticated user attempting write to `/users/{userId}`. -> PERMISSION_DENIED
4. Comment with Spoofed Author: Comment payload with `userId: "victim_uid"`. -> PERMISSION_DENIED
5. Ghost Field Injection: Adding `isAdmin: true` to `/comments/{commentId}`. -> PERMISSION_DENIED
6. Massive ID Injection: Comment ID longer than 128 characters or special invalid characters. -> PERMISSION_DENIED
7. Content Overflow: Comment content exceeding 1000 characters. -> PERMISSION_DENIED
8. Unauthenticated Comment Write: Guest trying to post into live stadium stream without sign-in. -> PERMISSION_DENIED
9. Movie Review Out of Range: Review rating `15` or negative number. -> PERMISSION_DENIED
10. Unauthenticated Movie Review Write: Writing to `/movieReviews/{id}` without auth. -> PERMISSION_DENIED
11. Prediction Spoofing: Submitting vote with `userId: "another_uid"`. -> PERMISSION_DENIED
12. Orphaned Reply Write: Creating a reply without valid parent comment ID. -> PERMISSION_DENIED
