import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const cartProducts = useSelector((state) => state.cart);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold fs-4">
            SHOPLANE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="ms-auto">
              <Link to="login" className="btn btn-outline-dark me-2">
                <i className="fa fa-sign-in me-1"></i> Login
              </Link>
              <Link to="signup" className="btn btn-outline-dark me-2">
                <i className="fa fa-user-plus me-1"></i> Sign up
              </Link>
              <Link to="cart" className="btn btn-outline-dark">
                <i className="fa fa-shopping-cart me-1"></i> Cart{" "}
                {cartProducts.length}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
