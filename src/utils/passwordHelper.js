const bcrypt = require("bcryptjs");

const genratePassword = () => {
  const salt = bcrypt.genSaltSync(10);
  return salt;
};

const hashPassword = (plainPassword, salt) => {
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

const decodePassword = (plainPassword, hashPassword) => {
  const result = bcrypt.compareSync(plainPassword, hashPassword);
  return result; // true or false
};

module.exports = {
  hashPassword,
  genratePassword,
  decodePassword,
};
