"use client";
export default function Banner() {
  return (
    <div
      className="banner-section text-white text-center py-5"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.8), rgba(0, 123, 255, 0.8))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        animation: "fadeIn 1.5s ease-in-out",
      }}
    >
      <div className="container py-5">
        <h3
          className="mb-3 fw-bold"
          style={{ fontSize: "2.5rem", animation: "slideInDown 1s ease-out" }}
        >
          Limited Time Offer!
        </h3>
        <p
          className="mb-4"
          style={{
            fontSize: "1.25rem",
            animation: "slideInDown 1.2s ease-out",
          }}
        >
          Get up to <span className="fw-bold">50% off</span> selected items.
          Hurry, while stocks last!
        </p>
        <a
          href="#categories"
          className="btn btn-light btn-lg px-4 fw-bold"
          style={{ transition: "transform 0.3s" }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Browse Categories
        </a>
      </div>
    </div>
  );
}
