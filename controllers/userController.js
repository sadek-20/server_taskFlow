import jwt from "jsonwebtoken";
import { jwt_secret } from "../config/config.js";
import { User } from "../models/userModel.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserExist = await User.findOne({ email: email.toLowerCase() });

    if (isUserExist) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const user = new User({
      name,
      email,
      password, // plain password — will be hashed in pre-save
    });

    await user.save();

    // user.password = undefined;

    res.status(201).json({
      message: "User registration successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error creating user",
      error: error.message,
    });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check user exists
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // if (user) {
    //   return res.status(200).json({ message: user });
    // }

    // Check password (plain text comparison)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, jwt_secret, {
      expiresIn: "7d",
    });

    // Respond with token
    return res.status(200).json({
      message: "Login successful",
      token,
     
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getUser = async (req, res) => { 
  try {
    const user = await User.findById(req.userId).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export const updateUser = async (req, res) => { 
  try {
    const { name,  password } = req.body;
    
    console.log("Update user data:", req.body);
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name,  password },
      { new: true, runValidators: true }
    ).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

