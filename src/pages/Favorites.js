import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/NavBar';


const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [favoriteMoviesData, setFavoriteMoviesData] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const storedFavorites = JSON.parse(localStorage.getItem('movieFavorites')) || [];
        setFavoriteMovies(storedFavorites);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, []);

  useEffect(() => {
    const fetchMoviesData = async () => {
      const apiKey = 'a548aa4408f6a89a6098027adc11c232';
      const promises = favoriteMovies.map(async (movieId) => {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
          );
          const movieData = await response.json();
          return movieData;
        } catch (error) {
          console.error('Error fetching movie details:', error);
          return null;
        }
      });

      const moviesData = await Promise.all(promises);
      setFavoriteMoviesData(moviesData.filter(Boolean));
    };

    if (favoriteMovies.length > 0) {
      fetchMoviesData();
    }
  }, [favoriteMovies]);

  return (
    <div style={{overflow:'hidden'}}>
      <Navbar/>
      <h2 className="mt-3 mb-4">Favorite Movies</h2>
      <div className="row">
        {favoriteMoviesData.map((movieData, index) => (
          <div key={favoriteMovies[index]} className="col-2 mb-3">
            <MovieCard movie={movieData} smallVersion={true} />
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Favorites;
