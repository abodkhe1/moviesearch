import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const searchMovies = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=59d35b16`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  const handleMovieClick = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Search</h1>
        <form onSubmit={searchMovies}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a movie..."
          />
          <button type="submit">Search</button>
        </form>
      </header>
      <div className="movies">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {movies.map(movie => (
          <div key={movie.imdbID} className="movie" onClick={() => handleMovieClick(movie.imdbID)}>
            <img src={movie.Poster} alt={movie.Title} />
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;