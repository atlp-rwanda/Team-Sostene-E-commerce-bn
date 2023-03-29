import express from 'express';
import userRoutes from './user.route';
import userwithGoogleRoutes from './user_with_google.route';

const router = express.Router();
router.use('/users', userRoutes);
router.use('/', userwithGoogleRoutes);

export default router;
