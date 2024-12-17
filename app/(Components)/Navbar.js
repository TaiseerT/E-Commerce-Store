"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import { login, logout } from "../(redux)/(slices)/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const balance = useSelector((state) => state.auth.balance);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const balance = localStorage.getItem("balance");
    if (token && role && balance) {
      dispatch(login({ token, role, balance }));
    }
    setIsInitializing(false);
  }, [dispatch]);

  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  const handleCartAnimation = () => {
    setIsAnimating(true);
  };

  useEffect(() => {
    const handleCartUpdate = () => {
      setIsAnimating(true);
    };

    window.addEventListener("cart-updated", handleCartUpdate);
    return () => {
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("balance");
    dispatch(logout());
    router.push("/");
  };

  if (isInitializing) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand fw-bold">
          HaveBreak
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FiMenu size={24} />
        </button>

        {/* Collapsible Navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                href="/"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/about"
                className={`nav-link ${pathname === "/about" ? "active" : ""}`}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/contact"
                className={`nav-link ${
                  pathname === "/contact" ? "active" : ""
                }`}
              >
                Contact
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center">
            {isLoggedIn && role !== "admin" && (
              <>
                <span className="nav-link text-muted me-3">
                  Balance: <strong>${balance}</strong>
                </span>
                <Link
                  href="/cart"
                  className={`btn btn-outline-primary me-2 ${
                    isAnimating ? "cart-bounce" : ""
                  }`}
                >
                  <FaShoppingBag />
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </>
            )}
            {isLoggedIn && role === "admin" && (
              <>
                <Link
                  href="/admin/dashboard"
                  className={`nav-link ${
                    pathname === "/admin/dashboard" ? "active" : ""
                  } me-3`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger d-flex align-items-center"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Link href="/auth/login" className="btn btn-secondary me-2">
                  <FaUserCircle className="me-2" />
                  Login
                </Link>
                <Link href="/auth/signup" className="btn btn-primary">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
