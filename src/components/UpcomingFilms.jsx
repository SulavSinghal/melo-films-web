import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const API_BASE = import.meta.env.VITE_API_BASE;

const UpcomingFilms = () => {
  const [films, setFilms] = useState([]);
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      '(max-width: 768px)': {
        slides: { perView: 1 },
      },
    },
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/films`)
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data.filter((film) => film.film_type === 'upcoming');
        setFilms(upcoming);
      })
      .catch((err) => console.error('Failed to fetch films:', err));
  }, []);

  return (
    <section className="bg-black text-white px-6 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
          Upcoming Films
        </h2>
        <a href="/films" className="text-yellow-500 hover:underline">View All</a>
      </div>

      {films.length > 2 ? (
        <div ref={sliderRef} className="keen-slider">
          {films.map((film) => {
            const cleanBannerPath = film.film_banner.replace(/\\/g, '/');
            const imageUrl = `${API_BASE}/${cleanBannerPath}`;

            return (
              <div key={film._id} className="keen-slider__slide">
                <div className="relative h-96 overflow-hidden shadow-lg rounded">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-80"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                  ></div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-6">
                    <span className="text-black text-sm font-medium bg-yellow-500 px-1 py-0.5 inline-block w-fit">
                      {film.film_year}
                    </span>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {film.film_name}
                    </h3>
                    <p className="text-sm text-white text-opacity-80">{film.film_description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {films.map((film) => {
            const cleanBannerPath = film.film_banner.replace(/\\/g, '/');
            const imageUrl = `${API_BASE}/${cleanBannerPath}`;

            return (
              <div key={film._id} className="relative h-96 overflow-hidden shadow-lg rounded">
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-80"
                  style={{ backgroundImage: `url(${imageUrl})` }}
                ></div>
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <span className="text-black text-sm font-medium bg-yellow-500 px-1 py-0.5 inline-block w-fit">
                    {film.film_year}
                  </span>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {film.film_name}
                  </h3>
                  <p className="text-sm text-white text-opacity-80">{film.film_description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default UpcomingFilms;
