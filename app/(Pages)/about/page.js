"use client";
import Navbar from "../../(Components)/Navbar";
import Footer from "../../(Components)/Footer";

export default function AboutUsPage() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h1 className="text-center fw-bold mb-4">About Us</h1>
        <p className="lead text-center text-muted">
          Welcome to our store! We are dedicated to delivering quality products and an exceptional shopping experience.
        </p>
        <div className="row mt-5">
          <div className="col-md-6 mb-4">
            <h3 className="fw-bold">Our Mission</h3>
            <p>
              To deliver exceptional value and quality to our customers while making shopping a delightful experience.
            </p>
          </div>
          <div className="col-md-6 mb-4">
            <h3 className="fw-bold">Our Story</h3>
            <p>
              Founded in 2024, we started as a small online store driven by a passion for innovation and excellence.
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h3 className="fw-bold">Our Values</h3>
            <p>
              Integrity, customer satisfaction, and innovation are at the heart of everything we do.
            </p>
          </div>
          <div className="col-md-6">
            <h3 className="fw-bold">Looking Ahead</h3>
            <p>
              As we grow, we remain committed to providing exceptional products and services to our customers worldwide.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
