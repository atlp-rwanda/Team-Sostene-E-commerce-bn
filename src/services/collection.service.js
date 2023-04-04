import Collection from '../database/models/collection.model';

async function getCollectionByName(name) {
  const user = await Collection.findOne({ where: { name } });
  return user;
}

async function getCollectionByIdAndUserId(id, userId) {
  const user = await Collection.findOne({ where: { id, userId } });
  return user;
}

async function createCollection(collectionObj) {
  const collection = Collection.create(collectionObj);
  return collection;
}

async function deleteCollection(collectionId) {
  const collection = Collection.destroy({ where: { id: collectionId } });
  return collection;
}

export default {
  createCollection,
  getCollectionByName,
  getCollectionByIdAndUserId,
  deleteCollection,
};
