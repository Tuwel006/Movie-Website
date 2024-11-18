import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {FaStar} from "react-icons/fa";

const MovieCard = ({ movie }) => {
  const placeholderPoster = "https://via.placeholder.com/500x750/ffffff/000000?text=No+Poster"; // Placeholder image
const navigator = useNavigate();
  return (
    <div className="relative bg-slate-700 rounded shadow-xl hover:opacity-90 overflow-hidden transform hover:scale-105 transition duration-300 group">
      {/* Movie Poster */}
      <Link to={`/movie/${movie.id}`}> 
      <div className="flex text-2xl text-gold">
      <FaStar
        style={{
          color: "gold", // Gold color for the star
          backgroundColor: "transparent", // Transparent background
          fontSize: "25px", // Adjust size as needed
        }}
      /> 
      <p className="pl-2">{movie.imdbRating}</p>
      </div>
      <img
        src={movie.poster || placeholderPoster}
        alt={movie.title}
        className="w-full h-72 object-cover bg-white"
        onError={(e) => (e.target.src = placeholderPoster)} // Fallback if the poster fails to load
      />

      {/* Download Icon */}
      <div className="absolute inset-0 flex top-28 justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-transparent">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 16l4-4h-3V4h-2v8H8l4 4zM4 20v-2h16v2H4z" />
          </svg>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-4">
        <h2 className="text-xl text-center font-bold text-gray-200 ">{movie.title}</h2>
        <p className="text-center text-base text-gray-300 mt-2 line-clamp-3">{movie.description}</p>
      </div>
      </Link>
    </div>
  );
};

export default MovieCard;
