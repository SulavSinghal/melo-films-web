import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-10">
      <div className="w-full">

        {/* Logo aligned top-left */}
        <div className="ml-5">
          <img
      src="/assets/images/Melo-new-logo.png" // Replace with your actual logo path
      alt="Melo Films Logo"
      className="h-12" // Adjust height as needed
    />
        </div>

        {/* Footer Content Row */}
        <div className="flex flex-wrap items-start justify-start gap-10 px-4 md:px-10 mt-10 text-sm">

          {/* Mumbai Office */}
          <div className="min-w-[200px]">
            <h3 className=" mb-2">Mumbai</h3>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li>Workafella AK Estate,</li> 
              <li>Off Veer Savarkar Flyover</li>
              <li>Besides Radisson Blu Hotel,SV Road</li>
              <li>Goregaon West, Mumbai, Maharashtra</li>
              <li>400062</li>
            </ul>
          </div>

          {/* Delhi Office */}
          <div className="min-w-[200px]">
            <h3 className=" mb-2">Delhi</h3>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li>2/3 Taj Apartments</li>
              <li>Parkwood Estate</li>
              <li>Rao Tula Ram Marg, New Delhi</li>
              <li>110022</li>
            </ul>
          </div>

          {/* Patna Office */}
          <div className="min-w-[200px]">
            <h3 className=" mb-2">Patna(Regd)</h3>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li>2/30 SBI Colony</li>
              <li>Jagdeo Path</li>
              <li>Bailey Road, Patna</li>
              <li>800014</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="min-w-[180px]">
            <h3 className=" mb-2">Contact</h3>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li>contact@melofilms.co.in</li>
              <li>+91 900 477 9170</li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="min-w-[160px]">
            <h3 className=" mb-2">Quick Links</h3>
            <ul className="space-y-1 text-[#9CA3AF]">
              <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
              <li><Link to="/about" className="hover:text-yellow-500">About</Link></li>
              <li><Link to="/films" className="hover:text-yellow-500">Films</Link></li>
              <li><Link to="/news" className="hover:text-yellow-500">News</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-500">Contact</Link></li>
            </ul>
          </div>

          {/* Social + Subscribe */}
          <div className="min-w-[220px]">
            <h3 className=" mb-2">Follow Us</h3>
            <div className="flex space-x-3 mb-4">
              <a href="https://www.instagram.com/melofilms.co.in?igsh=eXdoOGRzeXFjbjZ0" className="border border-[#9CA3AF] p-2 rounded-full hover:text-yellow-500"><FaInstagram /></a>
              <a href="#" className="border border-[#9CA3AF] p-2 rounded-full hover:text-yellow-500"><FaYoutube /></a>
              <a href="#" className="border border-[#9CA3AF] p-2 rounded-full hover:text-yellow-500"><FaTwitter /></a>
              <a href="https://share.google/COhDtzpYdFwOAeYhO" className="border border-[#9CA3AF] p-2 rounded-full hover:text-yellow-500"><FaFacebook /></a>
            </div>

            <h3 className="mb-2">Subscribe</h3>
            <form className="flex flex-col md:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 text-[#9CA3AF] px-3 py-2 rounded-md w-full md:w-auto"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-black px-4 py-2 rounded-md hover:bg-yellow-600"
              >
                →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-800 mt-10 pt-4 text-center text-gray-500 text-xs">
          © 2023 Cinematic Productions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
