import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoviesList = ({ onEdit, setMovies }) => {
  const [movies, setLocalMovies] = useState([]);

  // Fetch movies from the backend
  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => {
        setLocalMovies(data);
        setMovies(data); // Set global movies if needed elsewhere
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [setMovies]);

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Movies List</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-md shadow-md overflow-hidden"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Language:</span>{" "}
                  {movie.language}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Quality:</span> {movie.quality}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">IMDB:</span>{" "}
                  {movie.imdbRating}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Views:</span>{" "}
                  {movie.views || 0}
                </p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => onEdit(movie)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <Link to={`/movie/${movie.id}`}
                    
                    className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesList;
