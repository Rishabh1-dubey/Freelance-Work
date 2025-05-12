import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";


//sb-0gj7241071477@personal.example.com
//email:rishbahraghvedradubey
//pass:Risab%^%^@06
//password: NfbFN^e0
const PaypalButton = ({ amount, onError, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
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
                  value: parseFloat(amount).toFixed(2),
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
