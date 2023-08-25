import React from "react";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/wishlistSlice";
import { Link } from "react-router-dom";

const WishlistItem = ({ productId, product }) => {
  const dispatch = useDispatch();

  const removeItemFromWishlist = () => {
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100 text-center p-4">
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
            onClick={removeItemFromWishlist}
          >
            Remove
          </button>
          <Link to="checkout" className="btn btn-primary">
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
