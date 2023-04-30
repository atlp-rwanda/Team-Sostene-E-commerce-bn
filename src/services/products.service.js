import { Op } from 'sequelize';
import { extractPublicId } from 'cloudinary-build-url';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';
import Cloudinary from '../helpers/cloudinary';

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

async function getProductById(id) {
  const product = await Products.findOne({ where: { id } });
  return product;
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

async function imagesExists(newImages, productImages) {
  const images = [];
  productImages.forEach((image) => {
    images.push(image.dataValues.url);
  });
  const hasNewImageUrl = newImages.some((url) => !images.includes(url));
  return hasNewImageUrl;
}
async function imageExist(newImage, productImage) {
  const images = [];
  productImage.forEach((image) => {
    images.push(image.dataValues.url);
  });
  const hasNewImageUrl = !images.includes(newImage);
  return hasNewImageUrl;
}

export default {
  createProduct,
  addUpdate,
  uploadImage,
  getProductByNameAndCollectionId,
  getProductById,
  deleteImage,
  AddImage,
  searchproduct,
  imageExist,
  imagesExists,
};
