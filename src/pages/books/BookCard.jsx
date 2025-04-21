import React from "react";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="rounded-lg transition-shadow duration-300">
      <div className="flex flex-col gap-4 sm:h-72 sm:flex-row sm:items-center">
        <div className="rounded-md shadow-sm sm:h-72 sm:flex-shrink-0">
          <Link to={`/book/${book._id}`}>
            <img
              src={book.coverImage}
              alt=""
              className="w-full cursor-pointer rounded-md bg-cover p-2 transition-all duration-200 hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex h-full flex-col">
          <div className="flex flex-grow flex-col">
            <Link to={`/book/${book._id}`}>
              <h3 className="font-primary mb-3 text-lg font-semibold hover:text-blue-600">
                {book.title}
              </h3>
            </Link>
            <p className="font-secondary mb-5 text-sm text-gray-600">
              {book.description.length > 80
                ? `${book.description.slice(0, 80)}...`
                : book.description}
            </p>
            <p className="mb-5 font-medium">
              {book.discountedPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}{" "}
              {book.discountedPrice !== book.price && (
                <span className="ml-2 font-normal line-through">
                  {book.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              )}
            </p>
          </div>
          <div className="flex flex-col items-end justify-end">
            <p
              className={`mb-2 text-sm ${book.quantity > 0 ? "text-gray-500" : "text-red-600"}`}
            >
              {book.quantity > 0
                ? `In Stock: ${book.quantity}`
                : "Out of Stock"}
            </p>
            <button
              onClick={() => handleAddToCart(book)}
              className="bg-primary hover:bg-secondary ml-2 flex items-center justify-center gap-1 space-x-1 rounded-md px-3 py-1 shadow-sm transition-all duration-200 hover:cursor-pointer hover:text-white disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
              disabled={book.quantity === 0}
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
