import React, { useEffect, useState } from 'react';
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
    axios.get(`${API_BASE}/aboutUs`)
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
     <section className="relative bg-cover bg-center text-white px-8 py-24 flex flex-col items-center justify-center">
  <div className="absolute inset-0 bg-black bg-opacity-60"></div>
  <div className="relative z-10 flex flex-col items-center w-full">
    <h1 className="text-5xl font-bold font-playfair text-center mb-4">About Us</h1>
    <p className="pt-2 mt-2 font-montserrat text-sm text-center mx-auto w-full max-w-5xl leading-relaxed">
      Melo Films is a Mumbai and Delhi-based film production company with pan-India execution capabilities. We specialize in original content, commissioned productions, co-productions, and international line production.With a strong network of local crews and creative collaborators, we bring cinematic ideas to life across formats and geographies. From fiction to documentary, commercial to indie, Melo Films is driven by a passion for stories that resonate deeply and travel widely.
    </p>
  </div>
</section>

      <OurStory content={aboutData.ourStory} />
   <section className="bg-black text-white px-6 sm:px-12 py-16 text-center">
  {/* Section Header */}
  <span className="text-[#D4AF37] border border-yellow-500 px-3 py-1 text-sm uppercase tracking-wider inline-block">
    Things we do
  </span>

  {/* Grid container for the services */}
  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
    
    {/* Column 1: Originals */}
    <div className="flex flex-col items-center">
      <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 text-center">Originals</h3>
      <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center">
        We strive to strengthen creative voices through honest, personal storytelling. Every original we produce – and those in the pipeline – is guided by our enduring love for cinema and the craft that makes it magical.
      </p>
    </div>

    {/* Column 2: Impact Films */}
    <div className="flex flex-col items-center">
      <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 text-center">Impact Films</h3>
      <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center">
        As conscious creators, we use our craft to support causes that matter. Over the years, we've partnered with esteemed organizations such as UNHCR, Oxfam, Save the Children, WaterAid, and several state bodies to amplify their impact-driven initiatives.
      </p>
    </div>

    {/* Column 3: Brand Stories */}
    <div className="flex flex-col items-center">
      <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 text-center">Brand Stories</h3>
      <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center">
        Every brand has a story. And as filmmakers, we're built to tell it. We help brands shape their voice, build emotional resonance, and craft powerful outreach strategies through authentic, cinematic storytelling.
      </p>
    </div>

    {/* Column 4: Line Production */}
    <div className="flex flex-col items-center">
      <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 text-center">Line Production</h3>
      <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center">
        With offices in Mumbai and Delhi and a strong nationwide network, we support global and domestic productions with seamless execution. Clients like Bloomberg News (NY), Whisper TV (UK), Honto (NY), and Acumen (NY) have trusted us to deliver on time – every time.
      </p>
    </div>

    {/* Column 5: Co-Pro and Festival Distribution */}
    <div className="flex flex-col items-center">
      <h3 className="text-[#D4AF37] font-bold text-2xl mb-4 text-center">Co-Production</h3>
      <p className="text-gray-300 text-sm leading-relaxed max-w-xs text-center">
        We collaborate with Indian and international filmmakers on co-productions, offering creative and logistical support. From budgeting and permits to festival submissions and outreach, we help stories travel – from script to screen.
      </p>
    </div>

  </div>
</section>


      
   
      {aboutData.team?.length > 0 && <Team members={aboutData.team} />}
      <Clients />
      {aboutData.festivals?.length > 0 && <Festivals festivals={aboutData.festivals} />}
      {aboutData.awards?.length > 0 && <Awards awards={aboutData.awards} />}
      <CTA />
    </div>
  );
}
