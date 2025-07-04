import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });

  const [priceRange, setPriceRange] = useState([0, 100]);

  const categories = ["top Wear", "Bottom Wear"];
  const colors = [
    "red",
    "coral",
    "slateblue",
    "lightseagreen",
    "gold",
    "hotpink",
    "seagreen",
    "blueviolet",
  ];

  const sizes = ["xS", "M", "L", "XL", "XXL", "XXXL"];

  const materials = [
    "cotton",
    "wool",
    "Denim",
    "Polyster",
    "slik",
    "Line",
    "Flecce",
  ];
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Under Armour"];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 100,
    });
    setPriceRange([0, params.maxPrice || 100]);
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log({ name, value, checked, type });
    let newFilters = { ...filters };

    if (type == "checkbox") {
      if (checked) {
        newFilters[name] = [...(newFilters[name] || []), value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    }
    else{
        newFilters[name]=value
    }
    setFilters(newFilters)
    console.log(newFilters)
    updateURLParams(newFilters)
  };

// PriceChangeURL
const handlePriceChane=(e)=>{


const newPrice = e.target.value
setPriceRange([0,newPrice]);
const newFilters = {...filters ,minPrice:0 , maxPrice:newPrice};
setFilters(filters);
updateURLParams(newFilters)


}








  const updateURLParams = (newFilters)=>{
    const params = new URLSearchParams();

    //{category:"Top Wear" ,"size:["XS","S"}
    Object.keys(newFilters).forEach((key)=>{
      if(Array.isArray(newFilters[key])&& newFilters[key].length>0){
        params.append(key,newFilters[key].join(","));
      } else if(newFilters[key]){
        params.append(key,newFilters[key])
      }
    })


setSearchParams(params)
navigate(`?${params.toString()}`); //?category
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>

      {/* Category filter */}

      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/* gender */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Genders</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>

      {/* Colors Filters */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">
          Pick your Color
        </label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color}
              name="color"
              value={color}
              onClick={handleFilterChange}
              className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer  transition hover:scale-105"
              style={{ backgroundColor: color.toLowerCase() }}
            ></button>
          ))}
        </div>
      </div>

      {/* Size filter */}

      <div className="mt-8">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>

      {/* brand filter */}

      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          Select Your Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
      {/* Matrails */}
      <div className="mb-8">
        <label className="block text-gray-700 font-medium mb-2">
          Select Your Brand
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>

      {/* Price Range filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          value={priceRange[1]}
          type="range"
          name="priceRange"
          onChange={handlePriceChane}
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
