const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const MongoDBConnection = require("./src/config/database");
const userRoutes = require("./src/routes/user.route");
const RestaurantRouter = require("./src/routes/restaurant.route");
const mailConfig = require("./src/config/mail.config");

// middlerwares
app.use(express.json());

// DataBase Connection
MongoDBConnection();

// USER ROUTES API
app.use("/api/auth", userRoutes);

// RESTAORANT ROUTES API
app.use("/api", RestaurantRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is connection Successfully ${port}`);
});
