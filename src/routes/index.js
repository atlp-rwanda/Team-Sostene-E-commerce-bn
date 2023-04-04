import express from 'express';
import userRoutes from './user.route';
import productRoutes from './product.route';
import userwithGoogleRoutes from './user_with_google.route';
import roleRoutes from './role.route';

const router = express.Router();

router.use('/', userwithGoogleRoutes);
router.use('/users', userRoutes, roleRoutes);
router.use('/products', productRoutes);

export default router;
