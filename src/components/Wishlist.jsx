import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { Link, useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.favorites);
  console.log(wishlistItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  const wishlistCards = wishlistItems.map((product) => (
    <div className="col-md-3 mb-4">
      <div className="card h-100 text-center p-4" key={product}>
        <img
          src={product.image}
          className="card-img-top"
          alt={product.title}
          height="250px"
        />
        <div className="card-body">
          <h5 className="card-title mb-0">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <button
            className="btn btn-danger fa fa-shopping-cart me-1"
            onClick={() => removeItemFromWishlist(product)}
          >
            Remove
          </button>
          <Link to="/checkout" className="btn btn-primary">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="container my-5 py-5">
      <div className="row justify-content-center">
        {wishlistCards}
        <button onClick={handleCheckoutClick} className="btn btn-primary">
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
