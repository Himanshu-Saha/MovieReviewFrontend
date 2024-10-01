import { useState } from 'react';
import { Movie } from '../models/Movie';

interface AddReviewModalProps {
  closeModal: () => void;
  movies: Movie[];
  onReviewAdded: (newReview: any) => void;
}

const AddReviewModal: React.FC<AddReviewModalProps> = ({ closeModal, movies, onReviewAdded }) => {
  const [movieId, setMovieId] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ movieId, reviewerName, rating, comments }),
    });

    const newReview = await response.json();
    onReviewAdded(newReview);
    closeModal();
  };

  return (
    <div
      id="crud-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add New Review
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={closeModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Modal body */}
          <form className="p-4">
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor="movieId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Movie
                </label>
                <select
                  id="movieId"
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  required
                >
                  <option value="">Select a movie</option>
                  {movies.map((movie) => (
                    <option key={movie._id?.toString()} value={movie._id?.toString()}>
                      {movie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="reviewerName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="reviewerName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Type your name"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="rating"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rating (out of 10)
                </label>
                <input
                  type="number"
                  id="rating"
                  max="10"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="comments"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Review Comments
                </label>
                <textarea
                  id="comments"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Write your review"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  required
                />
              </div>
            </div>
            <button
              type="button"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSubmit}
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Review
            </button>
            <button
              type="button"
              className="ml-2 text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={closeModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewModal;
