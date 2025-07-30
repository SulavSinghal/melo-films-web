import React from 'react';

export default function Team({ members }) {
  if (!members || members.length === 0) return null;

  const isScrollable = members.length > 4;

  return (
    <section className="bg-[#0f0f0f] text-white px-6 sm:px-12 py-16">
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="text-[#D4AF37] border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
          Meet The Team
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold mt-4">
          This is Us
        </h2>
      </div>

      <div
        className={`w-full ${
          isScrollable ? 'overflow-x-auto' : ''
        }`}
      >
        <div
          className={`${
            isScrollable
              ? 'flex gap-6 px-4 md:px-12 snap-x snap-mandatory'
              : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center'
          }`}
        >
          {members.map((member, index) => (
            <div
              key={index}
              className={`${
                isScrollable
                  ? 'min-w-[250px] max-w-[250px] flex-shrink-0 snap-center'
                  : 'w-full max-w-[300px]'
              } bg-[#1a1a1a] p-4 rounded shadow-md text-center`}
            >
              <img
                src={import.meta.env.VITE_API_BASE + member.imageUrl}
                alt={member.name}
                className="w-full h-60 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-[#D4AF37] text-sm mb-1">{member.role}</p>
              <p className="text-sm text-gray-300">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
