import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import HeroSection from '../components/HeroSection';
import MovieCard from '../components/MovieCard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home = ({movies}) => {
  //const [movies, setMovies] = useState([{id: 1,title: "This is 1st Movie", poster_path: "https://m.media-amazon.com/images/I/71DwIcSgFcS._AC_UF1000,1000_QL80_.jpg", }]);

//   useEffect(() => {
//     axios
//       .get('https://api.themoviedb.org/3/movie/popular', {
//         params: { api_key: 'YOUR_API_KEY' },
//       })
//       .then(response => setMovies(response.data.results))
//       .catch(error => console.error(error));
//   }, []);

useEffect(()=>{
  if (window.location.pathname === '/latestmovies') {
    movies.reverse();
 }
})
  

  return (
    <div>
      {/* SEO Metadata */}
      <Helmet>
        <title>KolaMovies - Discover Popular Movies</title>
        <meta name="description" content="Explore the most popular movies, trending now on MovieHub!" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>

      {/* Page Content */}
      <HeroSection />
      <div className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {movies.map(movie => (
            movie&& <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
