// /models/Movie.ts
import { ObjectId } from 'mongodb';

export interface Movie {
  _id?: ObjectId;
  name: string;
  releaseDate: string; // Date in string format
  averageRating: number | null;
}
