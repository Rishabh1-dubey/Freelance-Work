import React from "react";
import { Link } from "react-router-dom";
import { FaMeta } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t py-8  ">
      <div className="container mx-20 grid grid-cols-1 md:grid-cols-4 gap-8  px-4  lg:px-0">
        <div className="">
          <h3 className="text-lg text-gray-800 mb-4">NewsLetter</h3>
          <p className="text-gray-400 mb-4">
            Be the first to hear about new Products, Exclusive events, and
            online offers
          </p>
          <p className="font-medium text-sm text-gray-500 mb-6">
            Sign up and get 10% discount off your first order
          </p>

          {/* News letter form */}
          <form className="flex mb-4">
            <input
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              type="email"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Shop links */}

        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="#" className="hover:text-gray-700 transition-colors">
                Mens's TopWear
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Womens's TopWear
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Mens's Bottomwear
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women Bottomwear
              </Link>
            </li>
          </ul>
        </div>

        {/* Supports Links */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-2 text-gray-500">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Contact Us
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                About Us
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                FAQ's
              </Link>
            </li>{" "}
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Supports US
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="text-lg text-gray-700 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener norefrence"
            >
              <FaMeta className="h-6 w-6 hover:text-blue-700" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener norefrence"
            >
              <FaInstagram className="h-6 w-6 hover:text-red-600" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener norefrence"
            >
              <FaXTwitter className="h-6 w-6 text-black" />
            </a>
          </div>
          <div className="flex items-center gap-4">
          <FaPhoneAlt />
            <p> +91(456)565667</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-gray-400 text-sm tracking-tighter text-center mb-4">
        © 2025 , CompileTab. All Rights Reserved
        </p>
        <h3 className="text-center ">Made by ❤️‍🔥Rishabh</h3>
      </div>
    </footer>
  );
};

export default Footer;
