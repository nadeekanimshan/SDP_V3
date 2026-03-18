import logo from "../assets/icon/logo.png";
import facebook_icon from "../assets/icon/facebook_icon.png";
import twitter_icon from "../assets/icon/twitter_icon.png";
import phone from "../assets/icon/phone.png";
import email from "../assets/icon/email.png";


const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-900 text-white px-4 md:px-10 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="space-y-4">
          <img src={logo} alt="FMS Education Logo" className="h-10" />
          <p className="text-sm text-gray-300">
            Your premier destination for artistic growth, professional guidance, and creative innovation—delivering every session with passion, precision, and purpose.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="https://web.facebook.com/audiodiarystudios" target="_blank" rel="noopener noreferrer">
              <img src={facebook_icon} alt="Facebook" className="h-6 w-6" />
            </a>
            <a href="https://www.instagram.com/audio_diary_studios/" target="_blank" rel="noopener noreferrer">
              <img src={twitter_icon} alt="Twitter" className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Center Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Links</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#my-5" className="hover:text-white">Services</a></li>
            <li><a href="#container" className="hover:text-white">About</a></li>
            <li><a href="#footer" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Get in Touch</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Audio Diary Studio,</li>
            <li>Boralasgamuwa,</li>
            <li>Sri Lanka.</li>
            <li className="flex items-start gap-2 mt-3">
              <img src={phone} alt="Phone" className="h-5 mt-1" />
              <div>
                <a href="tel:+94770284814" className="block hover:text-white">+94 77 028 4814</a>
                <a href="tel:+94777895363" className="block hover:text-white">+94 77 789 5363</a>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <img src={email} alt="Email" className="h-5 mt-1" />
              <a href="mailto:audiodiaryrecords@gmail.com" className="hover:text-white">
                audiodiaryrecords@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />
      <p className="text-center text-sm text-gray-400">
        © 2025 AudioDiary™. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
