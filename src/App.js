import "./App.css";
import { useEffect, useState } from "react";
import SearchIcon from "./seacrh.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com/?apikey=e89daccf";

// const movie1 = {
//   Title: "Batman & Robin",
//   Year: "1997",
//   imdbID: "tt0118688",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg",
// };

export default function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function seacrhMovies(title) {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    // return data.Search;
    setMovies(data.Search);
  }

  useEffect(() => {
    seacrhMovies(searchTerm);
  }, [searchTerm]);

  function handleSearch(e) {
    if (!searchTerm) return;
    seacrhMovies(searchTerm);
  }

  return (
    <div className="app">
      <h1>Movie Finder</h1>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
