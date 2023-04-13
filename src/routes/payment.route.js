import { Router } from 'express';
import paymentController from '../controllers/payment.controller';

const router = Router();

router.post('/checkout', paymentController.makePayment);

export default router;
