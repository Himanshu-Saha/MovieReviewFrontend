import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Movie } from '@/app/models/Movie';
import { Review } from '@/app/models/Review';
import React from 'react';

export default function MovieDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchMovieDetails() {
      const response = await fetch(`/api/movies/${id}`);
      const data = await response.json();
      setMovie(data.movie);
      setReviews(data.reviews);
    }
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      {movie && (
        <>
          <h1>{movie.name}</h1>
          <p>Released: {new Date(movie.releaseDate).toLocaleDateString()}</p>
          <p>Average Rating: {movie.averageRating ? movie.averageRating.toFixed(2) : 'No ratings yet'}</p>

          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review._id}>
                <p>{review.rating}/10</p>
                <p>{review.comments}</p>
                <p>By {review.reviewerName || 'Anonymous'}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
