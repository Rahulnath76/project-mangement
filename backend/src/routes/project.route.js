import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { createProject, deleteProject, getAllProject, getProjectById, updateProject } from "../controllers/project.controller.js"

const router = express.Router();

router.use(authMiddleware);

router.post('/new-project', createProject);
router.put('/update-project/:id', updateProject);
router.delete('/delete-project/:id', deleteProject);
router.get('/get-all-projects', getAllProject);
router.get('/get-project/:id', getProjectById);

export default router;



