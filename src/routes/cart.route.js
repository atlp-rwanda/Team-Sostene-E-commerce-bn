import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { isAuthenticated } from '../middleware';
import { asyncWrapper } from '../helpers';
import { cartControllers } from '../controllers';

const router = Router();

router.use(cookieParser());

router.post('/:pid', isAuthenticated, asyncWrapper(cartControllers.addToCart));
router.delete(
  '/clear',
  isAuthenticated,
  asyncWrapper(cartControllers.clearCartItems)
);
router.delete(
  '/:pid',
  isAuthenticated,
  asyncWrapper(cartControllers.clearSingleItem)
);
router.put(
  '/update/:pid',
  isAuthenticated,
  asyncWrapper(cartControllers.updateCartQuantiy)
);
router.get('/', isAuthenticated, asyncWrapper(cartControllers.viewCartItems));
router.patch(
  '/add/:pid',
  isAuthenticated,
  asyncWrapper(cartControllers.addQuantity)
);
router.patch(
  '/reduce/:pid',
  isAuthenticated,
  asyncWrapper(cartControllers.removeQuantity)
);

export default router;
