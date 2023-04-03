import { extractPublicId } from 'cloudinary-build-url';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';
import Cloudinary from '../helpers/cloudinary';
import Collection from '../database/models/collection.model';
import { Op } from 'sequelize';

async function createProduct(body) {
  const data = await Products.create(body);
  return { data, err: null };
}

async function addUpdate(body, productId) {
  const find = await Products.findOne({ where: { id: productId } });
  if (find) {
    const updated = await find.update(body);
    return { updated, err: null };
  }
}

async function uploadImage(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}
async function deleteImage(url) {
  await Images.destroy({ where: { url } });
  const publice = extractPublicId(url);
  const data = await Cloudinary.uploader.destroy(publice);
  return { data };
}
async function AddImage(body) {
  const data = await Images.create(body);
  return { data };
}
async function getProductByNameAndCollectionId(name, cid) {
  const product = await Products.findOne({
    where: { name, collectionId: cid },
  });
  return { product };
}

async function getProductByIdAndUser(id, user) {
  const product = await Products.findOne({ where: { id } });
  if (!product) {
    return { product };
  }
  const collection = await Collection.findOne({
    where: { id: product.collectionId },
  });
  if (user.id !== collection.userId) {
    throw new Error('Unauthorized Seller');
  }
  return { product };
}

async function searchproduct(query) {
  if (!query.minPrice) {
    query.minPrice = 0;
  }
  if (!query.maxPrice) {
    query.maxPrice = Infinity;
  }
  if (query.minPrice > query.maxPrice) {
    query.minPrice = null;
  }
  if (!query.key) {
    query.key = '';
  }
  const product = await Products.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${query.key}%` } },
        { category: { [Op.iLike]: `%${query.key}%` } },
      ],
      price: { [Op.between]: [query.minPrice, query.maxPrice] },
    },
  });
  return product;
}

export default {
  createProduct,
  addUpdate,
  uploadImage,
  getProductByNameAndCollectionId,
  getProductByIdAndUser,
  deleteImage,
  AddImage,
  searchproduct,
};
