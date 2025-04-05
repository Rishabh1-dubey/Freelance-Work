import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../Cart/CartContent";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform  duration-300 flex flex-col z-50 rounded-xl  ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      } `}
    >
      {/* close button */}

      <div className="flex justify-end p-4">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6" />
        </button>
      </div>
      {/* cart contect with scrollbar  */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h1 className="font-semibold mb-4  text-xl"> Your Cart</h1>
        {/* Component for cart content */}
        <CartContent/>
      </div>

      {/* Checkout button fixed at button */}

      <div>
        <button className="w-[85%] ml-6  bg-black  text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition ">
          Checkout
        </button>
        <p className="text-sm tracking-tighter text-gray-800 mt-2 text-center mb-4">
          Shipping, taxes, Discount codes calculated at Checkout
        </p>
      </div>
    </div>
  );
};

export default CartDrawer;
