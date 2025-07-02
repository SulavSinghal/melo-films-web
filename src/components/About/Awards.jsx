import React from 'react';

const awardEmojis = ['🏆', '🎖️', '⭐', '🎬', '🏅', '🌟'];

export default function Awards({ awards }) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="bg-black text-white px-8 sm:px-16 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-yellow-500 border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
          Awards & Recognition
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold mt-4">Celebrating Excellence</h2>
      </div>

      {/* Awards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {awards.map((award, index) => (
          <div
            key={index}
            className="border border-yellow-500 p-8 text-center bg-[#0f0f0f]"
          >
            <div className="text-yellow-500 text-3xl mb-4">
              {awardEmojis[index % awardEmojis.length]}
            </div>
            <h3 className="text-xl font-semibold mb-1">{award.awardTitle}</h3>
            <p className="text-yellow-500">{award.festivalName}</p>
            <p className="italic">"{award.filmName}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
