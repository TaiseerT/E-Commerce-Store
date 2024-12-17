"use client";
import Navbar from "../app/(Components)/Navbar";
import Footer from "../app/(Components)/Footer";
import { useEffect, useState } from "react";
import HeroSection from "./(Components)/(Homepage)/heroSection";
import MoreSection from "./(Components)/(Homepage)/moreSection";
import Reviews from "./(Components)/(Homepage)/reviews";
import Banner from "./(Components)/(Homepage)/banner";
import Products from "./(Components)/(Homepage)/productsSection";
import Categories from "./(Components)/(Homepage)/categoriesSection";
import SearchBar from "./(Components)/(Homepage)/searchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./(redux)/(slices)/productsSlice";
import { fetchCategories } from "./(redux)/(slices)/categoriesSlice";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchProducts(search));
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
          fetchProducts={() => dispatch(fetchProducts(""))}
        />

        {/* Products Section */}
        <Products
          loading={productsLoading}
          error={productsError}
          products={products}
        />

        {/* Banner Section */}
        <Banner />

        {/* Categories Section */}
        <Categories
          loading={categoriesLoading}
          error={categoriesError}
          categories={categories}
        />

        {/* Free Returns and More Section */}
        <MoreSection />

        {/* Customer Testimonials Section */}
        <Reviews />
      </div>
      <Footer />
    </>
  );
}
