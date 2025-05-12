import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import axios from "axios";

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before procedding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); //Set checkout id if checkout was successful
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeCheckout(checkoutId); // finalize chekcout if payment is successful
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <p>loading.......</p>;
  }
  if (error) {
    return <p>Error :{error}</p>;
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty</p>;
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
              value={user ? user.email : " "}
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
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
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
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
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
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
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
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
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
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
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
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone NO:</label>
            <input
              className="w-full p-2 border rounded"
              type="tel"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
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
                <PaypalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment Failed, Try again later")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right section Order summary */}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4 "> Order Summary</h3>
        <div className="border-t py-4 mb-4 ">
          {cart.products.map((product, index) => {
            return (
              <div
                key={index}
                className="flex items-start justify-between py-2 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-24 object-cover mr-4"
                  />
                  <div>
                    <h3 className="text-md">{product.name}</h3>
                    <p className="text-gray-500"> Size: {product.size}</p>
                    <h3 className="text-gray-500"> Color:{product.color}</h3>
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">${product.price}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* total Price */}

        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice.toLocaleString()} </p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()} </p>
        </div>
      </div>
    </div>
  );
};
