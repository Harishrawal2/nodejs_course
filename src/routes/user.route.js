const express = require("express");
const {
  signupUser,
  GetAllUsers,
  loginUser,
  getUserByEmail,
  addToCart,
  getCart,
  deleteCart,
  createPayment,
  getAPayment,
  getAllPayment,
  createOrder,
  GetOrders,
  verifyUser,
} = require("../controllers/user.controller");
const UserRouter = express.Router();
const authToken = require("../middleware/auth.token");

// Create User API
UserRouter.post("/signup", signupUser);

// Login Users API
UserRouter.post("/login", loginUser);

// Get All Users API
UserRouter.get("/users", GetAllUsers);

// Get Me API
UserRouter.get("/me", authToken, getUserByEmail);

// Add Cart
UserRouter.post("/add", authToken, addToCart);

// get My Cart Item
UserRouter.get("/cart", authToken, getCart);

// Delete all foods from Cart
UserRouter.delete("/cart", authToken, deleteCart);

// Create Payment
UserRouter.post("/payment", authToken, createPayment);

// Get a payment or transaction
UserRouter.get("/payment/:paymentId", authToken, getAPayment);

// Get all my  payments or transactions
UserRouter.get("/payments", authToken, getAllPayment);

// create a order
UserRouter.post("/orders", authToken, createOrder);

// Get all orders
UserRouter.get("/orders", authToken, GetOrders);

// Verify The Order.
UserRouter.post("/verify/otp", authToken, verifyUser);

module.exports = UserRouter;
