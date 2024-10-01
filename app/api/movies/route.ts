// /app/api/movies/route.ts
import { NextResponse } from 'next/server';
import { getMovies, createMovie, deleteMovie } from '@/app/services/movieService';

// Handle GET requests to fetch all movies
export async function GET() {
  try {
    const movies = await getMovies();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

// Handle POST requests to create a new movie
export async function POST(request: Request) {
  try {
    const movie = await request.json();
    const newMovie = await createMovie(movie);
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}

// Handle DELETE requests to delete a specific movie by ID
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json(); // Expecting an object with { id }
    await deleteMovie(id);
    return NextResponse.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
