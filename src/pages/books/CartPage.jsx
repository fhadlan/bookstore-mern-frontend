import React from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getImgUrl } from "../../utils/getImgUrl";
import { removeFromCart, clearCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const handleRemoveItem = (item) => {
    Swal.fire({
      title: "Do you want to remove this item?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(removeFromCart(item));
      }
    });
  };

  const handleClearCart = () => {
    Swal.fire({
      title: "Do you want to clear the cart?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(clearCart());
        Swal.fire({
          icon: "success",
          title: "Cart cleared",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="mt-12 flex h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="font-primary text-lg font-medium text-gray-900">
            Shopping cart
          </div>
          <div className="ml-3 flex h-7 items-center">
            {cartItems.length > 0 && (
              <button
                type="button"
                onClick={handleClearCart}
                className="hover:bg-secondary relative -m-2 rounded-md bg-red-500 px-2 py-1 text-white transition-all duration-200 hover:cursor-pointer"
              >
                <span className="">Clear Cart</span>
              </button>
            )}
          </div>
        </div>

        <div className="mt-8">
          <div className="flow-root">
            {cartItems.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <li className="flex py-6" key={index}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt=""
                        src={item.coverImage}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                          <h3>
                            <Link to={`/book/${item._id}`}>{item.title}</Link>
                          </h3>
                          <p className="sm:ml-4">${item.newPrice}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category:</strong> {item.category}
                        </p>
                      </div>
                      <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <p className="text-gray-500">
                          <strong>Qty:</strong> 1
                        </p>

                        <div className="flex">
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:cursor-pointer hover:text-indigo-500"
                            onClick={() => handleRemoveItem(item)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl font-bold">Your cart is empty</h3>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <p>Subtotal</p>
          <p>${cartItems.reduce((acc, item) => acc + item.newPrice, 0)}</p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link
            to="/checkout"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </Link>
        </div>
        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <Link to="/">
            or
            <button
              type="button"
              className="ml-1 font-medium text-indigo-600 hover:cursor-pointer hover:text-indigo-500 hover:underline"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
