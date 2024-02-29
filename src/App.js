import "./App.css";
import { useEffect } from "react";
import SearchIcon from "./seacrh.svg";

const API_URL = "https://www.omdbapi.com/?apikey=e89daccf";

export default function App() {

  async function seacrhMovies(title) {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();
      return data.Search;
  }


  useEffect(() => {
    seacrhMovies("Batman");
  }, []);


  return (
    <div className="app">
      <h1>Movie Finder</h1>

      <div className="search">
        <input placeholder="Search for movies" />
      </div>
    </div>
  );
}


