import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const API_BASE = import.meta.env.VITE_API_BASE;

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/films/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Film not found');
        return res.json();
      })
      .then((data) => {
        setFilm(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  const {
    film_banner,
    film_name,
    film_genre,
    film_year,
    film_images,
    film_description,
    film_type,
  } = film;

  const bannerUrl = `${API_BASE}/${film_banner.replace(/\\/g, '/')}`;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      {/* Film Info Section */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Poster */}
        <div className="w-full md:w-1/3">
          <img
            src={bannerUrl}
            alt={film_name}
            className="w-full rounded-lg shadow-lg object-cover"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
            {film_name}
          </h1>
          <div className="mt-2 text-sm text-yellow-400 uppercase">{film_type}</div>
          <div className="text-sm text-gray-300 mt-1">{film_genre} | {film_year}</div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold mb-2 border-b border-gray-700 pb-1">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed text-lg">{film_description}</p>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {film_images.length > 0 && (
        <div className="max-w-6xl mx-auto mt-12">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {film_images.map((img, i) => (
              <img
                key={i}
                src={`${API_BASE}/${img.replace(/\\/g, '/')}`}
                alt={`film-${i}`}
                className="w-full h-64 object-cover rounded shadow"
              />
            ))}
          </div>
        </div>
      )}

      {/* Back Link */}
      <div className="mt-12 text-center">
        <Link to="/films" className="text-yellow-500 hover:underline">
          &larr; Back to Films
        </Link>
      </div>
    </div>
  );
};

export default FilmDetail;
