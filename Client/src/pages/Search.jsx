import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    axios.get('https://api.themoviedb.org/3/search/movie', {
      params: {
        api_key: 'YOUR_API_KEY',
        query,
      },
    })
    .then(response => setMovies(response.data.results))
    .catch(error => console.error(error));
  };

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border p-2 flex-grow"
          placeholder="Search for a movie..."
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2">Search</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
