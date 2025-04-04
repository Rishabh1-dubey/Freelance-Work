import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaXmark } from "react-icons/fa6";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (e) => {
    setIsOpen(!isOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", searchItem);
    setIsOpen(false);
    setSearchItem("")



    
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0  w-full   z-50 mt-1" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              type="text"
              onChange={(e) => setSearchItem(e.target.value)}
              value={searchItem}
              placeholder="Search "
            />
            {/* search icon */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          {/* close button */}

          <button
            type="button"
            onClick={handleToggle}
            className="absolute right-[340px] top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800"
          >
            <FaXmark />
          </button>
        </form>
      ) : (
        <button onClick={handleToggle}>
          <IoMdSearch className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default Search;
