"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import AdminEditModal from "./adminEditModal";
import axios from "axios";

export default function AdminManageProducts({
  activePage,
  products,
  setProducts,
}) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    quantity: "",
    image: "",
  });

  const handleEdit = (product) => {
    setEditProductData({
      _id: product._id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      quantity: product.quantity,
      image: product.image,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const imageURL = URL.createObjectURL(files[0]);
      setEditProductData((prevData) => ({
        ...prevData,
        image: files[0],
        imagePreview: imageURL,
      }));
    } else {
      setEditProductData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", editProductData.name);
      formData.append("price", editProductData.price);
      formData.append("category", editProductData.category);
      formData.append("description", editProductData.description);
      formData.append("quantity", editProductData.quantity);

      if (editProductData.image) {
        formData.append("image", editProductData.image);
      }

      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.patch(
        `/api/dashboard/updateProduct/${editProductData._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        const updatedProduct = response.data.product;
        updatedProduct.image = updatedProduct.image
          ? `${updatedProduct.image}?timestamp=${new Date().getTime()}`
          : null;

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id
              ? { ...product, ...updatedProduct }
              : product
          )
        );
        setShowEditModal(false);
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || "Failed to update product",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong while updating the product",
      });
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.delete(
        `/api/dashboard/deleteProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product deleted successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        Swal.fire({
          icon: "error",
          title: response.data.message || "Failed to delete product",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong while deleting the product",
      });
    }
  };

  return (
    <div>
      {activePage === "manageProducts" && (
        <div id="manageProducts" className="p-3">
          <h2 className="fw-bold text-center mb-4">Manage Products</h2>
          <div className="table-responsive bg-light shadow-sm rounded p-3">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark text-center">
                <tr>
                  <th className="text-center" style={{ width: "5%" }}>
                    #
                  </th>
                  <th className="text-center" style={{ width: "25%" }}>
                    Product Name
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Price
                  </th>
                  <th className="text-center" style={{ width: "15%" }}>
                    Category
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Quantity
                  </th>
                  <th className="text-center" style={{ width: "10%" }}>
                    Image
                  </th>
                  <th className="text-center" style={{ width: "20%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={product._id}>
                      <td className="text-center">{index + 1}</td>
                      <td>{product.name}</td>
                      <td className="text-center">${product.price}</td>
                      <td className="text-center">{product.category}</td>
                      <td className="text-center">{product.quantity}</td>
                      <td className="text-center">
                        <img
                          src={`http://localhost:3000/uploads/${product.image}`}
                          alt={product.name}
                          className="img-thumbnail"
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(product)}
                        >
                          <i className="bi bi-pencil-square"></i> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => deleteProduct(product._id)}
                        >
                          <i className="bi bi-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="text-muted fs-5">
                        No products available. Add some products to manage.
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      <AdminEditModal
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        editProductData={editProductData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
      />
    </div>
  );
}
