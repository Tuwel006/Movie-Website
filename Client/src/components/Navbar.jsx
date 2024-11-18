import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { MdClose } from 'react-icons/md';
//import logo from '../assets/kola-movies-logo.png'; // Replace this with your custom movie logo image

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 }); // Detect mobile view

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery); // Replace with search functionality
  };

  return (
    <nav className="bg-gray-900 text-white pl-2 pr-4 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        {/* <img src={logo} alt="KolaMovies Logo" className="h-10 w-auto" /> */}
        <span className="text-2xl font-bold ml-2">🎬 KolaMovies</span>
      </Link>

      {/* Desktop Search Bar */}
      {!isMobile && (
        <form onSubmit={handleSearch} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies..."
            className="p-2 w-80 rounded-md bg-gray-700 text-white focus:outline-none"
          />
          <button type="submit" className="p-2 text-gray-500 hover:text-white">
            <FaSearch />
          </button>
        </form>
      )}

      {/* Mobile View - Search Icon */}
      {isMobile && !isSearchOpen && (
        <button
          onClick={toggleSearchBar}
          className="p-2 text-white hover:text-gray-400"
        >
          <FaSearch size={20} />
        </button>
      )}
      {isMobile && isSearchOpen && (
        <button
          onClick={toggleSearchBar}
          className="p-2 text-white hover:text-gray-400"
        >
          <MdClose size={20} />
        </button>
      )}

      {/* Mobile Search Bar */}
      {isMobile && isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-gray-800 p-4">
          <form onSubmit={handleSearch} className="flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for movies..."
              className="p-3 w-full rounded-md bg-gray-700 text-white focus:outline-none"
            />
            <button type="submit" className="p-2 ml-2 text-gray-500 hover:text-white">
              <FaSearch />
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
