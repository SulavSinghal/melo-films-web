import React from 'react';

export default function Festivals({ festivals }) {
  if (!festivals || festivals.length === 0) return null;

  return (
    <section className="bg-[#0f0f0f] text-white py-16 px-6 md:px-20">
      {/* Subtitle */}
      <div className="text-center mb-4">
        <span className="text-xs uppercase tracking-widest border border-yellow-500 text-yellow-500 px-3 py-1 rounded">
          Festival Participation
        </span>
      </div>

      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
        Global Recognition
      </h2>

      {/* Festival Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12 justify-items-center">
        {festivals.map((festival, index) => (
          <div key={index} className="flex flex-col items-center">
            <img
              src={import.meta.env.VITE_API_BASE + festival.imageUrl}
              alt={festival.name}
              className="w-[180px] h-[96px] object-contain mb-4"
            />
            <p className="text-center text-sm">{festival.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
