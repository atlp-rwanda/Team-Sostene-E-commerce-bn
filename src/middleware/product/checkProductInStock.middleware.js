import { cartServices, productsServices } from '../../services';

const checkProductInStock = async (req, res, next) => {
  const cart = await cartServices.getCart(req.user.id);
  const productsInCart = cart.products;
  if (productsInCart.length === 0) {
    return res.status(406).json({
      code: 406,
      message: 'Your cart is empty!',
    });
  }
  const allProductsAvailable = await Promise.all(
    productsInCart.map(async (product) => {
      const availablePdt = await productsServices.getProductById(
        product.product.id
      );
      return availablePdt.quantity >= product.quantity;
    })
  );

  if (!allProductsAvailable.every(Boolean)) {
    const unavailableProducts = productsInCart.filter(
      (_, index) => !allProductsAvailable[index]
    );

    return res.status(409).json({
      code: 409,
      message: `These products are low in stock!`,
      unavailableProducts,
    });
  }

  req.productsInCart = cart;
  return next();
};

export default checkProductInStock;
