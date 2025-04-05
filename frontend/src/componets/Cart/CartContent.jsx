import React from "react";
import { MdDelete } from "react-icons/md";



const CartContent = () => {
  const cartProduct = [
    {
      productId: 1,
      name: "T-Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 15,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "Shirt",
      size: "Xl",
      color: "Green",
      quantity: 1,
      price: 20,
      image: "https://picsum.photos/200?random=1",
    },
  ];

  return (
    <div>
      {cartProduct.map((product, index) => (
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
                <button className="border rounde px-2  text-xl font-medium">
                  {" "}
                  +
                </button>
                <span className="pl-2 pr-2 font-bold">1</span>
                <button className="border rounde px-2  text-xl font-medium">
                  -
                </button>
              </div>
            </div>
            
          </div>
          <div className="">
                <p className="flex"> $ {product.price} | <MdDelete className="w-6 h-6 text-red-400 hover:text-red-700 cursor-pointer" /> </p>
            </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
