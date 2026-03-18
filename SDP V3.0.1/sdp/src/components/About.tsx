import { FaRocket, FaLightbulb, FaUsers } from 'react-icons/fa';
import L1 from '../assets/icon/1L.jpg';

const About = () => {
  return (
    <section id="about" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl font-bold inline-block relative">
            About Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-yellow-700 rounded"></span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src={L1}
              alt="Our Team"
              className="w-full rounded shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2">
            <p className="text-gray-700 text-justify leading-relaxed mb-6">
              At Audio Diary Studio, we're a team of passionate artists, producers, and educators committed to helping voices be heard—literally and figuratively. Whether you're here to sharpen your musical skills, record your next big hit, or share your story through sound, we bring innovation, heart, and expertise to every beat.
            </p>

            {/* Key Points */}
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded text-black">
                  <FaRocket className="text-xl" />
                </div>
                <div>
                  <h5 className="text-lg font-semibold">Innovative Soundscapes</h5>
                  <p className="text-sm text-gray-600">
                    State-of-the-art tools to craft your perfect audio experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded text-black">
                  <FaUsers className="text-xl" />
                </div>
                <div>
                  <h5 className="text-lg font-semibold">Creative Expression</h5>
                  <p className="text-sm text-gray-600">
                    Custom music and training solutions made just for you
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded text-black">
                  <FaLightbulb className="text-xl" />
                </div>
                <div>
                  <h5 className="text-lg font-semibold">Skilled Professionals</h5>
                  <p className="text-sm text-gray-600">
                    A team of seasoned artists, producers, and trainers by your side
                  </p>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
