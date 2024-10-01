"use client";
import { useState, useEffect } from 'react';
import { Movie } from './models/Movie';
import AddMovieModal from './components/MovieModal';
import MovieCard from './components/MovieCard';
import AddReviewModal from './components/AddReviewModal';
import CustomSearchBar from './components/Custom/CustomSearchBar';

export default function HomePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container px-8">
      <header className="header">
        <h1>The best movie reviews site!</h1>
      </header>

      <input
        type="text"
        placeholder="Search for your favourite movie"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="movie-list flex">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie._id?.toString()} movie={movie}/>
        ))}
      </div>
    </div>
  );
}
