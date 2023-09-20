const express = require("express");
const dotenv = require("dotenv").config();
const app = express();

// middlerwares
app.use(express.json());

// routes
app.use("/api", require("./src/routes/player"));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is connection Successfully ${port}`);
});
