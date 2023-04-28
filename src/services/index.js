import collectionServices from './collection.service';
import userServices from './user.services';
import emailServices from './email.services';
import productsServices from './products.service';
import checkoutServices from './checkout.service';
// eslint-disable-next-line import/no-cycle
import twoFactorAuth from './twofactor.service';
import wishListServices from './wishlist.services';
import reviewsServices from './reviews.service';
import cartServices from './cart.services';

export {
  userServices,
  collectionServices,
  emailServices,
  productsServices,
  cartServices,
  checkoutServices,
  twoFactorAuth,
  wishListServices,
  reviewsServices,
};
