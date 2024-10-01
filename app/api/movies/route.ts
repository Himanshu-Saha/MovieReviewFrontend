// /app/api/movies/route.ts
import { NextResponse } from 'next/server';
import { Movie } from '@/app/models/Movie';
import { createMovie, deleteMovie, getMovies } from '@/app/services/movieService';

export async function GET() {
  try {
    const movies = await getMovies();
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const movie: Omit<Movie, '_id'> = await request.json();
    const newMovie = await createMovie(movie);
    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create movie' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteMovie(id);
    return NextResponse.json({ message: 'Movie deleted' }, { status: 204 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete movie' }, { status: 500 });
  }
}
