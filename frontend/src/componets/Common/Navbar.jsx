import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingBagLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "./Search";
import CartDrawer from "../Layout/CartDrawer";
const Navbar = () => {

const [drawerOpen , setDrawerOpen] =useState(false)


const toggleCartDrawer=()=>{
  setDrawerOpen(!drawerOpen)
}


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
      <div className="flex space-x-6">
        <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Men
        </Link>{" "}
        <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          WoMen
        </Link>{" "}
        <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
          topwear
        </Link>{" "}
        <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
          bottom wear
        </Link>{" "}
        <Link
          to="#"
          className="text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          kids
        </Link>{" "}
      </div>

      {/* right side for displaaying the icon */}
      <div className="flex justify-between space-x-5 ">
        <Link to="/profile" className="hover:text-gray-600">
          <FaRegUser className="h-6 w-6 " />
        </Link>
        <button onClick={toggleCartDrawer} className="relative">
          <RiShoppingBagLine className="h-6 w-6 text-gray-700" />
          <span className="absolute  bg-[#ea2e0e] rounded-full px-2 py-0.5 -top-1 text-white text-xs">
            5
          </span>
        </button>

        {/* search functionalituy */}
        <div className="overflow-hidden">
          <Search />
        </div>
        <button className="md:hidden">
          <RxHamburgerMenu size={25} />
        </button>
        <div></div>
      </div>
    </nav>
   <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>
          </>
  );
};

export default Navbar;
