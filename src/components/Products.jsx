import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import "./Products.css";

function Products() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    let componentMounted = true;

    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");

      if (componentMounted) {
        const responseData = await response.json();
        const productsWithHeartHover = responseData.map((product) => ({
          ...product,
          heartHovered: false,
        }));
        setData(productsWithHeartHover);
        setFilter(productsWithHeartHover);
        setLoading(false);
      }
    };

    getProducts();

    return () => {
      componentMounted = false;
    };
  }, []);

  const toggleWishlist = (productId) => {
    if (wishlist.favorites.includes(productId)) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    );
  };

  const handleHeartMouseEnter = (productId) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === productId ? { ...product, heartHovered: true } : product
      )
    );
  };

  const handleHeartMouseLeave = (productId) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === productId ? { ...product, heartHovered: false } : product
      )
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((x) => x.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => filterProduct("electronics")}
          >
            Eletronic
          </button>
        </div>
        {filter.map((product) => {
          return (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  height="250px"
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.title.substring(0, 12)}
                  </h5>
                  <p className="card-text">${product.price}</p>
                  <Link
                    to={`/product/${product.id}`}
                    className="btn btn-primary fa fa-shopping-cart me-1"
                  >
                    Add to Cart
                  </Link>
                  <Link to="/wishlist" className="btn btn-danger fa  me-1">
                    View Wishlist
                  </Link>
                  <div className="wishlist-icon">
                    <i
                      className={`fa fa-heart${
                        product.heartHovered ||
                        wishlist.favorites.includes(product.id)
                          ? " active"
                          : ""
                      }`}
                      aria-hidden="true"
                      onMouseEnter={() => handleHeartMouseEnter(product.id)}
                      onMouseLeave={() => handleHeartMouseLeave(product.id)}
                      onClick={() => toggleWishlist(product)}
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-border">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
export default Products;
