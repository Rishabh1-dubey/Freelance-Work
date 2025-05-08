const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // ✅ Check if Authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
     

      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      // ✅ Attach user (without password) to req object
      req.user = await User.findById(decoded.user._id).select("-password");

      next(); // ✅ Proceed to protected route
    } catch (error) {
      console.log("Token verification failed", error);
      res.status(401).json({ message: "Not Authorized, token verification failed" });
    }
  } else {
    // ✅ If no token provided
    res.status(401).json({ message: "Not Authorized, no token" });
  }
};


// Middlware to check if the user is an admin
const admin = (req,res,next)=>{if(req.user && req.user.role === "admin"){
  next()
}else{
  res.status(403).json({message:"Not authorized as an admin"})
}}
module.exports = { protect,admin };
