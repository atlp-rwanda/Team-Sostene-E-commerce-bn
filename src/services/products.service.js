import { Op } from 'sequelize';
import { extractPublicId } from 'cloudinary-build-url';
import Products from '../database/models/products.model';
import Images from '../database/models/images.model';
import Cloudinary from '../helpers/cloudinary';
// import Collection from '../database/models/collection.model';

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
async function deleteImage(id) {
  const image = await Images.findOne({ where: { id } });
  await Images.destroy({ where: { id } });
  const publice = extractPublicId(image.url);
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

async function findAllProducts({ offset, limit }) {
  const products = await Products.findAll({
    where: {
      expiredflag: false,
    },
    include: [{ model: Images, as: 'productImages', attributes: ['url'] }],
    offset,
    limit,
  });
  return products;
}

async function getTotalProductsCount() {
  const produc = await Products.findAll();
  return produc.length;
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

function removeUrlFromImages(pImages, idi) {
  return pImages.filter((image) => image !== idi);
}
async function expiredProductDate() {
  const foundProduct = Products.findAll({
    where: {
      expDate: {
        [Op.lt]: new Date(),
      },
    },
  });
  return foundProduct;
}
async function updateProductStatus(Product) {
  const status = await Promise.all(
    Product.map(async (product) => {
      product.expiredflag = true;
      await product.save();
    })
  );
  return status;
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
  findAllProducts,
  getTotalProductsCount,
  expiredProductDate,
  updateProductStatus,
  removeUrlFromImages,
};
