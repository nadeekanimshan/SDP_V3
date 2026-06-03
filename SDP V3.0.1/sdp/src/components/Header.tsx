// Swiper Component & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import L4 from "../assets/icon/home/4L.jpg";
import L10 from "../assets/icon/home/10L.jpg";
import L2 from "../assets/icon/home/2L.jpg";
import L6 from "../assets/icon/home/6L.jpg";
import L9 from "../assets/icon/home/9L.jpg";

type Props = {
  handleScroll: (ref: React.RefObject<HTMLDivElement | null>) => void;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
};

const Header = ({ handleScroll, servicesRef, contactRef }: Props) => {
  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Full-width image carousel */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full"
        >
          {[L4, L10, L2, L6, L9].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
                style={{ animation: "hero-zoom 15s ease-in-out infinite" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Gradient overlay - lighter on sides */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Animated floating orbs */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: "-2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[80px] animate-pulse-glow" />
      </div>

      {/* Animated sound bars - left */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-[3] hidden md:flex flex-col items-center gap-1">
        {[0.5, 0.8, 1, 0.6, 0.9, 0.7, 0.5].map((scale, i) => (
          <div
            key={`l-${i}`}
            className="hero-bar w-1.5 bg-amber-500/60 rounded-full origin-bottom"
            style={{ height: "24px", transform: `scaleY(${scale})` }}
          />
        ))}
      </div>

      {/* Animated sound bars - right */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-[3] hidden md:flex flex-col items-center gap-1">
        {[0.5, 0.7, 0.9, 0.6, 1, 0.8, 0.5].map((scale, i) => (
          <div
            key={`r-${i}`}
            className="hero-bar w-1.5 bg-amber-500/60 rounded-full origin-bottom"
            style={{ height: "24px", transform: `scaleY(${scale})` }}
          />
        ))}
      </div>

      {/* Content - plain overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-auto text-center">
          <span className="stagger-1 inline-block px-5 py-2.5 mb-6 text-base sm:text-lg font-semibold tracking-widest text-amber-400 bg-amber-500/30 rounded-full border border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                YOUR MUSICAL JOURNEY STARTS HERE
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight whitespace-nowrap [text-shadow:0_2px_12px_rgba(0,0,0,0.9),0_0_40px_rgba(0,0,0,0.5)]">
            <span className="text-white">AUDIO DIARY</span>{" "}
            <span className="text-amber-400 [text-shadow:0_2px_12px_rgba(0,0,0,0.9)]">STUDIO</span>
          </h1>

              <h2 className="stagger-3 text-2xl sm:text-3xl font-semibold text-white/95 mb-6">
            Begin Your Musical Journey Today
          </h2>

          <p className="stagger-4 text-lg sm:text-xl text-gray-300 mb-8 max-w-lg mx-auto leading-relaxed">
            Start your musical journey today and explore a world of rhythm, melody, and creativity.
          </p>

          <div className="stagger-5 flex flex-wrap justify-center gap-3 mb-8">
            {["Recording", "Vocal Training", "Events"].map((item, i) => (
              <span
                key={i}
                className="px-4 py-2 text-sm sm:text-base font-medium text-amber-300/90 bg-white/10 rounded-full border border-amber-500/30 backdrop-blur-sm hover:bg-amber-500/20 hover:border-amber-500/50 transition-all duration-300"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="stagger-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleScroll(servicesRef)}
              className="group relative px-10 py-4 rounded-full bg-amber-500 text-gray-900 text-base sm:text-lg font-bold overflow-hidden transition-all duration-300 shadow-[0_0_40px_rgba(245,158,11,0.5)] hover:shadow-[0_0_60px_rgba(245,158,11,0.7)] hover:scale-110 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Now
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            <button
              onClick={() => handleScroll(contactRef)}
              className="group px-10 py-4 rounded-full bg-white/10 text-white text-base sm:text-lg font-bold border-2 border-white/40 backdrop-blur-sm hover:bg-white hover:text-gray-900 hover:border-white hover:scale-105 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes hero-zoom {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
        }
      `}</style>
    </div>
  );
};

export default Header;
