"use client";
import { AiOutlineSearch } from "react-icons/ai";

export default function SearchBar({
  handleSearch,
  search,
  setSearch,
  fetchProducts,
}) {
  return (
    <>
      <div className="container my-4 d-flex justify-content-center">
        <form
          className="d-flex align-items-center"
          style={{
            width: "80%",
            maxWidth: "500px",
            backgroundColor: "#f8f9fa",
            borderRadius: "30px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "0.2rem 0.5rem",
          }}
          onSubmit={handleSearch}
        >
          <span className="me-2" style={{ color: "#6c757d" }}>
            <AiOutlineSearch size={24} />
          </span>
          <input
            type="text"
            className="form-control border-0"
            placeholder="Search products..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value.trim() === "") {
                fetchProducts("");
              }
            }}
            style={{
              backgroundColor: "transparent",
              outline: "none",
              boxShadow: "none",
            }}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              borderRadius: "30px",
              padding: "0.5rem 1rem",
              fontSize: "0.9rem",
            }}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}
