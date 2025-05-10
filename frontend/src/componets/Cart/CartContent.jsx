import React from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slice/cartSlice";

const CartContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // handle adding or substracting to cart
  const handleAddtoCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };

  // handle remove form the cart
  const handleRemovetoCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  return (
    <div>
      {cart?.products?.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start ">
            <img
              className="h-24 w-20 object-cover mr-4 rounded "
              src={product.image}
              alt="image"
            />

            <div>
              <h3>{product.name}</h3>

              <p className="text-sm text-gray-700">
                size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddtoCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounde px-2  text-xl font-medium"
                >
                  -
                </button>
                <span className="pl-2 pr-2 font-bold">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddtoCart(
                      product.productId,
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounde px-2  text-xl font-medium"
                >
                  {" "}
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <p className="flex">
              {" "}
              $ {product.price} |{" "}
              <button
                onClick={() =>
                  handleRemovetoCart(
                    product.productId,
                    product.size,
                    product.color
                  )
                }
              >
                <MdDelete className="w-6 h-6 text-red-400 hover:text-red-700 cursor-pointer" />{" "}
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
