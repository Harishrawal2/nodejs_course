const User = require("../models/user.model");
const { genratePassword, hashPassword } = require("../utils/passwordHelper");

// Create User Business Service Logic
const createUser = async (body) => {
  const user = {
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: body.password,
    address: body.address,
    phone: body.phone,
  };

  // hashed password
  const salt = genratePassword();
  user.password = hashPassword(body.password, salt);

  // user created
  const result = await User.create(user);
  return result;
};

// Find All Users Logic
const returnAllUser = async () => {
  const result = await User.find();
  return result;
};

module.exports = {
  createUser,
  returnAllUser,
};
