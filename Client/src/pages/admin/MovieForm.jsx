import React, { useState } from "react";
import AddMoviesList from "../../components/AddMoviesList";
import LinkInputSection from "../../components/LinkInputSection";

const MovieForm = ({movies, movie, editingMode, stopRendering}) => {
    const [isPublished, setIsPublished] = useState(false);
    const [links, setLinks] = useState([{ index: "", url: "" }]); // State for links


  const [formData, setFormData] = useState(!editingMode?{
    title: "",
    language: "",
    quality: "",
    cast: "",
    posterUrl: "",
    posterFile: null,
    screenshotUrl: "",
    screenshotFile: null,
    imdbRating: "",
    RenderPageLink: "",
    releaseDate: "",
    catagory: "",
  }: {
    title: movie.title,
    language: movie.language,
    quality: movie.quality,
    cast: movie.cast,
    posterUrl: movie.poster,
    posterFile: movie.posterFile,
    screenshotUrl: movie.screenshotUrl,
    screenshotFile: movie.screenshotFile,
    imdbRating: movie.imdbRating,
    movieLink: movie.movieLink,
    releaseDate: movie.releaseDate,
    catagory: movie.catagory,
  });

  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility
  const [message, setMessage] = useState("");
  const [newMovies, setNewMovies] = useState([]);
  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMovie = !editingMode?{
      id: movies.length+newMovies.length,
      title: formData.title,
      language: formData.language,
      quality: formData.quality,
      cast: formData.cast,
      poster: formData.posterFile
        ? URL.createObjectURL(formData.posterFile)
        : formData.posterUrl,
      screenshot: formData.screenshotFile
        ? URL.createObjectURL(formData.screenshotFile)
        : formData.screenshotUrl,
      imdbRating: formData.imdbRating,
      RenderPageLink: formData.movieLink,
      releaseDate: formData.releaseDate,
      views: 0,
      catagory: formData.catagory,
      movieLink: links,
    }:{
        id: movie.id,
        title: formData.title,
        language: formData.language,
        quality: formData.quality,
        cast: formData.cast,
        poster: formData.posterFile
          ? URL.createObjectURL(formData.posterFile)
          : formData.posterUrl,
        screenshot: formData.screenshotFile
          ? URL.createObjectURL(formData.screenshotFile)
          : formData.screenshotUrl,
        imdbRating: formData.imdbRating,
        RenderPageLink: formData.RenderPageLink,
        releaseDate: formData.releaseDate,
        views: 0,
        catagory: formData.catagory,
        movieLinks: links,
    }

    // Add new movie to the list
    setNewMovies((prev) => [...prev, newMovie]);

    // Clear the form
    setFormData({
      title: "",
      language: "",
      quality: "",
      cast: "",
      posterUrl: "",
      posterFile: null,
      screenshotUrl: "",
      screenshotFile: null,
      imdbRating: "",
      RenderPageLink: "",
      releaseDate: "",
      catagory: "",
    });

    // Hide the form after adding the movie
    setIsFormVisible(false);
  };

  const publishMovies = () => {
    fetch("http://localhost:5000/save-movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovies),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          setMessage("Movies saved successfully!");
          setIsPublished(true);
          stopRendering();
          alert("Movie Publised Successfully");
        } else {
          setMessage("Failed to save movies.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setMessage("Failed to save movies.");
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Manage Movies</h1>
      <AddMoviesList newMovies={newMovies}/>
      {/* Add Movie Button */}
      {(!isFormVisible && !editingMode) && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
        >
          Add Movie
        </button>
      )}

      {/* Movie Form */}
      {(isFormVisible || editingMode) && !isPublished && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <LinkInputSection links={links} setLinks={setLinks} />

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Movie Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-medium mb-1">Language</label>
            <input
              type="text"
              name="language"
              value={formData.language}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Quality */}
          <div>
            <label className="block text-sm font-medium mb-1">Movie Quality</label>
            <input
              type="text"
              name="quality"
              value={formData.quality}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Cast */}
          <div>
            <label className="block text-sm font-medium mb-1">Movie Cast</label>
            <input
              type="text"
              name="cast"
              value={formData.cast}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Poster URL or File */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster</label>
            <div className="flex gap-2">
              <input
                type="url"
                name="posterUrl"
                value={formData.posterUrl}
                onChange={handleChange}
                placeholder="Poster URL"
                className="w-1/2 border-gray-300 rounded-md p-2"
              />
              <input
                type="file"
                name="posterFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-1/2 border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* Screenshot URL or File */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Screenshot (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                name="screenshotUrl"
                value={formData.screenshotUrl}
                onChange={handleChange}
                placeholder="Screenshot URL"
                className="w-1/2 border-gray-300 rounded-md p-2"
              />
              <input
                type="file"
                name="screenshotFile"
                accept="image/*"
                onChange={handleFileChange}
                className="w-1/2 border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          {/* IMDB Rating */}
          <div>
            <label className="block text-sm font-medium mb-1">IMDB Rating</label>
            <input
              type="number"
              step="0.1"
              name="imdbRating"
              value={formData.imdbRating}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Movie Link */}
          <div>
            <label className="block text-sm font-medium mb-1">Render Page Links</label>
            <input
              type="url"
              name="RenderPageLink"
              value={formData.RenderPageLink}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
          <label className="block text-sm font-medium mb-1">Movie Catagory</label>
            <input
              type="text"
              name="catagory"
              value={formData.catagory}
              onChange={handleChange}
              className="w-full border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
            >
              Save Movie
            </button>
            <button
              type="button"
              onClick={() => setIsFormVisible(false)}
              className="w-full bg-red-600 text-white rounded-md p-2 hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Publish All Button */}
      {movies.length > 0 && (
        <div className="mt-6">
          <button
            onClick={publishMovies}
            className="w-full bg-green-600 text-white rounded-md p-2 hover:bg-green-700"
          >
            Publish All
          </button>
          {message && (
            <p className="text-center text-green-600 mt-4">{message}</p>
          )}
        </div>
      )}
      
    </div>
  );
};

export default MovieForm;
