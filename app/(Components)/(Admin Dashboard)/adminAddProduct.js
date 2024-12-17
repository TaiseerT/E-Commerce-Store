"use client";
export default function AdminAddProduct({
  activePage,
  data,
  setData,
  handleSubmit,
}) {
  return (
    <div className="col-lg-9">
      {activePage === "addProduct" && (
        <div id="addProduct" className="mb-5">
          <form
            className="p-4 bg-white shadow rounded"
            style={{ maxWidth: "800px", margin: "0 auto" }}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="productName" className="form-label fw-semibold">
                  Product Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  required
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="productPrice"
                  className="form-label fw-semibold"
                >
                  Price ($)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  placeholder="Enter product price"
                  required
                  value={data.price}
                  onChange={(e) => {
                    setData({ ...data, price: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label
                  htmlFor="productCategory"
                  className="form-label fw-semibold"
                >
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productCategory"
                  placeholder="Enter product category"
                  required
                  value={data.category}
                  onChange={(e) => {
                    setData({ ...data, category: e.target.value });
                  }}
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="productQuantity"
                  className="form-label fw-semibold"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  placeholder="Enter product quantity"
                  required
                  value={data.quantity}
                  onChange={(e) => {
                    setData({ ...data, quantity: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-12">
                <label
                  htmlFor="productDescription"
                  className="form-label fw-semibold"
                >
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="productDescription"
                  rows="4"
                  placeholder="Enter product description"
                  required
                  value={data.description}
                  onChange={(e) => {
                    setData({ ...data, description: e.target.value });
                  }}
                ></textarea>
              </div>
            </div>

            <div className="row g-3 mt-3">
              <div className="col-md-12">
                <label
                  htmlFor="productImage"
                  className="form-label fw-semibold"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
                  placeholder="Upload image"
                  required
                  onChange={(e) => {
                    setData({ ...data, image: e.target.value });
                  }}
                />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg px-5"
                onClick={handleSubmit}
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
