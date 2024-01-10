import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-top h-screen pt-20 bg-blue-200">
      <h2 className="text-3xl font-bold mb-6">Welcome!</h2>
      <div>
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
