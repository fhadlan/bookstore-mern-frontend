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
import PrivateRoute from "./routers/PrivateRoute.jsx";
import LoginRegister from "./routers/LoginRegister.jsx";
import Orders from "./pages/books/Orders.jsx";
import AdminRoute from "./routers/AdminRoute.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import DashboardLayout from "./pages/dashboard/DashboardLayout.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="about" element={<div>About</div>} />
          <Route path="cart" element={<CartPage />} />
          <Route path="/book/:id" element={<SingleBook />} />
          <Route element={<LoginRegister />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route element={<AdminRoute />}>
            <Route path="" element={<div>Dashboard</div>} />
            <Route path="add-book" element={<div>Add Book</div>} />
            <Route path="manage-book" element={<div>Manage Book</div>} />
          </Route>
          <Route path="login" element={<AdminLogin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
);
