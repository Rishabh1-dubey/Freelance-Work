import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchUser = createAsyncThunk("admin/fetchUser", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/user`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return response.data;
});

// Add the create user action

export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userDate, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
        userDate,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

// Update  the  user action

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
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

// Delete  the  user action

export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
      state.loading = true
      
    })
     .addCase(fetchUser.fulfilled, (state,action) => {
      state.loading = true,
       state.user = action.payload;
    }) .addCase(fetchUser.rejected, (state,action) => {
      state.loading = true,
       state.error = action.error.message;
    })
    .addCase(updateUser.fulfilled,(state,action)=>{
        const updateUser = action.payload;
        const userIndex = state.user.findIndex((user)=>user._id=== updateUser._id)
        if(userIndex !== -1){
            state.user[userIndex]= updateUser
        }
    })
    .addCase(deleteUser.fulfilled,(state,action)=>{
        state.users = state.user.filter((user)=>user._id !== action.payload)
    })
     .addCase(addUser.pending,(state)=>{
        state.loading = true;
        state.error = null
    }) 
    
    .addCase(addUser.fulfilled,(state,action)=>{
        state.loading = false
        state.user.push(action.payload.user)
    }) 
    
    .addCase(addUser.rejected,(state,action)=>{
        state.loading = false
        state.error=action.payload.message
    })

  },
});


export default adminSlice.reducer