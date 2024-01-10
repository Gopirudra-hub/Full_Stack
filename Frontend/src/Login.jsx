import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://backend-api-eta-ruddy.vercel.app/api/v1/auth/login-user', {
        phoneNumber: formData.phoneNumber,
        password: formData.password,
      });

      if (res.status === 200) {
        const { id, name } = res.data.user;
        const token = res.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);

        console.log('Login successful:', res.data);

        navigate('/addorder');
      } else {
        // Handle other status codes or error scenarios
      }
    } catch (error) {
      console.error('Login Error:', error);
  
    }
  };

  return (
    <div className="flex flex-col items-center justify-top h-screen pt-20 bg-blue-200">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-gray-700 font-bold mb-2">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
