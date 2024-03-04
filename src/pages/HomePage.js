import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import Navbar from "../components/NavBar";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTQ4YWE0NDA4ZjZhODlhNjA5ODAyN2FkYzExYzIzMiIsInN1YiI6IjY1ZDRjYjc5OTY3Y2M3MDEzMDYyMWQxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w09ObjxYva0T5Ce9tBHAUcgi1CpBv1T8f0ixHPvrIFE",
        },
      };

      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          options
        );

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const maxMoviesToShow = 18;

  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <h1>New Arrivals</h1>
        <div className="row row-cols-1 row-cols-md-3 g-3">
          {movies.slice(0, maxMoviesToShow).map((movie) => (
            <div key={movie.id} className="col mb-3">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
