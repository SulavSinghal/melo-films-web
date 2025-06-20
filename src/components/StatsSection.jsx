import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '25+', label: 'Awards Won' },
    { number: '50+', label: 'Films Produced' },
    { number: '15', label: 'Years of Excellence' },
    { number: '1M+', label: 'Viewers Worldwide' },
  ];

  return (
    <div
      className="relative bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/melo_films/assets/images/awards.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Stats */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center justify-items-center text-white">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl font-bold text-yellow-500 font-serif">{stat.number}</div>
            <div className="mt-1 text-white">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
