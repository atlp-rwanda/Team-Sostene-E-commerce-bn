import { cartServices } from '../services';

const addToCart = (req, res) => {
  const { pid } = req.params;
  const cartDetails = {
    productId: pid,
    quantity: 1,
  };
  cartServices.addToCart(req.user.id, cartDetails).then((data) => {
    cartServices.displayCart(data).then((result) => {
      res.status(201).json({ code: 201, message: 'Added To Cart.', result });
    });
  });
};

const viewCartItems = async (req, res) => {
  const userId = req.user.id;
  const data = await cartServices.getCart(userId);
  return res.status(200).json({ code: 200, message: 'Cart Fetched', data });
};

const clearCartItems = async (req, res) => {
  const userId = req.user.id;
  const data = await cartServices.clearCart(userId);
  return res.status(200).json({ code: 200, message: 'Cart cleared', data });
};

export default { viewCartItems, addToCart, clearCartItems };
