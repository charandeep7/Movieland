import React, { useEffect, useState } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=ffa18e1c";
const moviesList = ["The Notebook", "The Conjuring", "Before Sunrise", "The last song", "The vow", "Romeo and Juliet", "Fifty Shades", "Ella Enchanted", "Christmas with you", "The Noel Diary", "Stranger Things", "Dark", "The Shawshank Redemption"]

const App = () =>{
    const [searchTerm, setSearchTerm] = useState("");
    const [movies, setMovies] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search)
    }
    useEffect(() => {
        searchMovies(moviesList[Math.floor(Math.random() * moviesList.length)])
    },[])
    return (
        <div className="app">
            <h1 onClick={() => searchMovies(moviesList[Math.floor(Math.random() * moviesList.length)])}>MovieLand</h1>

            <div className="search">
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Search for movies" />
                <img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
            </div>
            {
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map(movie => <MovieCard movie={movie}/>
                        )}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    )
}

export default App