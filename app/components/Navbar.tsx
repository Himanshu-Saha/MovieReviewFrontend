'use client'
import React, { useEffect, useState } from "react";
import { CustomButton } from "./Custom/Button";
import AddMovieModal from "./MovieModal";
import AddReviewModal from "./AddReviewModal";
import { Movie } from "../models/Movie";
import { log } from "console";

export const Navbar = () => {
  const [isAddMovieOpen, setIsAddMovieOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchMovies() {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    }
    fetchMovies();
  }, []);
  return (
    <section>
      <div className="flex justify-between py-4 border-2 px-8">
        <h2 className="content-center">MOVIECRITIC</h2>
        <div>
          <CustomButton
            setIsOpen={setIsAddMovieOpen}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
            text="Add New Movie"
          />
          <CustomButton
            setIsOpen={setIsAddReviewOpen}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            text="Add New Review"
          />
        </div>
      </div>
      {isAddMovieOpen && (
        <AddMovieModal
          closeModal={() => setIsAddMovieOpen(false)}
          onMovieAdded={(newMovie) => {console.log(newMovie)}}
        />
      )}
      {isAddReviewOpen && (
        <AddReviewModal
          closeModal={() => setIsAddReviewOpen(false)}
          movies={movies}
          onReviewAdded={() => {}}
        />
      )}
    </section>
  );
};
