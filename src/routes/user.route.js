const express = require("express");
const {
  signupUser,
  GetAllUsers,
  loginUser,
  getUserByEmail,
  addToCart,
} = require("../controllers/user.controller");
const router = express.Router();
const authToken = require("../middleware/auth.token");

// Create User API
router.post("/signup", signupUser);

// Login Users API
router.post("/login", loginUser);

// Get All Users API
router.get("/users", GetAllUsers);

// Get Me API
router.get("/me", authToken, getUserByEmail);

// Add Cart
router.post("/add", authToken, addToCart);

module.exports = router;
