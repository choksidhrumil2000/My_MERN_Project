const jwt = require("jsonwebtoken");
const generateTokenResponse = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
    expiresIn: process.env.jwt_expiresIn,
  });

  return {
    token,
    expiresIn: process.env.jwt_expiresIn,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  generateTokenResponse,
};
