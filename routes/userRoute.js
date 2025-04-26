import express from 'express';
import { getUser, login, registerUser, updateUser } from '../controllers/userController.js';
import { protect } from '../middlewares/Authmiddleware.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login' , login)
userRouter.get('/user',protect, getUser)
userRouter.put('/user/update', protect, updateUser)
export default userRouter;