import React from "react";

const AddMoviesList = ({ newMovies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {newMovies.map((movie) => (
        <div
          key={movie.id}
          className="border rounded shadow hover:shadow-lg p-2 bg-gray-100"
        >
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-center text-lg font-semibold mt-2">
            {movie.title}
          </h2>
        </div>
      ))}
    </div>
  );
};

export default AddMoviesList;
