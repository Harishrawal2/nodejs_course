const bcrypt = require("bcryptjs");

const genratePassword = () => {
  const salt = bcrypt.genSaltSync(10);
  return salt;
};

const hashPassword = (plainPassword, salt) => {
  const hashedPassword = bcrypt.hashSync(plainPassword, salt);
  return hashedPassword;
};

module.exports = {
  hashPassword,
  genratePassword,
};
