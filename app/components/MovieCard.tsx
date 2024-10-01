import Link from "next/link";
import { Movie } from "../models/Movie";
import { mdiDelete, mdiSquareEditOutline } from "@mdi/js";
import CustomImageButton from "./Custom/ImageButton";
import { useEffect, useState } from "react";
import DeleteMovieModal from "./Custom/DeleteModal";
import MovieModal from "./MovieModal";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onEdit }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  return (
    <div className="bg-purple-200 p-4 rounded-lg shadow-md w-56 m-4">
      <Link href={`/movies/${movie._id?.toString()}`} className="block">
        <div>
          <h3 className="text-xl font-bold">{movie.name}</h3>
          <p className="text-gray-600">
            Released: {new Date(movie.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-gray-600">
            Rating:{" "}
            {movie.averageRating
              ? movie.averageRating.toFixed(2)
              : "No ratings yet"}
          </p>
        </div>
      </Link>
      <div className="flex justify-end mt-2 space-x-2">
        <CustomImageButton
          path={mdiSquareEditOutline}
          size={0.7}
          onClick={() => onEdit(movie)}
        />
        <CustomImageButton
          path={mdiDelete}
          size={0.7}
          onClick={() => setShowDeleteModal(true)}
        />
      </div>
      {showDeleteModal && (
        <DeleteMovieModal
          closeModal={() => {
            setShowDeleteModal(false);
          }}
          onDeleteConfirmed={() => {}}
        />
      )}
      {showEditModal && (
        <MovieModal
          closeModal={() => {
            showEditModal(false);
          }}
        />
      )}
    </div>
  );
};

export default MovieCard;
