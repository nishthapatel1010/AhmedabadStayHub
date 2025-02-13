import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white fixed top-0 left-0 w-full shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo with Custom Font */}
        <Link
          to="/"
          className="text-2xl font-bold"
          style={{ fontFamily: "'Poppins', sans-serif" }} // Custom font
        >
          RentEase
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg">
          <li>
            <Link to="/" className="hover:text-gray-200">Home</Link>
          </li>
          <li>
            <Link to="/pgs-hostels" className="hover:text-gray-200">PGs/Hostels</Link>
          </li>
          <li className="relative group">
            <button className="hover:text-gray-200">Rentals ▼</button>
            <ul className="absolute hidden group-hover:block bg-white text-black mt-2 w-40 rounded shadow-md">
              <li><Link to="/apartments" className="block px-4 py-2 hover:bg-gray-100">Apartments</Link></li>
              <li><Link to="/houses" className="block px-4 py-2 hover:bg-gray-100">Houses</Link></li>
            </ul>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-200">Contact</Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <ul className="md:hidden bg-blue-700 text-white flex flex-col items-center space-y-4 py-4">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/pgs-hostels" className="hover:text-gray-200">PGs/Hostels</Link></li>
          <li><Link to="/apartments" className="hover:text-gray-200">Apartments</Link></li>
          <li><Link to="/houses" className="hover:text-gray-200">Houses</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
