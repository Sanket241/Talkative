import express from 'express';
const router = express.Router();
import { sendMessage, getMessage } from '../controllers/messageControllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.route("/send/:id").post(isAuthenticated,sendMessage);
router.route("/:id").get(isAuthenticated, getMessage);

export default router;
