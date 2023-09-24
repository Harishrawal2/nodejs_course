const nodemailer = require("nodemailer");
require("dotenv").config();

const mailConfig = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

module.exports = mailConfig;
