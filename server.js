const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const MongoDBConnection = require("./src/config/database");

// middlerwares
app.use(express.json());

// DataBase Connection
MongoDBConnection();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is connection Successfully ${port}`);
});
