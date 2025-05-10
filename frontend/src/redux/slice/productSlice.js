import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// Async thunk to fetch Proucts by Collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    category,
    material,
    search,
    brand,
    limit,
  }) => {
    color;
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/users/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductsDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/products/${id}`
    );
    return response.data;
  }
);

// Async thunk to fetch similar products

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

// fetch Similar Products
export const fetchSimiliarProuducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/products/similar/${id}`
    );
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      material: "",
      collection: "",
      brand: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
        brand: "",
        limit: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      //hanlde fetching products with filter
      .addCase(fetchProductsByFilters.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        (state.loading = false),
          (state.products = Array.isArray(action.payload)
            ? action.payload
            : []);
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })

      //fetch single productDetails
      .addCase(fetchProductsDetails.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchProductsDetails.fulfilled, (state, action) => {
        (state.loading = false), (state.selectedProduct = action.payload);
        // here i made a mistake and with this mistake i was not rendering  my best seller data
        
      })
      .addCase(fetchProductsDetails.rejected, (state, action) => {
        (state.loading = false), (state.error = action.error.message);
      })
      // handling updating product
      .addCase(updateProduct.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false; 
        const updateProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updateProduct._id
        );

        if (index !== -1) {
          state.products[index] = updateProduct;
        }
      })
      .addCase(updateProduct.rejected, (state,action) => {
        state.loading = false,
         state.error = action.error.message
      })
      // fetch similar product
      .addCase(fetchSimiliarProuducts.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchSimiliarProuducts.fulfilled, (state, action) => {
        state.loading = false,
         state.similarProducts = action.payload;
      })
      .addCase(fetchSimiliarProuducts.rejected, (state,action) => {
        (state.loading = false), (state.error = action.error.message);
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
