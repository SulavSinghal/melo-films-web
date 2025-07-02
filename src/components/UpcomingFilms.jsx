
import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function UpcomingSection() {
  const [films, setFilms] = useState([]);
  const [cta, setCta] = useState(null);

  // Keen slider setup
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
      renderMode: 'performance',
      created(slider) {
        setInterval(() => {
          slider.next();
        }, 2000);
      },
    },
    []
  );

  // Fetch films and CTA content
  useEffect(() => {
    fetch(`${API_BASE}/api/films`)
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data.filter((f) => f.film_type === 'upcoming');
        setFilms(upcoming);
      });
  }, []);

  return (

    
    <section className="bg-black text-white py-16 px-6 sm:px-12">
     <h2
    className="text-3xl font-bold mb-10"
    style={{ fontFamily: "'Playfair Display', serif" }}
  >
    Upcomings
  </h2>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">
        {/* LEFT: Upcoming Films Carousel */}
        {films.length > 0 && (
  <div
    ref={sliderRef}
    className="keen-slider w-full md:w-3/5 h-[500px] rounded-lg overflow-hidden shadow-lg border border-gray-800"
  >
    {films.map((film) => {
      console.log('Image URL:', film.film_banner);
      const cleanBannerPath = film.film_banner.replace(/\\/g, '/');
      const imageUrl = `${API_BASE}/${cleanBannerPath}`;
      return (
        <div
          key={film._id}
          className="keen-slider__slide min-w-0 h-full"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url("${imageUrl}")`,
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="w-full h-full bg-opacity-50 flex flex-col justify-end p-6">
              <span className="text-black text-sm font-medium bg-yellow-500 px-2 py-1 inline-block w-fit">
                {film.film_year}
              </span>
              <h3
                className="text-2xl font-bold mt-2"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {film.film_name}
              </h3>
              <p className="text-sm text-white text-opacity-90">
                {film.film_description}
              </p>
            </div>
          </div>
        </div>
      );
    })}
  </div>
)}
        {/* RIGHT: CTA Section */}
        <div className="w-full md:w-2/5 bg-[#111] p-8 rounded-lg shadow-lg border border-gray-800 flex flex-col justify-center">
          {cta ? (
            <>
              <h2
                className="text-3xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {cta.heading}
              </h2>
              <p className="text-white text-opacity-80 text-base mb-6">
                {cta.description}
              </p>
              <a
                href={cta.button_link || '/'}
                className="bg-yellow-500 text-black px-5 py-3 rounded font-semibold w-fit hover:bg-yellow-400 transition"
              >
                {cta.button_text || 'Learn More'}
              </a>
            </>
          ) : (
            <p className="text-white text-opacity-50">Loading CTA...</p>
          )}
        </div>
      </div>
    </section>
  );
}
