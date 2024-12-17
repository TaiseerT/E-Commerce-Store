"use client";
export default function AdminEditModal({
  showEditModal,
  setShowEditModal,
  editProductData,
  handleInputChange,
  handleSave,
}) {
  return (
    <div>
      {showEditModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content border-0 shadow-lg rounded-3">
              {/* Header */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-bold">Edit Product</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEditModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body bg-light">
                <form>
                  <div className="row g-3">
                    {/* Product Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="name" className="form-label fw-semibold">
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter product name"
                        value={editProductData.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Price */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="price" className="form-label fw-semibold">
                        Price ($)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        placeholder="Enter product price"
                        value={editProductData.price}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Category */}
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="category"
                        className="form-label fw-semibold"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        placeholder="Enter product category"
                        value={editProductData.category}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Quantity */}
                    <div className="col-12 col-md-6">
                      <label
                        htmlFor="quantity"
                        className="form-label fw-semibold"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        placeholder="Enter available quantity"
                        value={editProductData.quantity}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label
                        htmlFor="description"
                        className="form-label fw-semibold"
                      >
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder="Enter product description"
                        value={editProductData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    {/* Image Upload & Preview */}
                    <div className="col-12">
                      <label htmlFor="image" className="form-label fw-semibold">
                        Product Image
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="image"
                        name="image"
                        onChange={handleInputChange}
                      />
                      <div className="mt-3 text-center">
                        {editProductData.imagePreview ||
                        editProductData.image ? (
                          <img
                            src={
                              editProductData.imagePreview
                                ? editProductData.imagePreview
                                : `http://localhost:3000/uploads/${editProductData.image}`
                            }
                            alt="Product Preview"
                            className="rounded shadow"
                            style={{
                              width: "150px",
                              height: "150px",
                              objectFit: "cover",
                              border: "2px solid #ddd",
                            }}
                          />
                        ) : (
                          <div
                            className="d-inline-block bg-secondary text-white p-3 rounded"
                            style={{ width: "150px", height: "150px" }}
                          >
                            No Image Available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="modal-footer bg-white border-0">
                <button
                  type="button"
                  className="btn btn-outline-secondary me-2"
                  onClick={() => setShowEditModal(false)}
                >
                  <i className="bi bi-x-circle"></i> Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSave}
                >
                  <i className="bi bi-check-circle"></i> Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
