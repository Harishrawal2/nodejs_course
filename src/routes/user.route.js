const express = require("express");
const { signupUser, GetAllUsers } = require("../controllers/user.controller");
const router = express.Router();

// Create User API
router.post("/signup", signupUser);

// Get All Users API
router.get("/users", GetAllUsers);

module.exports = router;
