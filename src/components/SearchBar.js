import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const apiKey = 'a548aa4408f6a89a6098027adc11c232';
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
      );

      const data = await response.json();
      

      if (data.results.length > 0) {
        const movieId = data.results[0].id;
        navigate(`/movie/${movieId}`);
      }
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <form className="form ms-auto d-flex gap-2" onSubmit={handleSearch}>
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="btn btn-outline-light" type="submit">
        Search
      </button>
    </form>
  );
};
