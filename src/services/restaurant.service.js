const Restaurant = require("../models/restaurant.model");
const { createToken } = require("../utils/tokenHelper");
const {
  hashPassword,
  genratePassword,
  decodePassword,
} = require("../utils/passwordHelper");
const Food = require("../models/food.model");

// Create Account Restuarant logic
const createRestaurant = async (body) => {
  const restaurant = {
    name: body.name,
    ownerName: body.ownerName,
    email: body.email,
    password: body.password,
    address: body.address,
    phone: body.phone,
    rating: body.rating,
    serviceAvailable: false,
  };

  const salt = genratePassword();
  restaurant.password = hashPassword(body.password, salt);

  const result = await Restaurant.create(restaurant);
  const token = createToken(restaurant.email, restaurant.name);

  return { result: result, token: token };
};

// Login Restuarant logic
const checkEmailPassword = async (restaurant) => {
  const checkRestaurant = await Restaurant.findOne({ email: restaurant.email });

  if (checkRestaurant) {
    const checkPassword = decodePassword(
      restaurant.password,
      checkRestaurant.password
    );
    if (checkPassword) {
      const token = createToken(restaurant.email, checkRestaurant.name);
      return { result: "Logged in Successfully", token: token };
    } else {
      return "Password is Incorrect";
    }
  } else {
    return "Invalid Email Address, Please Correct Email Address";
  }
};

// Find All Restaurant
const returnAllRestaurant = async () => {
  const restaurants = await Restaurant.find();

  if (restaurants) {
    return restaurants;
  } else {
    return "No Restaurants";
  }
};

// Find One Restaurant By ID
const returnARestaurant = async (id) => {
  const restaurant = await Restaurant.findOne({ _id: id }).populate("foods");
  return restaurant;
};

// Update Restaurant Services By ID
const toggleServices = async (email) => {
  const restaurant = await Restaurant.findOne({ email: email });
  if (restaurant) {
    restaurant.serviceAvailable = !restaurant.serviceAvailable;
    const response = await restaurant.save();
    return response;
  } else {
    return "No Restaurant Found for this email adderess";
  }
};

// const add Food To Restaurants
const addFoodToRestaurant = async (email, body) => {
  const restaurant = await Restaurant.findOne({ email: email });

  if (restaurant) {
    const food = {
      restaurantId: restaurant._id,
      name: body.name,
      description: body.description,
      price: body.price,
      foodType: body.foodType,
      cookingTime: body.cookingTime,
      rating: body.rating,
    };

    const response = await Food.create(food);

    restaurant.foods.push(response);
    await restaurant.save();

    return response;
  } else {
    return "No Restaurant Found for this email address";
  }
};

module.exports = {
  createRestaurant,
  checkEmailPassword,
  returnAllRestaurant,
  returnARestaurant,
  toggleServices,
  addFoodToRestaurant,
};
