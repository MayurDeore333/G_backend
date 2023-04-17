const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const jwt = require("jsonwebtoken");

const protect = asyncHandler( async(req, res, next) => {
    try {
        const token = req.cookies.token

        if(!token) {
            res.status(401);
            throw new Error("Not authorized, please login")
        }

        // Verify Token
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // Get User id for token
        const user = await User.findById(verified.id).select("-password")
        
         if(!user) {
            res.status(401)
            throw new Error("User not found")
         }
         req.user = user
         next();

    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login");
    }

    // const admin = await Admin.findById(verified.id).select("-password")

    // if(!admin) {
    //     res.status(401)
    //     throw new Error("User not found")
    //  }
    //  req.user = admin
    //  next();
});

module.exports = protect