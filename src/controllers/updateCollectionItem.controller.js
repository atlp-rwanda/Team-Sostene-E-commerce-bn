/* eslint-disable no-shadow */
/* eslint-disable no-inner-declarations */
import { productsServices } from '../services';

const updateItem = async (req, res) => {
  const pId = req.params.id;
  const {
    productName,
    productPrice,
    expDate,
    category,
    bonus,
    quantity,
    link, // imageUrl
  } = req.body;

  const img = req.files;
  let imageUrls = [];
  let url = [];
  let newImages;

  const product = await productsServices.getProductById(pId);
  if (link) {
    if (Array.isArray(link)) {
      imageUrls = link;
    } else {
      imageUrls.push(link);
    }
  }
  const body = {
    name: productName,
    price: productPrice,
    category,
    bonus,
    expDate,
    quantity,
  };

  if (product) {
    let images = await product.getProductImages();
    if (imageUrls.length > 0) {
      const sizes = img.length + images.length - imageUrls.length; // imageUrls
      if (sizes < 4 || sizes > 8) {
        return res.status(401).json({
          code: '401',
          message: 'failed',
          error: 'product images must be in Range of 4 to 8',
        });
      }
      if (imageUrls.length > 1) {
        // imageUrls
        const none = await productsServices.imagesExists(imageUrls, images);
        if (none) {
          return res.status(400).json({
            code: '400',
            message: 'Failed',
            error: 'check your image urls !!!',
          });
        }
        const deleteImages = imageUrls.map(async (url) => {
          // imageUrls
          const { data } = await productsServices.deleteImage(url);
          return data;
        });
        await Promise.all(deleteImages);
        function removeUrlFromImages(images, url) {
          return images.filter((image) => image !== url);
        }

        imageUrls.forEach(async (url) => {
          images = removeUrlFromImages(images, url);
        });
      } else {
        const wrongUrl = await productsServices.imageExist(
          imageUrls[0],
          images
        );
        if (wrongUrl) {
          return res.status(400).json({
            code: '400',
            message: 'Failed',
            error: 'check your image urls !!!',
          });
        }
        await productsServices.deleteImage(imageUrls[0]); // imageUrls
      }
    }
    if (img.length >= 1) {
      const sizes = img.length + images.length - (imageUrls || []).length; // imageUrls
      if (sizes < 4 || sizes > 8) {
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

    if (img.length >= 1 || imageUrls.length > 0) {
      // imageUrls
      const { updated } = await productsServices.addUpdate(body, pId);
      if (updated != null) {
        if (img.length >= 1) {
          const imageAdd = url.map(async (item) => {
            const imageBody = { url: item, productId: pId };
            const { data } = await productsServices.AddImage(imageBody);
            return data;
          });
          newImages = await Promise.all(imageAdd);
        }
        res.status(200).json({
          code: '200',
          message: 'updated the product with images',
          product: updated,
          updatedImages: newImages,
        });
      }
    } else {
      const { updated } = await productsServices.addUpdate(body, pId);
      if (updated != null) {
        res.status(200).json({
          code: '200',
          message: 'updated the product with no images',
          product: updated,
        });
      }
    }
  }
};

export default updateItem;
