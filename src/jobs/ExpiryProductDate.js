import cron from 'node-cron';
import {
  productsServices,
  collectionServices,
  userServices,
} from '../services';
import { sendEmailReset, configEmail, notificationTemplates } from '../helpers';

var email = 'mirindisaidi19@gmail.com';
const ExpiredProduct = async () => {
  cron.schedule(`${process.env.CRON_SCHEDULE}`, async () => {
    try {
      console.log('cron job running every 5 seconds');
      const expiredProduct = await productsServices.expiredProductDate();
      if (expiredProduct.length) {
        await Promise.all([
          productsServices.updateProductStatus(expiredProduct),
        ]);
        const ExipedProductContent =
          notificationTemplates.ExipedProductTemplate();
        const users = expiredProduct.map(async (product) => {
          const coll = await collectionServices.getCollectionById(
            product.collectionId
          );
          return coll.userId;
        });
        const data = await Promise.all(users);
        const emails = data.map(async (user) => {
          const result = await userServices.getUserById(user);
          return result.email;
        });
        const useremails = await Promise.all(emails);

        // sendEmailReset(
        //   configEmail({
        //     email,
        //     subject: 'E-commerce notification expired product',
        //     content: ExipedProductContent,
        //   })
        // );
        console.log('emails sent');
      }
    } catch (error) {
      console.log(error);
    }
  });
};

export default ExpiredProduct;
