import React from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, clearCart } from "../../redux/features/cart/cartSlice";
import Swal from "sweetalert2";
import { useFetchCartBooksDetailsMutation } from "../../redux/features/book/bookApi";
import AdjustQuantityModal from "./AdjustQuantityModal";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [itemsDetail, { data: items, isLoading }] =
    useFetchCartBooksDetailsMutation();
  const [isCheckoutDisabled, setIsCheckoutDisabled] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState({
    isOpen: false,
    itemIndex: null,
  });
  const dispatch = useDispatch();

  React.useEffect(() => {
    try {
      itemsDetail(cartItems);
    } catch (error) {
      console.log(error);
    }
  }, [cartItems]);

  React.useEffect(() => {
    items?.forEach((item) => {
      if (!item.isAvailable) {
        setIsCheckoutDisabled(true);
      }
    });
  }, [items]);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-12 flex h-full flex-col overflow-hidden bg-white shadow-xl">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <div className="flex items-start justify-between">
          <div className="font-primary text-lg font-medium text-gray-900">
            Shopping cart
          </div>
          <div className="ml-3 flex h-7 items-center">
            {items?.length > 0 && (
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
            {items?.length > 0 ? (
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item, index) => (
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

                          <p className="sm:ml-4">
                            {item.total.toLocaleString("en", {
                              style: "currency",
                              currency: "USD",
                            })}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Category: </strong> {item.category}
                        </p>
                        <p className="mt-1 text-sm text-gray-500 capitalize">
                          <strong>Price: </strong>
                          {item.price.toLocaleString("en", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </p>
                      </div>
                      <div className="mt-1 flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                        <div className="flex gap-2 text-sm">
                          <p className="flex flex-nowrap gap-1 text-gray-500">
                            <strong>Qty:</strong>
                            {item.quantity}
                          </p>
                          {!item.isAvailable && (
                            <p className="text-sm text-red-600">
                              Only {item.stock} copies available. Please adjust
                              the order quantity or remove the item.
                            </p>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {!item.isAvailable && (
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:cursor-pointer hover:text-indigo-500"
                              onClick={() =>
                                setIsModalOpen({
                                  isOpen: true,
                                  itemIndex: index,
                                })
                              }
                            >
                              Adjust
                            </button>
                          )}
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
          <p>
            {items
              ?.reduce((acc, item) => acc + item.total, 0)
              .toLocaleString("en", {
                style: "currency",
                currency: "USD",
              })}
          </p>
        </div>
        <p className="mt-0.5 text-sm text-gray-500">
          Shipping and taxes calculated at checkout.
        </p>
        <div className="mt-6">
          <Link to="/checkout">
            <button
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-500"
              disabled={isCheckoutDisabled}
            >
              Checkout
            </button>
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
      {isModalOpen.isOpen && (
        <AdjustQuantityModal
          _id={items[isModalOpen.itemIndex]._id}
          stock={items[isModalOpen.itemIndex].stock}
          closeModal={() => setIsModalOpen({ isOpen: false })}
          dispatch={dispatch}
        />
      )}
    </div>
  );
};

export default CartPage;
