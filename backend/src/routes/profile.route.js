import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import { updateProfile } from '../controllers/profile.controller.js';
import {upload} from '../middleware/multer.js';

const router = express.Router();

router.use(authMiddleware);

router.put("/update", upload.single("avatar"), updateProfile);

export default router;



