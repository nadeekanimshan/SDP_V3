import { useEffect, useState } from 'react';
import { FaHome, FaCalendarAlt, FaUsers, FaCreditCard, FaBook, FaSignOutAlt, FaBars, FaUser, FaCog, FaClock } from 'react-icons/fa';
import Event from './Event';
import Classes from './Classes';
import Appointment from './Appointment';
import Attendance from './Attendance';
import User from './User';
import Payment from './Payment';
import Home from './Home';
import Profile from './Profile';
import SlotAvailability from './SlotAvailability';
import { SYSTEM_KEY } from '../../config/Constent';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeComponent, setActiveComponent] = useState<string>('home');
  const navigate = useNavigate();

  useEffect(() => {
    const userType = localStorage.getItem(SYSTEM_KEY.TYPE);
    const accessToken = localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN);
    if (userType !== 'ADMIN' || !accessToken) {
      navigate('/auth');
    }
  }, []);

  const handleButtonClick = () => {
    if (localStorage.getItem(SYSTEM_KEY.ACCESS_TOKEN)) {
      navigate('/auth');
      localStorage.clear();
    } else {
      navigate('/auth');
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'events':
        return <Event />;
      case 'users':
        return <User />;
      case 'payment':
        return <Payment />;
      case 'classes':
        return <Classes />;
      case 'attendance':
        return <Attendance />;
      case 'appointment':
        return <Appointment />;
      case 'slots':
        return <SlotAvailability />;
      case 'profile':
        return <Profile />;
      case 'home':
      default:
        return <Home onNavigate={setActiveComponent} />;
    }
  };

  return (
    <section className="flex h-screen">
      <ToastContainer position="top-center" autoClose={3000} style={{ zIndex: 99999999 }} />
      {/* Sidebar */}
      <div
        className={`bg-slate-900 border-r border-slate-700/50 text-white p-4 flex flex-col space-y-4 ${
          isSidebarOpen ? 'w-48' : 'w-16'
        } transition-all duration-300`}
      >
        {/* Toggle Button */}
        <button
          className="mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Navigation Buttons */}
        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('home')}
        >
          <FaHome />
          {isSidebarOpen && <span>Home</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('events')}
        >
          <FaCalendarAlt />
          {isSidebarOpen && <span>Events</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('users')}
        >
          <FaUsers />
          {isSidebarOpen && <span>Users</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('payment')}
        >
          <FaCreditCard />
          {isSidebarOpen && <span>Payment</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('classes')}
        >
          <FaBook />
          {isSidebarOpen && <span>Classes</span>}
        </button>

        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('appointment')}
        >
          <FaCalendarAlt />
          {isSidebarOpen && <span>Appointment</span>}
        </button>

        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('slots')}
        >
          <FaClock />
          {isSidebarOpen && <span>Slot Hours</span>}
        </button>

        <button
          className="flex items-center space-x-2 hover:bg-slate-800 p-2 rounded transition-colors"
          onClick={() => setActiveComponent('profile')}
        >
          <FaCog />
          {isSidebarOpen && <span>Profile</span>}
        </button>

        <button onClick={handleButtonClick} className="flex items-center space-x-2 mt-auto hover:bg-slate-800 p-2 rounded transition-colors">
          <FaSignOutAlt />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {renderComponent()}
      </div>
    </section>
  );
}
