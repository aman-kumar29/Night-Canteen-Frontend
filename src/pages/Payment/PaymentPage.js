import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { getNewOrderForCurrentUser } from '../../services/orderService.js'
import Title from '../../components/Title/Title.js';
import OrderItemsList from '../../components/OrderItemsList/OrderItemsList.js';
import PaypalButtons from '../../components/PaypalButtons/PaypalButtons.js';


export default function PaymentPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then(data => setOrder(data));
  }, []);
  if (!order) return;


  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{order.address}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>
        {/* <div className={classes.map}>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map readonly={true} location={order.addressLatLng} />
        </div> */}
        <center>
          For Testing
          <p><strong>sandbox-paypal-email</strong> : sb-lpjbf30870484@personal.example.com</p>
          <p><strong>sandbox-paypal-password</strong> : paypalmoney</p>
          <p>Credit Card : 4032031608484704</p>
          <p>EXP date : 07/29</p>
          <p>CVC Code : 779</p>
          <p>City - Moody, Alabama, 35004, US</p>
        </center>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <PaypalButtons order={order} />
          </div>
        </div>
      </div>
    </>
  )
}
