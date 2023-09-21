const {
  createUser,
  returnAllUser,
  checkEmailPassword,
  userByEmail,
  addFoodToCart,
} = require("../services/user.service");

// Signup User
const signupUser = async (req, res) => {
  try {
    const response = await createUser(req.body);

    return res.json({ message: response });
  } catch (error) {
    return res.json({ Error: error });
  }
};

// Find ALl Users
const GetAllUsers = async (req, res) => {
  try {
    const response = await returnAllUser();
    return res.json({ message: response });
  } catch (error) {
    return res.json({ Error: error });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const response = await checkEmailPassword(user);
    return res.json({ message: response });
  } catch (error) {
    return res.json({ Error: error });
  }
};

// get user by token find information Email verification
const getUserByEmail = async (req, res) => {
  try {
    const email = req.email;
    const response = await userByEmail(email);
    return res.json({ message: response });
  } catch (error) {
    return res.json({ Error: error });
  }
};

const addToCart = async (req, res) => {
  try {
    const email = req.email;
    const foodId = req.foodId;
    const unit = req.unit;

    const response = await addFoodToCart(email, foodId, unit);
    return res.json({ message: response });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error });
  }
};

module.exports = {
  signupUser,
  GetAllUsers,
  loginUser,
  getUserByEmail,
  addToCart,
};
