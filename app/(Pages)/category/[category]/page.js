"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Navbar from "../../../(Components)/Navbar";
import Footer from "../../../(Components)/Footer";
import SkeletonLoader from "../../../(Components)/SkeletonLoader";

export default function CategoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { category } = useParams();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await axios.get(
          `/api/product/getProductsByCategory/${category}`
        );
        setProducts(response.data.products);
      } catch (error) {
        setError(`Failed to load products for the "${category}" category.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h2 className="text-center fw-bold mb-4 text-primary">
          Products in "{category}"
        </h2>

        {loading ? (
          <div className="row g-4">
            {/* Skeleton loaders for product cards */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="col-md-3 col-sm-6">
                <SkeletonLoader height="300px" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-danger py-5">
            <h4>⚠️ {error}</h4>
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">
            No products available in this category.
          </p>
        ) : (
          <div className="row g-4">
            {products.map((product) => (
              <div key={product._id} className="col-md-3 col-sm-6">
                <div
                  className="card shadow-sm h-100 border-0 rounded"
                  style={{ transition: "transform 0.3s" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "translateY(-5px)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  <img
                    src={`http://localhost:3000/uploads/${product.image}`}
                    className="img-fluid rounded shadow-sm"
                    alt={product.name}
                    style={{ height: "200px", objectFit: "cover" }}
                    loading="lazy"
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title text-truncate">{product.name}</h6>
                    <p className="card-text text-success fw-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                    <a
                      href={`/product/${product._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
