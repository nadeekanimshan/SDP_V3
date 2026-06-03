import { useState, useEffect, useRef } from 'react';

import logo from '../assets/icon/logo.png'
import { Link, useNavigate } from 'react-router-dom';
import { SYSTEM_KEY } from '../config/Constent';
import { FaUser, FaCalendarAlt, FaBook, FaSignOutAlt, FaCog } from 'react-icons/fa';

type Props = {
  handleScroll: (ref: React.RefObject<HTMLDivElement | null>) => void;
  homeRef: React.RefObject<HTMLDivElement | null>;
  eventsRef: React.RefObject<HTMLDivElement | null>;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  aboutRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
};

const navLinks = [
  { label: 'HOME', ref: 'homeRef' },
  { label: 'EVENTS', ref: 'eventsRef' },
  { label: 'SERVICES', ref: 'servicesRef' },
  { label: 'ABOUT', ref: 'aboutRef' },
  { label: 'CONTACT', ref: 'contactRef' },
];

const Navbar = ({handleScroll ,homeRef, eventsRef, servicesRef, aboutRef, contactRef}: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const refMap = { homeRef, eventsRef, servicesRef, aboutRef, contactRef };
  const isLoggedIn = !!localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN);
  const userType = localStorage.getItem(SYSTEM_KEY.TYPE);
  const userName = localStorage.getItem(SYSTEM_KEY.FIRST_NAME) || 'User';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (path: string, ref: React.RefObject<HTMLDivElement | null>) => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    navigate(path);
    handleScroll(ref);
  };

  const handleSignOut = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    localStorage.clear();
    navigate('/auth');
  };

  const getRef = (key: string) => refMap[key as keyof typeof refMap];
  const getPath = (key: string) => {
    switch (key) {
      case 'homeRef': return '/';
      case 'eventsRef': return '/events';
      case 'servicesRef': return '/#services';
      case 'aboutRef': return '/#about';
      case 'contactRef': return '/#footer';
      default: return '/';
    }
  };

  const mobileMenuBg = scrolled ? 'bg-white/95' : 'bg-gray-900/95';

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-900/10 border-b border-gray-200/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              to="/"
              className="flex items-center gap-2 group"
            >
              <img src={logo} alt="Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
              <span className={`font-bold text-lg tracking-tight transition-colors ${
                scrolled ? 'text-gray-900' : 'text-white'
              }`}>
                AUDIO DIARY
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.ref}
                  onClick={() => handleLinkClick(getPath(link.ref), getRef(link.ref))}
                  className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors group ${
                    scrolled ? 'text-gray-900 hover:text-amber-600' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </button>
              ))}

              {isLoggedIn ? (
                <div className="relative ml-4" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className={`flex items-center gap-2 p-2 rounded-full transition-all ${
                      scrolled
                        ? 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                        : 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                    }`}
                  >
                    <FaUser className="w-4 h-4" />
                  </button>

                  {isProfileOpen && (
                    <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden ${
                      scrolled ? 'bg-white border-gray-200' : 'bg-gray-800/95 backdrop-blur-xl border-white/10'
                    }`}>
                      <div className={`px-4 py-3 border-b ${scrolled ? 'border-gray-100' : 'border-white/10'}`}>
                        <p className={`text-sm font-semibold ${scrolled ? 'text-gray-900' : 'text-white'}`}>
                          {userName}
                        </p>
                        <p className={`text-xs ${scrolled ? 'text-gray-500' : 'text-gray-400'}`}>
                          {userType === 'ADMIN' ? 'Admin' : 'User'}
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => { setIsProfileOpen(false); navigate('/vocal-recoding-apoiment'); }}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            scrolled ? 'text-gray-700 hover:bg-amber-50' : 'text-gray-200 hover:bg-white/10'
                          }`}
                        >
                          <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                          My Appointments
                        </button>
                        <button
                          onClick={() => { setIsProfileOpen(false); navigate('/vocal-traning-class'); }}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            scrolled ? 'text-gray-700 hover:bg-amber-50' : 'text-gray-200 hover:bg-white/10'
                          }`}
                        >
                          <FaBook className="w-4 h-4 text-amber-500" />
                          My Classes
                        </button>
                        {userType === 'ADMIN' && (
                          <button
                            onClick={() => { setIsProfileOpen(false); navigate('/admin'); }}
                            className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                              scrolled ? 'text-gray-700 hover:bg-amber-50' : 'text-gray-200 hover:bg-white/10'
                            }`}
                          >
                            <FaCog className="w-4 h-4 text-amber-500" />
                            Admin Dashboard
                          </button>
                        )}
                        <div className={`border-t ${scrolled ? 'border-gray-100' : 'border-white/10'}`} />
                        <button
                          onClick={handleSignOut}
                          className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                            scrolled ? 'text-red-600 hover:bg-red-50' : 'text-red-400 hover:bg-red-500/20'
                          }`}
                        >
                          <FaSignOutAlt className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className={`ml-4 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                    scrolled
                      ? 'bg-amber-500 text-gray-900 hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/30'
                      : 'bg-white/20 backdrop-blur-sm text-white border border-white/40 hover:bg-white hover:text-gray-900'
                  }`}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleToggle}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`px-4 pb-6 pt-2 ${mobileMenuBg} backdrop-blur-xl border-t ${scrolled ? 'border-gray-200/50' : 'border-white/10'}`}>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.ref}
                  onClick={() => handleLinkClick(getPath(link.ref), getRef(link.ref))}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    scrolled ? 'text-gray-700 hover:bg-amber-500/10 hover:text-amber-700' : 'text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              {isLoggedIn && (
                <>
                  <div className="border-t border-white/10 my-2" />
                  <button
                    onClick={() => { navigate('/vocal-recoding-apoiment'); setIsMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      scrolled ? 'text-gray-700 hover:bg-amber-500/10' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={() => { navigate('/vocal-traning-class'); setIsMenuOpen(false); }}
                    className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      scrolled ? 'text-gray-700 hover:bg-amber-500/10' : 'text-white hover:bg-white/10'
                    }`}
                  >
                    My Classes
                  </button>
                  {userType === 'ADMIN' && (
                    <button
                      onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                      className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                        scrolled ? 'text-gray-700 hover:bg-amber-500/10' : 'text-white hover:bg-white/10'
                      }`}
                    >
                      Admin Dashboard
                    </button>
                  )}
                </>
              )}
              <button
                onClick={isLoggedIn ? handleSignOut : () => navigate('/auth')}
                className={`w-full mt-4 px-4 py-3 rounded-full font-semibold transition-colors ${
                  isLoggedIn
                    ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                    : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                }`}
              >
                {isLoggedIn ? 'Sign Out' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={handleToggle}
        />
      )}
    </>
  );
};

export default Navbar;
