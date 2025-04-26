import express from 'express';
import { createTask, deleteTask, getTasks, toggleCompleted, updateTask } from '../controllers/tasksController.js';
import { protect } from '../middlewares/Authmiddleware.js';


const taskRouter = express.Router();
// Protect all routes after this middleware

taskRouter.post('/tasks', protect, createTask);
taskRouter.get('/tasks', protect, getTasks);
taskRouter.put('/tasks/:id', protect, updateTask);
taskRouter.delete('/tasks/:id', protect, deleteTask);
taskRouter.put('/tasks/toggle/:id', protect, toggleCompleted);


export default taskRouter;