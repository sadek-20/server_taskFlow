import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.js";
import { User } from "../models/userModel.js";

export const protect = async (req, res, next) => {
    
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
        });
    }

    

    try {

        const decoded = jwt.verify(token, jwt_secret);

        const user = await User.findById(decoded.id).select("-password"); // Exclude password from user object
    if (!user) {
        return res.status(401).json({
            message: "Unauthorized access",
        });
    }
        req.userId = decoded.id; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
        
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
        
    }
 }