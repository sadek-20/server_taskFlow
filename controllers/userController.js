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



export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const isEmailExists = await User.findOne({
      email: email.toLowerCase()
    }).select("+password")

    

    if (!isEmailExists) {
      return res.status(401).json({
        message: 'invalid emial and password'
      })
    }

    isEmailExists.password = undefined;

    const expiresIn = 7 * 24 * 60 * 60; // 7days

    const token = jwt.sign({
      id: isEmailExists._id
    }, jwt_secret, { expiresIn })

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: expiresIn * 1000,
      secure: false
    })

    res.status(201).json({
      ...isEmailExists.toJSON(),  
      expiresIn,
      token
    })
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'invalid emial or password',
      error: error.message
    })
  }
}
