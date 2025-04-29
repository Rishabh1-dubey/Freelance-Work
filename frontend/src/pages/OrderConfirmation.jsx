import React from "react";

const checkout = {
  _id: "1234",
  createdAt: new Date(),
  checkoutItems: [
    {
      productId: "1",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 124,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "2",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 124,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "3",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 124,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
    {
      productId: "4",
      name: "Jacket",
      color: "Red",
      size: "M",
      price: 124,
      quantity: 1,
      image: "https://picsum.photos/150?random=1",
    },
  ],
  shippingAddress: {
    address: "503 Narayan complex thane",
    city: "Thane",
  },
};

const OrderConfirmation = () => {
  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    return orderDate.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-10">
        Thank You for Your Order! 🙏
      </h1>

      {checkout && (
        <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
          {/* Order Info */}
          <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500 text-sm">
                Order Date: {new Date(checkout.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right md:text-left">
              <p className="text-sm text-gray-700">
                Estimated Delivery:{" "}
                <span className="text-emerald-700 font-medium">
                  {calculateEstimatedDelivery(checkout.createdAt)}
                </span>
              </p>
            </div>
          </div>

          {/* Order Items */}
          <div className="space-y-6">
            {checkout.checkoutItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="text-md font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      {item.size} | {item.color}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <h4 className="text-md font-medium">₹{item.price}</h4>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6">
            {/* Payment and Delivey Info */}
            <div className="">
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-500">PayPal</p>
            </div>

            {/* Delivery Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">{checkout.shippingAddress.city}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
