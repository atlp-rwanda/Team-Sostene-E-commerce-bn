import Joi from 'joi';
import errorMessage from '../errormessage';

const addproductSchema = Joi.object().keys({
  productName: Joi.string()
    .min(3)
    .max(80)
    .required()
    .messages(errorMessage('productname')),
  productPrice: Joi.number().required().messages(errorMessage('price')),
  category: Joi.string().required().messages(errorMessage('productCategory')),
  description: Joi.string()
    .min(50)
    .required()
    .messages(errorMessage('description')),
  expDate: Joi.date().required().messages(errorMessage('expDate')),
  bonus: Joi.number().required().messages(errorMessage('bonus')),
  image: Joi.binary().min(1).messages(errorMessage('image')),
  quantity: Joi.number().messages(errorMessage('quantity')),
  link: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
});

const updateproductSchema = Joi.object().keys({
  productName: Joi.string()
    .min(3)
    .max(80)
    .messages(errorMessage('productname')),
  productPrice: Joi.number().messages(errorMessage('price')),
  category: Joi.string().messages(errorMessage('productCategory')),
  description: Joi.string()
    .min(50)
    .required()
    .messages(errorMessage('description')),
  expDate: Joi.date().messages(errorMessage('expDate')),
  bonus: Joi.number().messages(errorMessage('bonus')),
  quantity: Joi.number().messages(errorMessage('quantity')),
});

const addImage = Joi.object().keys({
  image: Joi.binary().min(1).messages(errorMessage('images')),
  imageId: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
});
export default { addproductSchema, updateproductSchema, addImage };
