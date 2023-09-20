const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const MongoDBConnection = require("./src/config/database");
const userRoutes = require("./src/routes/user.route");

// middlerwares
app.use(express.json());

// DataBase Connection
MongoDBConnection();

// user routes api
app.use("/api/auth", userRoutes);

app.use("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is connection Successfully ${port}`);
});
