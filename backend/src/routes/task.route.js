import express from "express";
import {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controllers/task.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

router.use(authMiddleware);

router.post("/create-task", createTask);
router.put("/update-task", updateTask);
router.delete("/:projectId/delete-task/:taskId", deleteTask);
router.get("/get-all-tasks", getAllTasks);

export default router;
