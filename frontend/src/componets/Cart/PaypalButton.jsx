import React from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

const PaypalButton = ({ amount, onError, onSuccess }) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "AZ96mtScgl75rdljIbp7kHHh_O-we8_6TyS_Uej9oIRiKf9lOSwXePJwItPyZ5-aASaq_cQv0rVdEb7Y",
        currency: "USD",
        intent: "capture"
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
