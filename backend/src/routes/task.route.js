import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createTask, getAllTasks, getTaskById, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/create-task', createTask);
router.get('/getalltask', getAllTasks);
router.get('/get-task-by-id/:id', getTaskById);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

export default router;



