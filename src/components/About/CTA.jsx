import React from 'react';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="bg-[#1a1a1a] text-white py-16 px-6 sm:px-12 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-6">
        Ready to Collaborate With Us?
      </h2>
      <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
        Whether you're looking to produce your next big film, partner for a festival, or simply share your vision with us — let's start the conversation.
      </p>
      <Link
        to="/contact"
        className="inline-block border border-yellow-500 text-yellow-500 px-8 py-3 rounded hover:bg-yellow-500 hover:text-black transition duration-300"
      >
        Contact Us
      </Link>
    </section>
  );
}
