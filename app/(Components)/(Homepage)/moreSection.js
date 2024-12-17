"use client"
import { FaUndo, FaShippingFast, FaHeadset } from "react-icons/fa";

export default function MoreSection() {
  return (
    <div className="container py-5">
      <div className="row text-center">
        {/* Free Returns */}
        <div
          className="col-md-4 mb-3"
          style={{ transition: "transform 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div className="p-3">
            <FaUndo size={40} className="text-primary mb-3" />
            <h5 className="fw-bold">Free Returns</h5>
            <p className="text-muted">
              Enjoy hassle-free returns within 30 days of purchase.
            </p>
          </div>
        </div>

        {/* Fast Shipping */}
        <div
          className="col-md-4 mb-3"
          style={{ transition: "transform 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div className="p-3">
            <FaShippingFast size={40} className="text-primary mb-3" />
            <h5 className="fw-bold">Fast Shipping</h5>
            <p className="text-muted">
              Get your products delivered in record time with express shipping.
            </p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div
          className="col-md-4 mb-3"
          style={{ transition: "transform 0.3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div className="p-3">
            <FaHeadset size={40} className="text-primary mb-3" />
            <h5 className="fw-bold">24/7 Support</h5>
            <p className="text-muted">
              Our team is here to assist you anytime, day or night.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
