"use client";
import Navbar from "../../(Components)/Navbar";
import Footer from "../../(Components)/Footer";
import SkeletonLoader from "../../(Components)/SkeletonLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/app/(redux)/(slices)/authSlice";
import {
  fetchCart,
  removeItem,
  confirmOrder,
} from "@/app/(redux)/(slices)/cartSlice";
export default function CartPage() {
  const dispatch = useDispatch();
  const { error, loading, cart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return; 

    const updatedCart = {
      ...cart,
      items: cart.items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    };

    dispatch({
      type: "cart/updateCartLocally",
      payload: updatedCart,
    });
  };

  const handleRemoveItem = async (itemId) => {
    try {
      dispatch(removeItem(itemId))
        .unwrap()
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Product removed successfully",
            showConfirmButton: false,
            timer: 1000,
          });
        });
    } catch (error) {
      Swal.fire("Error", error || "Failed to remove item", "error");
    }
  };

  const handleCheckout = async () => {
    if (!cart?.items || cart.items.length === 0) return;
    try {
      dispatch(confirmOrder(cart.items))
        .unwrap()
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.message,
            text: `Remaining Balance: $${response}`,
            confirmButtonColor: "#0d6efd",
          });

          localStorage.setItem("balance", response);
          dispatch(
            login({
              token: localStorage.getItem("token"),
              role: localStorage.getItem("role"),
              balance: response,
            })
          );
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Checkout Failed",
        text: error.response?.data?.message || "An unexpected error occurred.",
      });
    }
  };

  const calculateTotalPrice = () => {
    return cart?.items?.reduce((total, item) => {
      return total + item.quantity * item.productId.price;
    }, 0);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container py-5 flex-grow-1">
        <h1 className="text-center fw-bold mb-4">Your Cart</h1>
        {loading ? (
          <div>
            <SkeletonLoader count={3} height="40px" />
            <SkeletonLoader count={1} height="20px" width="50%" />
          </div>
        ) : error ? (
          <div className="text-center text-danger">{error}</div>
        ) : cart && cart.items.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark text-center">
                  <tr>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "30%" }}
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "20%" }}
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "15%" }}
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "15%" }}
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="text-center"
                      style={{ width: "20%" }}
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item) => (
                    <tr key={item._id}>
                      <td className="d-flex align-items-center">
                        <img
                          src={`http://localhost:3000/uploads/${item.productId.image}`}
                          alt={item.productId.name}
                          className="img-thumbnail me-2"
                          style={{ width: "50px", height: "50px" }}
                        />
                        {item.productId.name}
                      </td>
                      <td className="text-center">
                        <input
                          type="number"
                          className="form-control"
                          value={item.quantity}
                          min="1"
                          max={item.productId.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id,
                              Number(e.target.value)
                            )
                          }
                        />
                      </td>
                      <td className="text-center">
                        ${item.productId.price.toFixed(2)}
                      </td>
                      <td className="text-center">
                        ${(item.quantity * item.productId.price).toFixed(2)}
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleRemoveItem(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-end mt-4">
              <h3 className="fw-bold">
                Total: ${calculateTotalPrice().toFixed(2)}
              </h3>
              <button className="btn btn-primary mt-3" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">Your cart is empty.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
