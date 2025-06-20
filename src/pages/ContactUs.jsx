import { useState } from 'react';
import axios from 'axios';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn
} from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/contact`, formData);
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
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white px-8 py-24"
        style={{ backgroundImage: "url('//melo_films/assets/images/awards.png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full max-w-none text-left">
          <div className="mb-4">
            <a
              href="#"
              className="inline-block border border-yellow-500 text-yellow-500 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition duration-200 text-sm"
            >
              Get in touch
            </a>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Contact Us</h1>
          <p className="text-md md:text-lg leading-relaxed pt-2 font-montserrat">
            Have a project in mind or interested in collaborating? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-[#0f0f0f] px-6 md:px-20 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-black p-6 border border-gray-700">
            <h3 className="text-xl font-semibold mb-6 font-playfair">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600 focus:outline-none"
                    placeholder="Your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-1">Inquiry Type</label>
                <input
                  type="text"
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className="w-full bg-[#141d2b] text-white px-4 py-2 border border-gray-600 focus:outline-none"
                  placeholder="e.g. Collaboration, Support"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Message</label>
                <textarea
                  rows="6"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#141d2b] text-white px-4 py-10 border border-gray-600 focus:outline-none"
                  placeholder="Tell us about your project or inquiry"
                ></textarea>
              </div>
              {successMessage && <p className="text-green-400">{successMessage}</p>}
              {errorMessage && <p className="text-red-400">{errorMessage}</p>}
              <button
                type="submit"
                className="bg-yellow-500 text-black font-medium px-6 py-2 mt-2 hover:bg-yellow-400"
              >
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 font-playfair">Contact Information</h3>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-xl"><FaMapMarkerAlt /></span>
                <div>
                  <h4 className="font-semibold text-white">Studio Address</h4>
                  <p>123 Film Street, Los Angeles, CA 90028</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-xl"><FaPhoneAlt /></span>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p>(213) 555-0123</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-xl"><FaEnvelope /></span>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p>info@cinematic.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-yellow-500 text-xl"><FaClock /></span>
                <div>
                  <h4 className="font-semibold text-white">Working Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-white mb-2">Connect With Us</h4>
              <div className="flex space-x-4 text-white text-xl">
                <a href="#" className="hover:text-yellow-500 border border-white rounded-full p-2">
                  <FaInstagram />
                </a>
                <a href="#" className="hover:text-yellow-500 border border-white rounded-full p-2">
                  <FaYoutube />
                </a>
                <a href="#" className="hover:text-yellow-500 border border-white rounded-full p-2">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white px-6 py-12">
        <h2 className="text-xl font-semibold mb-6 font-playfair">Our Location</h2>
        <div className="w-full h-96 border border-gray-700">
          <iframe
            className="w-full h-full"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
            src="https://www.google.com/maps/embed/v1/place?q=Hollywood&key=YOUR_API_KEY"
          ></iframe>
        </div>
      </section>

      <section className="w-full bg-[#1a1a1a] h-10 px-6"></section>

      <section className="bg-black text-white text-center px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 font-playfair">
          Let's Create Something Amazing Together
        </h2>
        <p className="text-sm md:text-base mb-6 max-w-xl mx-auto font-montserrat">
          Whether you're looking to bring your vision to life or explore collaboration opportunities, we're here to help make it happen.
        </p>
        <a
          href="/melo_films/contact"
          className="inline-block bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-600 transition duration-200 text-sm font-medium"
        >
          Start a Project
        </a>
      </section>
    </div>
  );
}