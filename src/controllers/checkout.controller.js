import { checkoutServices, cartServices } from '../services';

const checkout = async (req, res) => {
  const { shippingAddressId } = req.body;
  const { productsInCart } = req;
  const userId = req.user.id;

  const body = {
    userId,
    shippingaddressId: shippingAddressId,
    products: productsInCart.products,
    totalPrice: productsInCart.total,
    shippingId: shippingAddressId,
  };

  const order = await checkoutServices.createOrder(body);

  order.products.forEach((product) => {
    checkoutServices.updateProductQuantity(product.productId, product.quantity);
  });

  await cartServices.clearCart(userId);

  return res.status(201).json({
    code: 201,
    message: 'Order processed successfully',
    order,
  });
};

const getShippingAddress = async (req, res) => {
  const shippingAddress = await checkoutServices.getShippingAddress(
    req.user.id
  );
  return res
    .status(200)
    .json({ code: 200, message: "User's shipping address", shippingAddress });
};

const createShippingAddress = async (req, res) => {
  const userId = req.user.id;
  const {
    firstName,
    lastName,
    phoneNumber,
    streetAddress,
    country,
    city,
    postalCode,
  } = req.body;

  const shippingdetails = {
    userId,
    firstName,
    lastName,
    phoneNumber,
    streetAddress,
    country,
    city,
    postalCode,
  };
  const addressAdded = await checkoutServices.addShippingAddress(
    shippingdetails
  );
  return res.status(201).json({
    code: 201,
    message: 'Shipping address added',
    addressAdded,
  });
};

const updateShippingAddress = async (req, res) => {
  const updatedAdd = await checkoutServices.updateShippingAddress(
    req.user.id,
    req.body
  );
  return res.status(200).json({
    code: 200,
    message: 'Shipping address updated successfully',
    address: updatedAdd,
  });
};

export default {
  checkout,
  createShippingAddress,
  getShippingAddress,
  updateShippingAddress,
};
