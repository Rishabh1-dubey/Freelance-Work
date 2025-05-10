import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./Search";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setnavDrawerOpen] = useState(false);

  const { cart } = useSelector((state) => state.cart);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const togglenavDrawer = () => {
    setnavDrawerOpen(!navDrawerOpen);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* left side for displaying the title of our app */}
        <div>
          <Link to="/" className="text-2xl font-medium">
            ShopEasy
          </Link>
        </div>

        {/* middle section for all category */}
        <div className=" hidden md:flex space-x-6">
          <Link
            to="/collection/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>{" "}
          <Link
            to="/collection/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            WoMen
          </Link>{" "}
          <Link
            to="/collection/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            topwear
          </Link>{" "}
          <Link
            to="/collection/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            bottom wear
          </Link>{" "}
          <Link
            to="/collection/all?category=Kids Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            kids
          </Link>{" "}
        </div>

        {/* right side for displaaying the icon */}
        <div className="flex justify-between space-x-4 ">
          <Link
            to="/admin"
            className="  bg-black text-white rounded-md px-2 cursor-pointer"
          >
            Admin
          </Link>{" "}
          <Link to="/profile" className="hover:text-gray-600">
            <FaRegUser className="h-6 w-6 " />
          </Link>
          <button onClick={toggleCartDrawer} className="relative">
            <RiShoppingBagLine className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute  bg-[#ea2e0e] rounded-full px-2 py-0.5 -top-1 text-white text-xs">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* search functionalituy */}
          <div className="overflow-hidden">
            <Search />
          </div>
          <button onClick={togglenavDrawer} className="md:hidden">
            <RxHamburgerMenu size={25} />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Naviagation */}

      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white transition-transform duration-300 z-50 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={togglenavDrawer}>
            <IoMdClose className="h-6 w-6" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            <nav className="space-y-2">
              <Link
                to={"/collection/all?gender=Men"}
                onClick={togglenavDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Men
              </Link>{" "}
              <Link
                to={"/collection/all?gender=Women"}
                onClick={togglenavDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Women
              </Link>{" "}
              <Link
                to={"/collection/all?category=Kids"}
                onClick={togglenavDrawer}
                className="block text-gray-500 hover:text-black"
              >
                Kids
              </Link>
              <Link
                to={"/collection/all?category=Bottom Wear"}
                onClick={togglenavDrawer}
                className="block text-gray-500 hover:text-black"
              >
                BottomWear
              </Link>
              <Link
                to={"/collection/all?category=Top Wear"}
                onClick={togglenavDrawer}
                className="block text-gray-500 hover:text-black"
              >
                TopWear
              </Link>
            </nav>
          </h2>
        </div>
      </div>
    </>
  );
};

export default Navbar;
