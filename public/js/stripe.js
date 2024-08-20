/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51Ppdb1GoORHb9TiWy1pxEtpkAH0bZVmkQs0YJpB5WCjxLgHrtY53VlpFiK4COED8vv6UKaMsEjO8fk5Sj4hTWl1v00O1Z8PuKz',
);

export const bookTour = async (tourId) => {
  try {
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);

    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
