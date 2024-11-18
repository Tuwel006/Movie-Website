const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// File path to movies.json
const moviesFilePath = path.join(__dirname, "movies.json");


app.get("/movies", (req, res) => {
    fs.readFile(moviesFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading file", err);
        return res.status(500).json({ error: "Failed to fetch movies." });
      }
      const movies = JSON.parse(data || "[]");
      res.status(200).json(movies);
    });
  });

// Endpoint to save movies
app.post("/save-movies", (req, res) => {
    const newMovies = req.body; // Incoming movies
  
    // Validate the incoming data
    if (!Array.isArray(newMovies)) {
      return res.status(400).json({ error: "Movies data must be an array." });
    }
  
    // Read the existing movies from movies.json
    fs.readFile(moviesFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading movies file", err);
        return res.status(500).json({ error: "Failed to read movies file." });
      }
  
      const existingMovies = JSON.parse(data || "[]"); // Parse or initialize empty array
  
      // Update or add each new movie
      newMovies.forEach((newMovie) => {
        const existingIndex = existingMovies.findIndex(
          (movie) => movie.title.toLowerCase() === newMovie.title.toLowerCase() // Case-insensitive comparison
        );
  console.log(newMovie);
  
        if (existingIndex !== -1) {
          // Update the existing movie
          console.log("Movie Details Updateding");
          existingMovies[existingIndex] = { ...existingMovies[existingIndex], ...newMovie };
          console.log("Movie Details Updated");
        } else {
          // Add as a new movie
          existingMovies.push(newMovie);
          console.log("New Movie Saved");
        }
      });
  
      // Write the updated movies back to movies.json
      fs.writeFile(moviesFilePath, JSON.stringify(existingMovies, null, 2), (err) => {
        if (err) {
          console.error("Error writing to movies file", err);
          return res.status(500).json({ error: "Failed to save movies." });
        }
  
        res.status(200).json({ message: "Movies saved successfully!", movies: existingMovies });
      });
    });
  });

  // Increment views for a movie
app.post("/increment-views", (req, res) => {
    const { title } = req.body;
  
    fs.readFile(moviesFilePath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading movies file", err);
        return res.status(500).json({ error: "Failed to read movies file." });
      }
  
      const movies = JSON.parse(data || "[]");
      const movie = movies.find((m) => m.title.toLowerCase() === title.toLowerCase());
  
      if (movie) {
        movie.views = (movie.views || 0) + 1;
  
        fs.writeFile(moviesFilePath, JSON.stringify(movies, null, 2), (err) => {
          if (err) {
            console.error("Error writing to movies file", err);
            return res.status(500).json({ error: "Failed to update views." });
          }
  
          res.status(200).json({ message: "Views updated successfully!", movie });
        });
      } else {
        res.status(404).json({ error: "Movie not found." });
      }
    });
  });
  
  
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
