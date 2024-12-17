"use client";

import Footer from "@/app/(Components)/Footer";
import Navbar from "@/app/(Components)/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminSidebar from "@/app/(Components)/(Admin Dashboard)/adminSidebar";
import AdminAddProduct from "@/app/(Components)/(Admin Dashboard)/adminAddProduct";
import AdminManageProducts from "@/app/(Components)/(Admin Dashboard)/adminManageProducts";

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState("addProduct");
  const [data, setData] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
    quantity: "",
    features: [],
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (activePage === "manageProducts") {
      fetchProducts();
    }
  }, [activePage]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found in localStorage");
      }
      const response = await axios.get("/api/product/getProducts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response?.data?.message || "Failed to fetch products",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("quantity", data.quantity);

      const imageFile = document.getElementById("productImage").files[0];
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await axios
        .post("/api/dashboard/addProduct", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product added Successfully",
            showConfirmButton: false,
            timer: 1000,
          });
          setData({
            name: "",
            price: "",
            image: "",
            description: "",
            quantity: "",
            category: "",
          });
          fetchProducts();
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
    <>
      <Navbar />
      <div className="container-fluid p-4">
        <h1 className="text-center fw-bold mb-4">Admin Dashboard</h1>
        <div className="row">
          {/* Sidebar */}
          <AdminSidebar activePage={activePage} setActivePage={setActivePage} />

          {/* Add Product */}
          <AdminAddProduct
            activePage={activePage}
            data={data}
            setData={setData}
            handleSubmit={handleSubmit}
          />
          <AdminManageProducts
            activePage={activePage}
            products={products}
            setProducts={setProducts}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
