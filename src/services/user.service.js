const User = require("../models/user.model");
const Food = require("../models/food.model");
const Transaction = require("../models/transaction.model");
const {
  genratePassword,
  hashPassword,
  decodePassword,
} = require("../utils/passwordHelper");
const { createToken } = require("../utils/tokenHelper");

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

  const result = await User.create(user);
  const token = createToken(user.email, user.firstName);

  return { result: result, token: token };
};

// Find All Users Logic
const returnAllUser = async () => {
  const result = await User.find();
  return result;
};

// check login password and email
const checkEmailPassword = async (user) => {
  const checkUser = await User.findOne({ email: user.email });

  if (checkUser) {
    const checkPassword = decodePassword(user.password, checkUser.password);
    if (checkPassword) {
      const token = createToken(user.email, checkUser.firstName);
      return { result: "Logged in Successfully", token: token };
    } else {
      return "Password is Incorrect";
    }
  } else {
    return "Invalid Email Address, Please Correct Email Address";
  }
};

// get user by token find information Email verification
const userByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return user;
  } else {
    return "No User Found with this email";
  }
};

// ADD TO CART
const addFoodToCart = async (email, foodId, unit) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const food = await Food.findOne({ _id: foodId });
    if (!food) {
      return "No Food Found with this Food ID";
    }

    if (user.carts.length == 0 && unit > 0) {
      user.carts.push({ food: foodId, unit: unit });
    } else {
      let foodMatched = false;
      user.carts.forEach((f) => {
        if (f.food.toString() == food._id) {
          foodMatched = true;
          if (unit > 0) {
            f.unit = unit;
          } else if (unit == 0) {
            user.carts.remove(f);
          }
        }
      });
      if (!foodMatched && unit > 0) {
        user.carts.push({ food: foodId, unit: unit });
      }
    }

    const response = await user.save();
    return response;
  } else {
    return "No User Found with this email";
  }
};

// GET MY ALL MY CART INFO
const getMyCartInfo = async (email) => {
  const user = await User.findOne({ email: email }).populate("carts.food");

  if (user) {
    return user;
  } else {
    return "No User Found with this email";
  }
};

// CLEAR CART
const clearCart = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    if (user.carts.length == 0) {
      return "cart is already empty";
    } else {
      user.carts = [];
      await user.save();
      return user;
    }
  } else {
    return "No User Found with this email";
  }
};

// CREATE PAYMENT
const createPaymentService = async (email, body) => {
  const user = await User.findOne({ email: email });

  if (user) {
    const transaction = {
      userId: user._id,
      restaurantId: body.restaurantId,
      amount: body.amount,
      paymentMode: body.paymentMode,
    };
    if (body.paymentMode == "COD") {
      transaction.paymentStatus = "PENDING";
    } else {
      transaction.paymentStatus = "COMPLETED";
    }

    const result = await Transaction.create(transaction);

    return result;
  } else {
    return "No user found with this email";
  }
};

// GET A PAYMENT
const getAPaymentService = async (paymentId) => {
  const result = await Transaction.findOne({ _id: paymentId });
  if (!result) {
    return "Invalid Payment ID";
  }
  return result;
};

// GET ALL PAYMENT
const getAllMyPayments = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    const result = await Transaction.find({ userId: user._id });
    if (!result) {
      return "No Transaction Found for this user";
    }
    return result;
  } else {
    return "No user found with this email";
  }
};



module.exports = {
  createUser,
  returnAllUser,
  checkEmailPassword,
  userByEmail,
  addFoodToCart,
  getMyCartInfo,
  clearCart,
  createPaymentService,
  getAPaymentService,
  getAllMyPayments,
};
