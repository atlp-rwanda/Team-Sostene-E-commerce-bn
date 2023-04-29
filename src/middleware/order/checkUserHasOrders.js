// import { orderServices } from '../../services';

// const checkUserHasOrders = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const orders = await orderServices.getOrdersByUser(userId);
//     if (orders.length < 1) {
//       return res
//         .status(404)
//         .json({ code: '404', message: 'You do not have any orders' });
//     }
//     next();
//   } catch (error) {
//     return res.status(500).json({
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// };

// export default checkUserHasOrders;
