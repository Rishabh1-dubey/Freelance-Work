import React from "react";
import { MdOutlineShoppingBag } from "react-icons/md";
import { HiMiniArrowPathRoundedSquare } from "react-icons/hi2";
import { CiCreditCard1 } from "react-icons/ci";



const FeaturedSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {/* Featured 1 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <MdOutlineShoppingBag className="text-xl" />
          </div>
        <h4 className="tracking-tighter mb-2"> FREE INTERNATIONAL SHIPPING</h4>
        <p className="text-gray-600 text-sm tracking-tighter">
          On All orders over $100.00
        </p>
        </div>

        {/* feature -2 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
          <HiMiniArrowPathRoundedSquare className="text-xl" />
          </div>
        <h4 className="tracking-tighter mb-2"> 45 DAYS RETURN</h4>
        <p className="text-gray-600 text-sm tracking-tighter">
          Money back gurantee
        </p>
        </div>

        {/* featured-3 */}
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-full mb-4">
            <CiCreditCard1  className="text-xl" />
          </div>
        <h4 className="tracking-tighter mb-2"> SECURE PAYEMENT</h4>
        <p className="text-gray-600 text-sm tracking-tighter">
         secure payment no hidden charges
        </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
