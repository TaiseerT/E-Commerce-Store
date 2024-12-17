"use client";
import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    role: null,
    balance: null,
  },
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.balance = action.payload.balance;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
      state.balance = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store;
