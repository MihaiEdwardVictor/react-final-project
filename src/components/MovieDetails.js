import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";
import starIcon from "../assets/images/star_icon.png.png"
import "../assets/other stuff/stylings/MovieDetails.css";
import { Footer } from "./Footer";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTQ4YWE0NDA4ZjZhODlhNjA5ODAyN2FkYzExYzIzMiIsInN1YiI6IjY1ZDRjYjc5OTY3Y2M3MDEzMDYyMWQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w09ObjxYva0T5Ce9tBHAUcgi1CpBv1T8f0ixHPvrIFE",
        },
      };

      try {
        const [detailsResponse, creditsResponse, videosResponse] =
          await Promise.all([
            fetch(
              `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
              options
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
              options
            ),
            fetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
              options
            ),
          ]);

        const [detailsData, creditsData, videosData] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
          videosResponse.json(),
        ]);

        setMovie(detailsData);
        setCast(creditsData.cast);

        // Find the first trailer key in the videos data
        const trailer = videosData.results.find(
          (video) => video.type === "Trailer"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  // Round the rating to 1 decimal
  const roundedRating = movie.vote_average.toFixed(1);

  return (
    <>
      <Navbar />
      <div className="movie-details-container">
        <div className="movie-details-header">
          <h1>{movie.title}</h1>
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-details-content">
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className="d-flex align-items-center">
            <strong>Rating:</strong> {roundedRating} / 10
            <img className="rating-icon" src={starIcon} alt="Star Icon" />
          </p>
          {/* Display Cast Information */}
          <div>
            <h2>Cast</h2>
            <p>{cast.map((actor) => actor.name).join(", ")}</p>
          </div>

          {/* Display Trailer */}
          {trailerKey && (
            <div className="video-container">
              <h2>Trailer</h2>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer></Footer>
    </>
  );
};

export default MovieDetails;
