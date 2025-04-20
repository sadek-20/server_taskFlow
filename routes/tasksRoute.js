import express from 'express';
import { getTasks, createTask, updateTask, deleteTask, updateTaskStatus } from '../controllers/tasksController.js';
import { protect } from '../middlewares/Authmiddleware.js';


const taskRouter = express.Router();
// Protect all routes after this middleware

taskRouter.post('/task', protect, createTask);
taskRouter.get('/task', protect, getTasks);
taskRouter.put('/task:id', protect, updateTask);
taskRouter.delete('task/:id', protect, deleteTask);
taskRouter.put('/task/:id/status', protect, updateTaskStatus);

export default taskRouter;