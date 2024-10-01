// /models/Review.ts
import { ObjectId } from 'mongodb';

export interface Review {
  _id?: ObjectId;
  movieId: ObjectId;
  rating: number;
  comments: string;
}
