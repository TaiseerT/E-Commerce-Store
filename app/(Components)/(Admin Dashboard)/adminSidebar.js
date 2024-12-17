"use client"
export default function AdminSidebar({ activePage, setActivePage }) {
  return (
    <div className="col-lg-3 mb-4">
      <div className="card shadow rounded">
        <div
          className="card-header bg-primary text-white text-center fw-bold py-3"
          style={{ fontSize: "1.2rem" }}
        >
          Navigation
        </div>
        <ul className="list-group list-group-flush">
          <li
            className={`list-group-item d-flex align-items-center ${
              activePage === "addProduct" ? "active bg-primary text-white" : ""
            }`}
            style={{
              cursor: "pointer",
              padding: "0.75rem 1.25rem",
              fontWeight: activePage === "addProduct" ? "600" : "400",
              borderLeft: activePage === "addProduct" ? "4px solid #0d6efd" : "",
            }}
            onClick={() => setActivePage("addProduct")}
          >
            <i
              className={`me-2 ${
                activePage === "addProduct" ? "bi bi-plus-circle" : "bi bi-circle"
              }`}
              style={{ fontSize: "1.1rem" }}
            ></i>
            Add Product
          </li>
          <li
            className={`list-group-item d-flex align-items-center ${
              activePage === "manageProducts" ? "active bg-primary text-white" : ""
            }`}
            style={{
              cursor: "pointer",
              padding: "0.75rem 1.25rem",
              fontWeight: activePage === "manageProducts" ? "600" : "400",
              borderLeft: activePage === "manageProducts" ? "4px solid #0d6efd" : "",
            }}
            onClick={() => setActivePage("manageProducts")}
          >
            <i
              className={`me-2 ${
                activePage === "manageProducts" ? "bi bi-box-seam" : "bi bi-circle"
              }`}
              style={{ fontSize: "1.1rem" }}
            ></i>
            Manage Products
          </li>
        </ul>
      </div>
    </div>
  );
}
