"use client";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export default function SignupPage() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", data).then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1000,
        });
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "Something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4 text-primary">Create Account</h3>
        <p className="text-center text-muted mb-4">
          Join us and start your journey today!
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              id="name"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              id="password"
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-4">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/auth/login" className="text-primary text-decoration-none">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
