import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const ProductofCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeFromCart = (id) => {
    dispatch(remove(id));
  };

  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  const cards = ProductofCart.map((product) => {
    return (
      <>
        <div className="col-md-3 mb-4">
          <div className="card h-100 text-center p-4" key={product.id}>
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
              <button
                className="btn btn-danger fa fa-shopping-cart me-1"
                onClick={() => removeFromCart(product.id)}
              >
                Remove
              </button>
              <Link to="/checkout" className="btn btn-primary ">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  });

  return (
    <div className="row">
      {cards}
      <button onClick={handleCheckoutClick} className="btn btn-primary">
        Proceed to checkout
      </button>
    </div>
  );
};
export default Cart;
