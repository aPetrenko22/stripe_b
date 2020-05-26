const responseGenerator = require('../../utils/responeGenerator');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const stripe = require('stripe')(stripeSecretKey);

module.exports = {
  async pay(req, res) {
    const { token, product } = req.body;
    stripe.customers.create({
      email: token.email,
      source: token.id,
      description: 'customer',
    }).then((customer)=>{
      stripe.charges.create({
        amount: product.price,
        customer: customer.id,
        currency: 'usd',
        receipt_email: customer.email,
        description: 'some info',
      }).then((response)=>{
        responseGenerator(res, 200, response)
      })
    }).catch((err)=>responseGenerator(res, 500, err));
  },
  async refund(req, res) {
    const { amount, id } = req.body;

    stripe.refunds.create({
      amount: amount,
      charge: id,
    }).then((response) => {
      responseGenerator(res, 200, response)
    }).catch((err) => responseGenerator(res, 500, err));
  },
  async createSubscription(req, res) {
    const { id } = req.params;
    stripe.subscriptions.create(
      {
        customer: id,
        items: [
          {
            plan: 'price_HLNVPX68MGnQEK', // need to create plan in stripe admin panel
          }
        ],
      }).then((response) => {
      responseGenerator(res, 200, response)
    }).catch((err) => responseGenerator(res, 500, err));
  },
  async getCustomer(req, res) {
    // const { id } = req.body;
    await stripe.customers.retrieve(
      'id',
      (err, customer) => {
        console.log(err);
        console.log(customer);
      }
    );
  },
};
