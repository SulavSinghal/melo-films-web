// import React from 'react';

// const HeroSection = () => {
//   return (
//     <section
//       className="relative bg-cover bg-center bg-no-repeat text-white px-8 py-24"
//       style={{ backgroundImage: "url('./assets/images/awards.png')"}}
//     >
//       {/* Overlay */}
//       {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}

//       {/* Content */}
//       <div className="relative z-10 max-w-3xl">
//         <h1
//           className="text-4xl md:text-6xl font-bold mb-4"
//           style={{ fontFamily: "'Playfair Display', serif" }}
//         >
//           The Forgotten Echo
//         </h1>
//         <p
//           className="text-lg text-yellow-400 font-semibold mb-2"
//           style={{ fontFamily: "'Montserrat', sans-serif" }}
//         >
//           Sanjana Wadkar
//         </p>
//         <p
//           className="text-md md:text-lg mb-6 leading-relaxed"
//           style={{ fontFamily: "'Montserrat', sans-serif" }}
//         >
//           A haunting journey through memory and time that challenges our <br /> perception of reality.
//         </p>
//         <div className="flex flex-wrap gap-4">
//           <a
//             href="#"
//             className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition"
//           >
//             ▶ Watch Trailer
//           </a>
//           <a
//             href="#"
//             className="border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
//           >
//             Learn More
//           </a>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
import React, { useEffect, useState } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const API_BASE = import.meta.env.VITE_API_BASE;

const HeroSection = () => {
  const [originals, setOriginals] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
  });

  useEffect(() => {
    fetch(`${API_BASE}/api/films`)
      .then((res) => res.json())
      .then((data) => {
        const originalFilms = data.filter((film) => film.film_type === 'original');
        setOriginals(originalFilms);
      })
      .catch((err) => console.error('Failed to fetch original films:', err));
  }, []);

  const goToPrev = () => {
    if (instanceRef.current && instanceRef.current.track && instanceRef.current.track.details) {
      instanceRef.current.prev();
    }
  };

  const goToNext = () => {
    if (instanceRef.current && instanceRef.current.track && instanceRef.current.track.details) {
      instanceRef.current.next();
    }
  };

  return (
    <section className="relative px-0 md:px-8 py-20 text-white">
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
                  <div className="relative z-10 max-w-3xl px-8 py-24">
                    <h1
                      className="text-4xl md:text-6xl font-bold mb-4"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {film.film_name}
                    </h1>
                 
                    <p
                      className="text-md md:text-lg mb-6 leading-relaxed"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      {film.film_description}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      {/* <a
                        href="#"
                        className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded-full hover:bg-yellow-300 transition"
                      >
                        ▶ Watch Trailer
                      </a>
                      <a
                        href="#"
                        className="border border-yellow-400 text-yellow-400 font-semibold px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black transition"
                      >
                        Learn More
                      </a> */}
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
                className="text-white  bg-opacity-50 text-4xl hover:bg-opacity-70 rounded-full p-2"
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
