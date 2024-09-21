import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { pay } from '../../services/orderService';
import { useCart } from '../../hooks/useCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function StripeButtons({ order }) {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.error(error);
      toast.error('Payment Failed', 'Error');
      return;
    }

    try {
      const payment = await pay(paymentMethod.id); // You need to implement this function in your orderService to process the payment
      const orderId = payment.orderId; // Assuming pay() returns an object with orderId
      clearCart();
      toast.success('Payment Saved Successfully', 'Success');
      navigate('/track/' + orderId);
    } catch (error) {
      console.error(error);
      toast.error('Payment Save Failed', 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}
