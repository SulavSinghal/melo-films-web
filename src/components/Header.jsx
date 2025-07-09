import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// Step 1: Import the social media icons you need
import { FaBars, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

// Data for navigation links
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/aboutUs' },
  { name: 'Films', path: '/films' },
  { name: 'News', path: '/news' },
  { name: 'Contact', path: '/contact' },
];

// Step 2: Create a data structure for social media links
const socialLinks = [
  { name: 'Facebook', url: 'https://share.google/COhDtzpYdFwOAeYhO', icon: <FaFacebookF /> },
  {name: 'Youtube', url:"",icon: <FaYoutube />},
  { name: 'Instagram', url: 'https://www.instagram.com/melofilms.co.in?igsh=eXdoOGRzeXFjbjZ0', icon: <FaInstagram /> },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav className="bg-black text-white  py-4 flex items-center justify-between relative z-50">
        {/* Left Side: Logo */}
        <div className="flex-1">
  <Link to="/">
    <img
      src="/assets/images/Melo-new-logo.png" // Replace with your actual logo path
      alt="Melo Films Logo"
      className="h-10" // Adjust height as needed
    />
  </Link>
</div>


        {/* Center: Desktop Navigation Links */}
        <ul className="hidden md:flex md:space-x-8 text-xl">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                className={`block py-2 md:py-0 ${
                  location.pathname === link.path
                    ? 'text-yellow-500' // Active link style
                    : 'hover:text-yellow-500 transition-colors' // Hover style
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: Social Icons (Desktop) & Hamburger (Mobile) */}
        <div className="flex-1 flex justify-end items-center">
          {/* Social Icons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.name}`}
                className="hover:text-yellow-500 transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white text-2xl focus:outline-none"
              aria-label="Toggle Menu"
              aria-controls="mobile-menu"
              aria-expanded={menuOpen}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu (Dropdown) */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden flex flex-col items-center bg-black text-white text-xl py-8 space-y-6"
        >
          {/* Mobile Navigation Links */}
          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`block ${
                    location.pathname === link.path
                      ? 'text-yellow-500'
                      : 'hover:text-yellow-500'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <hr className="w-1/2 border-gray-700 my-4" />

          {/* Mobile Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${link.name}`}
                className="hover:text-yellow-500 transition-colors text-2xl"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;