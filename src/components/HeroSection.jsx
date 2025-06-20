import React from 'react';

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white px-8 py-24"
      style={{ backgroundImage: "url('./assets/images/awards.png')"}}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-60"></div> */}

      {/* Content */}
      <div className="relative z-10 max-w-3xl">
        <h1
          className="text-4xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          The Forgotten Echo
        </h1>
        <p
          className="text-lg text-yellow-400 font-semibold mb-2"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Sanjana Wadkar
        </p>
        <p
          className="text-md md:text-lg mb-6 leading-relaxed"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          A haunting journey through memory and time that challenges our <br /> perception of reality.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
