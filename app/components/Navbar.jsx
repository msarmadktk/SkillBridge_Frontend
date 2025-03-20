"use client";


import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Talent');


  const options = ['Talent', 'Jobs', 'Templates'];

  return (
    <div className="px-4 sm:px-6 py-4">
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-primary rounded-lg ">
        {/* Left side remains the same */}
        <div className="flex items-center flex-shrink-0">
          <div className="mr-6">
            <Image src="/images/icon.svg" alt="Logo" width={40} height={40} />
          </div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-black hover:text-gray-700 font-medium">Find work</a>
            <a href="#" className="text-black hover:text-gray-700 font-medium">Hire Talent</a>
            <a href="#" className="text-black hover:text-gray-700 font-medium">Categories</a>
          </div>
        </div>

        {/* Improved Search Bar */}
        <div className="flex items-center w-full max-w-2xl mx-4">
          <div className="flex items-center w-full bg-white rounded-full shadow-lg border border-gray-300">
            {/* Search Input Section */}
            <div className="flex items-center flex-grow pl-4">
              <img
                src="/images/search.svg"
                alt="Search"
                className="h-5 w-5 opacity-60 mr-2"
              />
              <input
                type="text"
                placeholder={`Search ${selectedOption.toLowerCase()}`}
                className="w-full py-2 text-gray-500 placeholder-gray-400 outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Dropdown Section */}
            <div className="relative flex-shrink-0">
              <button
                className="flex items-center bg-gray-100 h-full px-4 py-2 rounded-r-full border-l border-gray-300 hover:bg-gray-200 transition-colors"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="font-medium text-gray-700">{selectedOption}</span>
                <img
                  src="/images/arrowDown.svg"
                  className="ml-2"
                  width={16}
                  alt="Dropdown arrow"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  {options.map((option) => (
                    <button
                      key={option}
                      className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setSelectedOption(option);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right side remains the same */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <div className="hidden sm:flex items-center space-x-2">
          <Link href="/sign-up">
              <button className="text-black font-medium px-4 py-2 rounded-md cursor-pointer">
                Login
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="bg-teal-400 text-black font-bold px-4 py-2 rounded-md cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu (updated to match new options) */}
      {isMenuOpen && (
        <div className="md:hidden absolute right-0 left-0 bg-white z-50 shadow-md mt-2 mx-4 rounded-lg">
          <div className="flex flex-col px-4 py-2">
            <div className="py-2 border-b border-gray-100">
              <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                <input
                  type="text"
                  placeholder="Search"
                  className="px-4 py-2 w-full outline-none text-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <a href="#" className="py-2 border-b border-gray-100 text-black">Find work</a>
            <a href="#" className="py-2 border-b border-gray-100 text-black">Hire Talent</a>
            <a href="#" className="py-2 border-b border-gray-100 text-black">Categories</a>
            <a href="#" className="py-2 border-b border-gray-100 text-black">Login</a>
            <Link href="/sign-up">
              <button className="bg-teal-400 text-black font-bold px-4 py-2 rounded-md cursor-pointer">
                Sign Up
              </button>
            </Link>

          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;