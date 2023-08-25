import "./App.css";
import LoginPage from "./components/LoginPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { Provider } from "react-redux";
import store from "./store/store";
import Checkout from "./components/Checkout";
import Wishlist from "./components/Wishlist";

function App() {
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Provider>
    </>
  );
}

export default App;

// initially this router is not working because i had two time imported react router dom and here we have to remember if we are doing BrwoserRouter as Router then we have to do first Router then its under Routes and individual Route. and if we had't menton as anything then we can do First BrowserRouter than its under Routes and individual Route.
