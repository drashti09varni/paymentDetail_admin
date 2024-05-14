import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BsFillPersonFill } from 'react-icons/bs'; // Importing person icon
import { RiLockPasswordFill } from 'react-icons/ri'; // Importing lock icon
// import { FaEye, FaEyeSlash } from "react-icons/fa";

const initialForm = {
  username: '',
  password: '',
};

const Login = ({ setIsLoggedIn }) => {
  const [loginData, setLoginData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const navigate = useNavigate();

  
  

  const handleLogin = () => {
    // Perform login authentication here
    // For simplicity, I'm checking if the username and password are not empty
    if (username && password) {
      // Mock token for demonstration, replace with actual token from authentication
      const token = 'sample_token';
      localStorage.setItem('token', token); // Store token in localStorage
      setIsLoggedIn(true); // Set isLoggedIn to true
      navigate('/dashboard')
    } else {
      setErrors('Please enter username and password.');
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center  shadow-[rgba(255,255,255,0.24) 0px 3px 8px] bg-[#000]">
      <div className="max-w-xs w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Tronix Admin Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">
            Username
          </label>
          <div className="relative">
            <BsFillPersonFill className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type="text"
              id="email"
              className="pl-10 mt-1 block w-full rounded-md border-2 border-gray-300  px-3 py-2"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <RiLockPasswordFill className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'} // Show password if showPassword is true
              id="password"
              className="pl-10 mt-1 block w-full rounded-md border-2 border-gray-300  px-3 py-2"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-400 focus:outline-none"
            >
              {showPassword ? <FaEye /> :  <FaEyeSlash />
}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="py-2 px-4 bg-blue-500 w-full text-white font-semibold rounded-md"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
