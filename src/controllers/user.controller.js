const { createUser, returnAllUser } = require("../services/user.service");

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

module.exports = { signupUser, GetAllUsers };
