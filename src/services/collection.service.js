import Collection from '../database/models/collection.model';
import Images from '../database/models/images.model';
import Products from '../database/models/products.model';

async function getCollectionByName(name) {
  const user = await Collection.findOne({ where: { name } });
  return user;
}

async function getCollectionById(id) {
  const collection = await Collection.findOne({ where: { id } });
  return collection;
}

async function getCollectionByIdAndUserId(id, userId) {
  const user = await Collection.findOne({ where: { id, userId } });
  return user;
}

async function getProduct(pid) {
  const products = await Products.findOne({
    where: { id: pid },
    include: {
      model: Images,
      as: 'productImages',
    },
  });
  if (!products) {
    return [];
  }
  return products;
}

async function createCollection(collectionObj) {
  const collection = Collection.create(collectionObj);
  return collection;
}

async function deleteCollection(collectionId) {
  await Products.destroy({ where: { collectionId } });
  const deletedCollection = await getCollectionById(collectionId);
  await Collection.destroy({ where: { id: collectionId } });
  return deletedCollection;
}

async function deleteFromCollection(collectionId, productId) {
  const deletedProduct = await Products.destroy({
    where: { id: productId, collectionId },
  });
  return deletedProduct;
}

async function findCollection(userId, collectionId, { offset, limit }) {
  const collection = await Collection.findOne({
    where: { userId, id: collectionId },
  }).then(async (data) => {
    const products = await Products.findAll({
      include: [{ model: Images, as: 'productImages', attributes: ['url'] }],
      where: { collectionId: data.id },
      offset,
      limit,
    });
    return products;
  });
  return collection;
}

async function getTotalCollectionCount(uId, collectionId) {
  const collection = await Collection.findOne({
    where: { userId: uId, id: collectionId },
  }).then(async (result) => {
    const products = await Products.findAll({
      where: { collectionId: result.id },
    });
    return products;
  });
  return collection.length;
}

async function getSellerCollectionsBySellerId(userId) {
  const collections = await Collection.findAll({ where: { userId } });
  return collections;
}

export default {
  createCollection,
  getCollectionByName,
  getProduct,
  getCollectionByIdAndUserId,
  deleteCollection,
  deleteFromCollection,
  getCollectionById,
  findCollection,
  getTotalCollectionCount,
  getSellerCollectionsBySellerId,
};
