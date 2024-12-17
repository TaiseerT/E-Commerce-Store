"use client";
export default function SkeletonLoader({
  count = 1,
  height = "20px",
  width = "100%",
}) {
  const loaders = Array.from({ length: count });
  return (
    <>
      {loaders.map((_, index) => (
        <div
          key={index}
          className="mb-2"
          style={{
            height,
            width,
            backgroundColor: "#e0e0e0",
            borderRadius: "8px",
            animation: "pulse 1.5s infinite ease-in-out",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
