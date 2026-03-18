import { useEffect, useState } from 'react';
import { FaHome, FaCalendarAlt, FaUsers, FaCreditCard, FaBook, FaSignOutAlt, FaBars, FaUser } from 'react-icons/fa';
import Event from './Event';
import Classes from './Classes';
import Appointment from './Appointment';
import Attendance from './Attendance';
import User from './User';
import Payment from './Payment';
import Home from './Home';
import { SYSTEM_KEY } from '../../config/Constent';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      case 'home':
      default:
        return <Home />;
    }
  };

  return (
    <section className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-black text-white p-4 flex flex-col space-y-4 ${
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
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('home')}
        >
          <FaHome />
          {isSidebarOpen && <span>Home</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('events')}
        >
          <FaCalendarAlt />
          {isSidebarOpen && <span>Events</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('users')}
        >
          <FaUsers />
          {isSidebarOpen && <span>Users</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('payment')}
        >
          <FaCreditCard />
          {isSidebarOpen && <span>Payment</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('classes')}
        >
          <FaBook />
          {isSidebarOpen && <span>Classes</span>}
        </button>
        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('attendance')}
        >
          <FaUser />
          {isSidebarOpen && <span>Attendance</span>}
        </button>

        <button
          className="flex items-center space-x-2 hover:bg-gray-800 p-2 rounded"
          onClick={() => setActiveComponent('appointment')}
        >
          <FaCalendarAlt />
          {isSidebarOpen && <span>Appointment</span>}
        </button>

        <button onClick={handleButtonClick} className="flex items-center space-x-2 mt-auto hover:bg-gray-800 p-2 rounded">
          <FaSignOutAlt />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gray-900">
        {renderComponent()}
      </div>
    </section>
  );
}
