import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import bg from '../assets/icon/1L.jpg'
import Navbar from './vocalTraningClass/NavBar';
import { SYSTEM_KEY, UserType } from '../config/Constent';


type User = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  contact_number?: string;
  address?: string;
  city?: string;
  district?: string;
  type_id?: number;
};

type RegisterResponse={
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    access_token:string,
    refresh_token:string
    type:string
}


export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    contact_number: '',
    address: '',
    city: '',
    district: '',
    type_id: 2
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const getTypeId = async (type: string):Promise<number> => {
    const response:{data:{type_id:number}} = await axios.get('http://localhost:3000/api/auth/type', {
          params: { type }
        });
    return response.data.type_id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login logic
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: user.email,
          password: user.password
        });

        const registerResponse = response.data as RegisterResponse;
        localStorage.setItem(SYSTEM_KEY.ID, registerResponse.id.toString());
        localStorage.setItem(SYSTEM_KEY.ACCESS_TOKEN, registerResponse.access_token);
        localStorage.setItem(SYSTEM_KEY.REFRESH_TOKEN, registerResponse.refresh_token);
        localStorage.setItem(SYSTEM_KEY.EMAIL, registerResponse.email);
        localStorage.setItem(SYSTEM_KEY.FIRST_NAME, registerResponse.first_name);
        localStorage.setItem(SYSTEM_KEY.LAST_NAME, registerResponse.last_name);
        localStorage.setItem(SYSTEM_KEY.TYPE, registerResponse.type);

        if(registerResponse.type === "ADMIN") {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        // Registration logic
        const response = await axios.post('http://localhost:3000/api/auth/register', {
          email: user.email,
          password: user.password,
          first_name: user.first_name,
          last_name: user.last_name,
          contact_number: user.contact_number,
          address: user.address,
          city: user.city,
          district: user.district,
          type_id: await getTypeId(UserType.USER)
        });
        const registerResponse = response.data as RegisterResponse;
        localStorage.setItem(SYSTEM_KEY.ID, registerResponse.id.toString());
        localStorage.setItem(SYSTEM_KEY.ACCESS_TOKEN, registerResponse.access_token);
        localStorage.setItem(SYSTEM_KEY.REFRESH_TOKEN, registerResponse.refresh_token);
        localStorage.setItem(SYSTEM_KEY.EMAIL, registerResponse.email);
        localStorage.setItem(SYSTEM_KEY.FIRST_NAME, registerResponse.first_name);
        localStorage.setItem(SYSTEM_KEY.LAST_NAME, registerResponse.last_name);
        localStorage.setItem(SYSTEM_KEY.TYPE, registerResponse.type);

        if(registerResponse.type === "ADMIN") {
          navigate('/admin');
        } else {
          navigate('/');
        }
        setIsLogin(true);
      }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            navigate('/auth');
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover", backgroundPosition: "center" }}>
        <Navbar/>
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isLogin ? 'Login' : 'Register'}
          </h2>
          <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    name="first_name"
                    value={user.first_name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    name="last_name"
                    value={user.last_name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
              minLength={6}
            />
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                <input
                  type="tel"
                  name="contact_number"
                  value={user.contact_number}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={user.city}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">District</label>
                  <input
                    type="text"
                    name="district"
                    value={user.district}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}