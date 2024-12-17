"use client";
export default function Categories({ error, loading, categories }) {
  return (
    <div className="container my-5" id="categories">
      {/* Section Header */}
      <h2 className="text-center fw-bold mb-5" style={{ fontSize: "2.5rem" }}>
        Shop by Categories
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading categories...</p>
        </div>
      ) : error ? (
        /* Error State */
        <p className="text-center text-danger fw-semibold">{error}</p>
      ) : (
        /* Categories Grid */
        <div className="row g-4">
          {categories?.length > 0 ? (
            categories.map((category, index) => (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6">
                <div
                  className="card border-0 shadow-sm rounded-lg overflow-hidden text-center h-100"
                  style={{ transition: "transform 0.3s" }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <div
                    className="card-header bg-primary text-white py-3"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      backgroundImage:
                        "linear-gradient(to right, #007bff, #00c6ff)",
                    }}
                  >
                    {category}
                  </div>
                  <div className="card-body d-flex align-items-center justify-content-center">
                    <p className="text-muted mb-0">
                      Browse the best products in {category}
                    </p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <a
                      href={`/category/${category}`}
                      className="btn btn-outline-primary btn-sm px-3 fw-bold"
                    >
                      Explore <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            /* Empty State */
            <p className="text-center text-muted fw-semibold">
              No categories available at the moment.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
