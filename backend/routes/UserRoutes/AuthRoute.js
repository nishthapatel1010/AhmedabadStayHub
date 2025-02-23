// /routes/authRoutes.js
import express from 'express';
import { signup, signin  } from '../../controllers/UserController/AuthController.js'; // Import the signup controller


const router = express.Router();

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

export default router;
