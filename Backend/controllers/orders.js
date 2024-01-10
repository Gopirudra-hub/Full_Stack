const Order = require('../models/Order');
const { StatusCodes } = require('http-status-codes');

const getOrder = async (req, res) => {
  try {
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide user_id in query parameters' });
    }

    const orders = await Order.find({ user_id });

    if (!orders || orders.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: `No orders found for user_id: ${user_id}` });
    }

    res.status(StatusCodes.OK).json({ orders, count: orders.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const addOrder = async (req, res) => {
  try {
    const { user_id, sub_total, phone_number } = req.body;

    if (!user_id || !sub_total || !phone_number) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: 'Please provide user_id, sub_total, and phone_number' });
    }

    const newOrder = await Order.create({ user_id, sub_total, phone_number });

    res.status(StatusCodes.CREATED).json({ order: newOrder });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getOrder,
  addOrder,
};
