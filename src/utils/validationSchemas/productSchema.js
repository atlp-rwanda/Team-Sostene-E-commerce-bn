import Joi from 'joi';
import errorMessage from '../errormessage';

const addproductSchema = Joi.object().keys({
  productName: Joi.string()
    .min(3)
    .max(15)
    .required()
    .messages(errorMessage('productname')),
  productPrice: Joi.number().required().messages(errorMessage('price')),
  category: Joi.string().required().messages(errorMessage('productCategory')),
  expDate: Joi.date().required().messages(errorMessage('expDate')),
  bonus: Joi.number().required().messages(errorMessage('bonus')),
  image: Joi.binary().min(1).messages(errorMessage('image')),
  quantity: Joi.number().messages(errorMessage('quantity')),
  imageIndex: Joi.array()
    .items(Joi.number().integer().min(0).max(8))
    .single()
    .min(1),
});

export default addproductSchema;
