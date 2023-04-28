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

export default { addToCart };
