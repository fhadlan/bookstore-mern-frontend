import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import { store } from "./redux/store.js";
import CartPage from "./pages/books/CartPage.jsx";
import Checkout from "./pages/books/Checkout.jsx";
import SingleBook from "./pages/books/SingleBook.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="orders" element={<div>Orders</div>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="/book/:id" element={<SingleBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
