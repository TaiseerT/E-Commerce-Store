"use client";
import Navbar from "../app/(Components)/Navbar";
import Footer from "../app/(Components)/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "./(Components)/(Homepage)/heroSection";
import MoreSection from "./(Components)/(Homepage)/moreSection";
import Reviews from "./(Components)/(Homepage)/reviews";
import Banner from "./(Components)/(Homepage)/banner";
import Products from "./(Components)/(Homepage)/productsSection";
import Categories from "./(Components)/(Homepage)/categoriesSection";
import SearchBar from "./(Components)/(Homepage)/searchBar";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (query = "") => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `/api/product/getProducts?search=${query}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/product/getCategories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error(error);
      setError("Failed to load categories. Please try again later.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts(search);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        {/* Hero Section */}
        <HeroSection />

        {/* Search Bar */}
        <SearchBar
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          fetchProducts={fetchProducts}
        />

        {/* Products Section */}
        <Products loading={loading} error={error} products={products} />

        {/* Banner Section */}
        <Banner />

        {/* Categories Section */}
        <Categories loading={loading} error={error} categories={categories} />

        {/* Free Returns and More Section */}
        <MoreSection />

        {/* Customer Testimonials Section */}
        <Reviews />
      </div>
      <Footer />
    </>
  );
}
