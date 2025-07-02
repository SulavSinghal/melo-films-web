import { useEffect, useState } from 'react';
import axios from 'axios';

import OurStory from '../components/About/OurStory';
import Team from '../components/About/Team';
import Clients from '../components/About/Clients';
import Festivals from '../components/About/Festivals';
import Awards from '../components/About/Awards';
import CTA from '../components/About/CTA';

export default function AboutUs() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE;

  useEffect(() => {
    axios.get(`${API_BASE}/api/aboutUs`)
      .then(res => {
        console.log('About Us Data:', res.data);
        setAboutData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching About Us data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white p-20 text-center">Loading...</div>;
  if (!aboutData) return <div className="text-red-500 p-20 text-center">Error loading About Us page.</div>;

  return (

    <div className="bg-[#0f0f0f] text-white">
      <section className="relative bg-cover bg-center text-white px-8 py-24" style={{ backgroundImage: "url('//melo_films/assets/images/awards.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mt-4 font-playfair">About Us</h1>
          <p className="text-lg pt-2 font-montserrat">Have a project in mind or interested in collaborating? We'd love to hear from you.</p>
        </div>
      </section>
      <OurStory content={aboutData.ourStory} />
      <section className="bg-black text-white px-6 sm:px-12 py-16 text-center">
      {/* Section Header */}
      <span className="text-yellow-500 border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider">
        Our Vision
      </span>

      <h2 className="text-3xl sm:text-4xl font-bold mt-4">
        Creating Cinema That Matters
      </h2>

      {/* Vision Statement */}
      <p className="text-gray-300 mt-6 max-w-3xl mx-auto leading-relaxed">
        "We don't just make films; we craft experiences that challenge, inspire, and transform.
        Our vision is to push the boundaries of storytelling while maintaining the highest standards of cinematic excellence."
      </p>

      {/* Signature/Logo Image */}
      <div className="mt-8">
        <img
          src="/assets/images/signature.png" // Adjust path based on your setup
          alt="Signature"
          className="mx-auto w-[220px] h-[64px] object-contain"
        />
      </div>

      {/* Author */}
      <p className="mt-4 text-yellow-500 font-medium">
        Michael Reeves, Founder & Creative Director
      </p>
    </section>
      {aboutData.team?.length > 0 && <Team members={aboutData.team} />}
      {aboutData.clients?.length > 0 && <Clients clients={aboutData.clients} />}
      {aboutData.festivals?.length > 0 && <Festivals festivals={aboutData.festivals} />}
      {aboutData.awards?.length > 0 && <Awards awards={aboutData.awards} />}
      <CTA />
    </div>
  );
}
