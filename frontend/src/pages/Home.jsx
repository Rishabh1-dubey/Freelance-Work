import React from "react";
import Hero from "../componets/Layout/Hero";
import GenderCollection from "../componets/Products/GenderCollection";
import NewArrival from "../componets/Products/NewArrival";
import ProductDetails from "../componets/Products/ProductDetails";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrival/>

      {/* Product Details */}
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      <ProductDetails/>
    </div>
  );
};

export default Home;
