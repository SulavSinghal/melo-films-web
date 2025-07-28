// src/pages/ContactPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaFacebook
} from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });
  const [contactInfo, setContactInfo] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    axios.get(`${API_BASE}/contact-info`)
      .then(res => setContactInfo(res.data))
      .catch(() => setContactInfo(null));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/contact`, formData);
      setSuccessMessage('Message sent successfully!');
      setErrorMessage('');
      setFormData({ name: '', email: '', inquiryType: '', message: '' });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to send message. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="bg-black text-white font-sans">
      <section className="relative bg-cover bg-center text-white px-8 py-24" style={{ backgroundImage: "url('//melo_films/assets/images/awards.png')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10">
          <a href="#" className="inline-block border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black text-sm">Get in touch</a>
          <h1 className="text-5xl font-bold mt-4 font-playfair">Contact Us</h1>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 md:px-20 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-black p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-6 font-playfair">Send Us a Message</h3>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Your name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600" />
              <input type="email" placeholder="Your email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600" />
            </div>
            <input type="text" placeholder="e.g. Collaboration, Support" value={formData.inquiryType} onChange={e => setFormData({ ...formData, inquiryType: e.target.value })} className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600" />
            <textarea rows="6" placeholder="Tell us about your project or inquiry" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600"></textarea>
            {successMessage && <p className="text-green-400">{successMessage}</p>}
            {errorMessage && <p className="text-red-400">{errorMessage}</p>}
            <button type="submit" className="bg-yellow-500 text-black px-6 py-2 hover:bg-yellow-400">Send Message</button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-6 font-playfair">Contact Information</h3>
          {contactInfo ? (
            <div className="space-y-6 text-gray-300">
              <InfoRow icon={<FaMapMarkerAlt />} label="Studio Address" value={contactInfo.studio_address} />
              <InfoRow icon={<FaPhoneAlt />} label="Phone" value={contactInfo.phone} />
              <InfoRow icon={<FaEnvelope />} label="Email" value={contactInfo.email} />
              <div className="mt-8">
                <h4 className="font-semibold text-white mb-2">Connect With Us</h4>
                <div className="flex space-x-4 text-white text-xl">
                  {contactInfo.social_links?.instagram && <SocialIcon href={contactInfo.social_links.instagram} icon={<FaInstagram />} />}
                  {contactInfo.social_links?.youtube && <SocialIcon href={contactInfo.social_links.youtube} icon={<FaYoutube />} />}
                  {contactInfo.social_links?.facebook && <SocialIcon href={contactInfo.social_links.facebook} icon={<FaFacebook />} />}
                  {contactInfo.social_links?.linkedin && <SocialIcon href={contactInfo.social_links.linkedin} icon={<FaLinkedin />} />}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Unable to load contact information.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-yellow-500 text-xl">{icon}</span>
      <div>
        <h4 className="font-semibold text-white">{label}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-yellow-500 border border-white rounded-full p-2">
      {icon}
    </a>
  );
}
