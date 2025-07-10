import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const API_BASE = import.meta.env.VITE_API_BASE;

// Autoplay plugin for Keen Slider
function autoplay(run = true, interval = 3000) {
  return (slider) => {
    let timeout;
    let mouseOver = false;

    const clearNextTimeout = () => clearTimeout(timeout);

    const nextTimeout = () => {
      clearTimeout(timeout);
      if (mouseOver || !run) return;
      timeout = setTimeout(() => slider.next(), interval);
    };

    slider.on('created', () => {
      slider.container.addEventListener('mouseover', () => {
        mouseOver = true;
        clearNextTimeout();
      });
      slider.container.addEventListener('mouseout', () => {
        mouseOver = false;
        nextTimeout();
      });
      nextTimeout();
    });

    slider.on('dragStarted', clearNextTimeout);
    slider.on('animationEnded', nextTimeout);
    slider.on('updated', nextTimeout);
  };
}

const HeroSection = () => {
  const [originals, setOriginals] = useState([]);

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: { perView: 1 },
    },
    [autoplay()] // Add autoplay plugin here
  );

  useEffect(() => {
    fetch(`${API_BASE}/films`)
      .then((res) => res.json())
      .then((data) => {
        const originalFilms = data.filter((film) => film.film_type === 'original');
        setOriginals(originalFilms);
      })
      .catch((err) => console.error('Failed to fetch original films:', err));
  }, []);

  const goToPrev = () => {
    if (instanceRef.current?.track?.details) {
      instanceRef.current.prev();
    }
  };

  const goToNext = () => {
    if (instanceRef.current?.track?.details) {
      instanceRef.current.next();
    }
  };

  return (
    <section className="w-screen relative py-3 text-white">
      {originals.length === 0 ? (
        <div className="text-white text-center text-xl">Loading...</div>
      ) : (
        <div className="relative">
          <div ref={sliderRef} className="keen-slider">
            {originals.map((film) => {
              const cleanBannerPath = film.film_banner.replace(/\\/g, '/');
              const imageUrl = `${API_BASE}/${cleanBannerPath}`;

              return (
  <div
    key={film._id}
    className="keen-slider__slide bg-cover bg-center bg-no-repeat relative"
    style={{
      backgroundImage: `url("${imageUrl}")`,
      height: '500px',
      width: '100%',
    }}
  >
    <div className="relative z-10 max-w-3xl px-8 py-24 ml-10 mt-20">
      <h1
        className="text-4xl md:text-6xl font-bold mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {film.film_name}
      </h1>
      <p
        className="text-md md:text-2xl mb-4 leading-relaxed text-yellow-500"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
       By {film.director_name}
      </p>
      <p
        className="text-md md:text-lg mb-6 leading-relaxed max-w-md"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {film.film_description}
      </p>

      <div className="flex gap-4">
        <a
          href={film.trailer_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-red-700 text-black font-semibold py-2 px-4 transition duration-300"
        >
          Watch Trailer
        </a>
       <a
  href={'#'}
  className="border-2 border-yellow-500 text-yellow-500 font-semibold py-2 px-4 bg-transparent hover:bg-gray-100 transition duration-300"
>
  More
</a>

      </div>
    </div>
  </div>
);

            })}
          </div>

          {/* Navigation Arrows */}
          {originals.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center px-4">
              <button
                onClick={goToPrev}
                className="text-white bg-opacity-50 text-4xl hover:bg-opacity-70 rounded-full p-2"
              >
                ‹
              </button>
              <button
                onClick={goToNext}
                className="text-white bg-opacity-50 text-4xl hover:bg-opacity-70 rounded-full p-2"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
