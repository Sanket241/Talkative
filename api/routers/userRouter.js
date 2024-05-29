import express from 'express';
const router = express.Router();
import {register, login, getOtherUsers, logout } from '../controllers/userControllers.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

router.route('/register').post(register);
router.route('/login').post(login)
router.route('/logout').delete(logout)
router.route('/').get(isAuthenticated,getOtherUsers)
export default router;
