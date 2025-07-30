import React from 'react';
// const clientLogos = [
//   './client_logos/01.png',
//   './client_logos/02.png',
//  './client_logos/03.png',
// './client_logos/04.png',
// './client_logos/05.png',
// './client_logos/06.png',
// './client_logos/07.png',
// './client_logos/08.png',
// './client_logos/09.png',
// './client_logos/10.png',
// './client_logos/11.png',
// './client_logos/12.png',
// './client_logos/13.png',
// './client_logos/14.png',
// './client_logos/15.png',
// './client_logos/16.png',
// './client_logos/17.png',
// './client_logos/18.png',
// './client_logos/19.png',
// './client_logos/20.png',
// './client_logos/21.png',
// './client_logos/22.png',
// './client_logos/23.png',
// './client_logos/24.png',
// './client_logos/Acumen Logo.png',
// // './client_logos/ADRA.png',
// './client_logos/Bloomberg-Logo.png',
// './client_logos/FSSAI Logo.png',
// './client_logos/Honto.png',
// // './client_logos/NABARD Logo.png',
// './client_logos/NFDC Logo.png',
// './client_logos/NMIC.png',
// // './client_logos/OXFAM.png',
// './client_logos/Sangeet Natak Academy.png',
// // './client_logos/Save the Children.png',
// './client_logos/UNHCR.png',
// './client_logos/UNICEF.png',
// './client_logos/Water Aid.png',
// './client_logos/WDC Logo.png',
//   // add more logo filenames as needed
// ];
export default function Clients() {
  console.log('Clients component mounted');
  return (
    <section className="bg-black text-white px-6 sm:px-12 py-16">
  {/* Header */}
  <div className="text-center mb-12">
    <span className="inline-block text-[#D4AF37] border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
      Our Clients
    </span>
    <h2 className="text-3xl sm:text-4xl font-bold mt-4">
      Trusted By Industry Leaders
    </h2>
  </div>

  {/* Logos */}
  <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl mx-auto">
    <img
      src="/client_logos/client.png"
      alt="Client Logo"
      className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[720px] h-auto object-contain"
    />
  </div>
</section>
  );
}
