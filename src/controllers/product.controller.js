import { collectionServices } from '../services';

const CreateCollection = async (req, res) => {
  try {
    const collectionName = req.body.name;
    const userId = req.user.id;
    const collectionObj = {
      userId,
      name: collectionName,
    };
    const collection = await collectionServices.createCollection(collectionObj);
    return res.status(201).json({
      code: 201,
      message: 'Collection Created.',
      collection,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: 'Internal Error.',
      error,
    });
  }
};

const DeleteCollection = async (req, res) => {
  try {
    const deletedCollection = await collectionServices.deleteCollection(
      req.params.cid
    );
    if (deletedCollection) {
      return res.status(200).json({ code: 200, message: 'Collection Deleted' });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 'Collection Not Deleted', error });
  }
};

export default { CreateCollection, DeleteCollection };
