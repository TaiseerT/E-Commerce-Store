"use client";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../(slices)/cartSlice";
import authSlice from "../(slices)/authSlice";
import productsSlice from "../(slices)/productsSlice";
import categoriesSlice from "../(slices)/categoriesSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    categories: categoriesSlice.reducer,
  },
});

export default store;
