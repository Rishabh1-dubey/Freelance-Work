import React from "react";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


const PaypalButton = ({amount,onError,onSuccess}) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AeYdCDegojwhocWLX4OknQKKgNK6GHUCq0nrmW2kZVelqY-W1FsNZzx6xZpe0lbUCPZiD5jxrOaRnmnN",
      currency:"USD",
      intent:"capture"
        }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: amount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      ></PayPalButtons>
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
