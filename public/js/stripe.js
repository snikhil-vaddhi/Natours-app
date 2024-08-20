/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripePublicKey =
  'pk_test_51Ppdb1GoORHb9TiWy1pxEtpkAH0bZVmkQs0YJpB5WCjxLgHrtY53VlpFiK4COED8vv6UKaMsEjO8fk5Sj4hTWl1v00O1Z8PuKz';
const stripe = typeof Stripe !== 'undefined' ? Stripe(stripePublicKey) : null;

export const bookTour = async (tourId) => {
  try {
    const session = await axios(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`,
    );

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
