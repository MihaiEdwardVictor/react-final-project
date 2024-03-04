// MovieDetails.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./NavBar";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);

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
        const [detailsResponse, creditsResponse] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            options
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
            options
          ),
        ]);

        const [detailsData, creditsData] = await Promise.all([
          detailsResponse.json(),
          creditsResponse.json(),
        ]);

        setMovie(detailsData);
        setCast(creditsData.cast);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Navbar/>
      <div>
        <h1>{movie.title}</h1>
        <p>Release Date: {movie.release_date}</p>
        <p>Overview: {movie.overview}</p>

        {/* Display Cast Information */}
        <div>
          <h2>Cast</h2>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
