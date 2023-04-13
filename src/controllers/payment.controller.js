import Stripe from 'stripe';

const { STRIPE_SECRET_KEY } = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY);

const makePayment = (req, res) => {
  stripe.paymentIntents();
};

export default { makePayment };
