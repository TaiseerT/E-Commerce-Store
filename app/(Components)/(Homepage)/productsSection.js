"use client";
import React from "react";

export default function Products({ products, loading, error }) {
  return (
    <div className="container my-5" id="products">
      {/* Section Header */}
      <h2 className="text-center fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
        Our Products
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="row g-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="col-md-4 col-sm-6">
              <div
                className="card border-0 shadow-sm p-3"
                style={{ minHeight: "300px" }}
              >
                <div
                  className="skeleton-image"
                  style={{
                    height: "130px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                  }}
                ></div>
                <div className="mt-3">
                  <div
                    className="skeleton-text"
                    style={{
                      height: "20px",
                      backgroundColor: "#e0e0e0",
                      width: "60%",
                      margin: "10px auto",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div
                    className="skeleton-text"
                    style={{
                      height: "20px",
                      backgroundColor: "#e0e0e0",
                      width: "40%",
                      margin: "10px auto",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        /* Error State */
        <p className="text-center text-danger fw-bold">{error}</p>
      ) : products.length === 0 ? (
        /* Empty State */
        <div className="text-center">
          <i className="bi bi-box-seam" style={{ fontSize: "3rem" }}></i>
          <p className="text-muted mt-3" style={{ fontSize: "1.2rem" }}>
            There are no products available at the moment.
          </p>
        </div>
      ) : (
        /* Product Grid */
        <div className="row g-4">
          {products.map((product, index) => (
            <div key={product._id || index} className="col-md-4 col-sm-6">
              <div
                className="card h-100 border-0 shadow-sm rounded-3 overflow-hidden"
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
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{product.name}</h5>
                  <p className="card-text text-success fw-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                  <a
                    href={`/product/${product._id}`}
                    className="btn btn-outline-primary"
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
  );
}
