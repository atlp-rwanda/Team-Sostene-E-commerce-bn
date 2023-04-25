import express from 'express';
import userRoutes from './user.route';
import productRoutes from './product.route';
import userwithGoogleRoutes from './user_with_google.route';
import roleRoutes from './role.route';
import wishlistRoutes from './wishlist.route';

const router = express.Router();

router.use('/', userwithGoogleRoutes);
router.use('/users', userRoutes, roleRoutes);
router.use('/products', productRoutes);
router.use('/wishlist', wishlistRoutes);

router.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Not Found',
  });
});

export default router;
