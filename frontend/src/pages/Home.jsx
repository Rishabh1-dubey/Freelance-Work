import React from "react";
import Hero from "../componets/Layout/Hero";
import GenderCollection from "../componets/Products/GenderCollection";
import NewArrival from "../componets/Products/NewArrival";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection/>
      <NewArrival/>
    </div>
  );
};

export default Home;
