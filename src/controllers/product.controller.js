import { collectionServices, productsServices } from '../services';

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

const addproduct = async (req, res) => {
  const { cid } = req.params;
  const { productName, productPrice, category, expDate, bonus, quantity } =
    req.body;
  const img = req.files;
  let url = [];

  try {
    if (img.length < 4 || img.length > 8) {
      res.status(400).json({
        code: '400',
        message: 'Failed',
        error: 'selected images must be in Range of 4 to 8',
      });
    } else {
      const { product } =
        await productsServices.getProductByNameAndCollectionId(
          productName,
          cid
        );
      if (product === null) {
        const promises = img.map(async (item) => {
          const { image } = await productsServices.uploadImage(item.path);
          if (image) {
            return image.url;
          }
        });
        url = await Promise.all(promises);
        const body = {
          name: productName,
          price: productPrice,
          category,
          expDate,
          bonus,
          quantity,
          collectionId: cid,
        };
        const { data } = await productsServices.createProduct(body);
        if (data != null) {
          const sendImage = url.map(async (item) => {
            const imageBody = { url: item, productId: data.id };
            const { images } = await productsServices.AddImage(imageBody);
            return images;
          });
          await Promise.all(sendImage);
          res.status(200).json({
            code: '200',
            message: 'Successful',
            product: data,
          });
        }
      }
      if (product) {
        res
          .status(409)
          .json({ code: '409', message: 'Existing products', product });
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ code: '400', message: 'Failed', error: error.message });
  }
};

const updateOnadd = async (req, res) => {
  const productId = req.params.id;
  const {
    productName,
    productPrice,
    category,
    expDate,
    bonus,
    quantity,
    imageIndex,
  } = req.body;
  const img = req.files;
  let url = [];
  let newImages;

  try {
    const { product } = await productsServices.getProductByIdAndUser(
      productId,
      req.user
    );
    if (product === null) {
      return res.status(404).json({
        code: '404',
        message: 'Failed',
        error: 'Product not found !!!',
      });
    }

    if (product) {
      const images = await product.getProductImages();
      if (imageIndex) {
        const size = img.length + images.length - imageIndex.length;
        if (size < 4 || size > 8) {
          return res.status(401).json({
            code: '401',
            message: 'failed',
            error: 'product images must be in Range of 4 to 8',
          });
        }
        if (imageIndex.length > 1) {
          const deleteImages = imageIndex.map(async (index) => {
            const { data } = await productsServices.deleteImage(
              images[index].url
            );
            return data;
          });

          await Promise.all(deleteImages);
          imageIndex.forEach(async (index) => {
            product.images.splice(index, 1);
          });
        } else {
          await productsServices.deleteImage(images[imageIndex].url);
        }
      }
      if (img.length >= 1) {
        const size = img.length + images.length - (imageIndex || []).length;
        if (size < 4 || size > 8) {
          return res.status(401).json({
            code: '401',
            message: 'failed',
            error: 'product images must be in Range of 4 to 8',
          });
        }
        const promises = img.map(async (item) => {
          const { image } = await productsServices.uploadImage(item.path);
          if (image) {
            return image.url;
          }
        });
        url = await Promise.all(promises);
      }

      if (img.length >= 1 || imageIndex) {
        const body = {
          name: productName,
          price: productPrice,
          category,
          expDate,
          bonus,
          quantity,
        };
        const { updated } = await productsServices.addUpdate(body, productId);
        if (updated != null) {
          if (img.length >= 1) {
            const imageAdd = url.map(async (item) => {
              const imageBody = { url: item, productId };
              const { data } = await productsServices.AddImage(imageBody);
              if (data) {
                return data;
              }
            });
            newImages = await Promise.all(imageAdd);
          }
          return res.status(200).json({
            code: '200',
            message: 'Successful Updated The Product with images',
            product: updated,
            updatedImages: newImages,
          });
        }
      } else {
        const body = {
          name: productName,
          price: productPrice,
          category,
          expDate,
          bonus,
          quantity,
        };
        const { updated } = await productsServices.addUpdate(body, productId);
        if (updated != null) {
          res.status(200).json({
            code: '200',
            message: 'Successful Updated The Product with no images',
            product: updated,
          });
        }
      }
    }
  } catch (error) {
    res
      .status(400)
      .json({ code: '400', message: 'Failed', error: error.message });
  }
};

export default { CreateCollection, DeleteCollection, addproduct, updateOnadd };
