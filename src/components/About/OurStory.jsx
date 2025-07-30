import React from 'react';

export default function OurStory({ content }) {
  if (!content) return null;

  return (
  <section className="bg-[#0f0f0f] text-white px-8 sm:px-16 py-16">
  <div className="container px-4 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch w-full min-h-[auto] lg:min-h-[350px]">
    
    {/* Text Section */}
    <div className="w-full flex flex-col justify-center overflow-auto h-auto lg:h-[350px]">
      <div>
  <span className="inline-block text-[#D4AF37] border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
    Our Story
  </span>
</div>


      <h2 className="text-3xl sm:text-4xl font-bold mt-4">
        {content.heading} 
      </h2>

      <p className="text-gray-300 mt-6 leading-relaxed text-sm">
        {content.paragraph1}
      </p> 

      <p className="text-gray-300 mt-4 leading-relaxed text-sm">
        {content.paragraph2}
      </p>
    </div>

    {/* Image Section */}
    <div className="flex justify-center items-center h-auto lg:h-[350px]">
      <div className="border border-yellow-500 w-full max-w-[500px] h-auto lg:h-[350px]">
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
