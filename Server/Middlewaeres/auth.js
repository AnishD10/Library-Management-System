// Auth Middleware: Checks if you have the golden ticket (token).
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  
  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
      return res.status(401).json({ message: "Token invalid or expired" });
    }
    req.user = decoded;
    
    console.log("working" , decoded);
    

    next();
  } catch (err) {
    res.status(403).json({ message: "Forbidden", error: err.message });
  }
};


