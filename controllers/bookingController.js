const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const factory = require('./handlerFactory');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.tourID);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        // Use price data to define price, currency, and product details
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Your Product Name',
            description: 'Description of the product',
            images: ['https://example.com/product-image.jpg'],
          },
          unit_amount: 2000, // Amount in cents
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://yourdomain.com/success',
    cancel_url: 'https://yourdomain.com/cancel',
  });

  res.status(200).json({
    status: 'success',
    session,
  });
});
