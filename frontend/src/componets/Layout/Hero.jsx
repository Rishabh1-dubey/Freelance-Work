import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import {Link} from "react-router-dom"
const Hero = () => {
  return (
    <section className="relative ">
      <img
        src={heroImg}
        className="w-full h-[480px] md:h-[600px] lg:h-[750px] object-cover"
        alt="rabbit-image"
      />
      <div className="absolute inset-0 bg-black bg-opacity-5 flex items-center justify-center">
        <div className="text-center text-white p-6 mb-28">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-2">
            Vacation
            <br />
            Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-8">
            Explore our Vacation-ready outfits with fast worldwide shipping
          </p>
        <Link to="#" className="bg-white text-gray-900 px-6  py-2 rounded-sm text-lg  ">
        Shop Now </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
