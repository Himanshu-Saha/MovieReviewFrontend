interface DeleteMovieModalProps {
    closeModal: () => void;
    onDeleteConfirmed: () => void;
  }
  
  const DeleteMovieModal: React.FC<DeleteMovieModalProps> = ({ closeModal, onDeleteConfirmed }) => {
    return (
      <div id="delete-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-50">
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="p-4 md:p-5 text-center">
              <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this movie?</h3>
              <button onClick={onDeleteConfirmed} className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5">Yes, I'm sure</button>
              <button onClick={closeModal} className="ml-2 text-gray-500 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg text-sm px-5 py-2.5">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteMovieModal;
  