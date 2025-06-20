import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-5 gap-10 text-sm">
        {/* Logo & Description */}
        <div>
          <h2 className="text-xl font-bold text-yellow-500 font-serif">Melo</h2>
          <p className="mt-2 text-gray-300">
            Creating unforgettable stories through the power of film since 2005.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <ul className="space-y-1 text-gray-300">
            <li>WeWork NESCO IT Park,10th Floor,</li>
            <li>Building 4,Western Express Highway,</li>
            <li>Goregoan(East),Mumbai,Maharashtra</li>
            <li>400063</li>
            <li>contact@melofilms.co.in</li>
            <li>+91 900 477 9170</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><Link to="/" className="block py-2 md:py-0 hover:text-yellow-500">Home</Link></li>
          <li><Link to="/about" className="block py-2 md:py-0 hover:text-yellow-500">About</Link></li>
          <li><Link to="/films" className="block py-2 md:py-0 hover:text-yellow-500">Films</Link></li>
          <li><Link to="/news" className="block py-2 md:py-0 hover:text-yellow-500">News</Link></li>
          <li><Link to="/contact" className="block py-2 md:py-0 hover:text-yellow-500">Contact</Link></li>
          </ul>
        </div>

        {/* Social & Subscribe */}
        <div className="col-span-1 md:col-span-2 space-y-4">
          {/* Social */}
          <div>
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-3">
              <a href="#" className="border border-white p-2 rounded-full hover:text-yellow-500"><FaInstagram /></a>
              <a href="#" className="border border-white p-2 rounded-full hover:text-yellow-500"><FaYoutube /></a>
              <a href="#" className="border border-white p-2 rounded-full hover:text-yellow-500"><FaTwitter /></a>
              <a href="#" className="border border-white p-2 rounded-full hover:text-yellow-500"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-semibold mb-2">Subscribe</h3>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 text-white px-3 py-2 w-full rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black px-4 rounded-r-md hover:bg-yellow-600"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-xs">
        © 2023 Cinematic Productions. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
