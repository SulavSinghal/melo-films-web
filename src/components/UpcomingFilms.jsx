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
        }, 5000);
      },
    },
    []
  );

  // Fetch films and CTA content
  useEffect(() => {
    fetch(`${API_BASE}/films`)
      .then((res) => res.json())
      .then((data) => {
        const upcoming = data.filter((f) => f.film_type === 'upcoming');
        setFilms(upcoming);
      });

    fetch(`${API_BASE}/opportunities/latest`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCta({
            heading: data.title,
            description: data.desc,
            image: `${API_BASE}${data.bannerImg.replace(/\\/g, '/')}`,
            endsAt: data.endsAt,
          });
        }
      });
  }, []);

  return (
    <section className="bg-black text-white py-6 px-17">
      <h2
        className="text-2xl mb-10 text-center md:text-left"
        style={{ fontFamily: "Playfair Display" }}
      >
        Upcomings
      </h2>

      <div className="max-w-[90rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Upcoming Films Carousel */}
        {films.length > 0 && (
          <div
            ref={sliderRef}
            className="keen-slider h-[310px] overflow-hidden shadow-xl border border-gray-800 animate-fade-in"
          >
            {films.map((film) => {
              const cleanBannerPath = film.film_banner.replace(/\\/g, '/');
              const imageUrl = `${API_BASE}${cleanBannerPath}`;
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
                    <div className="w-full h-full  bg-opacity-60 flex flex-col justify-end p-6">
                      <span className="text-black text-sm font-medium bg-[#D4AF37] px-2 py-1 inline-block w-fit">
                        {film.film_year}
                      </span>
                      <h3
                        className="text-2xl font-bold mt-2"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {film.film_name}
                      </h3>
                      <p className="text-sm text-white text-opacity-90"  style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {film.film_description}
                      </p>
                    </div>
                  </div>
                </div>
              ); 
            })}
          </div>
        )}

        {/* RIGHT: CTA Opportunity Card */}
<div className="h-[310px] overflow-hidden shadow-xl border border-gray-800 animate-fade-in">
  {cta ? (
    <a
      href={cta.link || '/'} // fallback route
      target="_blank"
      rel="noopener noreferrer"
      className="w-full h-full block bg-cover bg-center"
      style={{
        backgroundImage: `url("${cta.image}")`,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="w-full h-full bg-opacity-60 flex flex-col justify-end p-6">
        <span className="text-black text-sm font-medium bg-[#D4AF37] px-2 py-1 inline-block w-fit">
          Ends on: {new Date(cta.endsAt).toLocaleDateString()}
        </span>
        <h3
          className="text-2xl font-bold mt-2"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {cta.heading}
        </h3>
        <p className="text-sm text-white text-opacity-90"  style={{ fontFamily: "'Montserrat', sans-serif" }}>
          {cta.description}
        </p>
      </div>
    </a>
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-[#111] text-white text-opacity-50">
      Loading CTA...
    </div>
  )}
</div>

      </div>
    </section>
  );
}
