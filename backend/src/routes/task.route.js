import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createTask, getAllTasks, updateTask, deleteTask } from '../controllers/task.controller.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTask);
router.get('/getalltask', getAllTasks);
// router.get('/gettasks/:id', getTasks);
router.put('/update-task/:id', updateTask);
router.delete('/delete-task/:id', deleteTask);

export default router;



