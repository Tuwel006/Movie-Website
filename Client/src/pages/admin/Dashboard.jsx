import React, { useState } from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [editingMode, setEditingMode] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null); // Movie being edited
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setIsFormVisible(true);
    setEditingMode(true);
  };

  const handleMovieSaved = (updatedMovies) => {
    setMovies(updatedMovies);
    setIsFormVisible(false);
    setEditingMovie(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10">
      <h1 className="text-3xl font-bold text-center mb-8">Movies Dashboard</h1>

      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700 mb-6"
        >
          Add New Movies
        </button>
      )}

      {isFormVisible && (
        <MovieForm
          movies ={movies}
          movie={editingMovie}
          editingMode={editingMode}
          stopRendering = {()=>setIsFormVisible(false)}
          onSave={handleMovieSaved}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      <MoviesList movies={movies} onEdit={handleEditMovie} setMovies={setMovies} />
    </div>
  );
};

export default Dashboard;
