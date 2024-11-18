import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = ({ movies }) => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id)); // Find movie by ID

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await axios.post("http://localhost:5000/increment-views", {
          title: movie.title,
        });
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    };

    if (movie) incrementViews();
  }, [movie]);

  if (!movie) return <div>Loading...</div>;

  const getImdbColor = (rating) => {
    if (rating >= 8) return "text-gold"; // Gold for IMDB >= 8
    if (rating >= 5) return "text-silver"; // Silver for IMDB >= 5
    return "text-bronze"; // Bronze for IMDB < 5
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Dynamic SEO Metadata */}
      <Helmet>
        <title>{movie.title} - KolaMovies</title>
        <meta name="description" content={movie.overview} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Movie Details Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Title and Description */}
        <div className="p-6 border-b">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 text-lg">{movie.description}</p>
        </div>

        {/* Poster and Key Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          {/* Poster */}
          <div className="relative">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg shadow-md"
            />
            {/* IMDB Rating */}
            <div
              className={`absolute bottom-4 right-4 bg-black bg-opacity-70 text-white text-sm font-bold py-1 px-2 rounded-lg ${getImdbColor(
                movie.imdbRating
              )}`}
            >
              <span className="flex items-center text-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  color="Gold"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.172c.969 0 1.371 1.24.588 1.81l-3.357 2.455a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118L10 13.011l-3.357 2.455c-.785.57-1.84-.197-1.54-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.668 8.385c-.783-.57-.38-1.81.588-1.81h4.172a1 1 0 00.95-.69l1.286-3.958z" />
                </svg>
                {movie.imdbRating}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <div className="space-y-4">
              <p>
                <strong>Language:</strong> {movie.language&& movie.language}
              </p>
              <p>
                <strong>Quality:</strong> {movie.quality&& movie.quality}
              </p>
              <p>
                <strong>Cast:</strong> {movie.cast&& movie.cast}
              </p>
              <p>
                <strong>Release Date:</strong> {movie.releaseDate}
              </p>
            </div>

            {/* Download Button */}
            <a
              href={movie.movieLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow-md hover:bg-blue-700"
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
