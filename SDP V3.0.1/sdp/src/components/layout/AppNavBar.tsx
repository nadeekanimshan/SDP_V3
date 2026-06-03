import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icon/logo.png";
import { SYSTEM_KEY } from "../../config/Constent";
import { FaUser, FaCalendarAlt, FaBook, FaSignOutAlt, FaCog } from "react-icons/fa";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "EVENTS", path: "/events" },
  { label: "SERVICES", path: "/#services" },
  { label: "ABOUT", path: "/#about" },
  { label: "CONTACT", path: "/#footer" },
];

export default function AppNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN);
  const userType = localStorage.getItem(SYSTEM_KEY.TYPE);
  const userName = localStorage.getItem(SYSTEM_KEY.FIRST_NAME) || "User";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleToggle = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (path: string) => {
    setIsMenuOpen(false);
    setIsProfileOpen(false);
    if (path.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const hash = path.split("#")[1];
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
    }
  };

  const handleSignOut = () => {
    setIsProfileOpen(false);
    setIsMenuOpen(false);
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <img src={logo} alt="Logo" className="h-9 w-auto transition-transform group-hover:scale-105" />
              <span className="font-bold text-lg tracking-tight text-white">AUDIO DIARY</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className="relative px-4 py-2 text-sm font-medium tracking-wide text-slate-200 hover:text-white transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-500 group-hover:w-3/4 transition-all duration-300 rounded-full" />
                </button>
              ))}

              {isLoggedIn ? (
                <div className="relative ml-4" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 border border-white/40 transition-all"
                  >
                    <FaUser className="w-4 h-4" />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border bg-slate-800/95 backdrop-blur-xl border-slate-600/50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-600/50">
                        <p className="text-sm font-semibold text-white">{userName}</p>
                        <p className="text-xs text-slate-400">{userType === "ADMIN" ? "Admin" : "User"}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate("/vocal-recoding-apoiment");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          <FaCalendarAlt className="w-4 h-4 text-amber-500" />
                          My Appointments
                        </button>
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            navigate("/vocal-traning-class");
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
                        >
                          <FaBook className="w-4 h-4 text-amber-500" />
                          My Classes
                        </button>
                        {userType === "ADMIN" && (
                          <button
                            onClick={() => {
                              setIsProfileOpen(false);
                              navigate("/admin");
                            }}
                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-white/10 transition-colors"
                          >
                            <FaCog className="w-4 h-4 text-amber-500" />
                            Admin Dashboard
                          </button>
                        )}
                        <div className="border-t border-slate-600/50" />
                        <button
                          onClick={handleSignOut}
                          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/20 transition-colors"
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
                  onClick={() => navigate("/auth")}
                  className="ml-4 px-5 py-2.5 rounded-full font-semibold text-sm bg-amber-500 text-slate-900 hover:bg-amber-400 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleToggle}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
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
            isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pb-6 pt-2 bg-slate-800/95 backdrop-blur-xl border-t border-slate-600/50">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleLinkClick(link.path)}
                  className="block w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {isLoggedIn && (
                <>
                  <div className="border-t border-slate-600/50 my-2" />
                  <button
                    onClick={() => {
                      navigate("/vocal-recoding-apoiment");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    My Appointments
                  </button>
                  <button
                    onClick={() => {
                      navigate("/vocal-traning-class");
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    My Classes
                  </button>
                  {userType === "ADMIN" && (
                    <button
                      onClick={() => {
                        navigate("/admin");
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3 rounded-lg font-medium text-white hover:bg-white/10 transition-colors"
                    >
                      Admin Dashboard
                    </button>
                  )}
                </>
              )}
              <button
                onClick={isLoggedIn ? handleSignOut : () => navigate("/auth")}
                className={`w-full mt-4 px-4 py-3 rounded-full font-semibold transition-colors ${
                  isLoggedIn ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-amber-500 text-slate-900 hover:bg-amber-400"
                }`}
              >
                {isLoggedIn ? "Sign Out" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={handleToggle} />
      )}
    </>
  );
}
