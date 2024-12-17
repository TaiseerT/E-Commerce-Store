"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/getUserCart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart."
      );
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async (itemId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/removeItemFromCart`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product removed successfully",
          showConfirmButton: false,
          timer: 1000,
        });
        return itemId;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item."
      );
    }
  }
);

export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (items, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/confirmOrder`,
        { items },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: response.data.message,
        text: `Remaining Balance: $${response.data.remainingBalance.toFixed(
          2
        )}`,
        showConfirmButton: true,
        confirmButtonColor: "#0d6efd",
      });
      localStorage.setItem("balance", response.data.remainingBalance);
      return response.data.remainingBalance;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error.response?.data?.message || "An unexpected error occurred.",
      });
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm order."
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
    },
    updateCartLocally: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart Cases
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Remove Item Cases
    builder
      .addCase(removeItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.items = state.cart.items.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to remove item.";
      });

    // Confirm Order Cases
    builder
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to confirm order.";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice;
