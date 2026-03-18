import { useState } from 'react';

import logo from '../assets/icon/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { SYSTEM_KEY } from '../config/Constent';

type Props = {
  handleScroll: (ref: React.RefObject<HTMLDivElement | null>) => void;
  homeRef: React.RefObject<HTMLDivElement | null>;
  eventsRef: React.RefObject<HTMLDivElement | null>;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
};

const Navbar = ({handleScroll ,homeRef, eventsRef, servicesRef, aboutRef, contactRef}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (path: string, ref: React.RefObject<HTMLDivElement | null>) => {
    setIsMenuOpen(false);
    navigate(path);
    handleScroll(ref);
  };

  const handleButtonClick = () => {
    if (localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN)) {
      navigate('/auth');
      localStorage.clear();
    } else {
      navigate('/auth');
    }
  };


  return (
    <>
      <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 w-auto mr-2" />
              <span className="font-bold text-lg">AUDIO DIARY</span>
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={handleToggle}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex space-x-6 items-center">
            <button onClick={() => handleLinkClick('/', homeRef)} className="hover:text-gray-300 hover:underline cursor-pointer">HOME</button>
            <button onClick={() => handleLinkClick('events', eventsRef)} className="hover:text-gray-300 hover:underline cursor-pointer">EVENTS</button>
            <button onClick={() => handleLinkClick('#services', servicesRef)} className="hover:text-gray-300 hover:underline cursor-pointer">SERVICES</button>
            <button onClick={() => handleLinkClick('#about', aboutRef)} className="hover:text-gray-300 hover:underline cursor-pointer">ABOUT</button>
            <button onClick={() => handleLinkClick('#footer', contactRef)} className="hover:text-gray-300 hover:underline cursor-pointer">CONTACT</button>
            <button
              onClick={handleButtonClick}
              className="border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-900 transition"
            >
              {localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN) ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden px-4 pb-4 bg-gray-800 space-y-2">
            <button onClick={() => handleLinkClick('/', homeRef)} className="block w-full text-left hover:text-gray-300">HOME</button>
            <button onClick={() => handleLinkClick('events', eventsRef)} className="block w-full text-left hover:text-gray-300">SERVICES</button>
            <button onClick={() => handleLinkClick('#services', servicesRef)} className="block w-full text-left hover:text-gray-300">ABOUT</button>
            <button onClick={() => handleLinkClick('#about', aboutRef)} className="block w-full text-left hover:text-gray-300">CONTACT</button>
            <button
              onClick={handleButtonClick}
              className="w-full mt-2 border border-white px-4 py-1 rounded hover:bg-white hover:text-gray-900 transition"
            >
              {localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN) ? "Sign Out" : "Sign In"}
            </button>
          </div>
        )}
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={handleToggle}
        ></div>
      )}
    </>
  );
};

export default Navbar;
