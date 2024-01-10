const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID"],
    },
    sub_total: {
      type: Number,
      required: [true, "Please provide sub total"],
    },
    phone_number: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
