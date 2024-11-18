import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Details from './pages/Details';
import Search from './pages/Search';
import Dashboard from './pages/admin/Dashboard';
import axios from 'axios';

const App = () => {

const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("https://movie-website-dz9k.onrender.com/movies");
        const newMovies = res.data; // Get the data from the response
        //setLocalMovies(newMovies); // Set the movies state with the response data
        newMovies.forEach(movie => {
          setMovies(newMovies);
        }); // Optionally, if you want to set global state
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // Call the function to fetch movies when the component mounts
  }, []);


  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home movies={movies} />} />
            <Route path="/latestmovies" element={<Home movies={movies} />} />
            <Route path="/movie/:id" element={<Details movies={movies} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/editor/dashboard" element={<Dashboard />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
