import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./seacrh.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=e89daccf";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // В searchTerm хранится название нашего фильма, который передается через параметр Функции searchMovies(title);

  async function seacrhMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search); // Обновляем состояние Массив с данными.
  }

  useEffect(() => {
    seacrhMovies(searchTerm);
  }, []);

  function handleSearch(e) {
    if (!searchTerm) return;
    seacrhMovies(searchTerm);
    setSearchTerm("");
  }

  function handleChange(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="app">
      <h1>Movie Finder</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={handleChange} // Обновляю состояние.
        />
        <img src={SearchIcon} alt="search" onClick={handleSearch} />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
}
