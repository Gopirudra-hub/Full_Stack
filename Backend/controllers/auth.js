const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res) => {
  try {
    const { name, password, phoneNumber } = req.body;

    if (!name || !password || !phoneNumber) {
      throw new Error("Please provide name, password, and phone number");
    }

    const user = await User.create({ name, password, phoneNumber });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password } = req.body;

    if (!phoneNumber || !password) {
      throw new Error("Please provide phone number and password");
    }

    const user = await User.findOne({ phoneNumber });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error("Invalid Credentials");
    }

    const token = user.createJWT();
    const userId = user._id; 
    res.status(StatusCodes.OK).json({ user: { id: userId,name: user.name }, token });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: error.message });
  }
};


module.exports = {
  register,
  login
};
