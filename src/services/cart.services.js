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
      sum = sum + arr[i].quantity * prod.price;
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

export default {
  addToCart,
  createCart,
  displayCart,
};
