import React from 'react';

export default function OurStory({ content }) {
  if (!content) return null;

  return (
    <section className="bg-[#0f0f0f] text-white px-8 sm:px-16 py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Section */}
        <div>
          <span className="text-yellow-500 border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
            Our Story
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold mt-4">
            {content.heading} 
          </h2>

          <p className="text-gray-300 mt-6 leading-relaxed">
            {content.paragraph1}
          </p> 

          <p className="text-gray-300 mt-4 leading-relaxed">
            {content.paragraph2}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-10">
            {content.stats?.map((stat, index) => (
              <div key={index}>
                <p
                  className="text-yellow-500 text-2xl font-semibold"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <div className="border border-yellow-500 w-[600px] h-[500px]">
            <img
              src={import.meta.env.VITE_API_BASE + content.imageUrl}
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
