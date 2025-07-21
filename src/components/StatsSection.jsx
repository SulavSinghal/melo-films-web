import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '100+', label: 'Commissioned Productions' },
    { number: '50+', label: 'Clients' },
    { number: '06', label: 'Originals' },
    { number: '09', label: 'Awards' },
    { number: '35', label: 'Selections and Nominations' }
  ];

  return (
    <div
      className="relative bg-cover bg-center py-10"
      style={{ backgroundImage: "url('/assets/images/Melo-new-logo.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Stats */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-center text-white">
        {stats.map((stat, index) => (
          <div key={index} className="min-w-[150px]">
            <div className="text-3xl font-bold text-[#D4AF37] font-serif">{stat.number}</div>
            <div className="mt-1 text-white">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
