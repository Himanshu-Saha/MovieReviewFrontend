// /services/reviewService.ts
import clientPromise from '../lib/mongodb';
import { Review } from '../models/Review';
import { ObjectId } from 'mongodb';

const DB_NAME = 'moviesDB';
const REVIEWS_COLLECTION = 'reviews';

export async function getReviewsByMovieId(movieId: string): Promise<Review[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection<Review>(REVIEWS_COLLECTION).find({ movieId: new ObjectId(movieId) }).toArray();
}

export async function createReview(review: Omit<Review, '_id'>): Promise<Review> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  
  const result = await db.collection(REVIEWS_COLLECTION).insertOne(review);

  // Recalculate the average rating for the movie
  const reviews = await getReviewsByMovieId(review.movieId.toString());
  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  await db.collection('movies').updateOne(
    { _id: new ObjectId(review.movieId) },
    { $set: { averageRating } }
  );

  return { ...review, _id: result.insertedId };
}
