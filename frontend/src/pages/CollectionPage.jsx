import  { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { MdFilterAlt } from "react-icons/md";
import FilterSidebar from "../componets/Products/FilterSidebar";
import SortOption from "../componets/Products/SortOption";
import ProductGrid from "../componets/Products/ProductGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slice/productSlice";

const CollectionPage = () => {

const{collection} = useParams();
const[searchParams] = useSearchParams()
const dispatch = useDispatch()
const{products ,loading,error} = useSelector((state)=>state.products)
const queryParams = Object.fromEntries([...searchParams])



  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


useEffect(()=>{
  dispatch(fetchProductsByFilters({collection,...queryParams}));

},[dispatch,collection,searchParams])



  const toggelClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (e) => {
    //close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(e.target))
      setIsSidebarOpen(false);
  };

  useEffect(() => {
    //Add Event listener for clicks
    document.addEventListener("mousedown", handleClickOutside);

    //clean event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile Filter button */}
      <button
        onClick={toggelClick}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <MdFilterAlt className="mr-24" />
        Filter
      </button>
      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 `}
      >
        <FilterSidebar />
      </div>
      {/* ------------------------------------------------------------------------------------------------------ */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4"> All Collection</h2>
        {/* Sort Options */}
        <SortOption />

        {/* Product-grid */}
        <ProductGrid products={products} loading={loading}  error={error}/>
      </div>
    </div>
  );
};

export default CollectionPage;
