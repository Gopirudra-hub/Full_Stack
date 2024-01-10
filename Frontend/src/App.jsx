import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Registration from './register';
import Login from './Login';
import AddOrder from './addOrder'; 
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addorder" element={<AddOrder />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
