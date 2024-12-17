"use client";
import { Carousel } from "react-bootstrap";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function Reviews() {
  const reviews = [
    {
      text: "The quality is amazing, and the delivery was super fast! Will definitely shop here again.",
      name: "Sarah L.",
    },
    {
      text: "Excellent customer service and top-notch products. Highly recommend!",
      name: "James K.",
    },
    {
      text: "A seamless shopping experience from start to finish. Five stars!",
      name: "Emily R.",
    },
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        {/* Section Header */}
        <h2 className="text-center fw-bold mb-4">What Our Customers Say</h2>

        {/* Carousel */}
        <Carousel
          indicators={false}
          interval={3000}
          nextIcon={
            <FaArrowCircleRight
              size={36}
              color="#0d6efd"
              className="carousel-control-icon"
            />
          }
          prevIcon={
            <FaArrowCircleLeft
              size={36}
              color="#0d6efd"
              className="carousel-control-icon"
            />
          }
        >
          {reviews.map((review, index) => (
            <Carousel.Item key={index}>
              <div className="row justify-content-center">
                <div className="col-md-6">
                  <div
                    className="card border-0 shadow-sm p-4 text-center"
                    style={{
                      transition: "transform 0.3s",
                    }}
                  >
                    {/* Review Text */}
                    <p className="card-text text-muted fst-italic">
                      "{review.text}"
                    </p>
                    {/* Reviewer Name */}
                    <h6 className="fw-bold text-primary">{`- ${review.name}`}</h6>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
