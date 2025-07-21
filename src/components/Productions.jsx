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
  <div className="px-6 py-6 bg-black text-white">
    <h2
      className="ml-6 text-3xl mb-10"
      style={{ fontFamily: "Playfair Display" }}
    >
      Our Productions
    </h2>

    <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
        className="inline-block border border-[#D4AF37] text-[#D4AF37] px-4 py-2  hover:[#D4AF37] hover:text-black transition duration-200"
      >
        View All Films
      </a>
    </div>
  </div>
);
}

export default Productions;
  