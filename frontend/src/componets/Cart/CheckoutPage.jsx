import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";

const cart = {
  products: [
    {
      name: "T-Shirt",
      size: "M",
      color: "Red",
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Shirt",
      size: "Xl",
      color: "Green",
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
  ],
  totalPrice: 195,
};
export const CheckoutPage = () => {
  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();
  const [shippingAdderss, setShippinAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    coutry: "",
    phone: "",
  });

  const handleCreateCheckout = (e) => {
    e.preventDefault();
    setCheckoutId(123);
  };





  const handlePaymentSuccess=(details)=>{
    console.log("Payment successful")
    navigate("/order-confirmation")

  }


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* left Section */}

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg font-medium mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              value="user@example.com"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4"> Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={shippingAdderss.firstName}
                onChange={(e) =>
                  setShippinAddress({
                    ...shippingAdderss,
                    firstName: e.target.value,
                  })
                }
              />
            </div>{" "}
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={shippingAdderss.lastName}
                onChange={(e) =>
                  setShippinAddress({
                    ...shippingAdderss,
                    lastName: e.target.value,
                  })
                }
              />
            </div>{" "}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ">Address</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={shippingAdderss.address}
              onChange={(e) =>
                setShippinAddress({
                  ...shippingAdderss,
                  address: e.target.value,
                })
              }
            />
          </div>{" "}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={shippingAdderss.city}
                onChange={(e) =>
                  setShippinAddress({
                    ...shippingAdderss,
                    city: e.target.value,
                  })
                }
              />
            </div>{" "}
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                className="w-full p-2 border rounded"
                type="text"
                value={shippingAdderss.postalCode}
                onChange={(e) =>
                  setShippinAddress({
                    ...shippingAdderss,
                    postalCode: e.target.value,
                  })
                }
              />
            </div>{" "}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              className="w-full p-2 border rounded"
              type="text"
              value={shippingAdderss.coutry}
              onChange={(e) =>
                setShippinAddress({
                  ...shippingAdderss,
                  coutry: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone NO:</label>
            <input
              className="w-full p-2 border rounded"
              type="tel"
              value={shippingAdderss.phone}
              onChange={(e) =>
                setShippinAddress({
                  ...shippingAdderss,
                  phone: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue To Payment
              </button>
            ) : (
              <div className="text-lg mb-4">
                Pay with Paypal
                {/* pypal buttn component */}
                <PaypalButton amount={10.00}
              
                onSuccess={handlePaymentSuccess}
                onError={(err)=>alert("Payment Failed, Try again later")}
                
                
                />
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
