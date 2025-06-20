import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  return (
    <>
      <nav className="bg-black text-white px-6 py-4 flex items-center justify-between relative z-50">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold text-yellow-500"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          MELO
        </Link>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white text-2xl focus:outline-none"
            aria-label="Toggle Menu"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } md:flex md:space-x-8 md:items-center text-xl flex-col md:flex-row absolute md:static top-16 left-0 w-full md:w-auto bg-black md:bg-transparent px-6 md:px-0 py-4 md:py-0 z-50`}
        >
          <li>
            <Link to="/" className="block py-2 md:py-0 hover:text-yellow-500">Home</Link>
          </li>
          <li>
            <Link to="/about" className="block py-2 md:py-0 hover:text-yellow-500">About</Link>
          </li>
          <li>
            <Link to="/films" className="block py-2 md:py-0 hover:text-yellow-500">Films</Link>
          </li>
          <li>
            <Link to="/news" className="block py-2 md:py-0 hover:text-yellow-500">News</Link>
          </li>
          <li>
            <Link to="/contact" className="block py-2 md:py-0 hover:text-yellow-500">Contact</Link>
          </li>

          {/* Mobile Login/Dashboard Button */}
          <li className="md:hidden mt-2">
            <Link
              to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}
              className="bg-yellow-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition block text-center"
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>
          </li>
        </ul>

        {/* Desktop Login/Dashboard Button */}
        <div className="hidden md:block">
          <Link
            to={isLoggedIn ? "/admin/dashboard" : "/admin/login"}
            className="bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition"
          >
            {isLoggedIn ? "Dashboard" : "Login"}
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Header;
