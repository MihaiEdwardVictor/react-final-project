// MovieCard.js
import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="card movie-card h-100">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        className="card-img-top"
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text">Release Date: {movie.release_date}</p>
        <Link to={`/movie/${movie.id}`} className="btn btn-dark">Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;
