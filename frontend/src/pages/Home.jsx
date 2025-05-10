import React, { useEffect, useState } from "react";
import Hero from "../componets/Layout/Hero";
import GenderCollection from "../componets/Products/GenderCollection";
import NewArrival from "../componets/Products/NewArrival";
import ProductDetails from "../componets/Products/ProductDetails";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";
import ProductGrid from "../componets/Products/ProductGrid";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    // Fetch products for a specific
    dispatch(
      fetchProductsByFilters({ gender: "Women", category: "Bottom", limit: 8 })
    );
    // Fetch to best seller products;
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrival />

      {/* Product Details */}

      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p>Loading ..............</p>
      )}

      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wears for Women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
        
      </div>
    </div>
  );
};

export default Home;
