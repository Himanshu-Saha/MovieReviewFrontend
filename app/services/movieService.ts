// /services/movieService.ts
import { Movie } from "@/app/models/Movie";

const API_BASE_URL = 'http://localhost:8000/api/movies';

export async function getMovies(): Promise<Movie[]> {
  const response = await fetch(API_BASE_URL); // Ensure this points to port 8000
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
}

export async function getMovieById(id: string): Promise<Movie | null> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch movie');
  }
  return response.json();
}

export async function createMovie(movie: Omit<Movie, '_id'>): Promise<Movie> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
  if (!response.ok) {
    throw new Error('Failed to create movie');
  }
  return response.json();
}

export async function deleteMovie(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete movie');
  }
}
