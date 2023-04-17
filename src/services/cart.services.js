// eslint-disable-next-line import/no-cycle
import { redisClient } from '../helpers';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';

async function createCart(userId) {
  const products = await redisClient.set(`cart_${userId}`, JSON.stringify([]));
  return products;
}

async function getProductsInCart(userId) {
  const redisProducts = await redisClient.get(`cart_${userId}`);
  if (!redisProducts) {
    await createCart(userId);
  }
  const products = await redisClient.get(`cart_${userId}`);
  const result = JSON.parse(products);
  return result;
}

async function getProductPrice(productId) {
  const product = await Products.findOne({ where: { id: productId } });
  return product.price;
}

async function getProductDetails(productId) {
  const product = await Products.findOne({
    where: { id: productId },
    include: {
      model: Images,
      as: 'productImages',
    },
  });
  const details = {
    id: product.id,
    image: product.productImages[0] ? product.productImages[0].url : '',
    name: product.name,
    price: product.price,
  };
  return details;
}

async function displayCart(cart) {
  let sum = 0;
  const productDetails = [];
  async function actualCart(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      const prod = getProductDetails(arr[i].productId);
      productDetails.push({ product: prod, quantity: arr[i].quantity });
      sum += arr[i].quantity * prod.price;
    }
    return productDetails;
  }
  await actualCart(cart);
  const cartObj = {
    products: productDetails,
    total: sum,
  };
  return cartObj;
}

async function getCart(userId) {
  const newCart = await getProductsInCart(userId).then((data) => data);
  async function totalPrice(arr) {
    const promises = [];
    for (let i = 0; i < arr.length; i += 1) {
      const promise = getProductPrice(arr[i].productId).then(
        (price) => price * arr[i].quantity
      );
      promises.push(promise);
    }
    return Promise.all(promises).then((prices) =>
      prices.reduce((sum, price) => sum + price, 0)
    );
  }
  const priceTotal = await totalPrice(newCart);
  const cartObj = {
    products: newCart,
    total: priceTotal,
  };
  return cartObj;
}

function updateProductsInCart(userId, products) {
  const newProducts = redisClient
    .set(`cart_${userId}`, JSON.stringify(products))
    .then(() => true);
  return newProducts;
}

async function addToCart(userId, pid) {
  const newCart = await getProductsInCart(userId);
  let isInCart = false;
  for (let i = 0; i < newCart.length; i += 1) {
    if (newCart[i].productId === pid.productId) {
      newCart[i].quantity += 1;
      isInCart = true;
      break;
    }
  }
  if (isInCart === false) {
    newCart.push(pid);
  }
  const isUpdated = updateProductsInCart(userId, newCart).then(async () => {
    const result = await getProductsInCart(userId);
    return result;
  });
  return isUpdated;
}

async function clearCart(userId) {
  await redisClient.set(`cart_${userId}`, JSON.stringify([]));
  const products = await redisClient.get(`cart_${userId}`);
  const cleanedCart = {
    products,
    total: 0,
  };
  return cleanedCart;
}

export default {
  addToCart,
  createCart,
  displayCart,
  clearCart,
  getCart,
};
