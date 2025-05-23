import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//Helper function to load cart from localStorage

const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [] };
};

// helper functin to save cart to local storage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

//add an item to the cart for a user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

//update  an item to the cart for a user or guest
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/update-cart`,
        {
          productId,
          quantity,
          size,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

//update  an item to the cart for a user or guest
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (
    { productId, quantity, size, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart/remove-cart`,
        data: { productId, quantity, size, color, guestId, userId },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

// Merge guest cart into usercart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {

      // spelling miskate UserTokn----------> userToken
      const token = localStorage.getItem("userToken");
      console.log("Token", token);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [] };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || action.error.message || "Failed to fetch");
      })

      .addCase(addToCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to fetch");
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        (state.loading = false),
          (state.error =action.payload || "Failed to update item Quantity");
      })
      .addCase(removeFromCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to remove Cart");
      })
      .addCase(mergeCart.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(mergeCart.fulfilled, (state, action) => {
        (state.loading = false), (state.cart = action.payload);
        saveCartToStorage(action.payload);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload || "Failed to merge cart");
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
