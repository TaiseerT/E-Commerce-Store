"use client";
import Navbar from "../../../(Components)/Navbar";
import Footer from "../../../(Components)/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Swal from "sweetalert2";
import SkeletonLoader from "@/app/(Components)/SkeletonLoader";
import { useSelector } from "react-redux";

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [error, setError] = useState("");
  const { id } = useParams();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/getProductById/${id}`);
        const fetchedProduct = response.data.product;
        setProduct(fetchedProduct);

        if (fetchedProduct?.category) {
          fetchRelatedProducts(fetchedProduct.category, id);
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch product details."
        );
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async (category, excludeId) => {
      try {
        const response = await axios.get(
          `/api/product/getRelatedProducts?category=${category}&excludeId=${excludeId}`
        );
        setRelatedProducts(response.data.relatedProducts || []);
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "You must be logged in to add to your cart!",
        showConfirmButton: true,
        confirmButtonColor: "#0d6efd",
      });
      return;
    }
    try {
      await axios.post(
        `/api/addItemToCart`,
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Product added to cart successfully",
        showConfirmButton: false,
        timer: 1000,
      });

      const event = new Event("cart-updated");
      window.dispatchEvent(event);
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add product to cart!",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {loading ? (
          <div className="row g-4">
            {/* Skeleton Loader for Product Details */}
            <div className="col-lg-6">
              <SkeletonLoader height="400px" />
            </div>
            <div className="col-lg-6">
              <SkeletonLoader count={3} height="30px" />
              <SkeletonLoader height="50px" width="50%" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-danger py-5">
            <h4>⚠️ {error}</h4>
          </div>
        ) : product ? (
          <>
            {/* Product Details */}
            <div className="row g-5">
              <div className="col-lg-6 col-md-12">
                <img
                  src={`http://localhost:3000/uploads/${product.image}`}
                  alt={product.name}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "100%", objectFit: "cover" }}
                  loading="lazy"
                />
              </div>
              <div className="col-lg-6 col-md-12">
                <h1 className="fw-bold mb-3">{product.name}</h1>
                <p className="text-muted mb-4">
                  <strong>Description:</strong>{" "}
                  {product.description || "No description available."}
                </p>
                <p className="text-muted">
                  <strong>Category:</strong> {product.category}
                </p>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="card-text text-success fw-semibold">
                    ${product.price.toFixed(2)}
                  </h3>
                  {product.quantity === 0 ? (
                    <h5 className="text-secondary">
                      <strong>Stock:</strong> Out of stock
                    </h5>
                  ) : (
                    <h5 className="text-secondary">
                      <strong>Stock:</strong> {product.quantity}
                    </h5>
                  )}
                </div>
                <button
                  className="btn btn-primary btn-lg w-100"
                  onClick={handleAddToCart}
                  disabled={product.quantity === 0 || role === "admin"}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Related Products */}
            <div className="py-5">
              <h2 className="text-center fw-bold mb-4">Related Products</h2>
              <div className="row g-4">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((related) => (
                    <div
                      key={related._id}
                      className="col-lg-3 col-md-4 col-sm-6"
                    >
                      <div
                        className="card h-100 shadow-sm border-0"
                        style={{ transition: "transform 0.3s" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.transform = "translateY(-5px)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.transform = "translateY(0)")
                        }
                      >
                        <img
                          src={`http://localhost:3000/uploads/${related.image}`}
                          className="card-img-top"
                          alt={related.name}
                          style={{ height: "200px", objectFit: "cover" }}
                          loading="lazy"
                        />
                        <div className="card-body text-center">
                          <h6 className="card-title">{related.name}</h6>
                          <p className="card-text text-success fw-semibold">
                            ${related.price.toFixed(2)}
                          </p>
                          <a
                            href={`/product/${related._id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">
                    No related products found.
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-5">
            <p>Product not found.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
