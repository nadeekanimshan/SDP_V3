import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import React, {  useEffect, useRef } from 'react';

import H1 from '../assets/icon/gallery/H1.jpg';
import H2 from '../assets/icon/gallery/H2.jpg';
import H3 from '../assets/icon/gallery/H3.jpg';
import H4 from '../assets/icon/gallery/H4.jpg';
import H5 from '../assets/icon/gallery/H5.jpg';
import bg from '../assets/icon/gallery/bg b&w gallery.jpg';

const Gallery: React.FC = () => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
//   const [isTablet, setIsTablet] = useState(window.innerWidth > 600 && window.innerWidth <= 1100);
  const sliderRef = useRef<Slider>(null);

//   const handleResize = useCallback(() => {
//     setIsMobile(window.innerWidth <= 600);
//     setIsTablet(window.innerWidth > 600 && window.innerWidth <= 1100);
//   }, []);

  useEffect(() => {
    // window.addEventListener('resize', handleResize);
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsData = [
    { image: H1 },
    { image: H2 },
    { image: H3 },
    { image: H4 },
    { image: H5 },
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      id="gallery"
      className="relative py-20 text-white overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-blend-darken z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Our Memories
        </h2>

        <Slider ref={sliderRef} {...settings}>
          {cardsData.map((card, idx) => (
            <div key={idx} className="px-3">
              <img
                src={card.image}
                alt={`Gallery ${idx + 1}`}
                className="rounded-xl w-full h-[250px] md:h-[350px] object-cover shadow-lg"
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;
