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
import ManageBook from "./pages/dashboard/manageBook/ManageBook.jsx";
import AddBook from "./pages/dashboard/manageBook/AddBook.jsx";
import EditBook from "./pages/dashboard/manageBook/EditBook.jsx";
import ChangePassword from "./pages/user/ChangePassword.jsx";
import ManageOrders from "./pages/dashboard/ManageOrders.jsx";
import SearchPage from "./pages/books/SearchPage.jsx";
import Profile from "./pages/user/Profile.jsx";
import EditProfile from "./pages/user/EditProfile.jsx";
import AddUser from "./pages/dashboard/admin/AddUser.jsx";
import ProfileAdmin from "./pages/dashboard/admin/ProfileAdmin.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="about" element={<div>About</div>} />
            <Route path="cart" element={<CartPage />} />
            <Route path="/book/:id" element={<SingleBook />} />
            <Route path="/search" element={<SearchPage />} />
            <Route element={<LoginRegister />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="checkout" element={<Checkout />} />
              <Route path="orders" element={<Orders />} />
              <Route path="profile" element={<Profile />} />
              <Route path="edit-profile" element={<EditProfile />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
          <Route path="/dashboard">
            <Route element={<AdminRoute />}>
              <Route element={<DashboardLayout />}>
                <Route path="" element={<div>Dashboard</div>} />
                <Route path="add-book" element={<AddBook />} />
                <Route path="manage-book" element={<ManageBook />} />
                <Route path="edit-book/:id" element={<EditBook />} />
                <Route path="orders" element={<ManageOrders />} />
                <Route path="create-user" element={<AddUser />} />
                <Route path="profile" element={<ProfileAdmin />} />
              </Route>
            </Route>
            <Route path="login" element={<AdminLogin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
    ,
  </StrictMode>,
);
