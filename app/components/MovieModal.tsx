import { useState, useEffect } from 'react';

interface MovieModalProps {
  closeModal: () => void;
  onMovieAdded: (newMovie: any) => void;
  movieToEdit?: any; // Optional prop for the movie being edited
}

const MovieModal: React.FC<MovieModalProps> = ({ closeModal, onMovieAdded, movieToEdit }) => {
  const [name, setName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');

  // Pre-fill the form when editing a movie
  useEffect(() => {
    if (movieToEdit) {
      setName(movieToEdit.name);
      setReleaseDate(new Date(movieToEdit.releaseDate).toISOString().split('T')[0]);
    }
  }, [movieToEdit]);

  const handleSubmit = async () => {
    const method = movieToEdit ? 'PUT' : 'POST'; 
    const endpoint = movieToEdit ? `http://localhost:8000/api/movies/${movieToEdit._id}` : 'http://localhost:8000/api/movies';

    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, releaseDate }),
    });

    const updatedMovie = await response.json();
    onMovieAdded(updatedMovie);
    closeModal();
  };

  return (
    <div id="crud-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50">
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {movieToEdit ? 'Edit Movie' : 'Add New Movie'}
            </h3>
            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <form className="p-4">
            <div className="grid gap-4 mb-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Movie Name</label>
                <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label htmlFor="releaseDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Release Date</label>
                <input type="date" id="releaseDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
              </div>
            </div>
            <button type="button" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={handleSubmit}>
              {movieToEdit ? 'Update Movie' : 'Create Movie'}
            </button>
            <button type="button" className="ml-2 text-gray-500 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5" onClick={closeModal}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
