const jwt = require("jsonwebtoken");
const { User } = require("../models");

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      // const decoded = -(jwt.verify(token, process.env.jwt_secret));
      const decoded = jwt.verify(token, process.env.jwt_secret);
      req.user = await User.findById(decoded.id).select("-password");
      // console.log("loggedin User:",req.user);
      return next();
    } catch (err) {
      res.status(401).json({
        message: err.message,
      });
    }
  }
  res.status(401).json({
    message: "No token Provided",
  });
};

const authorizeRole = (role) => (req, res, next) => {
  //   if (!req.user || !role.includes(req.user.role)) {
  // console.log("loggedin User: ",req.user);
  if (!req.user || !(req.user.role === role)) {
    return res.status(403).json({
      message: `Access Denied: permission  not granted only ${role} can access!!`,
    });
  }
  next();
};

module.exports = {
  protect,
  authorizeRole,
};
