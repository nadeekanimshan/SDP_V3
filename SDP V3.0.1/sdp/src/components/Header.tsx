

// ✅ Swiper Component & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules"; // ✅ Only if you're using Swiper v9+

// ✅ Swiper CSS Imports (required for styling)
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// ✅ Image Imports
import L4 from "../assets/icon/home/4L.jpg";
import L10 from "../assets/icon/home/10L.jpg";
import L2 from "../assets/icon/home/2L.jpg";
import L6 from "../assets/icon/home/6L.jpg";
import L9 from "../assets/icon/home/9L.jpg";
import bg from "../assets/icon/home/25694852_sl_0210121_40570_34.svg";

type Props = {
  handleScroll: (ref: React.RefObject<HTMLDivElement | null>) => void;
  servicesRef: React.RefObject<HTMLDivElement | null>;
  contactRef: React.RefObject<HTMLDivElement | null>;
};
const Header = ({handleScroll, servicesRef, contactRef}: Props) => {
  return (
    <div className="relative w-full flex flex-col lg:flex-row items-center justify-between bg-black text-white min-h-screen overflow-hidden" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
      {/* Text Section */}
      <div className="w-full lg:w-1/2 px-6 text-gray-800 lg:px-16 py-16 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">AUDIO DIARY STUDIO</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mb-6">Begin Your Musical Journey Today</h2>
        <p className="text-sm sm:text-base text-gray-600 mb-8 max-w-md">
          Start your musical journey today and explore a world of rhythm, melody, and creativity.
        </p>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => handleScroll(servicesRef)} className="bg-black text-white border-black border px-6 py-2 rounded hover:bg-white hover:text-black transition">
            Explore Now
          </button>
          <button onClick={() => handleScroll(contactRef)} className="bg-white text-black px-6 py-2 rounded hover:bg-black hover:text-white transition">
            Contact Us
          </button>
        </div>
      </div>

      {/* Swiper Section */}
      <div className="w-full lg:w-1/2 h-[300px] md:h-[400px] lg:h-[100vh] z-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full"
        >
          {[L4, L10, L2, L6, L9].map((img, idx) => (
            <SwiperSlide key={idx}>
              <img
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Header;
