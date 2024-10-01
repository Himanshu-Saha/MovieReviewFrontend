// /services/movieService.ts
import clientPromise from '../lib/mongodb';
import { Movie } from '../models/Movie';
import { ObjectId } from 'mongodb';

const DB_NAME = 'moviesDB';
const MOVIES_COLLECTION = 'movies';

export async function getMovies(): Promise<Movie[]> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection<Movie>(MOVIES_COLLECTION).find({}).toArray();
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  return db.collection<Movie>(MOVIES_COLLECTION).findOne({ _id: new ObjectId(id) });
}

export async function createMovie(movie: Omit<Movie, '_id'>): Promise<Movie> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const result = await db.collection(MOVIES_COLLECTION).insertOne(movie);
  return { ...movie, _id: result.insertedId };
}

export async function deleteMovie(id: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  await db.collection(MOVIES_COLLECTION).deleteOne({ _id: new ObjectId(id) });
}
