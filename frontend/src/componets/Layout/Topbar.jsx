import React from "react";
import { FaMeta } from "react-icons/fa6";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="bg-[#ea2e0e] text-white">
      <div className="container mx-auto px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          {/* Social Icons (Hidden on Mobile) */}
          <div className="hidden sm:flex space-x-4 items-center">
            <a href="#" className="hover:text-gray-300">
              <FaMeta className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <AiOutlineInstagram className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaXTwitter className="h-5 w-5" />
            </a>
          </div>

          {/* Middle Text (Always Centered) */}
          <div className="flex-grow text-center text-sm cursor-pointer hover:text-gray-300 transition-all delay-150">
            We ship worldwide - fast and reliable!
          </div>

          {/* Phone (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center gap-2 hover:text-gray-300 cursor-pointer">
            <IoIosCall className="h-4 w-4" />
            <span>+91 (445) 44576878</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;