import React from "react";
import { Link } from "react-router";
import {
  FaMagnifyingGlass,
  FaBars,
  FaUser,
  FaHeart,
  FaCartShopping,
} from "react-icons/fa6";

import avatar from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigation = [
    { name: "Dashboard", href: "/" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Checkout", href: "/checkout" },
  ];

  const { currentUser, logoutUser } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      icon: "question",
      title: "Logout",
      text: "Are you sure you want to logout?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        setIsDropdownOpen(false);
      }
    });
  };

  //console.log(isDropdownOpen);

  return (
    <header className="mx-auto max-w-screen-xl px-4 py-6">
      <nav className="flex items-center justify-between">
        {/* left side Logo */}
        <div className="flex items-center gap-4 md:gap-16">
          <Link to="/">
            <FaBars className="size-6" />
          </Link>

          {/* search bar */}
          <div className="mr-4 flex items-start gap-2 rounded-sm bg-[#eaeaea] px-6 py-1.5 pl-1 shadow-sm">
            <FaMagnifyingGlass className="size-6" />
            <input
              type="search"
              placeholder="Search"
              className="w-48 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* right side profile logout */}
        <div className="relative flex items-center gap-2 space-x-2 md:space-x-3">
          {currentUser ? (
            <>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="size-8"
              >
                <img
                  src={avatar}
                  alt="avtar"
                  loading="lazy"
                  className="${currentUser ? 'ring-2 ring-blue-400' : ''} size-8 rounded-full"
                />
              </button>
              {/* dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 z-40 mt-50 w-48 rounded-md bg-white shadow-md">
                  <ul>
                    {navigation.map((item, index) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={`block px-4 py-2 hover:bg-gray-100 ${
                            index === 0 ? "rounded-t-md" : ""
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center justify-start px-4 py-2 hover:cursor-pointer hover:rounded-b-md hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <Link to="login">
              <FaUser className="size-6" />
            </Link>
          )}
          <button>
            <FaHeart className="hidden size-6 sm:block" />
          </button>
          <Link
            to="/cart"
            className="bg-primary flex gap-1 rounded-sm p-1.5 shadow-sm"
          >
            <FaCartShopping className="size-6" />
            <span className="sm:px-3">{cartItems.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
