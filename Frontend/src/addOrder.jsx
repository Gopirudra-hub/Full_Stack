import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddOrder = () => {
  const [orderData, setOrderData] = useState({
    user_id: '',
    sub_total: '',
    phone_number: '',
  });
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setOrderData({ ...orderData, user_id: storedUserId });
    }
  }, []);

  const handleChange = (e) => {
    setOrderData({ ...orderData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token || !orderData.user_id) {
        return;
      }

      const res = await axios.post('https://backend-api-eta-ruddy.vercel.app/api/v1/auth/add-order',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Order added:', res.data);
      setSuccessMessage('Order added successfully!');
    } catch (error) {
      console.error('Add Order Error:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        return;
      }

      const res = await axios.get(`https://backend-api-eta-ruddy.vercel.app/api/v1/auth/get-order?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Orders fetched:', res.data);
      setOrders(
        res.data.orders.map((order) => ({
          id: order._id,
          sub_total: order.sub_total,
          phone_number: order.phone_number,
        }))
      );
    } catch (error) {
      console.error('Fetch Orders Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-top h-screen p-6 bg-blue-200 pt-10">
      <form onSubmit={handleSubmit} className="w-80 mb-4">
        <div className="mb-4">
          <label htmlFor="sub_total">Sub Total:</label>
          <input
            type="text"
            id="sub_total"
            name="sub_total"
            value={orderData.sub_total}
            onChange={handleChange}
            placeholder="Sub Total"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={orderData.phone_number}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border border-gray-400 rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Order
        </button>
      </form>
      
      {successMessage && (
        <p className="text-black">{successMessage}</p>
      )}

      <button onClick={fetchOrders} className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Get All Orders
      </button>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Orders:</h2>
        <ul>
          {orders.map((order, index) => (
            <li key={index} className="mb-2">
              <p>Order ID: {order.id}</p>
              <p>Sub Total: {order.sub_total}</p>
              <p>Phone Number: {order.phone_number}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddOrder;
