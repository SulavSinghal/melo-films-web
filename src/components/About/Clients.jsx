import React from 'react';

export default function Clients({ clients }) {
  if (!clients || clients.length === 0) return null;

  return (
    <section className="bg-black text-white px-6 sm:px-12 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-yellow-500 border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
          Our Clients
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-4">
          Trusted By Industry Leaders
        </h2>
      </div>

      {/* Logos */}
      <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto">
        {clients.map((client, index) => (
          <img
            key={index}
            src={import.meta.env.VITE_API_BASE + client.logoUrl}
            alt={`Client ${index + 1}`}
            className="w-auto h-[48px] object-contain max-w-[154px]"
          />
        ))}
      </div>
    </section>
  );
}
