import React, { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE;

const Productions = () => {
  const [productions, setProductions] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/films`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((film) => film.film_type === 'production');
        setProductions(filtered);
      })
      .catch((err) => console.error('Error fetching productions:', err));
  }, []);

return (
  <div className="px-6 py-10 bg-black text-white">
    <h2
      className="ml-6 text-3xl font-semibold mb-6"
      style={{ fontFamily: "'Playfair Display', serif" }}
    >
      Our Productions
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {productions.slice(0, 6).map((film) => {
        const cleanPath = film.film_banner.replace(/\\/g, '/');
        const imageUrl = `${API_BASE}/${cleanPath}`;

        return (
          <div
            key={film._id}
            className="overflow-hidden shadow-md  flex justify-center items-center"
          >
            <img
              src={imageUrl}
              alt={film.film_name}
              className="w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>

    <div className="mt-8 text-center">
      <a
        href="/films"
        className="inline-block border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition duration-200"
      >
        View All Films
      </a>
    </div>
  </div>
);
}

export default Productions;
  