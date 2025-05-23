import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products,loading,error }) => {

  if(loading){
    return <p>Loading ......</p>
  }
   if(error){
    return <p>Error:{error}</p>
   }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      
      {products.map((product, index) => (
        
        <Link key={index} to={`/product/${product._id}`} className="block">
        
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img className="w-full h-full rounded-lg object-cover" src={product.images?.[0]?.url} />
            </div>
            <h3 className="mb-2">{product.name}</h3>
            <p className="text-gray-600 tracking-tighter">${product.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
