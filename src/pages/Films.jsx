import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE;

const FilmsPage = () => {
  const [films, setFilms] = useState([]);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [selectedType, setSelectedType] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);
  const filmsPerPage = 6;

  useEffect(() => {
    fetch(`${API_BASE}/films`)
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
        setFilteredFilms(data);
        setCurrentPage(1); // reset to page 1 on initial load
      })
      .catch((err) => console.error('Error fetching films:', err));
  }, []);

  const handleFilterChange = (e) => {
    const type = e.target.value;
    setSelectedType(type);
    setCurrentPage(1); // reset to first page on filter change
    if (type === 'all') {
      setFilteredFilms(films);
    } else {
      const filtered = films.filter((film) => film.film_type === type);
      setFilteredFilms(filtered);
    }
  };

  const indexOfLastFilm = currentPage * filmsPerPage;
  const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
  const currentFilms = filteredFilms.slice(indexOfFirstFilm, indexOfLastFilm);
  const totalPages = Math.ceil(filteredFilms.length / filmsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat text-white px-8 py-24 bg-[#0f0f0f]">
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  <div className="relative z-10 w-full max-w-4xl text-left">
    <h1
      className="text-4xl md:text-5xl font-bold mb-12"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Explore Our Productions
    </h1>
    <p
      className="text-md md:text-lg mb-6 leading-relaxed"
      style={{ fontFamily: "'Montserrat', sans-serif" }}
    >
      Explore our diverse portfolio of award-winning films, from thought-provoking documentaries to
      visually stunning feature films that push the boundaries of storytelling.
    </p>
  </div>
</section>


      {/* Films Grid with Filter */}
      <section className="bg-black text-white min-h-screen px-6 py-10">
        {/* Filter Dropdown */}
        <div className="mb-8 text-right">
          <label htmlFor="filmFilter" className="mr-2 text-sm font-medium">
            Filter by Type:
          </label>
          <select
            id="filmFilter"
            value={selectedType}
            onChange={handleFilterChange}
            className="bg-black border border-gray-700 text-white px-4 py-2 rounded"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="production">Production</option>
            <option value="original">Original</option>
          </select>
        </div>

<div className="mb-6 text-sm text-gray-400">
  Showing {filteredFilms.length === 0 ? 0 : indexOfFirstFilm + 1}–{Math.min(indexOfLastFilm, filteredFilms.length)} of {filteredFilms.length} films
</div>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
          {currentFilms.map((film) => {
            const cleanPath = film.film_banner.replace(/\\/g, '/');
            const imageUrl = `${API_BASE}/${cleanPath}`;

            return (
              <div key={film._id} className="relative group overflow-hidden rounded shadow-md transform transition-transform duration-300 hover:scale-105">
                <img
                  src={imageUrl}
                  alt={film.film_name}
                  className="w-full h-[400px] object-cover rounded"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>

                {/* Tag */}
                {film.film_type?.toLowerCase() === "original" && (
  <span className="absolute top-2 right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded">
    {film.film_type.toUpperCase()}
  </span>
)}

                {/* More Button */}
                {/* <Link
                  to={`/films/${film._id}`}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-yellow-500 text-black px-4 py-2 rounded"
                >
                  More
                </Link> */}
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-10 flex justify-center flex-wrap gap-2 text-white">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? 'bg-yellow-500 text-black border-yellow-500'
                  : 'border-gray-700 hover:bg-gray-800'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </section>
    </>
  );
};

export default FilmsPage;
