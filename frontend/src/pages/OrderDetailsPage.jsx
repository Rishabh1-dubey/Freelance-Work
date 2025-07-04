import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetails } from "../redux/slice/orderSlice";
const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { orderDetails, loading, error } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading.............</p>;
  if (error) return <p>Error.{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Details</h2>
      {!orderDetails ? (
        <p>No order Found</p>
      ) : (
        <div className="p-4 sm:p-6 rounded-lg border">
          {/* Order Details */}

          <div className="flex flex-col sm:flex-row justify-between mb-8">
            <h3 className="text-lg md:text-xl font-semibold">
              {" "}
              Order Id : #{orderDetails._id}
            </h3>
            <p className="text-gray-600">
              {new Date(orderDetails.cratedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
            <span
              className={`${
                !orderDetails.isPaid
                  ? "text-green-600 bg-green-100"
                  : "bg-red-200 text-red-800"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {orderDetails.isPaid ? "Approved" : "Pending"}
            </span>
            <span
              className={`${
                orderDetails.isDelivered
                  ? "text-green-600 bg-green-100"
                  : "bg-yellow-200 text-yellow-800"
              } px-3 py-1 rounded-full text-sm font-medium mb-2`}
            >
              {orderDetails.isDelivered ? "Delivered" : "Pending Delivered"}
            </span>
          </div>
          <div>
            {/* Customer , paymet shiiping INnfo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold mb-2">Payment Info</h4>
                <p>Payment Method :{orderDetails.isDeliveredMethod}</p>
              </div>{" "}
              <div>
                <h4 className="text-lg font-semibold mb-2">Shipping Info</h4>
                <p>Shipping Method :{orderDetails.shippingMethod}</p>
                <p>
                  Address :{orderDetails.shippingAddress.city} ,
                  {orderDetails.shippingAddress.country}
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <table className="min-w-full text-gray-600">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Unit Price</th>
                    <th className="py-2 px-4">Qunatity</th>
                    <th className="py-2 px-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.orderItems.map((item) => (
                    <tr key={item.productId} className="border-b ">
                      <td className="py-2 px-4 flex items-center">
                        <img
                          className="w-12 h-12 object-cover mr-4 rounded"
                          src={item.image}
                        />
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-blue-500 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </td>
                      <td className="py-2 px-4">${item.price} </td>
                      <td className="py-2 px-4">{item.quantity} </td>
                      <td className="py-2 px-4">
                        ${item.price * item.quantity}{" "}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Back to my Orders */}
            <Link
              to={"/my-order"}
              className="text-blue-500 hover:underline  mt-6"
            >
              Back to My Orders-
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
