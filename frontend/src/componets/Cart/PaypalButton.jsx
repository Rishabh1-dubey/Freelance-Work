import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


//sb-0gj7241071477@personal.example.com
//password: NfbFN^e0
const PaypalButton = ({ amount, onError, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "ASGgshryZEK_UESSXpyophqkagsPhWv0gGQk1_8RtE6wZrq0b8YTEWV0KHDkEpTW-HDHJutTKLE8OPPj",
        currency:"USD"
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                  currency_code: "USD"
                }
              }
            ]
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PaypalButton;
