import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import favoriteIcon from "../assets/images/favorite_icon.png";
import favoriteIconFilled from "../assets/images/favorite_icon_clicked.png";

const MovieCard = ({ movie, smallVersion, onToggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check local storage for the favorite status when the component mounts
    const storedFavorites = JSON.parse(localStorage.getItem("movieFavorites")) || [];
    setIsFavorite(storedFavorites.includes(movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    // Toggle the favorite status
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    // Update local storage with the new favorite status
    const storedFavorites = JSON.parse(localStorage.getItem("movieFavorites")) || [];
    const updatedFavorites = newFavoriteStatus
      ? [...storedFavorites, movie.id]
      : storedFavorites.filter((movieId) => movieId !== movie.id);
    localStorage.setItem("movieFavorites", JSON.stringify(updatedFavorites));

    // Call the onToggleFavorite function if it's provided
    if (onToggleFavorite) {
      onToggleFavorite(movie.id, newFavoriteStatus);
    }
  };

  if (!movie || !movie.id) {
    // Handle the case where movie or movie.id is undefined
    return null;
  }

  return (
    <div className={`card movie-card h-100 ${smallVersion ? 'small-version' : ''}`}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="card-img-top h-100"
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        {smallVersion && (
          <p className="card-text small-version-text">Release Date: {movie.release_date}</p>
        )}
        <Link to={`/movie/${movie.id}`} className="btn btn-dark">
          Details
        </Link>
        <img
          className="mx-2"
          src={isFavorite ? favoriteIconFilled : favoriteIcon}
          height={25}
          alt="favorite icon"
          onClick={toggleFavorite}
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default MovieCard;
