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
    <div className="relative z-10 max-w-3xl px-8 py-24 ml-10 mt-15">
      <h1
        className="text-4xl md:text-5xl mb-3"
        style={{ fontFamily: 'Playfair Display' }}
      >
        {film.film_name}
      </h1>
      <p
        className="text-md md:text-2xl mb-3 leading-relaxed text-[#D4AF37]"
        style={{ fontFamily: "Montserrat" }}
      >
      {film.director_name}
      </p>
      <p
        className="text-sm md:text-md mb-3 leading-relaxed max-w-prose"
        style={{ fontFamily: "'Montserrat', sans-serif" }}
      >
        {film.film_description}
      </p>

<div className="flex flex-row gap-3 w-full max-w-md">
  <a
    href={film.trailer_url || '#'}
    target="_blank"
    rel="noopener noreferrer"
    className="
      bg-[#D4AF37] hover:bg-red-700 text-black 
      py-2 px-4
      transition duration-300 
      inline-flex items-center gap-2
      w-full sm:w-auto
      justify-center
      text-base sm:text-lg
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      viewBox="0 0 20 20"
      fill="black"
    >
      <polygon points="6,4 16,10 6,16" />
    </svg>
    Watch Trailer
  </a>
  <a
    href={'#'}
    className="
      border-2 border-white 
      py-2 px-4 
      bg-transparent 
      hover:bg-[#D4AF37] hover:text-black 
      transition duration-300 
      w-full sm:w-auto
      text-base sm:text-lg
      text-white text-center
    "
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
